const BookingController = require('../controllers/booking.controller'); 

module.exports = (app) => {
    app.get('/api/bookingRequests/:userStatus/:userId',  BookingController.getBookingRequests);
    app.get('/api/booking/:userStatus/:userId',  BookingController.getBookings);
    app.post('/api/booking/:userId/:driverId',  BookingController.bookingRequest);
    app.delete('/api/booking/:id',  BookingController.deleteBooking);
    app.patch('/api/booking/:id',  BookingController.approveBooking);
}
