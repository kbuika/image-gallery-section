const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        const fileType = file.originalname.split('.')[1];
        cb(
            null,
            `${Math.floor(
                100000 + Math.random() * 900000
            ).toString()}.${fileType}`
        );
    },
})
const uploadImages = multer({ storage: storage })

module.exports = { uploadImages }
