import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useState } from 'react';
import { postJson, requestJson } from '../utils/network';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // This challenge can be used for testing
  const CHALLENGE = "IAAAAGPiiW0nHxTZ2/XyU1RXz+2PB86r";

  /**
   * Old authentication route that does not require a challenge and pow signing.
   */
  const devLogin = useCallback(async (email, password, returnUrl = '/') => {
    setLoggingIn(true);
    const response = await requestJson(
      `${process.env.TEST_API_URL}/auth`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
    if (response && response.token) {
      let u = ({ email, isAdmin: true })
      localStorage.setItem('token', response.token);
      setUser(u);

      router.push(returnUrl)
    }
    setLoggingIn(false);
  }, [router]);

  // TODO: Test expiration
  async function challenge() {
    let cached = localStorage.getItem('challenge');
    if (!cached) {
      const res = await requestJson('/api/v0/accounts/challenge/');
      if (res && res.challenge && res.expires) {
        localStorage.setItem('challenge', JSON.stringify(res));
        return res;
      }
    }

    try {
      cached = JSON.parse(cached);
      if (cached.challenge) {
        return cached.challenge;
      }
    } catch (e) {
      localStorage.removeItem('challenge');
      return null;
    }
  }

  /**
   * issues a long-lived token belonging to the user identified by the
   * pow-signed value passed as `email` as long as the pow-signed value
   * passed as `password` matches the stored password; both fields may be
   * signed with the same challenge as long as it's not expired.
   * the returned token is authoritative for a short period (defaults to 15
   * minutes); during this time it may be used to perform actions that
   * normally require password input (such as changing their own password,
   * logging out of other sessions, inviting new members to teams or changing
   * the permissions of users from teams that they manage); this permission
   * may be refreshed on an existing session by calling refresh
   * if provided, `name` will be used as this session's name
   * throws 410 if either of the proof-of-work challenges is expired
   * throws 401 if either of the proof-of-work challenges is invalid
   * throws 403 if the (email + password) combo does not match a valid user
   * throws 402 if the password matches the one on record, but the user
   * account is no longer active (because they no longer belong to any team
   * with an active subscription)
   * returns a token on success
   */
  const login = useCallback(async (email, password, returnUrl = '/') => {
    setLoggingIn(true);

    const c = (await challenge()) || CHALLENGE;
    if (!c) {
      return;
    }

    const response = await postJson(
      `/api/v0/account/login/`,
      { email: powSign(c, email), password: powSign(c, password) }
    )

    if (response && response.token) {
      localStorage.setItem('token', response.token);
      await fetchUser();
      router.push(returnUrl)
    }

    setLoggingIn(false);
  }, [router]);

  /**
   * invalidates the token used to authenticate this request
   */
  const logout = useCallback(async (returnUrl = '/') => {
    // TODO: uncomment once backend is implemented
    // await postJson(`/api/v0/account/logout`, {})
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  /**
   * returns the metadata of the currently signed in user, e.g. whoami
   */
  const fetchUser = async () => {
    // TODO: Update to /account/ on the endpoint is ready
    const res = await requestJson(`${process.env.TEST_API_URL}/admin/categories/`)
    if (res) {
      setUser({
        email: 'test',
        isAdmin: true
      });
      return true;
    } else {
      return false;
    }
  }

  /**
   * signs and returns value by padding it with 4 random bytes until the first
   * dword of sha256(challenge + candidate + value) is smaller than or equal to
   * the first dword of challenge (returned by server), returning the
   * concatenated string; while the candidate number is in native endianess, the
   * difficulty and sha256 hash are interpreted in network order (big endian)
   * both challenge and the result are 7 bit safe (using native browser base64)
   * this operation is somewhat time-sensitive as the challenge also includes an
   * expiration timestamp (and a hmac), though the limits are large enough to
   * only prevent rainbow tables and are thus mostly not a client-side concern
   */
  async function powSign(challenge, value) {
    // input checks; first one can be removed if using typescript
    if(typeof challenge != 'string' || typeof value != 'string')
        throw new TypeError('challenge and value must be strings')
    if(challenge.length < 32 || challenge.length % 4)
        throw new RangeError('invalid challenge')

    // convert prefix (base64) and suffix (utf8) to bytes
    let prefix = Uint8Array.from(atob(challenge), c => c.charCodeAt(0))
    let suffix = new TextEncoder().encode(value)

    // payload = prefix + wildcard + suffix
    let payload = new Uint8Array(prefix.length + 4 + suffix.length)
    payload.set(prefix, 0)
    payload.set(suffix, prefix.length + 4)

    // busy loop
    let difficulty = new DataView(payload.buffer).getUint32(0)
    let candidate = new Uint32Array(payload.buffer, prefix.length, 1)
    while(difficulty < new DataView(await crypto.subtle.digest('SHA-256', payload)).getUint32(0))
        candidate[0]++

    // payload is usually packed into a json, so base64 it
    return btoa(String.fromCharCode(...payload))
  }

  /**
   * sends a password recovery email to the pow-signed value passed as
   * `email` if there's a user account with that email in our database
   * thrwos 410 if the proof of work challenge expired
   * throws 401 if the proof of work signature is invalid
   * throws 400 if the the passed string does not look like an email address
   * otherwise returns 202, regardless of whether an email was sent or not
   */
  async function forgotPassword(email) {
    const challenge = await challenge();
    return await postJson(`/api/v0/account/forgot/`, { email: powSigned(challenge, email) });
  }

  /**
   * uses the recovery 'code' to set the password of its bound user account to `password`
   * if provided, `name` will be used as the name of the new session
   * throws 410 if the recovery code expired
   * throws 401 if the recovery code is invalid
   * throws 400 if no password is provided or the provided password is too simple
   * on success, invalidates all previously issued tokens and returns a new
   * token that must be used in subsequent requests
   */
  async function resetPassword(code, password) {
    return await postJson(`/api/v0/account/reset/`, { code, password });
  }

  /**
   * updates the metadata of the currently signed user
   * currently, this endpoint only allows updating the user's name as the
   * email and phone number are considered authoritative in salesforce
   */
  async function updateUser(data) {
    await postData(`/api/v0/account/`, data);
  }

  /**
   * extends the lifetime of the current session if the pow-signed
   * `password` is correct; returns a new token (the old token can still be
   * used and will be authoritative, though its hmac will expire sooner than
   * the session if not set to the new value)
   * throws 400 if no signed password is provided
   * throws 410 if the proof of work signature expired
   * throws 401 if the proof of work signature is invalid
   * throws 403 if the password does not match
   * returns the updated token on success
   */
  async function refresh(password) {
    const c = await challenge();
    return await postJson(`/api/v0/account/refresh/`, { password: powSign(c, password) })
  }

  /**
   * returns a list of all the sessions that the current user is logged
   * into; this operation requires a recently issued / refreshed session
   */
  async function sessions() {
    return await requestJson(`/api/v0/account/sessions/`)
  }

  /**
   * updates current user's password to `password`; this operation
   * requires a recently issued / refreshed session
   * throws 400 if no password is provided or the provided password is too simple
   * on success, invalidates all previously issued tokens and returns a new
   * token that must be used in subsequent requests
   */
  async function password() {
    return await postJson(`/api/v0/account/password/`)
  }


  return (
    <UserContext.Provider value={{
      user, setUser,
      login, logout,
      devLogin,
      loggingIn,
      fetchUser,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
