const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Executable Function
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());
server.use(cors());

server.get('/', (request, response) => {
    response.send('Server is working fine !');
});

// Admin API URls
require('./src/routes/admin/color.routes.js')(server);

//Website API URLS


server.listen(8001, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/wsb_offilne')
    .then(() => console.log('Connected!'))
    .catch((error) => {
        console.log(error);
    });
});