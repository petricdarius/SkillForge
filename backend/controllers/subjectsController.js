const axios = require('axios');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllSubjects = catchAsync(async (req, res) => {
  const subjects = await axios({
    method: 'get',
    url: 'https://open-api.thenational.academy/api/v0/subjects',
    headers: {
      Authorization: `Bearer ${process.env.OAK_KEY}`,
    },
  });

  res.status(200).json({
    status: 'success',
    data: subjects.data,
  });
});

exports.getOneSubject = catchAsync(async (req, res, next) => {
  const subjectSlug = req.params.subSlug;

  if (!subjectSlug)
    return next(new AppError('Please provide a valid slug.', 404));

  const subjectKeyStages = (
    await axios({
      method: 'get',
      url: `https://open-api.thenational.academy/api/v0/subjects/${subjectSlug}`,
      headers: {
        Authorization: `Bearer ${process.env.OAK_KEY}`,
      },
    })
  ).data.keyStages.length;

  res.status(200).json({
    status: 'success',
    data: subjectKeyStages,
  });
});
