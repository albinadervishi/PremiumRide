const BookingController = require('../controllers/booking.controller'); 

module.exports = (app) => {
    app.get('/api/bookings/:id',  BookingController.getBookings);
    app.post('/api/booking/:userId/:driverId',  BookingController.bookingRequest);
    app.delete('/api/booking/:id',  BookingController.deleteBooking);
    app.patch('/api/booking/:id',  BookingController.approveBooking);
}
