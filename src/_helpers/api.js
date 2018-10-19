let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:7000';
}

if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.IP;
}

export default baseUrl;
