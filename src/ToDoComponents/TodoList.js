import React from 'react';
import { Task } from './Task';



export function TodoList({tasks, toggle}) {
    
    console.log(tasks);
    
    return (
        <div>
            {tasks.map((task) => {
                return <Task task={task} toggle={toggle} className="TodoTasks"/>;
            })}
        </div>
        );
} //key={task.id}
