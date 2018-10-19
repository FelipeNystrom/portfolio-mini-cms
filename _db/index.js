const pgp = require('pg-promise')();
// const dbConfig = require('./credentials');

const db = pgp(process.env.DATABASE_URL);
db.connect({ direct: true })
  .then(sco => {
    sco.client.on('notification', data => {
      console.log(data);
    });
    return sco.none('LISTEN $1~', 'users'), sco.none('LISTEN $1~', 'projects');
  })
  .catch(error => {
    console.error('Error:', error);
  });

module.exports = {
  db,
  query: (text, params) => {
    return db.query(text, params);
  },
  one: (text, params) => {
    return db.one(text, params);
  },
  oneOrNone: (text, params) => {
    return db.oneOrNone(text, params);
  },
  many: (text, params) => {
    return db.many(text, params);
  },
  manyOrNone: (text, params) => {
    return db.manyOrNone(text, params);
  }
};
