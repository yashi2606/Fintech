const mongoose = require("mongoose");

// Define the structure of a User document in MongoDB
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Makes sure no two users have the same email
  },
  password: {
    type: String,
    required: true
  }
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
