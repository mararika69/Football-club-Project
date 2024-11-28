const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    match_id: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId, 
    },
    
  },
  {
    timestamps: true, 
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
