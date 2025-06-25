const express = require('express');
const { categories } = require('./data');
const server = express(); // To make Exucatable Function

server.get('/', (request, response) => {
    response.send('Server is working Fine !');
});

server.put('/api/view-categories', (request, response) => {

    if(categories.length > 0){
        const output = {
            _status : true,
            _message : 'Record found suuccussfully !',
            _data : categories
        }

        response.send(output);
    } else {
        const output = {
            _status : false,
            _message : 'No Record found !',
            _data : categories
        }

        response.send(output);
    }
});

server.get('/api/view-products', (request, response) => {

    if(categories.length > 0){
        const output = {
            _status : true,
            _message : 'Record found suuccussfully !',
            _data : categories
        }

        response.send(output);
    } else {
        const output = {
            _status : false,
            _message : 'No Record found !',
            _data : categories
        }

        response.send(output);
    }
});


server.listen(5000, () => {
    console.log('Server is working Fine !');
});