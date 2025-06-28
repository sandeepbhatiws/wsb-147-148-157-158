const express = require('express');
const dbConnection = require('./database/database.js');

// Make Executable Function
const server = express();

server.get('/', (request, response) => {
    response.send('Server is working');
});

server.get('/add-color', async(request, response) => {

    const db = await dbConnection();

    db.collection('colors').insertOne({
        name : request.query.name,
        color_code : request.query.code
    }).then((result) => {
        const output = {
            _status : true,
            _message : 'Record inserted !',
            _data : result
        }

        response.send(output);
    }).catch(() => {
        const output = {
            _status : false,
            _message : 'Something went wrong !',
            _data : null
        }

        response.send(output);
    })

});

server.get('/view-color', async(request, response) => {

    const db = await dbConnection();

    if(request.query.name){
        var filter = {
            name : request.query.name
        }
    } else {
        var filter = {};
    }

    db.collection('colors').find(filter).toArray()
    .then((result) => {

        if(result.length > 0){
            const output = {
                _status : true,
                _message : 'Record found !',
                _data : result
            }

            response.send(output);
        } else {
            const output = {
                _status : false,
                _message : 'No Record found !',
                _data : result
            }

            response.send(output);
        }

        
    }).catch(() => {
        const output = {
            _status : false,
            _message : 'Something went wrong !',
            _data : null
        }

        response.send(output);
    })

});




server.listen(7001, () => {
    console.log('Server is working');
});