export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

function get(url: string) {
  return fetch(url, { method: 'GET' }).then(handleResponse);
}

function post(url:string, body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url:string, body:any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url:string) {
  return fetch(url, { method: 'DELETE' }).then(handleResponse);
}

// helper functions

function handleResponse(response: any) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}


export type RouteParam = { params: { [key: string]: string }}
export type RouteParams = { params: { [key: string]: string[] }}