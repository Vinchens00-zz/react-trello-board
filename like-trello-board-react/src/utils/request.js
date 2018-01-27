function makeRequest(url, options = {}) {
  return fetch(`http://localhost:3000/api/${url}`, options)
    .then(response => response.json());
}

export default makeRequest;
