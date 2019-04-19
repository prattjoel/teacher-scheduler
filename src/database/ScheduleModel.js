const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/teacher-scheduler');
mongoose.connect('mongodb://user:password1@ds145146.mlab.com:45146/teacher-scheduler');


// Mongoose boiler plate code
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb");
});

// Schema for the Teacher collection.
const teacherSchema = new mongoose.Schema({
  teacherName: String,
  classes: [String]
});

// Schema for the collection of classes each teacher will teach
const schoolClassSchema = new mongoose.Schema({
  subject: String,
  time: Date,
  day: Number,
  teacherID: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
const SchoolClass = mongoose.model('Class', schoolClassSchema);

const Schedule = {
  Teacher,
  SchoolClass
}

module.exports = Schedule;