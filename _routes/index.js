const rootRoutes = require('./rootRoutes');
const projectRoutes = require('./projectRoutes');
const profileRoutes = require('./profileRoutes');

module.exports = app => {
  app.use('/api', rootRoutes);
  app.use('/api/admin', projectRoutes);
  app.use('/api/profile', profileRoutes);
};
