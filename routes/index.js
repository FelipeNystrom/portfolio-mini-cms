const rootRoutes = require('./rootRoutes');
const projectRoutes = require('./projectRoutes');
const profileRoutes = require('./profileRoutes');

module.exports = app => {
  app.use('/', rootRoutes);
  app.use('/admin', projectRoutes);
  app.use('/profile', profileRoutes);
};
