//User model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  reputation: {
    score: {
      type: Number,
      default: 0
    },
    designation: {
      type: String,
      default: 'Unranked'
    }
  },
  about: {
    type: String
  },
  preferences: {
    subscriptionEmails: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

//Hooks
//Encrypting password - hook on saving user
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next();

    //Password hashing
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    return next();

  } catch (err) {
    return next(err);
  }
});

//Checking password supplied at login against hashed password
userSchema.methods.checkPassword = async function(enteredPassword, next) {
  try {
    let isCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isCorrect;
  } catch (err) {
    return next(err);
  }
}


//Create and export model
const User = mongoose.model('User', userSchema);
module.exports = User;
