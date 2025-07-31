const subCategory = require('../../models/subCategory.js');
const Category = require('../../models/category.js');
require('dotenv').config()

exports.create = async(request, response) => {
    var saveData = request.body;
 
    if(request.file){
        saveData.image = request.file.filename
    }

    var data = new subCategory(saveData);
    await data.save()
    .then(async(result) => {

        await Category.updateMany(
            { 
                _id: request.body.parent_category_ids
            }, { 
                $push: { 
                    sub_categories_ids: { 
                        $each: [result._id] 
                    } 
                } 
            });

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
        }
    ];

    const orCondition = [];

    if(request.body != undefined){
        if(request.body.name != undefined){
            if(request.body.name != ''){
                var name = new RegExp(request.body.name, 'i');
                orCondition.push({ name : name })
            }
        }

        if(request.body.parent_category_id != undefined){
            if(request.body.parent_category_id != ''){
                addCondition.push({ parent_category_id : request.body.parent_category_id })
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

    var totalRecords = await subCategory.find(filter).countDocuments();

    await subCategory.find(filter)
    .select('_id name parent_category_id parent_category_ids image order status')
    // .populate('parent_category_id')
    // .populate('parent_category_ids')
    // .populate('parent_category_ids', 'name image')
    .populate([
        {
            path : 'parent_category_id',
            select : 'name'
        },
        {
            path : 'parent_category_ids',
            select : 'name'
        }
    ])
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
                _image_path : process.env.category_image_url,
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

    await subCategory.findById(request.params.id)
    .then((result) => {
        if(result){
            const output = {
                _status : true,
                _message : 'Record Fetch !!',
                _image_path : process.env.category_image_url,
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

    var saveData = request.body;
 
    if(request.file){
        saveData.image = request.file.filename
    }

    await subCategory.updateOne({
        _id : request.params.id
    }, {
        $set : saveData
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
   await subCategory.updateMany({
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
    await subCategory.updateMany({
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
