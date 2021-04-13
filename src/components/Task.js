import React from 'react';

export function Task( { task } ) {
    return (
        <div>
            <label>
                <input type="checkbox" checked={task.complete} />
                {task.name}
            </label>
        </div>
        );
}