const Router = require('express-promise-router');
const router = new Router();
const passport = require('passport');
const requireSignIn = passport.authenticate('local', { session: false });
const authenticate = require('../_passport/authentication');
const { getAllProjects, userExist } = require('../_db/queries');
const { handleFormData } = require('../_imageStorage');

module.exports = router;

router.get('/', async (req, res) => {
  const isThereAUser = await userExist();
  if (isThereAUser === null) {
    res.sendStatus(204);
  } else {
    res.send(isThereAUser);
  }
});

router.get('/getAll', async (req, res) => {
  const projects = await getAllProjects();
  if (projects.length > 0) {
    res.send({
      message: `fetched ${projects.length} projects`,
      projects: projects
    });
  } else {
    res.send({
      message: "sorry we couldn't find any projects. Please create one!",
      projects: projects
    });
  }
});
// register new user
router.post('/register', handleFormData.single('image'), authenticate.signup);

router.get('/register', async (req, res) => {
  const isThereAUser = await userExist();
  if (isThereAUser !== null) {
    res.sendStatus(401);
  } else {
    res.sendStatus(200);
  }
});
// login user
router.post('/login', requireSignIn, authenticate.signin);

router.get('/logout', (req, res) => {});
