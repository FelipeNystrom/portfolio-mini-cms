export const sendToServer = (url, methodType, formData = null) => {
  return fetch(url, {
    method: methodType,
    headers: {
      authorization: localStorage.getItem('token')
    },
    body: formData
  })
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};
