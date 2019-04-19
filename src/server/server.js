const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const ScheduleController = require('./ScheduleController');

app.use(bodyParser.json());

app.get('/api/schedule/:name', ScheduleController.getSchedule)
app.post('/api/schedule', ScheduleController.createSchedule)

app.listen(8080, () => console.log('listening to 8080'));
