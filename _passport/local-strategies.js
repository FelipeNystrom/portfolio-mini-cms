const LocalStrategy = require('passport-local').Strategy;
const { verifyUser, findUserById } = require('../_db/queries');
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../_vars');

module.exports = passport => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      return verifyUser(username).then(validUser => {
        bcrypt
          .compare(password, validUser.password)
          .then(validPassword => {
            if (validPassword) {
              return done(null, validUser);
            }
            return done(null, false);
          })
          .catch(err => done(err, false));
      });
    })
  );

  // setup options for JWT strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWTsecret
  };

  // create jwt Strategy

  passport.use(
    new JwtStrategy(jwtOptions, (payload, done) => {
      return findUserById(payload.sub)
        .then(foundUser => {
          if (foundUser) {
            return done(null, foundUser);
          }
          return done(null, false);
        })
        .catch(err => done(err, false));
    })
  );
};
