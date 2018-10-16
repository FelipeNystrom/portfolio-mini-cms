const fs = require('fs');
const path = require('path');
const pathToTempDir = path.resolve(__dirname, '../', '_tmp-media-storage');

const tempStorageTruncate = () => {
  return fs.readdir(pathToTempDir, (err, files) => {
    files.forEach(img => {
      fs.unlink(path.join(pathToTempDir, img), err => {
        if (err) throw err;
      });
    });
    if (err) throw err;
  });
};
module.exports = {
  tempStorageTruncate
};
