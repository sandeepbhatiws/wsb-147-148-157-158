const user = require('../../models/user.js');
require('dotenv').config()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Register User API
exports.register = async(request, response) => {

    // Check if user already exists
    const existingUser = await user.findOne({ email: request.body.email, deleted_at: null });

    if(existingUser) {
        const output = {   
            _status: false,
            _message: 'User already exists with this email address.',
            _data: null
        };
        return response.send(output);
    }

    var password = await bcrypt.hash(request.body.password, saltRounds);

    var saveData = {
        name : request.body.name,
        email : request.body.email,
        password : password,
        mobile_number : request.body.mobile_number,
    }
    
    var data = new user(saveData);
    await data.save()
    .then((result) => {

        var token = jwt.sign(
        { 
            data: result
        }, 
        process.env.API_TOKEN_KEY);

        const output = {
            _status : true,
            _message : 'User Registerd !!',
            _token : token,
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
};

// Login API
exports.login = async(request, response) => {

    // Check if user exists
    const existingUser = await user.findOne({ email: request.body.email, deleted_at: null });

    if(existingUser) {

        if(!await bcrypt.compare(request.body.password, existingUser.password)){
            const output = {
                _status: false,
                _message: 'Your password is incorrect.',
                _data: null
            };
            return response.send(output);
        }

        // 
        if(existingUser.status === false) {
            const output = {
                _status: false,
                _message: 'Your account is inactive. Please contact support.',
                _data: null
            };
            return response.send(output);
        }

        var token = jwt.sign(
        { 
            data: existingUser
        }, 
        process.env.API_TOKEN_KEY);

        const output = {
            _status: true,  
            _message: 'Login successful.',
            _token: token,
            _data: existingUser
        };
        return response.send(output);

    } else {
        const output = {    
            _status: false,
            _message: 'Invalid email.',
            _data: null
        };
        return response.send(output);
    }

    



    // var verify = jwt.verify(request.query.token, process.env.API_TOKEN_KEY);

    // const output = {
    //             _status : true,
    //             _message : 'Register Succussfully !!',
    //             _data : verify,
    //             // _decoded : decoded
    //         }

    //         response.send(output);

    // { expiresIn: '1h'

    // var verify = jwt.verify(token, process.env.API_TOKEN_KEY, (err, decoded) => {
    //     if (err) {          
    //         return response.status(500).send('Token verification failed');
    //     } else { 
    //         const output = {
    //             _status : true,
    //             _message : 'Register Succussfully !!',
    //             _data : token,
    //             _decoded : decoded
    //         }

    //         response.send(output);
    //     }
    // });

    

    // .then((result) => {
    //     const output = {
    //         _status : true,
    //         _message : 'Record Deleted !!',
    //         _data : result
    //     }

    //     response.send(output);
    // })
    // .catch((error) => {

    //     var errorMessages = [];

    //     for (index in error.errors){
    //         errorMessages.push(error.errors[index].message);
    //     }

    //     const output = {
    //         _status : false,
    //         _message : 'Something Went Wrong !!',
    //         _data : errorMessages
    //     }

    //     response.send(output);
    // });
}
// View Profile API
exports.viewProfile = async(request, response) => {

    console.log(request.headers.authorization);
    var token = request.headers.authorization.split(' ')[1];

    var verify = jwt.verify(token, process.env.API_TOKEN_KEY, async(error, value) => {
        if (error) {
            const output = {
                _status: false,
                _message: 'Token verification failed',
                _data: null
            };
            return response.send(output);
        } else {
            await user.findById(value.data._id)
            .then((result) => {
                if(result){
                    const output = {
                        _status : true,
                        _message : 'Record Fetch !!',
                        _image_path : process.env.user_image_url,
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
    })
}

// exports.create = async(request, response) => {

//     var saveData = request.body;

//     var slug = slugify(request.body.name, {
//         replacement: '-',  // replace spaces with replacement character, defaults to `-`
//         remove: undefined, // remove characters that match regex, defaults to `undefined`
//         lower: true,      // convert to lower case, defaults to `false`
//         strict: true,     // strip special characters except replacement, defaults to `false`
//         locale: 'vi',      // language code of the locale to use
//         trim: true         // trim leading and trailing replacement chars, defaults to `true`
//     })

//     saveData.slug = await generateUniqueSlug(category, slug);
 
//     if(request.file){
//         saveData.image = request.file.filename
//     }



// }

// exports.view = async(request, response) => {
    
//     var limit = 15;
//     var page = 1;
//     var skip = 0;

//     if(request.body != undefined){
//         var limit = request.body.limit ? request.body.limit : limit;
//         var page = request.body.page ? request.body.page : page;
//         var skip = (page - 1) * limit;
//     }

//     const addCondition = [
//         {
//             deleted_at : null, 
//         }
//     ];

//     if(request.body.status == true){
//         addCondition.push({ status : true });
//     }

//     if(request.body.status == false){
//         addCondition.push({ status : false });
//     }

//     const orCondition = [];

//     if(request.body != undefined){
//         if(request.body.name != undefined){
//             if(request.body.name != ''){
//                 var name = new RegExp(request.body.name, 'i');
//                 orCondition.push({ name : name })
//             }
//         }
//     }

//     if(addCondition.length > 0){
//         var filter = { $and : addCondition }
//     } else {
//         var filter = {}
//     }

//     if(orCondition.length > 0){
//         filter.$or = orCondition;
//     }

//     var totalRecords = await category.find(filter).countDocuments();

//     await category.find(filter)
//     .select('_id name sub_categories_ids image order status')
//     .populate('sub_categories_ids', 'name')
//     .sort({
//         order : 'asc'
//     })
//     .sort({
//         _id : 'desc'
//     })
//     .limit(limit).skip(skip)
//     .then((result) => {

//         if(result.length > 0){
//             const output = {
//                 _status : true,
//                 _message : 'Record Fetch !!',
//                 _paggination : {
//                     total_records : totalRecords,
//                     current_page : page,
//                     total_pages : Math.ceil(totalRecords / limit)
//                 },
//                 _image_path : process.env.category_image_url,
//                 _data : result
//             }

//             response.send(output);
//         } else {
//             const output = {
//                 _status : false,
//                 _message : 'No Record Found !!',
//                 _data : result
//             }

//             response.send(output);
//         }
        
//     })
//     .catch((error) => {
//         const output = {
//             _status : false,
//             _message : 'Something Went Wrong !!',
//             _data : error
//         }

//         response.send(output);
//     });
// }


// exports.update = async(request, response) => {

//     var saveData = request.body;
 
//     if(request.file){
//         saveData.image = request.file.filename
//     }

//     await category.updateOne({
//         _id : request.params.id
//     }, {
//         $set : saveData
//     })
//     .then((result) => {
//         const output = {
//             _status : true,
//             _message : 'Record Updated !!',
//             _data : result
//         }

//         response.send(output);
//     })
//     .catch((error) => {

//         var errorMessages = [];

//         for (index in error.errors){
//             errorMessages.push(error.errors[index].message);
//         }

//         const output = {
//             _status : false,
//             _message : 'Something Went Wrong !!',
//             _data : errorMessages
//         }

//         response.send(output);
//     });
// }

// exports.changeStatus = async(request, response) => {
//    await category.updateMany({
//         _id : request.body.id
//     }, [{
//         $set : {
//             status : {
//                 $not : "$status"
//             }
//         }
//     }])
//     .then((result) => {
//         const output = {
//             _status : true,
//             _message : 'Change Status successfully !!',
//             _data : result
//         }

//         response.send(output);
//     })
//     .catch((error) => {

//         var errorMessages = [];

//         for (index in error.errors){
//             errorMessages.push(error.errors[index].message);
//         }

//         const output = {
//             _status : false,
//             _message : 'Something Went Wrong !!',
//             _data : errorMessages
//         }

//         response.send(output);
//     });
// }

// exports.destroy = async(request, response) => {
//     await category.updateMany({
//         _id : request.body.id
//     }, {
//         $set : {
//             deleted_at : Date.now()
//         }
//     })
//     .then((result) => {
//         const output = {
//             _status : true,
//             _message : 'Record Deleted !!',
//             _data : result
//         }

//         response.send(output);
//     })
//     .catch((error) => {

//         var errorMessages = [];

//         for (index in error.errors){
//             errorMessages.push(error.errors[index].message);
//         }

//         const output = {
//             _status : false,
//             _message : 'Something Went Wrong !!',
//             _data : errorMessages
//         }

//         response.send(output);
//     });
// }
