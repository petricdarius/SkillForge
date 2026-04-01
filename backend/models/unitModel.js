const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  title: String,
  slug: String,
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subject',
  },
  year: Number,
  lessons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
    },
  ],
});

const Unit = new mongoose.model('Unit', unitSchema);

module.exports = Unit;
