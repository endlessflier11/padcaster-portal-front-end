import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { requestJson } from '../../utils/network';
import { UserContext } from '../../contexts/UserContext';

export default function AuthGuard({ children, publicPaths }) {
  const router = useRouter();
  const { user, logout, fetchUser } = useContext(UserContext);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(location.pathname);

    // // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      // router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * We check for a token and validate on the first load of the page.
   * On route changes we check or a token but don't validate.
   * @param {*} url
   * @returns
   */
  async function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];
    const returnUrl = location.pathname !== '/auth/login' ? location.pathname : '/';
    // console.log({ url, path, returnUrl, asPath: router.asPath, pathname: location.pathname });

    if (publicPaths.includes(path)) {
      return;
    }

    // If user is in context, then it must have been fetched from the server
    if (user) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token && !publicPaths.includes(path)) {
      // console.log('There is no token and this path is not public. Redirecting to login page');
      router.push({
        pathname: '/auth/login',
        query: { returnUrl }
      });
      return;
    }

    // console.log('Fetch user using token');
    const userFound = await fetchUser();
    if (userFound) {
      if (location.pathname === '/auth/login') {
        router.push(returnUrl);
      }
    } else {
      logout();
    }
  }

  // console.log({ path: router.asPath, user })

  return ((publicPaths.includes(router.pathname) || !!user) && children);
}