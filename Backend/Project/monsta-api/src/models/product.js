const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: /^[a-zA-Z- ]{2,15}$/,
        // validate: {
        //     validator: async function (v) {
        //         const name = await this.constructor.findOne({ name: v });
        //         return !name;
        //     },
        //     message: props => `The specified name is already in use.`
        // },
    },
    image: {
        type: String,
        default : ''
    },
    images: {
        type: Array,
        default : []
    },
    slug: {
        type: String,
        default : ''
    },
    actual_price: {
        type: Number,
        required: [true, 'Actual price is required'],
        default : ''
    },
    sale_price: {
        type: Number,
        required: [true, 'Sale price is required'],
        default : ''
    },
    // product_type:{
    //     type: Number,
    //     required: [true, 'Product type is required'],
    //     default: 1  // 1 - Featured 2- New Arrival 3- OnSale
    // },
    is_featured:{
        type: Number,
        required: [true, 'Featured is required'],
        default: 1  // 1 - Yes 2- No
    },
    is_new_arrivals:{
        type: Number,
        required: [true, 'New Arrivals is required'],
        default: 1  // 1 - Yes 2- No
    },
    is_onsale:{
        type: Number,
        required: [true, 'OnSale is required'],
        default: 1  // 1 - Yes 2- No
    },
    is_best_sellings:{
        type: Number,
        required: [true, 'Best Selling is required'],
        default: 1  // 1 - Yes 2- No
    },
    is_upsell:{
        type: Number,
        required: [true, 'Upsell is required'],
        default: 1  // 1 - Yes 2- No
    },
    product_code:{
        type: String,
        required: [true, 'Product code is required'],
        default: ''
    },
    product_dimension:{
        type: String,
        required: [true, 'Product dimension is required'],
        default: ''
    },
    estimate_delivery_days:{
        type: String,
        required: [true, 'Estimate delivery days is required'],
        default: ''
    },
    short_description: {
        type: String,
        required: [true, 'Short description is required'],
        default: ''
    },
    long_description: {
        type: String,
        required: [true, 'Long description is required'],
        default: ''
    },
    material_ids : [
        {
            type : Schema.Types.ObjectId,
            default : [],
            ref: 'materials'
        }
    ],
    Colors_ids : [
        {
            type : Schema.Types.ObjectId,
            default : [],
            ref: 'colors'
        }
    ],
    parent_categories_ids : [
        {
            type : Schema.Types.ObjectId,
            default : [],
            ref: 'categories'
        }
    ],
    sub_categories_ids : [
        {
            type : Schema.Types.ObjectId,
            default : [],
            ref: 'sub_categories'
        }
    ],
    sub_sub_categories_ids : [
        {
            type : Schema.Types.ObjectId,
            default : [],
            ref: 'sub_sub_categories'
        }
    ],
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

const productModal = mongoose.model('products', productSchema);

module.exports = productModal;