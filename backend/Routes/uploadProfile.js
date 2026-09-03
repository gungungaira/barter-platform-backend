// const express=require('express')
// const router=express.Router();
// const {uploadFile,checkUpload}=require('../Controller/uploadController');
// const authUploadMatchMiddleware=require('../Middleware/uploadMiddleware')
// router.post('/uploadFile',authUploadMatchMiddleware,uploadFile)
// router.get('/checkUpload',authUploadMatchMiddleware,checkUpload)

// module.exports=router


const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFile, checkUpload } = require("../Controller/uploadController");
const authUploadMatchMiddleware = require("../Middleware/uploadMiddleware");

// configure where/how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // make sure this folder exists
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  "/uploadFile",
  authUploadMatchMiddleware,
  upload.single("myFile"), // <-- must match formData.append("myFile", ...) on the frontend
  uploadFile
);

router.get("/checkUpload/:id", authUploadMatchMiddleware, checkUpload);

module.exports = router;