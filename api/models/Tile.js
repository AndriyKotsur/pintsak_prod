const { Schema, model } = require('mongoose')

const TileSchema = new Schema({
	type: {
		type: Schema.Types.ObjectId,
		ref: 'Type',
		required: true,
	},
	title: {
		type: Schema.Types.String,
		trim: true,
		maxLength: 50,
		required: true,
		unique: true,
	},
	url: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		unique: true,
	},
	is_popular: {
		type: Schema.Types.Boolean,
		default: false,
	},
	is_available: {
		type: Schema.Types.Boolean,
		default: false,
	},
	images: [Schema.Types.String],
	sizes: {
		width: {
			type: Schema.Types.Number,
			required: true,
		},
		height: {
			type: Schema.Types.Number,
			required: true,
		},
		thickness: {
			type: Schema.Types.Number,
			required: true,
		},
		weight: {
			type: Schema.Types.Number,
			required: true,
		},
		quantity: {
			type: Schema.Types.Number,
			required: true,
		},
		measurement: {
			type: Schema.Types.String,
			required: true,
		},
	},
	prices: {},
}, { timestamps: true })

const Tile = model('Tile', TileSchema, 'tiles')

module.exports = Tile
