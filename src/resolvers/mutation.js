const { findByIdAndRemove, findOneAndUpdate } = require("../models/pizza")

module.exports = {
    newPizza: async (parent, args, { models }) => {
        return await models.Pizza.create({
            name: args.name,
            size: args.size,
            slices: args.slices,
            toppings: []
        })
    },
    deletePizza: async (parent, { id }, { models }) => {
        try {
            await models.Pizza.findByIdAndRemove({ _id: id })
            return true
        } catch (err) {
            return false
        }
    },
    updatePizza: async (parent, { id, name, size, slices }, { models }) => {
        return await models.Pizza.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    name,
                    size,
                    slices
                }
            },
            {
                new: true
            })
    }
}