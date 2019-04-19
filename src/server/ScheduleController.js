const Schedule = require('../database/ScheduleModel');

const ScheduleController = {
  getSchedule: (req, res) => {
    console.log('getting schedule');
    // res.send({ get: 'gotten' })
    Schedule.findOne({ teacherName: "test name" }, (err, schedule) => {
      if (err) throw err;
      console.log({schedule});
      res.send({schedule})
    })
  },
  createSchedule: (req, res) => {
    console.log('creating');
    const schedule = new Schedule({
      teacherName: req.body.teacherName,
      days: req.body.days
    })
    
    schedule.save((err, schedule) => {
      if (err) return console.error(err);
      console.log({schedule});
      res.send({schedule})
    })
  }
}

module.exports = ScheduleController;