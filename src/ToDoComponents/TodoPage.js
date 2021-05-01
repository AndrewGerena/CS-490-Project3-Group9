import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './TodoList';
import io from "socket.io-client";
import { socket } from '../App';

export function TodoPage(props) {
    const [tasks, setTasks] = useState([]);
    const taskNameRef = useRef();
    const [checkedForTasks, setCheckedForTasks] = useState(false);
    
    if (checkedForTasks === false) {
    
    // Get the current date.
    var d = new Date();
    var month = String(d.getMonth() + 1);
    var date = String(d.getDate());
    var fullYear = String(d.getFullYear());
    var fullDate = month + date + fullYear;
    
    // Retrieve users tasks from today.
    socket.emit('checkForTasks', { email: props.email, date: fullDate });
    setCheckedForTasks(true);
    }

    useEffect(() => {
        // Ensures current day's task list is displayed.
        socket.on('refreshCurrentTasks', (data) => {
          var taskArray = data['currentTasks'];
          setTasks(taskArray);
        });
    }, []);
    
    function toggleTask(id, email, date) {
        socket.emit('toggleComplete', { id:id, email:email, date:date });
    }
    
    function eraseTasks() {
        const newTasks = [...tasks].filter(task => !task.complete);
        setTasks(newTasks);
    }
    
    function submitTask(e) {
        e.preventDefault();
        const name = taskNameRef.current.value;
        if (name === '') return;
        taskNameRef.current.value = null;
        
        // Get the current date.
        var d = new Date();
        var month = String(d.getMonth() + 1);
        var date = String(d.getDate());
        var fullYear = String(d.getFullYear());
        var fullDate = month + date + fullYear;
        
        // Add a task to today's current tasks.
        socket.emit("addTask", { email: props.email, date: fullDate, task: name, completed: 0 });
    }
    
    return (
        <div className="TodoPage_div">
            <div className="Left_Form_Wrapper">
                <h1>Enter Your Task:</h1>
                <form className="Todo_form">
                    <input type="text" ref={taskNameRef} placeholder="What is your Task?" autoFocus={true} className="Todo_inp" />
                    <button type="submit" onClick={submitTask} className="Todo_sub"> Add Task </button>
                </form>
            </div>
            <div className="Todo_Divider"></div>
            <div className="Right_Form_Wrapper">
                <div className="Task_Comp"><span className="Task_Num">{tasks.filter(task => !task.complete).length}</span> : tasks to complete today!</div>
                <div className="Todo_Tasks"><TodoList tasks={tasks} toggle={toggleTask}/></div>
                <button className="eraseButton" onClick={eraseTasks}>Erase Completed Tasks</button>
            </div>
        </div>
        );
}

export default TodoPage;
