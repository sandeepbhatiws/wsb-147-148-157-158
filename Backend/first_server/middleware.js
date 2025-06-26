var key = 123456789;

var validation = ((request, response, next) => {
    if(!request.query.apikey){
        const result = {
            _status : false,
            _message : 'Please insert apikey',
            _data : null
        }
        response.send(result);
    } else if(request.query.apikey != key){
        const result = {
            _status : false,
            _message : 'Invalid apikey',
            _data : null
        }
        response.send(result);
    } else {
        next();
    }
})

module.exports = validation;

// module.exports = { validation, validation1 }