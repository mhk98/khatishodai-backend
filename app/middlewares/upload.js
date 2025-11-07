const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media"); // Set destination folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Generate unique file name
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Supported formats: jpeg, jpg, png, gif, webp"
      )
    );
  }
};

// Configure upload for single and multiple file uploads
const uploadProfileImage = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).single("image");
const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).single("default_image");

const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit per file
  fileFilter: fileFilter,
}).array("gallery_images", 10); // Allow up to 10 files

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB per file
  fileFilter: fileFilter,
});

const doubleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image", maxCount: 1 },
  { name: "image1", maxCount: 1 },
]);

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadProfileImage,
  upload,
  doubleUpload,
};
