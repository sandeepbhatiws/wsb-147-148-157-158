const color = require('../../models/color.js');


exports.create = async(request, response) => {
   
    // var data = {
    //     name : request.body.color_name,
    //     code : request.body.color_code
    // }

    var data = new color(request.body);
    await data.save()
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Record Inserted !!',
            _data : result
        }

        response.send(output);
    })
    .catch((error) => {

        var errorMessages = [];

        for (index in error.errors){
            errorMessages.push(error.errors[index].message);
        }

        const output = {
            _status : false,
            _message : 'Something Went Wrong !!',
            _data : errorMessages
        }

        response.send(output);
    });


}

exports.view = async(request, response) => {
   
    await color.find()
    .then((result) => {

        if(result.length > 0){
            const output = {
                _status : true,
                _message : 'Record Fetch !!',
                _data : result
            }

            response.send(output);
        } else {
            const output = {
                _status : false,
                _message : 'No Record Found !!',
                _data : result
            }

            response.send(output);
        }
        
    })
    .catch((error) => {
        const output = {
            _status : false,
            _message : 'Something Went Wrong !!',
            _data : error
        }

        response.send(output);
    });
}

exports.details = async(request, response) => {
   
}

exports.update = async(request, response) => {
   
}

exports.changeStatus = async(request, response) => {
   
}

exports.destroy = async(request, response) => {
   
}
