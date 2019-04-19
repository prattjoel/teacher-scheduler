import React, { Component } from 'react';
// import './App.css';

class App extends Component {
  
  getSchedule = () => {
    fetch('/api/schedule').then(res => {
      console.log({res});
      return res.json();
    }).then(jsonRes => {
      console.log({jsonRes});
    }).catch(err => {
      console.log({err});
    })
  }
  
  postSchedule = () => {
    fetch('/api/schedule', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ teacherName: "name 3", days: [{ subject: 'math', time: Date.now() }]}),
    }
  ).then(res => {
      // console.log({res});
      return res.json();
    }).then(jsonRes => {
      console.log({jsonRes});
    }).catch(err => {
      console.log({err});
    })
  }
  
  render() {
    return (
      <div>
      Whatup world
      <button onClick={this.getSchedule}> get schedule </button>
      <button onClick={this.postSchedule}> create schedule </button>
      </div>
    );
  }
}

export default App;
