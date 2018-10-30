const express = require('express');
const db = require('./_db');
const mountRoutes = require('./_routes');
const path = require('path');
const server = express();
const passport = require('passport');
const cors = require('cors');
const _port = process.env.PORT || 7000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(passport.initialize());
server.use(cors());
require('./_passport')(passport);

// use mounted routes
mountRoutes(server);

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, 'client/build')));
  // Anything that doesn't match the above, send back index.html
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

server.listen(_port, () => {
  console.log(`server running at port: ${_port}`);
});

server.on('close', () => {
  console.log('server connection closed');
  db.pool.end(() => {
    console.log('database connection closed');
  });
});
