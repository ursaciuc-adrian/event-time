import mongoose, { Schema } from "mongoose";

const ChageRequestsSchema = new Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    index: { unique: true }
  },
  id_user: {
    type: Number,
    required: "Please enter a title"
  },
  description: {
    type: String,
    required: "Please enter a description"
  },
  location: {
    type: String,
    required: "Please enter a location"
  },
  seats: {
    type: Number,
    required: "Please enter the number of seats"
  },
  coverPhoto: {
    type: String,
    required: "Please enter the cover photo"
  },
  date: {
    type: Date,
    required: "Please enter the date of the event"
  }
});

export default mongoose.model("Event", EventSchema);
