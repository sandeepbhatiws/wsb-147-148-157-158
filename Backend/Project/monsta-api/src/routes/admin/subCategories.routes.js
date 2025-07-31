const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controller/admin/subCategory.controller');
const router = express.Router();
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/categories' })
const path  = require('path')

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/categories')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

            var extension = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const upload = multer({ storage: storage })

    var singleImage = upload.single('image');

    router.post('/create',singleImage, create);

    router.post('/view',upload.none(),view);

    router.post('/details/:id',upload.none(),details);

    router.put('/update/:id',singleImage,update);

    router.put('/change-status',upload.none(),changeStatus);

    router.put('/delete',upload.none(),destroy);

    server.use('/api/admin/sub-categories', router);
}
