//Story model
//Imports
const mongoose = require('mongoose');

//Story schema
const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  genre: {
    type: String,
    required: true
  },
  initialText: {
    type: String,
    required: true,
    maxlength: 1555
  },
  segments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment'
  }],
  rejectedSegments: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'open'
  },
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  rating: [{
    user: {
      type: String
    },
    value: {
      type: Number,
      min: 0,
      max: 5
    }
  }]
}, {
  timestamps: true //Adds createdAt and updatedAt
});

//Create model and export
const Story = mongoose.model('Story', storySchema);
module.exports = Story;
