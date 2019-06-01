import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    index: { unique: true }
  },
  username: {
    type: String,
    required: "Please enter a username"
  },
  password: {
    type: String,
    required: "Please enter a password"
  },
  email: {
    type: String,
    required: "Please enter an email"
  },
  phoneNumber: {
    type: String,
    required: "Please enter your phone number"
  },
  role: {
    type: String,
    required: "Please enter your role"
  }
});

export default mongoose.model("User", UserSchema);
