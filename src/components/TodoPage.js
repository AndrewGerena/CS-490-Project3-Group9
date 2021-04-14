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
        <div>
            <form>
                <input type="text" ref={taskNameRef} placeholder="What is your Task?" autoFocus={true} />
                <button type="submit" onClick={submitTask} > Add Task </button>
                <TodoList tasks={tasks} toggle={toggleTask}/>
            </form>
        </div>
        );
    
}