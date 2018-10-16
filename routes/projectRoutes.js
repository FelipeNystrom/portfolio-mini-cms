const Router = require('express-promise-router');
const router = new Router();
const passport = require('passport');
const checkToken = passport.authenticate('jwt', { session: false });
const { handleFormData, deleteImg, uploadImg } = require('../imageStorage');
const { tempStorageTruncate } = require('../_helpers');
const {
  getAllProjectsFromUser,
  insertNewProject,
  getSpecificProjectFromUser,
  deletePost,
  updateProject,
  findUserById
} = require('../db/queries');

module.exports = router;

// admin
router.post('/', checkToken, async (req, res) => {
  getAllProjectsFromUser(req.user.id).then(result => {
    res.send({
      name: req.user.username,
      userId: req.user.id,
      posts: result
    });
  });
});

router.get('/profile', checkToken, async (req, res) => {
  const user = findUserById(req.user.id);
  res.send({ user: user });
});

router.post(
  '/profile',
  checkToken,
  handleFormData.single('image'),
  async (req, res) => {
    const { id } = req.user;
    tempStorageTruncate();
  }
);

router.get('/projects', checkToken, async (req, res) => {
  getAllProjectsFromUser(req.user.id).then(result => {
    console.log(result);
    res.send({
      posts: result
    });
  });
});

router.post(
  '/project/new',
  checkToken,
  handleFormData.single('image'),
  async (req, res) => {
    const cloudinaryResult = await uploadImg(req.file.path);
    const img = await cloudinaryResult.secure_url;
    const publicId = await cloudinaryResult.public_id;
    const { title, text, role } = req.body;
    const author = req.user.id;

    insertNewProject(title, text, author, img, role, publicId)
      .then(result => {
        if (result) {
          res.json({
            id: req.user.id,
            message: `A post with the title ${
              result.title
            } is saved to the database`
          });
        } else throw error;
      })
      .catch(err => {
        res.error('Error: ' + err);
      });
    tempStorageTruncate();
  }
);

router.get('/project/update/:id', checkToken, async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  getSpecificProjectFromUser(projectId, userId)
    .then(project => {
      if (project.length === 0) {
        res.status(204);
        res.json({
          message: "Sorry! We couldn't find the project you were looking for "
        });
      }
      res.send(project[0]);
    })
    .catch(err => console.error('error: ' + err));
});

router.put(
  '/project/update/:id',
  checkToken,
  handleFormData.single('image'),
  async (req, res) => {
    const { title, text, role, oldImgPublicId, keepLink } = req.body;
    const { id } = req.params;
    console.log(req.body);
    console.log(id);

    // Prepare variables to update db with
    let img;
    let publicId;

    /* 
      If file is changed delete old one and upload new image. Otherwise
      keep old link and public id
    */

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
    const author = req.user.id;
    const projectUpdate = await updateProject(
      title,
      text,
      author,
      img,
      role,
      publicId,
      id
    );
    console.log('updated post ', projectUpdate);
    res.status(200);
    res.send({
      message: 'Post updated successfully!'
    });
  }
);

router.delete(
  '/project/delete/:id',
  checkToken,
  handleFormData.single('image'),
  async (req, res) => {
    const { publicId } = req.body;
    const { id } = req.params;

    const resultFromImgStore = await deleteImg(publicId);
    const resultFromDB = await deletePost(id);

    if (resultFromImgStore.result === 'ok') {
      console.log('is deleted');
      console.log(resultFromDB);
      res.send({ id: req.user.id });
    }
  }
);
