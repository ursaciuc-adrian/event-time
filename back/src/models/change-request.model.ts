import mongoose, { Schema } from 'mongoose';

const ChangeRequestSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	title: {
		type: String,
		required: false,
		trim: true
	},
	description: {
		type: String,
		required: false,
		trim: true
	},
	location: {
		type: String,
		required: false,
		trim: true
	},
	seats: {
		type: Number,
		required: false
	},
	timestamp: {
		type: String,
		required: false,
		trim: true
	},
	checked: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model('ChangeRequest', ChangeRequestSchema);
