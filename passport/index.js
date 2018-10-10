const passportLocal = require('./local-strategies');

module.exports = passport => {
  // init use of JWT
  passportLocal(passport);
};
