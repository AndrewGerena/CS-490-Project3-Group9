import React from 'react';
import { PastTask } from './PastTask';

export function PastTodoList({tasks}) {
    
    console.log(tasks);
    
    if (tasks.length === 0) { 
        console.log("Array is empty!") 
        return (
            <div>
                <h4>"There are no past tasks from this day!"</h4>
            </div>
            );
    }
    
    return (
        <div>
            {tasks.map((task) => {
                return <PastTask key={task.id} task={task} className="TodoTasks"/>;
            })}
        </div>
        );
} 
