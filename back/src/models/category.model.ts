import mongoose, { Schema } from 'mongoose';

export const CategorySchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	idOrigin: {
		type: String,
		required: true
	},
	originName: {
		type: String,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	}
});

export default mongoose.model('Category', CategorySchema);
