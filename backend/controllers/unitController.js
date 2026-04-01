const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const Unit = require('../models/unitModel');
const Subject = require('../models/subjectModel');
const Lesson = require('../models/lessonModel');

exports.getUnit = catchAsync(async (req, res, next) => {
  const subject = await Subject.findOne({ slug: req.params.subSlug });

  if (!subject) return next(new AppError('Invalid subject.', 404));

  const unit = await Unit.findById(req.params.id).populate('lessons');

  if (!unit) return next(new AppError('No unit found for that id.', 404));

  if (!unit.subject.equals(subject._id)) {
    return next(
      new AppError('Unit does not belong to the provided subject.', 404),
    );
  }

  res.status(200).json({
    status: 'success',
    data: unit,
  });
});
