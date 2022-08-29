const {findByIdAndRemove, findOneAndUpdate} = require("../models/pizza")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {
	AuthenticationError,
	ForbiddenError
} = require('apollo-server-express')
const {default: mongoose, model, models} = require("mongoose")
const {me} = require("./query")


module.exports = {
	newPizza: async (parent, args, {models, user}) => {
		if (!user) {
			throw new AuthenticationError('You must be signed')
		}

		return await models.Pizza.create({
			name: args.name,
			size: args.size,
			price: args.price
		})
	},

	deletePizza: async (parent, {id}, {models, user}) => {
		if (!user) {
			throw new AuthenticationError('You must be signed')
		}

		const _user = await models.User.findOne({_id: user.id})
		const user_permissions = _user.permissions

		if (!user_permissions.includes('admin')) {
			throw new AuthenticationError('You must be admin')
		}

		try {
			await models.Pizza.findByIdAndRemove({_id: id})
			return true
		} catch (err) {
			return false
		}
	},

	updatePizza: async (parent, {id, name, size, price}, {models, user}) => {
		if (!user) {
			throw new AuthenticationError('You must be signed')
		}

		const _user = await models.User.findOne({_id: user.id})
		const user_permissions = _user.permissions

		console.log(user_permissions)

		if (!user_permissions.includes('admin')) {
			throw new AuthenticationError('You must be admin')
		}

		return await models.Pizza.findOneAndUpdate(
			{
				_id: id
			},
			{
				$set: {
					name,
					size,
					price
				}
			},
			{
				new: true
			})
	},

	signUp: async (parent, {id, phoneNumber, email, password}, {models}) => {
		phoneNumber = phoneNumber.trim().toLowerCase()
		email = email.trim().toLowerCase()

		const hashed = await bcrypt.hash(password, 10) // Hashing password

		try {
			const user = await models.User.create({
				phoneNumber,
				email,
				password: hashed,
				permissions: ['user']
			})
			return jwt.sign({id: user._id}, process.env.JWT_SECRET);

		} catch (err) {
			console.log(err)
			throw new Error('Error creating account')
		}
	},

	signIn: async (parent, {phoneNumber, password}, {models}) => {
		phoneNumber = phoneNumber.trim().toLowerCase()

		const user = await models.User.findOne({phoneNumber})
		if (!user) {
			throw new AuthenticationError('Error signing in')
		}

		const valid = await bcrypt.compare(password, user.password)
		if (!valid) {
			throw new AuthenticationError('Error signing in')
		}

		return jwt.sign({id: user._id}, process.env.JWT_SECRET)
	}
}