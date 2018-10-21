let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:7000';
}

export default baseUrl;
