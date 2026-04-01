const axios = require('axios');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Subject = require('../models/subjectModel');
const Unit = require('../models/unitModel');

exports.getAllSubjects = catchAsync(async (req, res) => {
  const subjects = await Subject.find();

  res.status(200).json({
    status: 'success',
    data: subjects,
  });
});

exports.getOneSubject = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;

  if (!slug) return next(new AppError('No slug found.', 404));

  const subject = await Subject.findOne({ slug }).populate('units');

  if (!subject) return next(new AppError('No subject found'), 404);

  res.status(200).json({
    status: 'success',
    data: subject,
  });
});
