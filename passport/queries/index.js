const db = require('../../db');

const getAllProjects = () => {
  const sql = 'SELECT * FROM projects';
  return db.manyOrNone(sql);
};

const verifyUser = username => {
  const sql = 'SELECT * FROM users WHERE username = $1';
  return db.oneOrNone(sql, [username]);
};

const findUserById = id => {
  const sql = 'SELECT * FROM users WHERE id = $1';
  return db.oneOrNone(sql, [id]);
};

const createUser = (username, email, password) => {
  const sql =
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username';
  return db.one(sql, [username, email, password]);
};

const getAllProjectsFromUser = id => {
  const sql = 'SELECT * FROM projects WHERE author = $1';
  return db.manyOrNone(sql, [id]);
};

const getSpecificProjectFromUser = (projectId, authorId) => {
  const sql = 'SELECT * FROM projects WHERE id = $1 AND author = $2';
  return db.manyOrNone(sql, [projectId, authorId]);
};

const insertNewProject = (title, body, author, image, role, publicId) => {
  const sql =
    'INSERT INTO projects (title, body, author, image, role, image_public_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING title';
  return db.one(sql, [title, body, author, image, role, publicId]);
};

const deletePost = id => {
  const sql = 'DELETE FROM projects WHERE id = $1 RETURNING *';
  return db.oneOrNone(sql, [id]);
};

const getCountOfProjects = id => {
  const sql = 'SELECT FROM projects COUNT(*) WHERE id = $1';
  return db.one(sql, [id]);
};

updateProject = (title, body, author, image, role, publicId, id) => {
  const sql =
    'UPDATE projects SET title = $1, body = $2, author = $3, image = $4, role = $5, image_public_id = $6 WHERE id = $7 RETURNING *;';
  return db.one(sql, [title, body, author, image, role, publicId, id]);
};

module.exports = {
  getAllProjects,
  verifyUser,
  createUser,
  findUserById,
  getAllProjectsFromUser,
  getSpecificProjectFromUser,
  insertNewProject,
  deletePost,
  getCountOfProjects,
  updateProject
};