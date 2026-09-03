const mongoose = require("mongoose");

const uploadFileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String, 
      required: true,
    },
    fileType: {
      type: String, 
    },
    fileSize: {
      type: Number, 
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Uploads", uploadFileSchema);