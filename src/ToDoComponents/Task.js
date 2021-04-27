import React from 'react';

export function Task({ task, toggle }) {
  return (
        <div className="Todo_List">
          <input type="checkbox" checked={task.complete} onChange={() => toggle(task.id)} />
          {task.name}
        </div>
  );
}

export default Task;
