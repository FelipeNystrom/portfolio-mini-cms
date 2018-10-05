const cloudinary = require('cloudinary');
const configObj = require('./config');

cloudinary.config(configObj);

module.exports = {
  uploadImg: imgPath => {
    return cloudinary.v2.uploader.upload(
      imgPath,
      { folder: 'portfolio-aida', use_filename: true },
      (error, result) => (result, error)
    );
  },
  deleteImg: publicId => {
    return cloudinary.v2.uploader.destroy(
      publicId,
      (error, result) => (result, error)
    );
  }
};
