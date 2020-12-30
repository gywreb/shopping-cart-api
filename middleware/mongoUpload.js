const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: process.env.MONGO_BUCKET,
        };
        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/))
    return callback(
      new Error(`Do not support ${path.extname(file.originalname)}`),
      false
    );
  callback(null, true);
};

const mongoUpload = multer({ storage, fileFilter });

module.exports = mongoUpload;
