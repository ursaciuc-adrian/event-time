import mongoose, { Schema } from 'mongoose';

const ChangeRequestSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId
	},
	idEvent: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Event'
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
	date: {
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
