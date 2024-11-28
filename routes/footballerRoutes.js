const express = require('express');
const { addFootballer, updateFootballer, getAllFootballers, getFootballerById, deleteFootballer } = require('../controllers/footballerController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();



router.post('/add',addFootballer);
router.put('/update/:id',updateFootballer);
router.get('/all', getAllFootballers);
router.get('/:id', getFootballerById);
router.delete('/delete/:id', deleteFootballer);
module.exports = router;



