const Driver = require('../model/user.model')
const User = require('../model/user.model')
const Booking = require('../model/booking.model')

module.exports = {
    bookingRequest: (req, res) => {
        const { userId, driverId } = req.params;
        Booking.create({
            user: userId, 
            driver: driverId,
            ...req.body  
        })
        .then(request => {
            res.status(200).json({ message: 'Request to book the cab was sent', request });
        })
        .catch(err => {
            console.log('Failed to send the request:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
    },
    

    getBookings: (req, res) => {
        Booking.find({
            $or: [{ user: req.params.id }, { driver: req.params.id }]
          })
        .populate('user')
        .populate('driver')
            .then(bookingRequests => res.json(bookingRequests))
            .catch(err => res.json(err));
    },


     
    deleteBooking: (req, res) => {   
                Booking.deleteOne({ _id: req.params.id })
                    .then(deleteConfirmation => {
                        res.json( deleteConfirmation);
                    })
                    .catch(err => res.json(err));
    },
    
    approveBooking: (req, res) => {
        Booking.findOneAndUpdate({ _id: req.params.id }, { booking_status: "accepted" }, { new: true })
        .then(approvedBooking => {
                    res.json({ message: 'Booking request approved', approvedBooking });
                })
        .catch(err => res.json(err));
    }
}
