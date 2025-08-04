const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
    },
    product_ids : [
        {
            type : Schema.Types.ObjectId,
            default : [],
            ref: 'products'
        }
    ],
    parent_category_id : {
        type : String,
        required: [true, 'Parent category is required'],
        ref: 'categories'
    },
    parent_category_ids : [{
        type : Schema.Types.ObjectId,
        // required: [true, 'Parent category is required'],
        default : [],
        ref: 'categories'
    }],
    image: {
        type: String,
        default : ''
    },
    order: {
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    },
    status : {
        type : Boolean,
        default : 1,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: ''
    }
});

const subCategoryModal = mongoose.model('sub_categories', subCategorySchema);

module.exports = subCategoryModal;