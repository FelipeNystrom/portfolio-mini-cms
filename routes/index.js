const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

module.exports = app => {
  app.use('/', userRoutes);
  app.use('/admin', projectRoutes);
};
