const express = require('express');
const errorMiddleware = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(
  bodyParser.json({ limit: '50mb', extended: true, parameterLimit: 500000 })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(cookieParser());
app.use(fileUpload());

// Routes Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
