const mongoose = require('mongoose');
const slugify = require('slugify');

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A course must have a name'],
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
      required: [true, 'A course must have a teacher'],
    },
    slug: String,
    price: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CourseSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next();

  this.slug = slugify(this.name, { lower: true });
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
