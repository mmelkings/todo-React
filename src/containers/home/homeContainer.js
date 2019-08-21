import React, {Component} from 'react';
import './homeContainer.css';
import AddTask from '../../components/add-task/AddTask';
import TaskList from '../../components/task-list/TaskList';
import TaskDetails from '../../components/details/TaskDetails';
import { listTask, createTask, updateTask, deleteTask } from './../../services/taskService'

class HomeContainer extends Component{

    state = {
        edit: false,
        taskEdit: {},
        todoTasks : [],
        inProcessTasks: [],
        doneTasks: []
    }


  
    componentDidMount(){
        this.listAllTasks();
    }

    listAllTasks = () => {
        Promise.all([listTask('TODO'), listTask('INPROCESS'), listTask('DONE')])
        .then(values => {
            this.setState({
                todoTasks : values[0],
                inProcessTasks: values[1],
                doneTasks: values[2]
            });
        })
    }

    handleNewTask = (event) => {
        createTask({description: event}).then(json => {
            this.listAllTasks();
        })
        .catch(error => console.error(error))
    }

    handleDone = (task) => {
        updateTask(task._id, {status: 'DONE'}).then(json => {
            this.listAllTasks();
        })
        .catch(error =>  console.log(error));
    }


    handleStart = (task) => {
        updateTask(task._id, {status: 'INPROCESS'}).then(json => {
            this.listAllTasks();
        })
        .catch(error =>  console.log(error));
    }

    handleEdit = (task) => {
        if(this.setState){
            this.setState({edit: false}, ()=> {
                this.setState({
                    edit: true,
                    taskEdit: task
                })
            })
        }else{
            this.setState({
                edit: true,
                taskEdit: task
            });
        }
    }

    handleSaveChanges = (event) => {
        updateTask(event._id, event).then(json => {
            this.setState({edit: false}, ()=> this.listAllTasks())
        })
        .catch(error =>  console.log(error));
    }

    handleDelete = (id) => {
        deleteTask(id).then(json => {
            this.setState({edit: false}, ()=> this.listAllTasks())
        })
        .catch(error =>  console.log(error));
    }

    render(){
        const { todoTasks, inProcessTasks, doneTasks, edit, taskEdit} = this.state;

        return (
            <div className={"wrapper"}>

                <div className={"container"}>

                    <h1 className={"title"}>To-do list</h1>
                    <AddTask newTask={this.handleNewTask} />
                   

                    { inProcessTasks.length > 0 &&
                        <div className="container-tasks">
                            <h2 className={"subtitle"}> Doing </h2>
                            { inProcessTasks.map( (item, index) => 
                                <TaskList task={item}  key={index}  doneEvent={this.handleDone} editEvent={this.handleEdit} /> )
                            }
                        </div>
                    }

                    { todoTasks.length > 0 &&
                        <div className="container-tasks">
                            <h2 className={"subtitle"}> To do </h2>
                            { todoTasks.map( (item, index) => 
                                <TaskList task={item}  key={index}  startEvent={this.handleStart} editEvent={this.handleEdit} /> )
                            }
                        </div>
                    }

                    { doneTasks.length > 0 &&
                        <div className="container-tasks">
                            <h2 className={"subtitle"}> Done </h2>
                            { doneTasks.map((task, index) => 
                                <div className={"card done card-"+ (task.type)} key={index}>{task.description}</div>
                            )}
                        </div>
                    }

                    { inProcessTasks.length === 0 && todoTasks.length === 0 && doneTasks.length === 0 && 
                        <div className="container-tasks">
                            <h2 className={"subtitle"}> You don't have tasks yet</h2>
                        </div>
                    }

                </div>

            <div className={"details"}>
            

            { edit && <TaskDetails task={taskEdit} saveEvent={this.handleSaveChanges} deleteEvent={this.handleDelete}/>}
            </div>
            
            
            </div>
        )
    }

}

export default HomeContainer;

/**
 * 
            { tasks.filter( task => task.status === 'INPROCESS').map( (item, index) => 
                <TaskList task={item}  key={index}  doneEvent={this.handleDone} editEvent={this.handleEdit} /> )
            }
 */