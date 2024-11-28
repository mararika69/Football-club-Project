const Ticket = require('../models/Tickets');
const mongoose = require('mongoose');

const bookTicket = async (req, res) => {
  try {
    const { match_id, price, created_by } = req.body;

    if (!match_id || !price || !created_by) {
      return res.status(400).json({
        success: false,
        message: 'Match ID, price, and created_by are required fields',
      });
    }

    const ticket = await Ticket.create({ match_id, price, created_by });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('match_id').populate('created_by updated_by');
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(id).populate('match_id').populate('created_by updated_by');

    if (!ticket) {
      return res.status(404).json({ success: false, message: `Ticket with ID ${id} not found` });
    }

    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, availability, updated_by } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ticket ID' });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { price, availability, updated_by },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ success: false, message: `Ticket with ID ${id} not found` });
    }

    res.status(200).json({ success: true, data: updatedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: `Ticket with ID ${id} not found` });
    }

    res.status(200).json({ success: true, message: `Ticket with ID ${id} has been deleted` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};








module.exports = { bookTicket, getAllTickets, getTicketById, updateTicketById , deleteTicket , };