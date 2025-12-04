const multer = require("multer");

module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Định nghĩa thư mục lưu trữ file
            cb(null, "./public/uploads/"); 
        },
        
        filename: function (req, file, cb) {
            // Định nghĩa tên file sau khi lưu: timestamp-tenfilegoc
            const uniqueSuffix = Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
    });

    return storage;
};