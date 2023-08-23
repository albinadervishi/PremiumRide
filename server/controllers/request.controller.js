
const {User, Driver} = require('../model/user.model')
const Request = require('../model/request.model')

module.exports = {
    requestToBecomeDriver: (req, res) => {
        const { userId, adminId  } = req.params;
        const { driving_license, car_info  } = req.body;

        Request.create({
            request_status: "pending",
            user: userId, 
            admin: adminId,
            license: driving_license,
            car_info: car_info,
            ...req.body 
        })
        .then(request => {
            res.status(200).json({ message: 'Request to become a driver sent', request });
        })
        .catch(err => {
            console.log('Failed to create a driver request:', err);
            res.status(500).json({ error: 'An error occurred' });
        });
    },
    

    getRequests: (req, res) => {
        const adminId = req.params.adminId; 
        Request.find({
            admin: adminId, 
            request_status: "pending" 
        })
        .populate('user') 
        .then(requests => {
            res.json(requests);
        })
        .catch(err => res.status(500).json({ error: 'An error occurred' }));
    },
    

     
    deleteRequest: (req, res) => {   
        const { userId, requestId } = req.params;
        User.findOneAndUpdate({ _id: userId }, { driverDetails: null }, { new: true, runValidators: true })
            .then(updatedUser => {
                Request.deleteOne({ _id: requestId })
                    .then(deleteConfirmation => {
                        res.json({ updatedUser, deleteConfirmation });
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },
    
    approveRequest: (req, res) => {
        Request.findOneAndUpdate(
            { _id: req.params.id }, 
            { request_status: "accepted" }, 
            { new: true }
        )
        .populate('user')
        .populate('admin')
        .then(updatedRequest => {
            if (!updatedRequest) {
                return res.status(404).json({ error: 'Request not found' });
            }
    
            const adminId = updatedRequest.admin._id;
            const driving_license = updatedRequest.driving_license || '';
            const car_info = updatedRequest.car_info || '';
            console.log( updatedRequest);
    
            const driverData = {
                firstName: updatedRequest.user.firstName,
                lastName: updatedRequest.user.lastName,
                phoneNumber: updatedRequest.user.phoneNumber,
                password: updatedRequest.user.password,
                confirmPassword: updatedRequest.user.password,
                img: updatedRequest.user.img,
                email: updatedRequest.user.email,
                driving_license,
                car_info,
                company: adminId,
                status: "Driver"
            };
    
            Driver.create(driverData)
                .then(driver => {
                    // Delete the original user
                    User.findByIdAndDelete(updatedRequest.user._id)
                        .then(deletedUser => {
                            res.json({ 
                                message: 'Request approved, user turned into driver',
                                updatedRequest,
                                createdDriver: driver,
                                deletedUser
                            });
                        })
                        .catch(err => {
                            console.log('Failed to delete user:', err);
                            res.status(500).json({ error: 'An error occurred1', details: err });
                        });
                })
                .catch(err => {
                    console.log('Failed to create a driver:', err);
                    res.status(500).json({ error: 'An error occurred2', details: err });
                });
        })
        .catch(err => {
            console.log('Failed to update request status:', err);
            res.status(500).json({ error: 'An error occurred3', details: err });
        });
    }
    
    
}
