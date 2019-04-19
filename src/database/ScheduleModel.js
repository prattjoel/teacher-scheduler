const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teacher-scheduler');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to mongodb");
});

const scheduleSchema = new mongoose.Schema({
  teacherName: String,
  days: [{ subject: String, time: Date }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;