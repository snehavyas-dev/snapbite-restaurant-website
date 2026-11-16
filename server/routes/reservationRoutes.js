const express = require('express');
const {
  submitReservation,
  requireOwner,
  listReservations,
} = require('../controllers/reservationController');

const router = express.Router();

router.post('/', submitReservation);
router.get('/', requireOwner, listReservations);

module.exports = router;
