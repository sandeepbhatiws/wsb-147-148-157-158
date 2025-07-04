const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    code : {
        type : String
    }
});

const colorModal = mongoose.model('colors',colorSchema);

module.exports = colorModal;