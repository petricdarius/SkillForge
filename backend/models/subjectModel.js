const mongoose = require('mongoose');
const slugify = require('slugify');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A subject must have a name'],
    },
    units: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Unit',
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

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
