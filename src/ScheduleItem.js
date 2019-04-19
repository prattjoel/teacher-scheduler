import React from 'react';

const ScheduleItem = (props) => {
  return (
    <div>
      subject <input type='text' value={props.subjectVal}onChange={props.onSubjectChange}/>
      time <input type='text' value={props.timeVal} onChange={props.onTimeChange}/>
    </div>
  )
}

export default ScheduleItem;