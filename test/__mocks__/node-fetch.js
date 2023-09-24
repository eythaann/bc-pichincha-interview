
// __mocks__/node-fetch.js
const nodeFetch = jest.fn();

export default nodeFetch;

nodeFetch.mockImplementation((url) => {
  if (url.endsWith('/success')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: 'success' }),
    });
  }
  if (url.endsWith('/error')) {
    return Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'error' }),
    });
  }
  return Promise.reject(new Error('fetch error'));
});