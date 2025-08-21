const express = require('express');
const { view } = require('../../controller/admin/dashboard.controller');
const router = express.Router();
const multer  = require('multer')
const uploads = multer({ dest: 'uploads/' })

module.exports = server => {

    router.get('/',uploads.none(),view);

    server.use('/api/admin/dashboard', router);
}
