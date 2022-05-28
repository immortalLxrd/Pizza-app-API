const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        slices: {
            type: Number,
            default: 6
        },
        toppings: {
            type: Array,
            default: []
        }
    }
)

const Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza