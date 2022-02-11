export const requestBinary = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (response && response.ok) {
      const blob = await response.blob();
      if (blob) {
        return blob;
      }
    }
  } catch (err) {
    console.log(err, url, options, response);
  }
  return null;
}

export const requestJson = async (url, options = { headers: {} }) => {
  let response;
  try {
    const token = localStorage.getItem('token');
    if (token) {
      options = {
        ...options,
        headers: {
          ...(options?.headers || {}),
          Authorization: `Bearer ${token}`
        }
      }
    }
    response = await fetch(url, options);
    // console.log({ response, options, ok: response.ok })
    if (response && response.ok) {
      return await response.json();
    }
    // TODO: handle error
  } catch (err) {
    console.log(err, url, options, response);
  }
  return null;
}

export const postJson = async (url, body, options = {}) => {
  return await requestJson(url,
    {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
}

export const patchJson = async (url, body, options = {}) => {
  return await requestJson(url,
    {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
}

export const deleteRequest = async (url, body, options = {}) => {
  return await requestJson(url,
    {
      ...options,
      method: 'DELETE',
    })
}
