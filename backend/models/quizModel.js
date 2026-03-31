const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Quiz must have a name.'] },
  duration: Number,
  openDate: Date,
  closeDate: Date,
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subject',
  },
  //? For easier tracking, beacuse teachers can change
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

QuizSchema.virtual('questions', {
  ref: 'Question',
  foreignField: 'quiz',
  localField: '_id',
});

const Quiz = new mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
