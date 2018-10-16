const Router = require('express-promise-router');
const router = new Router();
const passport = require('passport');
const checkToken = passport.authenticate('jwt', { session: false });
const { handleFormData, deleteImg, uploadImg } = require('../imageStorage');
const { tempStorageTruncate } = require('../_helpers');
const { findUserById, updateUser } = require('../db/queries');

module.exports = router;

router.get('/', checkToken, async (req, res) => {
  const user = findUserById(req.user.id);
  res.send({ user: user });
});

router.post(
  '/update',
  checkToken,
  handleFormData.single('image'),
  async (req, res) => {
    const { id } = req.user;
    const {
      username,
      email,
      firstname,
      lastname,
      profilePic,
      aboutMe,
      oldImgPublicId
    } = req.body;

    if (req.file) {
      const removeOldImg = await deleteImg(oldImgPublicId);
      if (removeOldImg.result === 'ok') {
        const cloudinaryResult = await uploadImg(req.file.path);
        img = await cloudinaryResult.secure_url;
        publicId = await cloudinaryResult.public_id;
      } else {
        img = keepLink;
        publicId = oldImgPublicId;
      }
    } else {
      img = keepLink;
      publicId = oldImgPublicId;
    }

    updateUser(
      id,
      username,
      email,
      hash,
      firstname,
      lastname,
      profilePic,
      aboutMe,
      publicId
    );

    tempStorageTruncate();
  }
);
