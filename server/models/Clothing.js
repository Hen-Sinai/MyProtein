const mongoose = require('mongoose')

const clothingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    color: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Clothing', clothingSchema);