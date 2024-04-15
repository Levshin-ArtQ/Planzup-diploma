const controller = require('../controllers/reservations')
const router = require('express').Router();

router.get('/:reservationId', controller.getReservation);
router.get('/', controller.getReservations);
router.post('/', controller.createReservation);

module.exports = router;