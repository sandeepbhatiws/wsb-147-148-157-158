const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controller/admin/product.controller');
const router = express.Router();
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/products' })
const path  = require('path')

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

            var extension = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const upload = multer({ storage: storage })

    const uploadMiddleware = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    router.post('/create',uploadMiddleware, create);

    router.post('/view',upload.none(),view);

    router.post('/details/:id',upload.none(),details);

    router.put('/update/:id',uploadMiddleware,update);

    router.put('/change-status',upload.none(),changeStatus);

    router.put('/delete',upload.none(),destroy);

    server.use('/api/admin/products', router);
}
