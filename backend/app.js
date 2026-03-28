const morgan = require('morgan');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const express = require('express');
const path = require('path');

const userRoutes = require('../backend/routes/userRoutes');
const geminiRoutes = require('../backend/routes/geminiRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// app.enable('trust proxy');

const port = process.env.BE_PORT;

const limiter = rateLimit({
  //100 requests, from the same ip, in ONE hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  //Error message
  message: 'Too many requests from this IP! Please try again in one hour.',
});
app.use('/api', limiter);

app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  }),
);

app.use(mongoSanitize({ allowDots: true, replaceWith: '_' }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/ai', geminiRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
