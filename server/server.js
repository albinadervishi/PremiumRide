const express = require('express');
const cors = require('cors')    
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer')
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(bodyParser())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// app.post('/driverRequest/:userId/:adminId', upload.single('driving_license'), function (req, res) {
//   res.json({})
// })

// app.post('/api/driverRequest/:userId/:id', upload.single('driving_license'), (req, res) => {
//   console.log('req.body:', req.body);
//   console.log('req.file:', req.file);
//   const { userId, id } = req.params;
//   const drivingLicenseFile = req.files.driving_license;
//   const carInfo = req.body.car_info;

//   res.status(200).json({
//     message: 'Request received successfully',
//     driving_license: drivingLicenseFile.name, // Example: send the file name back
//     car_info: carInfo,
//   });
// });



// app.post('/api/driverRequest/:userId/:id', upload.single('driving_license'), async (req, res) => {
//   console.log('req.body:', req.body);
//   console.log('req.file:', req.file);
//   const { userId, id } = req.params;
//   const drivingLicenseFilePath = req.file.path; // Get the uploaded file path
//   const carInfo = req.body.car_info;

//   try {
//     const newRequest = new Request({
//       request_status: 'pending',
//       user: userId,
//       admin: id,
//       driving_license: drivingLicenseFilePath, // Save the file path
//       car_info: carInfo,
//     });

//     const savedRequest = await newRequest.save();
//     res.status(201).json(savedRequest);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



require('dotenv').config();
require('./config/mongoose.config'); 
require('./routes/review.route')(app); 
require('./routes/driver.route')(app); 
require('./routes/user.route')(app);
require('./routes/booking.route')(app);
require('./routes/request.route')(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );
