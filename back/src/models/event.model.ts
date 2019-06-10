import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
	id?: string;
	idCategory: string;
	idOrigin: string;
	originName: string;
	title: string;
	description: string;
	location: string;
	seats: string;
	coverPhoto: string;
	date: string;
	checked?: boolean;
}

const EventSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	idCategory: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Category'
	},
	idOrigin: {
		type: String,
		index: { unique: true },
		trim: true
	},
	originName: {
		type: String,
		index: { unique: true },
		trim: true
	},
	title: {
		type: String,
		required: true,
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
		required: true
	},
	coverPhoto: {
		type: String,
		required: false,
		trim: true
	},
	date: {
		type: String,
		required: true,
		trim: true
	},
	checked: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model<IEvent>('Event', EventSchema);
