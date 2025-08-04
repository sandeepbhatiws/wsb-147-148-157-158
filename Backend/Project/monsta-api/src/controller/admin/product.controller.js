const product = require('../../models/product.js');
const category = require('../../models/category.js');
const subCategory = require('../../models/subCategory.js');
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
        lower: true,
        strict: true,
        trim: true
    })

    saveData.slug = await generateUniqueSlug(product, slug);

    if(request.files){
        saveData.image = request.files.image ? request.files.image[0].filename : '';
    }

    if(request.files && request.files.images){
        saveData.images = request.files.images.map(file => file.filename); 
    }

    var data = new product(saveData);
    await data.save()
    .then(async(result) => {

        if(request.body.parent_categories_ids && request.body.parent_categories_ids.length > 0){
            await category.updateMany(
            { 
                _id: request.body.parent_categories_ids
            }, { 
                $push: { 
                    product_ids: { 
                        $each: [result._id] 
                    } 
                } 
            });
        }

        if(request.body.sub_categories_ids && request.body.sub_categories_ids.length > 0){
            await subCategory.updateMany(
            { 
                _id: request.body.sub_categories_ids
            }, { 
                $push: { 
                    product_ids: { 
                        $each: [result._id] 
                    } 
                } 
            });
        }


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

    var totalRecords = await product.find(filter).countDocuments();

    await product.find(filter)
    .populate('parent_categories_ids', 'name')
    .populate('colors_ids', 'name')
    .populate('sub_categories_ids', 'name')
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
                _image_path : process.env.product_image_url,
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

    await product.findById(request.params.id)
    .then((result) => {
        if(result){
            const output = {
                _status : true,
                _message : 'Record Fetch !!',
                _image_path : process.env.product_image_url,
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

exports.productDetails = async(request, response) => {

    await product.findById(request.params.id)
    .populate('parent_categories_ids', 'name')
    .populate('colors_ids', 'name')
    .populate('sub_categories_ids', 'name')
    .then((result) => {
        if(result){
            const output = {
                _status : true,
                _message : 'Record Fetch !!',
                _image_path : process.env.product_image_url,
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
 
    var slug = slugify(request.body.name, {
        lower: true,
        strict: true,
        trim: true
    })

    saveData.slug = await generateUniqueSlug(product, slug);

    if(request.files){
        saveData.image = request.files.image ? request.files.image[0].filename : '';
    }

    if(request.files && request.files.images){
        saveData.images = request.files.images.map(file => file.filename); 
    }

    await product.updateOne({
        _id : request.params.id
    }, {
        $set : saveData
    })
    .then(async(result) => {

        if(request.body.parent_categories_ids && request.body.parent_categories_ids.length > 0){
            await category.updateMany(
            { 
                _id: request.body.parent_categories_ids
            }, { 
                $push: { 
                    product_ids: { 
                        $each: [result._id] 
                    } 
                } 
            });
        }

        if(request.body.sub_categories_ids && request.body.sub_categories_ids.length > 0){
            await subCategory.updateMany(
            { 
                _id: request.body.sub_categories_ids
            }, { 
                $push: { 
                    product_ids: { 
                        $each: [result._id] 
                    } 
                } 
            });
        }

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
   await product.updateMany({
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
    await product.updateMany({
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
