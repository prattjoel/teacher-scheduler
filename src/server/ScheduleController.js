const Schedule = require('../database/ScheduleModel');

const ScheduleController = {

  createTeacher: (req, res) => {
    const newTeacher = new Schedule.Teacher(req.body)
    
    newTeacher.save((err, teacher) => {
      if (err) throw err
      res.cookie('teacherID', teacher._id)
      res.send({teacher})
    })
  },
  createClass:(req, res, next) => {
    const newClass = new Schedule.SchoolClass({ ...req.body, teacherID: req.cookies.teacherID})
    
    newClass.save((err, classInfo) => {
      if (err) return console.error(err);
      res.locals.addedClass = classInfo;
      next()
    })
  },
  getClasses: (req, res) => {
    Schedule.SchoolClass.find({ teacherID: req.cookies.teacherID }, (err, classes) => {
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
    Schedule.SchoolClass.deleteOne({ _id: req.body.classID }, (err) => {
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
    Schedule.SchoolClass.findOne({ _id: req.body.classID }, (err, currClass) => {
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