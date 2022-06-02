const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        permissions: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', UserSchema)

module.exports = User