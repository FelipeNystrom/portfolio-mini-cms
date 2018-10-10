const Router = require('express-promise-router');
const router = new Router();
const passport = require('passport');
const requireSignIn = passport.authenticate('local', { session: false });
const authenticate = require('../passport/authentication');
const { getAllProjects } = require('../db/queries');

module.exports = router;

router.get('/', async (req, res) => {
  const projects = await getAllProjects();
  res.status(200);
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
router.post('/register', authenticate.signup);
// login user
router.post('/login', requireSignIn, authenticate.signin);

router.get('/logout', (req, res) => {});
