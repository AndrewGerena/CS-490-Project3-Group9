import React from 'react';
import { TodoList } from './TodoList.js';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


const TODOLIST_STORAGE = 'todoApp.tasks';

export function TodoPage() {
    //{id: , name: , complete: }
    const [tasks, setTasks] = useState([]);
    const taskNameRef = useRef();
    
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(TODOLIST_STORAGE));
        if(storedTasks) setTasks(storedTasks);
    }, []);
    
    useEffect(() => {
       localStorage.setItem(TODOLIST_STORAGE, JSON.stringify(tasks))
    }, [tasks]);
    
    function toggleTask(id) {
        const newTasks = [...tasks];
        const task = newTasks.find(task => task.id === id);
        task.complete = !task.complete;
        setTasks(newTasks);
    }
    
    console.log("[...tasks]");
    console.log([...tasks]);
    console.log("tasks");
    console.log(tasks);
    
    function eraseTasks() {
        const newTasks = [...tasks].filter(task => !task.complete)
        setTasks(newTasks)
    }
    
    function submitTask(e) {
        e.preventDefault();
        const name = taskNameRef.current.value;
        if (name === '') return;
        setTasks(prevTasks => {
            return [...prevTasks, {id: uuidv4(), name: name, complete: false}];
        });
        taskNameRef.current.value = null;
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