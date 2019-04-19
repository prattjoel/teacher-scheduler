const Schedule = require('../database/ScheduleModel');

const ScheduleController = {
  getSchedule: (req, res) => {
    console.log('getting schedule');
    console.log('teacher', Schedule.Teacher.findOne);
    Schedule.Teacher.findOne({ teacherName: req.params.name }, (err, schedule) => {
      if (err) throw err;
      console.log({schedule});
      res.send({schedule})
    })
  },
  createTeacher: (req, res) => {
    const newTeacher = new Schedule.Teacher(req.body.teacher)
    
    newTeacher.save((err, teacher) => {
      if (err) throw err
      res.cookie('teacherID', teacher._id)
      res.send({teacher})
    })
  },
  createSchedule: (req, res, next) => {
    console.log('creating');
    for (let i=0; i<req.body.classes.length; i++){
      const newClass = new Schedule.Class(req.body.classes[i])
      
      newClass.save((err, classInfo) => {
        if (err) return console.error(err);
        console.log({classInfo});
      })
    }
    next()
    // res.send({test: 'schedule'})
  },
  createClass:(req, res, next) => {
    const newClass = new Schedule.Class({ ...req.body, teacherID: req.cookies.teacherID})
    
    newClass.save((err, classInfo) => {
      if (err) return console.error(err);
      console.log({classInfo});
      res.locals.addedClass = classInfo;
      next()
      // res.send({classInfo})
    })
  },
  getClasses: (req, res) => {
    // console.log('teacher id', req.body.classes[0].teacherID);
    console.log('cookies', req.cookies);
    console.log('teacher id', req.cookies.teacherID);
    
    Schedule.Class.find({ teacherID: req.cookies.teacherID }, (err, classes) => {
      if (err) throw err;
      res.send({classes})
    })
  },
  addTeacherClass: (req, res) => {
    Schedule.Teacher.findOne({ _id: req.cookies.teacherID }, (err, teacher) => {
      if (err) throw err;
      const updatedClasses = teacher.classes
      updatedClasses.push(res.locals.addedClass._id);
      teacher.classes = updatedClasses
      teacher.save((err, teacherInfo) => {
        if (err) throw err;
        
        res.send({ classInfo: res.locals.addedClass, teacherInfo })
      })
    })
  },
  deleteClass: (req, res, next) => {
    Schedule.Class.deleteOne({ _id: req.body.classID }, (err) => {
      if (err) throw err;
      next()
    })
  },
  deleteTeacherClass: (req, res) => {
    Schedule.Teacher.findOne({ _id: req.cookies.teacherID }, (err, teacher) => {
      const updatedClasses = teacher.classes.filter(classID => classID !== req.body.classID)
      teacher.classes = updatedClasses;
      teacher.save((err, teacherInfo) => {
        if (err) throw err;
        
        res.send({ teacherInfo })
      })
    })
  },
  updateClass: (req, res) => {
    Schedule.Class.findOne({ _id: req.body.classID }, (err, currClass) => {
      currClass.subject = req.body.subject;
      currClass.time = req.body.time;
      currClass.day = req.body.day;
      currClass.save((err, classInfo) => {
        if (err) throw err;
        res.send({classInfo})
      })
    })
  }
}

module.exports = ScheduleController;