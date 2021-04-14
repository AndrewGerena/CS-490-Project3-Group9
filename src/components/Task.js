import React from 'react';

export function Task( { task, toggle } ) {
    //function handleCheckbox () {
    //    toggleTask(task.id)
    //}
    
    return (
        <div>
            <label>
                <input type="checkbox" checked={task.complete} onChange={handleCheckbox => toggle(task.id)}/>
                {task.name}
            </label>
        </div>
        );
}