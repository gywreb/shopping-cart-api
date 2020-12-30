const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/))
    // callback(error, true || false => save ?)
    return callback(
      new Error(`Do not support ${path.extname(file.originalname)}`),
      false
    );
  callback(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../uploads`));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

exports.upload = multer({ storage, fileFilter });
