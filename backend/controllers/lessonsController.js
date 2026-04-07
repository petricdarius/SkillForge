const Lesson = require('../models/lessonModel');
const Unit = require('../models/unitModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getLesson = catchAsync(async (req, res, next) => {
  const unit = await Unit.findOne({ slug: req.params.unitSlug });
  if (!unit) return next(new AppError('Invalid unit', 404));

  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return next(new AppError('Invalid lesson ID.', 404));

  if (!lesson.unit.equals(unit._id))
    return next(new AppError("Lesson doesn't belong to this unit.", 404));

  res.status(200).json({
    status: 'success',
    data: lesson,
  });
});
