import COMMON from '../enums/common';
const API_URL = COMMON.API_URL;

function makeRequest(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json'
  };
  options = {...options, headers};

  return fetch(`${API_URL}/${url}`, options)
    .then(response => {
      if (response.status === 404) {
        throw { status: 404 }
      }

      return response.json();
    });
}

export default makeRequest;
