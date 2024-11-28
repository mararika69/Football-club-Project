const express = require('express');
const { bookTicket, getAllTickets, updateTicketById ,getTicketById, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/book', bookTicket);
router.get('/all', getAllTickets);
router.get('/:id', getTicketById);
router.put('/update/:id', updateTicketById);
router.delete('/delete/:id', deleteTicket);
// router.post('/tickets/buy', buyTicket);

// router.get('/tickets-report', getTicketsPerMatchReport);

module.exports = router;
