const passportLocal = require('./local-strategies');

module.exports = (passport, db) => {
  // init use of JWT
  passportLocal(passport);
};
