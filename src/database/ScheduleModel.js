const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teacher-scheduler');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb");
});

const teacherSchema = new mongoose.Schema({
  teacherName: String,
  classes: [String]
});

const classSchema = new mongoose.Schema({
  subject: String,
  time: Date,
  day: Number,
  teacherID: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
const Class = mongoose.model('Class', classSchema)

const Schedule = {
  Teacher,
  Class
}

console.log({Schedule});

module.exports = Schedule;