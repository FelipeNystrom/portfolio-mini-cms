const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../_vars');
const { createUser, verifyUser, getAllProjectsFromUser } = require('./queries');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.JWTsecret);
};

const signin = (req, res) => {
  getAllProjectsFromUser(req.user.id).then(result => {
    res.status(200);
    res.send({
      name: req.user.username,
      userId: req.user.id,
      posts: result,
      token: tokenForUser(req.user)
    });
  });
};

const signup = (req, res, next) => {
  const { username, email, password } = req.body;
  const saltRounds = 12;

  if (!username || !password || !email) {
    res
      .status(422)
      .send({ error: 'You must provide an email, a username and a password.' });
  }
  verifyUser(username).then(result => {
    if (result === null) {
      // see if a user with the given email exists.
      bcrypt
        .hash(password, saltRounds)
        .then(hash => {
          return createUser(username, email, hash)
            .then(newUser =>
              res.json({ token: tokenForUser(newUser), user: newUser.username })
            )
            .catch(err => {
              res.error({ message: 'Error saving user to database.' });
            });
        })
        .catch(err => {
          return next(err);
        });
    } else {
      res.json({ error: 'user already exists' });
    }
  });
};

module.exports = { signup, signin };
