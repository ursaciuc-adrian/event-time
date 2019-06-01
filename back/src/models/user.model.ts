import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true },
	},
	name: {
		type: String,
		required: 'Please enter the name'
	},
	email: {
		type: String,
		required: 'Please enter an email',
		unique: true
	},
	password: {
		type: String,
		required: 'Please enter a password'
	},
	role: {
		type: String,
		required: 'Please enter your role'
	},
	subscriptions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}]
});

export default mongoose.model('User', UserSchema);
