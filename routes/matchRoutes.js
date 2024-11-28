const express = require('express');
const { createMatch, deleteMatch, getMatchDetail, updateMatch ,getAllMatches} = require('../controllers/matchController');  // Import the updateMatch function
const router = express.Router();

// Define routes
router.get("/get",getAllMatches)
router.post('/create', createMatch);
router.put('/update/:id', updateMatch);  // Correctly define the route for updating a match
router.delete('/delete/:id', deleteMatch);
router.get('/get/:id', getMatchDetail);


module.exports = router;
