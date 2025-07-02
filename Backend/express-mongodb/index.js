const express = require('express');
const mongodb = require('mongodb');
const dbConnection = require('./database/database.js');

// Make Executable Function
const server = express();

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

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

server.post('/add-color', async(request, response) => {

    const db = await dbConnection();

    db.collection('colors').insertOne({
        name : request.body.name,
        color_code : request.body.code
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

server.post('/view-color', async(request, response) => {

    const db = await dbConnection();

    if(request.body.name){
        var filter = {
            name : request.body.name
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

server.put('/update-color/:id', async(request, response) => {

    const db = await dbConnection();

    db.collection('colors').updateOne({
        _id :  new mongodb.ObjectId(request.params.id)
    }, {
       $set : {
            name : request.body.name,
            color_code : request.body.code
       } 
    })
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Record updated !',
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

server.post('/delete-color', async(request, response) => {

    const db = await dbConnection();

    db.collection('colors').deleteOne({
        _id : new mongodb.ObjectId(request.body.id)
    })
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Record deleted !',
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


server.listen(7001, () => {
    console.log('Server is working');
});