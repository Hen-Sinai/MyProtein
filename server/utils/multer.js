const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, __dirname);
//     },
//     filename: function(req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
  
//   const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
//   });

//   module.exports = upload