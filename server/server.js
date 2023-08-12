const express = require('express');
const cors = require('cors')    
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('dotenv').config();
require('./config/mongoose.config'); 
require('./routes/review.route')(app); 
require('./routes/driver.route')(app); 
require('./routes/user.route')(app);
require('./routes/booking.route')(app);
require('./routes/request.route')(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );
