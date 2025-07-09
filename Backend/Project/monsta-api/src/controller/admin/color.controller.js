const color = require('../../models/color.js');

exports.create = async(request, response) => {

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
    
    var condition = {
        deleted_at : null
    }

    if(request.body.name){
        condition.name = request.body.name;
    }

    console.log(condition);

    var limit = request.body.limit ? request.body.limit : 5;
    var page = request.body.page ? request.body.page : 1;
    var skip = (page - 1) * limit;

    // console.log(request.body.limit);

    // if(request.body.limit != '' && request.body.limit != undefined){
    //     limit = request.body.limit;
    // }

    var totalRecords = await color.find(condition).countDocuments();

    await color.find(condition).sort({
        order : 'asc'
    })
    .sort({
        _id : 'desc'
    })
    .limit(limit).skip(skip)
    .then((result) => {

        if(result.length > 0){
            const output = {
                _status : true,
                _message : 'Record Fetch !!',
                _paggination : {
                    total_records : totalRecords,
                    current_page : page,
                    total_pages : Math.ceil(totalRecords / limit)
                },
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
//    await color.findOne({
//     _id : request.params.id
//    })

    await color.findById(request.params.id)
    .then((result) => {
        if(result){
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

exports.update = async(request, response) => {
    
    // const checkColor = await color.findOne({
    //     name : request.body.name
    // })

    await color.updateOne({
        _id : request.params.id
    }, {
        $set : request.body
    })
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Record Updated !!',
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

exports.changeStatus = async(request, response) => {
   
}

exports.destroy = async(request, response) => {
    await color.updateMany({
        _id : request.body.id
    }, {
        $set : {
            deleted_at : Date.now()
        }
    })
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Record Deleted !!',
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
