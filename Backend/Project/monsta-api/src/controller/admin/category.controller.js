const category = require('../../models/category.js');
require('dotenv').config()
const slugify  = require('slugify');

const generateUniqueSlug = async (Model, baseSlug) => {
    let slug = baseSlug;
    let count = 0;
  
    // Loop to find unique slug
    while (await Model.findOne({ slug })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }
  
    return slug;
};

exports.create = async(request, response) => {

    var saveData = request.body;

    var slug = slugify(request.body.name, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })

    saveData.slug = await generateUniqueSlug(category, slug);
 
    if(request.file){
        saveData.image = request.file.filename
    }

    var data = new category(saveData);
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
        }
    ];

    if(request.body.status == true){
        addCondition.push({ status : true });
    }

    if(request.body.status == false){
        addCondition.push({ status : false });
    }

    const orCondition = [];

    if(request.body != undefined){
        if(request.body.name != undefined){
            if(request.body.name != ''){
                var name = new RegExp(request.body.name, 'i');
                orCondition.push({ name : name })
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

    var totalRecords = await category.find(filter).countDocuments();

    await category.find(filter)
    .select('_id name sub_categories_ids image order status')
    .populate('sub_categories_ids', 'name')
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

    await category.findById(request.params.id)
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

    await category.updateOne({
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
   await category.updateMany({
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
    await category.updateMany({
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
