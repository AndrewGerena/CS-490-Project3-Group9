import React from 'react';
import './TodoStyle.css';

export function Task({ task, toggle }) {
  return (
      <div className = "Todo_Details_Wrapper">
        <input type="checkbox" checked={task.complete} onChange={() => toggle(task.id)} /><span className="Todo_Details">{task.task}</span>
      </div>
  );
}

export default Task;
