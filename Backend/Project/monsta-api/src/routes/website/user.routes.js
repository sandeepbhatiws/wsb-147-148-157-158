const express = require('express');
const { register, login, viewProfile, updateProfile, changePassword, forgotPassword, resetPassword } = require('../../controller/website/user.controller');
const router = express.Router();
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/users' })
const path  = require('path');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/users')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

            var extension = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const upload = multer({ storage: storage })

    var singleImage = upload.single('image');

    router.post('/register',upload.none(),register);

    router.post('/login',upload.none(),login);

    router.post('/view-profile',upload.none(),viewProfile);

    router.post('/update-profile',singleImage,updateProfile);

    router.post('/change-password',upload.none(),changePassword);

    router.post('/forgot-password',upload.none(),forgotPassword);

    router.post('/reset-password',upload.none(),resetPassword);

    server.use('/api/website/users', router);
}
