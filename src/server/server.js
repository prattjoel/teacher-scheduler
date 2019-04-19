const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const ScheduleController = require('./ScheduleController');

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/allClasses', ScheduleController.getClasses);
app.post('/api/teacher', ScheduleController.createTeacher);
app.post('/api/class', ScheduleController.createClass, ScheduleController.addTeacherClass);
app.delete('/api/class', ScheduleController.deleteClass, ScheduleController.deleteTeacherClass);
app.put('/api/class', ScheduleController.updateClass);

const port = 8080
app.listen(port, () => console.log(`listening to port ${port}` ));
