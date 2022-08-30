const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true,
            default: "/img/pizza.png"
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true,
            default: 3
        }
    },
    {
        timestamps: true
    }
)

const Pizza = mongoose.model('Pizza', pizzaSchema)

module.exports = Pizza