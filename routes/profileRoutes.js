const Router = require('express-promise-router');
const router = new Router();
const passport = require('passport');
const checkToken = passport.authenticate('jwt', { session: false });
const { handleFormData, deleteImg, uploadImg } = require('../imageStorage');
const { tempStorageTruncate } = require('../_helpers');
const { findUserById } = require('../db/queries');

module.exports = router;

router.get('/', checkToken, async (req, res) => {
  const user = findUserById(req.user.id);
  res.send({ user: user });
});

router.post(
  '/',
  checkToken,
  handleFormData.single('image'),
  async (req, res) => {
    const { id } = req.user;
    tempStorageTruncate();
  }
);
