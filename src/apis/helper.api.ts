import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let err: string;
    switch (error.response.status) {
      case 404:
        err = 'No result found.';
        break;
      case 429:
        err = 'Too many requests at a time. Please try again later.';
        break;
      default:
        err = 'Server Error';
        break;
    }
    return Promise.reject(err);
  },
);

export const fetchHelper = async (url: string) => {
  const res = await axios.get(url);
  return res;
};
