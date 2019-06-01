import mongoose, { Schema } from 'mongoose';

export const CategorySchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	idCategory: {
		type: String,
		required: 'Please enter a category id'
	},
	name: {
		type: String,
		required: 'Please enter a category name'
	},
	origin: {
		type: String,
		required: 'Please enter a category origin'
	}
});

export default mongoose.model('Category', CategorySchema);
