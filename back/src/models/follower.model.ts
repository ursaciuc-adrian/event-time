import mongoose, { Schema } from 'mongoose';

export const FollowerSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	idOrigin: {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	},
	originName: {
		type: String,
		trim: true
	},
	url: {
		type: String,
		required: true,
		trim: true
	}
});

export default mongoose.model('Follower', FollowerSchema);
