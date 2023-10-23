const RequestController = require('../controllers/request.controller'); 


module.exports = (app) => {
   
    app.post('/api/driverRequest/:userId/:adminId', RequestController.requestToBecomeDriver);
    app.get('/api/requests/:adminId', RequestController.getRequests);
    app.delete('/api/requests/:userId/:requestId', RequestController.deleteRequest);
    app.patch('/api/requests/:id', RequestController.approveRequest);
}