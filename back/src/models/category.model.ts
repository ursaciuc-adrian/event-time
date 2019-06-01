import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	name: {
		type: String,
		required: 'Please enter a category name'
	}
});

export default mongoose.model('Category', CategorySchema);
