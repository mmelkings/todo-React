import React from 'react';
import './TaskList.css';
import { FiPlay, FiCheck, FiEdit2 } from 'react-icons/fi';

const TaskList = ({ doneEvent, editEvent, task, startEvent}) => {

    const handleDone = () => {
        doneEvent(task)
    }

    const handleEdit = () => {
        editEvent(task)
    }

    const handleStart = () => {
        startEvent(task)
    }


    return (
        <div className={"card card-"+ (task.type)}>
            <div>
                {  task.status === 'INPROCESS' &&  <button className={"btn"} onClick={handleDone}> <FiCheck/> </button> }
                {  task.status === 'TODO' &&  <button className={"btn"} onClick={handleStart}> <FiPlay /> </button> }

                <button className={"btn"} onClick={handleEdit}> <FiEdit2/> </button>

                <label className={"text"}>{task.description}</label>
            </div>

        </div>
    )
}

export default TaskList;