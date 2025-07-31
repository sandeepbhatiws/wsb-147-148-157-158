const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: /^[a-zA-Z ]{2,15}$/,
        validate: {
            validator: async function (v) {
                const name = await this.constructor.findOne({ name: v });
                return !name;
            },
            message: props => `The specified name is already in use.`
        },
        minLength: 5,
        maxLength: 10
    },
    code: {
        type: String,
        required: true,
        enum: ['Red', 'Green']
    },
    order: {
        type: Number,
        default: 0,
        min: 0,
        max: 1000
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const colorModal = mongoose.model('colors', colorSchema);

module.exports = colorModal;