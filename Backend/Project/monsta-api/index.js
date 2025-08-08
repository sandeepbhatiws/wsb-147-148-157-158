const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

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

server.use('/uploads/categories', express.static('uploads/categories'));
server.use('/uploads/products', express.static('uploads/products'));


// Admin API URls
require('./src/routes/admin/color.routes.js')(server);
require('./src/routes/admin/categories.routes.js')(server);
require('./src/routes/admin/subCategories.routes.js')(server);
require('./src/routes/admin/products.routes.js')(server);

//Website API URLS
require('./src/routes/website/user.routes.js')(server);


server.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected!'))
    .catch((error) => {
        console.log(error);
    });
});