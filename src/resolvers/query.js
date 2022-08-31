const {Cursor} = require("mongoose")

module.exports = {
	hello: () => 'Hello, GraphQL API!',
	pizzaList: async (parent, args, {models}) => {
		return await models.Pizza.find().limit(100)
	},
	pizzaItem: async (parent, args, {models}) => {
		return await models.Pizza.findById(args.id)
	},
	user: async (parent, {phoneNumber}, {models}) => {
		return await models.User.findOne({phoneNumber})
	},
	users: async (parent, args, {models}) => {
		return await models.User.find({})
	},
	me: async (parent, args, {models, user}) => {
		return await models.User.findById(user.id)
	},
	pizzaFeed: async (parent, {cursor}, {models}) => {
		const limit = 8
		let hasNextPage = false
		let cursorQuery = {}

		if (cursor) {
			cursorQuery = {_id: {$lt: cursor}}
		}

		let items = await models.Pizza.find(cursorQuery)
			.sort({_id: -1})
			.limit(limit + 1)

		if (items.length > limit) {
			hasNextPage = true
			items = items.slice(0, -1)
		}

		const newCursor = items[items.length - 1]._id

		return {
			items,
			cursor: newCursor,
			hasNextPage
		}
	}

}