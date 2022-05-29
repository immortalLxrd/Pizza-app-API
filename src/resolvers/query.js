module.exports = {
    hello: () => 'Hello, GraphQL API!',
    pizzaList: async (parent, args, { models }) => {
        return await models.Pizza.find()
    },
    pizzaItem: async (parent, args, { models }) => {
        return await models.Pizza.findById(args.id)
    }
}