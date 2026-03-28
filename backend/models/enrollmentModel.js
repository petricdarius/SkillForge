const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;
