let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:7000/api';
}

export default baseUrl;
