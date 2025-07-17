const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controller/admin/category.controller');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = server => {

    router.post('/create',upload.none(), create);

    router.post('/view',view);

    router.post('/details/:id',details);

    router.put('/update/:id',update);

    router.put('/change-status',changeStatus);

    router.put('/delete',destroy);

    server.use('/api/admin/categories', router);
}
