const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const limits = 2e6;

const fileFilter = (req, file, cb) => {
    const pattern = /jpg|png|webp|jpeg|gif/i;
    const ext = path.extname(file.originalname);
    
    if (!pattern.test(ext)) {
        req.fileValidationError = "Invalid file type";
        return cb(null, false, req.fileValidationError)
    } 
    cb(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter
})

module.exports = upload;