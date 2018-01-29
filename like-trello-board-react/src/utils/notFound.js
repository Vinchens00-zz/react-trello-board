import COMMON from '../enums/common';

export default function (err) {
  if (err.status === 404) {
    location.replace(COMMON.NOT_FOUND_URL);
  } else {
    throw err;
  }
}

