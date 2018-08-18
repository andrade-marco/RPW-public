//Segment model
const mongoose = require('mongoose');

//User schema
const segmentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxLength: 1000 //Temporary
  },
  votes: [{
    voter: String,
    choice: String
  }],
  status: {
    type: String,
    default: 'voting'
  },
  highlights: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true //Adds createdAt and updatedAt
});

//Create and export model
const Segment = mongoose.model('Segment', segmentSchema);
module.exports = Segment;
