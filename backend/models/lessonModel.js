const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  slug: String,
  unit: {
    type: mongoose.Schema.ObjectId,
    ref: 'Unit',
  },
});

const Lesson = new mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
