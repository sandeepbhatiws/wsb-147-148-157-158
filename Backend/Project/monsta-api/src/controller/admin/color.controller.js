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
    
    var limit = 15;
    var page = 1;
    var skip = 0;

    if(request.body != undefined){
        var limit = request.body.limit ? request.body.limit : limit;
        var page = request.body.page ? request.body.page : page;
        var skip = (page - 1) * limit;
    }

    const addCondition = [
        {
            deleted_at : null, 
            // status : true
        }
    ];

    const orCondition = [];

    if(request.body != undefined){
        if(request.body.name != undefined){
            if(request.body.name != ''){
                var name = new RegExp(request.body.name, 'i');
                orCondition.push({ name : name },{ code :name })
            }
        }
    }

    if(request.body != undefined){
        if(request.body.code != undefined){
            if(request.body.code != ''){
                var code = new RegExp(request.body.code, 'i');
                orCondition.push({ code : code })
            }
        }
    }

    if(addCondition.length > 0){
        var filter = { $and : addCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var totalRecords = await color.find(filter).countDocuments();

    await color.find(filter)
    .select('_id name order status code')
    .sort({
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
   await color.updateMany({
        _id : request.body.id
    }, [{
        $set : {
            status : {
                $not : "$status"
            }
        }
    }])
    .then((result) => {
        const output = {
            _status : true,
            _message : 'Change Status successfully !!',
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
