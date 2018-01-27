const API_URL = 'http://localhost:3000/api';

function makeRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json'
  };
  options = {...options, headers};

  return fetch(`${API_URL}/${url}`, options)
    .then(response => response.json());
}

export default makeRequest;
