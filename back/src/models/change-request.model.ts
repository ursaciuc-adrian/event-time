import mongoose, { Schema } from 'mongoose';

const ChageRequestSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	problem: {
		type: String,
		required: 'Please enter the problem'
	}
});

export default mongoose.model('ChageRequest', ChageRequestSchema);
