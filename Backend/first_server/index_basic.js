const http = require('http');
const { categories, products } = require('./data');

// http.createServer((request, response) => {
//     response.end('Server is working fine !');
// }).listen(5000, () => {
//     console.log('Server is working fine !');
// });

var server = http.createServer((request, response) => {

    if(request.url == '/'){
        response.end('<h1>Server is working fine !</h1>');
    } else if(request.url == '/api/view-categories' && request.method == 'GET'){
        
        if(categories.length > 0){
            const output = {
                _status : true, // true or false
                _message : "Message Goes Here",
                _data : categories
            }

            response.end(JSON.stringify(output));
        } else {
            const output = {
                _status : false, // true or false
                _message : "No Record Found",
                _data : categories
            }

            response.end(JSON.stringify(output));
        }
        
    } else if(request.url == '/api/view-products' && request.method == 'GET'){
        if(products.length > 0){
            const output = {
                _status : true, // true or false
                _message : "Message Goes Here",
                _data : products
            }

            response.end(JSON.stringify(output));
        } else {
            const output = {
                _status : false, // true or false
                _message : "No Record Found",
                _data : products
            }

            response.end(JSON.stringify(output));
        }
    } else if(request.url == '/api/view-colors' && request.method == 'GET'){


    } else {
        response.end('Page not found');
    }


    
});

server.listen(5000, () => {
    console.log('Server is working fine !');
});