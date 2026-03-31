const mongoose = require('mongoose');
const slugify = require('slugify');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A subject must have a name'],
    },
    lessons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Lesson',
      },
    ],
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      // required: [true, 'A subject must have a teacher'],
    },
    slug: String,
    price: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Subject = mongoose.model('subject', subjectSchema);

module.exports = Subject;
