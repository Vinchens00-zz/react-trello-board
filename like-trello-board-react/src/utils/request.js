import COMMON from '../enums/common';
const API_URL = COMMON.API_URL;

function makeRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json'
  };
  options = {...options, headers};

  return fetch(`${API_URL}/${url}`, options)
    .then(response => response.json());
}

export default makeRequest;
