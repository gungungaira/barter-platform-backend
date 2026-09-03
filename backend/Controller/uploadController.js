const Uploads = require("../models/uploadModel");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const myUpload = await Uploads.create({
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user?.userId, // matches the key your profile controller uses (req.user.userId)
    });
    res.status(200).json({ fileUrl: myUpload.filePath, ...myUpload.toObject() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const uploads = await Uploads.findById(id);
    if (!uploads) {
      return res.status(404).json({ message: "upload not found" });
    }
    res.status(200).json(uploads);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { uploadFile, checkUpload };