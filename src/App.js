import React, { Component } from 'react';
import ScheduleItem from './ScheduleItem';
// import './App.css';

class App extends Component {
  constructor (props){
    super(props)
    this.state = {
      days: 5,
      name: '',
      teacherID: ''
    }
  }
  getSchedule = () => {
    fetch(`/api/schedule/${this.state.name}`).then(res => {
      // console.log({res});
      return res.json();
    }).then(jsonRes => {
      console.log({jsonRes});
      
    }).catch(err => {
      console.log({err});
    })
    console.log(this.state);
  }
  
  // postSchedule = () => {
  //   const scheduleDays = [];
  //   const updatedState = {...this.state}
  //   for (let i=0; i<this.state.days; i++){
  //     scheduleDays.push({...this.state[i], day: i, teacherID: this.state.teacherID });
  //     updatedState[i] = { subject: '', time: '' };
  //   }
  //   this.setState(updatedState)
  //   fetch('/api/schedule', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify({ classes: scheduleDays }),
  //   }
  // ).then(res => {
  //     return res.json();
  //   }).then(jsonRes => {
  //     console.log({jsonRes});
  //   }).catch(err => {
  //     console.log({err});
  //   })
  // }
  
  postClass = (day) => {
    // const scheduleDays = [];
    // const updatedState = {...this.state}
    // for (let i=0; i<this.state.days; i++){
    //   scheduleDays.push({...this.state[i], day: i, teacherID: this.state.teacherID });
    //   updatedState[i] = { subject: '', time: '' };
    // }
    // this.setState(updatedState)
    const newClass = { newClass: {...this.state[day], day, teacherID: this.state.teacherID }}
    console.log('posting class');
    fetch('/api/class', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newClass),
    }
  ).then(res => {
      return res.json();
    }).then(jsonRes => {
      console.log({jsonRes});
    }).catch(err => {
      console.log({err});
    })
    
    const updatedState = { ...this.state }
    updatedState[day].subject = '';
    updatedState[day].time = '';
    this.setState(updatedState)
  }
  
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
      this.setState({ teacherID: jsonRes.teacher._id})
    }).catch(err => {
      console.log({err});
    })
  }
  
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
  
  subjectChange = (day, event) => {
    const inputValue = {};
    // inputValue[day] = { ...this.state, subject: event.target.value};
    if (this.state[day]){
      inputValue[day] = { ...this.state[day], subject: event.target.value};
    }
    else {
      inputValue[day] = { time: '', subject: event.target.value};
    }
    this.setState({...inputValue})
  }
  
  nameChange = (event) => {
    this.setState({ name: event.target.value });
  }
  
  render() {
    const items = [];
    for (let i=0; i<this.state.days; i++){
      items.push(<ScheduleItem 
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
      Whatup world
      <button onClick={this.getSchedule}> get schedule </button>
      <button onClick={this.postSchedule}> create schedule </button>
      <button onClick={this.postTeacher}> create teacher </button>
      name <input type='text' onChange={this.nameChange}/>
      {items}
      </div>
    );
  }
}

export default App;
