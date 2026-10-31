const multer = require("multer");

// Memory storage use kar rahe hain taaki direct Cloudinary pe bhej sakein
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;