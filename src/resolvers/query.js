module.exports = {
    hello: () => 'Hello, GraphQL API!',
    pizzaList: async (parent, args, { models }) => {
        return await models.Pizza.find()
    },
    pizzaItem: async (parent, args, { models }) => {
        return await models.Pizza.findById(args.id)
    },
    user: async (parent, { phoneNumber }, { models }) => {
        return await models.User.findOne({ phoneNumber })
    },
    users: async (parent, args, { models }) => {
        return await models.User.find({})
    },
    me: async (parent, args, {models, user}) => {
        return await models.User.findById(user.id)
    }

}