import React from 'react';
import { Task } from './Task.js';

export function TodoList({tasks}) {
    
    
    return (
        <div>
            {tasks.map((task, index) => {
                return <Task key={index} task={task} />;
            })}
        </div>
        );
}