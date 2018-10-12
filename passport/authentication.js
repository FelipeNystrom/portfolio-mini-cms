const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../_vars');
const { uploadImg } = require('../imageStorage');
const {
  createUser,
  verifyUser,
  getAllProjectsFromUser,
  isThereAUSer
} = require('../db/queries');

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

const signup = async (req, res, next) => {
  const isThereAUser = await userExist();
  if (isThereAUser !== null) {
    res.sendStatus(401);
  } else {
    const cloudinaryResult = await uploadImg(req.file.path);
    const profilePic = await cloudinaryResult.secure_url;

    const { username, email, password, firstname, lastname } = req.body;
    const saltRounds = 12;
    if (
      !username ||
      !password ||
      !email ||
      !firstname ||
      !lastname ||
      !profilePic
    ) {
      res.status(422).send({
        error:
          'You must provide an email, username, firstname, lastname, password and a profile picture.'
      });
    }
    verifyUser(username).then(result => {
      if (result === null) {
        // see if a user with the given email exists.
        bcrypt
          .hash(password, saltRounds)
          .then(hash => {
            return createUser(
              username,
              firstname,
              lastname,
              email,
              hash,
              profilePic
            )
              .then(newUser => {
                console.log(newUser);
                res.send({
                  token: tokenForUser(newUser),
                  user: newUser
                });
              })
              .catch(err => {
                console.log(err);
                res
                  .status(400)
                  .send({ message: 'Error saving user to database.' });
              });
          })
          .catch(err => {
            console.log(err);
            return next(err);
          });
      } else {
        res.status(403).send({ message: 'user already exists' });
      }
    });
  }
};

module.exports = { signup, signin };
