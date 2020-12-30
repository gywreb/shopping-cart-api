const express = require("express");
const { ConnectMongo } = require("../database/dbConnect");
const mongoUpload = require("../middleware/mongoUpload");
const router = express.Router();
const { ErrorResponse } = require("../model/ErrorResponse");
const { SuccessResponse } = require("../model/SuccessResponse");

// router.post("/", upload.single("avatar"), (req, res, next) => {
//   if (!req.file) return next(new ErrorResponse(500, "no file"));
//   res.json(new SuccessResponse(200, req.file.filename));
// });

// router.post("/files", upload.array("avatar", 10), (req, res, next) => {
//   if (!req.files) return next(new ErrorResponse(500, "no file"));
//   const arr = req.files.map((file) => file.filename);
//   res.json(new SuccessResponse(200, arr.toString()));
// });

router.post("/", mongoUpload.single("avatar"), (req, res, next) => {
  res.json(new SuccessResponse(200, req.file.filename));
});

router.get("/:filename", (req, res, next) => {
  const { filename } = req.params;
  const file = ConnectMongo.gfs.find({ filename }).toArray((err, files) => {
    if (!files || !files.length)
      return next(new ErrorResponse(404, "file is not found"));
    ConnectMongo.gfs.openDownloadStreamByName(filename).pipe(res);
  });
});

module.exports = router;
