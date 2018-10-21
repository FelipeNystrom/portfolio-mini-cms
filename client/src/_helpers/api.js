let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:7000';
}

if (process.env.NODE_ENV === 'production') {
  console.log(process.env)

  baseUrl = 'https://portfolio--cms.herokuapp.com/'
}

export default baseUrl;
