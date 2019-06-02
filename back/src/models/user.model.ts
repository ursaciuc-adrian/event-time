import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	subscriptions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}]
});

export default mongoose.model('User', UserSchema);
