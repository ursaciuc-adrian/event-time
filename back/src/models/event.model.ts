import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
	id: {
		type: mongoose.Schema.ObjectId,
		index: { unique: true }
	},
	title: {
		type: String,
		required: 'Please enter a title'
	},
	description: {
		type: String,
		required: 'Please enter a description'
	},
	location: {
		type: String,
		required: 'Please enter a location'
	},
	seats: {
		type: Number,
		required: 'Please enter the number of seats'
	},
	coverPhoto: {
		type: String,
		required: 'Please enter the cover photo'
	},
	date: {
		type: String,
		required: 'Please enter the date of the event'
	},
	category: {
		type: Number,
		required: 'Please enter the category id'
	}
	// de modificat category sa fie referinta la un obiect categorie
});

export default mongoose.model('Event', EventSchema);
