import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	idCategory: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Category'
	},
	idOrigin: {
		type: String,
		index: { unique: true },
		trim: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	location: {
		type: String,
		required: true,
		trim: true
	},
	seats: {
		type: Number,
		required: true
	},
	coverPhoto: {
		type: String,
		required: true,
		trim: true
	},
	date: {
		type: String,
		required: true,
		trim: true
	},
	checked: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model('Event', EventSchema);
