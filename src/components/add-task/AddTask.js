import React from 'react';
import './AddTask.css';

const AddTask = props => {

     const handlernNewTask = (event) => {
          if (event.key === 'Enter'){
               props.newTask(event.target.value);
               event.target.value = "";
          }
     }

     return (
          <div className="div-input">
               <input className={"input-task"} placeholder="Write your task and enter" 
               onKeyPress={ event =>  handlernNewTask(event)} />
          </div>
     )
}
export default AddTask;