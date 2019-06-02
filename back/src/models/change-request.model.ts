import mongoose, { Schema } from 'mongoose';

const ChageRequestSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	problem: {
		type: String,
		required: true
	}
});

export default mongoose.model('ChageRequest', ChageRequestSchema);
