const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
  },
  text: { type: String, required: [true, 'Answer must have a text.'] },
  isCorrect: { type: Boolean, default: false },
});

const Answer = new mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
