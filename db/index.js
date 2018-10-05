const connect = require('pg-promise')();
const dbConfig = require('./credentials');

const db = connect(dbConfig);

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
