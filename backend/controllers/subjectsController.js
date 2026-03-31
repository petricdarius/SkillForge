const axios = require('axios');

const catchAsync = require('../utils/catchAsync');

exports.getAllSubjects = catchAsync(async (req, res, next) => {
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
