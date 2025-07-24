const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
    },
    parent_category_id : {
        type : String,
        required: [true, 'Parent category is required'],
    },
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