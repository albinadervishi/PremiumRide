const ReviewController = require('../controllers/review.controller'); 

module.exports = (app) => {
    app.post('/api/review/:userId/:driverId', ReviewController.createReview);
    app.get('/api/review/:driverId', ReviewController.getReviews);
    app.delete('/api/review/:id', ReviewController.deleteReview);

}