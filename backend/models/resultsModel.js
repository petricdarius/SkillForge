const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Result must corespond to an user.'],
  },
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subject',
    required: [true, 'Result must corespond to a subject.'],
  },
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
    required: [true, 'Result must corespond to a quiz.'],
  },
  score: Number,
});

const Result = new mongoose.model('Result', ResultSchema);

module.exports = Result;
