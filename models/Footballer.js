const mongoose = require('mongoose');

const FootballerSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String, 
    },
    created_by: {
      type: String,
      required: true,
    },
    updated_by: {
      type: String, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Footballer', FootballerSchema);
