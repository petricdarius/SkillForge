const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  slug: String,
  unit: {
    type: mongoose.Schema.ObjectId,
    ref: 'Unit',
  },

  lessonKeywords: [
    {
      keyword: String,
      description: String,
    },
  ],

  keyLearningPoints: [
    {
      keyLearningPoint: String,
    },
  ],

  misconceptionsAndCommonMistakes: [
    {
      misconception: String,
      response: String,
    },
  ],

  pupilLessonOutcome: String,

  teacherTips: [
    {
      teacherTip: String,
    },
  ],
});

const Lesson = new mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
