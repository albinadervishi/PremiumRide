const Review = require('../model/review.model');

module.exports = {
    createReview: (req, res) => {
        console.log('createReview function executed.');
        const { userId, driverId } = req.params;
        Review.create({
            user: userId, 
            driver: driverId,
            ...req.body  
        })
        .then(request => {
            res.status(200).json({ message: 'Review was sent', request });
        })
        .catch(err => {
            console.log('Failed to send the review:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
    },

    getReviews: (req, res) => {
        const driverId = req.params.driverId; 
        Review.find({
            driver: driverId
        })
        .populate('user') 
        .then(requests => {
            res.json(requests);
        })
        .catch(err => res.status(500).json({ error: 'An error occurred' }));
    },
    
    deleteReview: (req, res) => {   
        Review.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => {
                res.json( deleteConfirmation);
            })
            .catch(err => res.json(err));
},

}
