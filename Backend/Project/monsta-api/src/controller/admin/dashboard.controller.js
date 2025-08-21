const product = require('../../models/product.js');
require('dotenv').config()

exports.view = async(request, response) => {
    
    const addCondition = [
        {
            deleted_at : null, 
        }
    ];

    const orCondition = [];

    if(addCondition.length > 0){
        var filter = { $and : addCondition }
    } else {
        var filter = {}
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    var totalRecords = await product.find(filter).countDocuments();

    var totalProducts = await product.aggregate([
        { $match: filter },
        { $count : 'totalRecords' }
    ]);

    var totalAllProducts = await product.aggregate(
   [
        { $match: filter },
        {
           $group:{
               _id: "",
               minPrice: { $min: "$sale_price" },
               maxPrice: { $max: "$sale_price" },
               avgPrice: { $avg: "$sale_price" },
               sumPrice: { $sum: "$sale_price" }
           }
        }
   ]
)


    const output = {
        _status : true,
        _message : 'Record Fetch !!',
        totalRecords : totalRecords,
        totalProducts : totalProducts,
        totalAllProducts : totalAllProducts
    }

    response.send(output);
}

