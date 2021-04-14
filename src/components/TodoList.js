import React from 'react';
import { Task } from './Task.js';

export function TodoList({tasks}) {
    
    console.log(tasks);
    
    return (
        <div>
            
            {tasks.map((task) => {
                return <Task key={task.id} task={task} />;
            })}
        </div>
        );
}