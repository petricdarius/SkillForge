const crypto = require('crypto');
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a firstname.'],
    maxLength: [20, 'First name cannot be longer than 20 characters.'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name.'],
    maxLength: [20, 'Last name cannot be longer than 20 characters.'],
  },
  email: {
    unique: [true, 'User with that email address already exists.'],
    type: String,
    required: [true, 'A user must have an email.'],
    maxLength: [30, 'Email cannot be longer than 20 characters.'],
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    select: false,
    minLength: [8, 'Password must be at least 8 characters long.'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['teacher', 'admin', 'student'],
    default: 'student',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same.',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//*Crypt password only if modified
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
});

//* Update passwordChangedAt only if password modify
userSchema.pre('save', function () {
  if (!this.isModified('password') || this.isNew) return;

  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.methods.checkPass = async (currPass, newPass) => {
  return await bcrypt.compare(newPass, currPass);
};

//*Get rid of tokens after password change
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre(/^find/, function () {
  this.find({ active: { $ne: false } });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
