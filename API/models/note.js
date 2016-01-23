// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var NoteSchema   = new mongoose.Schema({
  title: String,
  content: String,
  creationDate: Date,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Note', NoteSchema);