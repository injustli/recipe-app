export const MIN_TIME = 0;
export const MAX_TIME = 500;

const environment = import.meta.env.VITE_NODE_ENV;
export const SERVER_URL =
  environment === 'production'
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080';
