import React, { Component } from 'react';
import ScheduleItem from './ScheduleItem';

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      days: 5,
      name: '',
    }
  }
  
  // Get all classes for current teacher
  getClasses = () => {
    fetch('/api/allClasses')
    .then(res => {
        return res.json();
      }).then(jsonRes => {
        console.log({jsonRes});
      }).catch(err => {
        console.log({err});
      })
  }
  
  // Add a class to the teacher's schedule
  postClass = (day) => {
    fetch('/api/class', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({...this.state[day], day }),
    }
  ).then(res => {
      return res.json();
    }).then(jsonRes => {
      console.log({jsonRes});
    }).catch(err => {
      console.log({err});
    })
    
    // clear input fields for the added class
    const updatedState = { ...this.state }
    updatedState[day].subject = '';
    updatedState[day].time = '';
    this.setState(updatedState)
  }
  
  // add a teacher to the database
  postTeacher = () => {
    fetch('/api/teacher', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ teacherName: this.state.name, classes: []}),
    }
  ).then(res => {
      return res.json();
    }).then(jsonRes => {
      console.log(jsonRes.teacher._id);
    }).catch(err => {
      console.log({err});
    })
  }
  
  // track changes for the "time" input field
  timeChange = (day, event) => {
    const inputValue = {};
    if (this.state[day]){
      inputValue[day] = { ...this.state[day], time: event.target.value};
    }
    else {
      inputValue[day] = { subject: '', time: event.target.value};
    }
    this.setState({...inputValue})
  }
  
  // track changes for the "subject" input field
  subjectChange = (day, event) => {
    const inputValue = {};
    if (this.state[day]){
      inputValue[day] = { ...this.state[day], subject: event.target.value};
    }
    else {
      inputValue[day] = { time: '', subject: event.target.value};
    }
    this.setState({...inputValue})
  }
  
  // track changes for the "name" input field
  nameChange = (event) => {
    this.setState({ name: event.target.value });
  }
  
  render() {
    // create days for the users schedule
    // TODO: allow user to choose a weekly, bi-weekly, or 7 day schedule
    // then base the number of possible days on the user's scheudle type
    // ie. weekly -> 5 day schedule, bi-weekly -> 10 day schedule and 7 -> 7 day schedule
  
    const scheduleItems = [];
    for (let i=0; i < this.state.days; i++){
      scheduleItems.push(<ScheduleItem 
        key={i} 
        timeVal={this.state[i] ? this.state[i].time : ''} 
        onTimeChange={(e) => {this.timeChange(i, e)}} 
        subjectVal={this.state[i] ? this.state[i].subject : ''}
        onSubjectChange={(e) => {this.subjectChange(i, e)}}
        submitClass={() => {this.postClass(i)}} 
        />)
    }
    
    return (
      <div>
        <button onClick={this.getClasses}> Get Classes </button>
        <button onClick={this.postSchedule}> create schedule </button>
        <button onClick={this.postTeacher}> create teacher </button>
        name <input type='text' onChange={this.nameChange}/>
        {scheduleItems}
      </div>
    );
  }
}

export default App;
