const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'A question must have a text'],
  },
  minLength: [10, 'A question must be at least 10 characters long'],
  quiz: {
    type: mongoose.Schema.ObjectId,
    ref: 'Quiz',
  },
  category: {
    type: String,
    enum: ['single', 'multiple'],
    default: 'single',
  },
});

QuestionSchema.virtual('answers', {
  ref: 'Answer',
  foreignField: 'question',
  localField: '_id',
});

const Question = new mongoose.model('Question', QuestionSchema);

module.exports = Question;
