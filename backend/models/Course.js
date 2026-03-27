const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A course must have a name'],
  },
  lessons: [],
  
});
