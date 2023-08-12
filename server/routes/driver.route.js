const DriverController = require('../controllers/driver.controller'); 

module.exports = (app) => {
    app.get('/api/drivers',  DriverController.getDrivers);
    app.get('/api/driver/:id', DriverController.getDriver);
    app.patch('/api/driver/:id', DriverController.updateDriver);
    app.delete('/api/driver/:id', DriverController.removeDriver);
}
