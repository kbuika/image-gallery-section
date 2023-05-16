const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            // upload only png and jpg format
            return cb(new Error('Only image files are allowed!'), false);
        }
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
