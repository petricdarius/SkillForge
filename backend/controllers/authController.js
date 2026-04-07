const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//*Creates a valid token, using an id(userId)
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
  });
};

const createSendToken = (user, StatusCode, req, res) => {
  const token = signToken(user);

  //*Send the token into the cookies
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;

  res.status(StatusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser.id, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide both email and password!', 400));
  const user = await User.findOne({ email: req.body.email }).select(
    '+password',
  );

  if (!user || !(await user.checkPass(user.password, password)))
    return next(new AppError('Incorrect credentials, please try again', 400));

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 100),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) token = req.cookie.jwt;

  if (!token)
    return next(new AppError('Please log in to access this feature.', 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded);
  if (!user) return next(new AppError('The user no longer exists.', 401));
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('Password has been changed, please log in again.', 401),
    );
  }

  req.user = user;

  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.roles))
      return next(
        new AppError('You do not have permission to access this page.', 401),
      );
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetEmail = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`;
  const message =
    'Forgot your password? Submit a request to this URL with you new password in the next 10 minutes. If you did not request for this, please igonre this message';

  //TODO: Create the email class and finish sending the email
});
