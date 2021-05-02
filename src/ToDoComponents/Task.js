import React from 'react';
import './TodoStyle.css';

export function Task({ task, toggle }) {
  return (
      <div className = "Todo_Details_Wrapper">
        <input type="checkbox" checked={task.completed} onChange={() => toggle(task.id, task.email, task.date)} /><span className="Todo_Details">{task.task}</span>
      </div>                                          // Remember you are using date of the task, not current date! This is dangerous.
  );
}

export default Task;
