import React from 'react';
import './TodoStyle.css';

export function PastTask({ task }) {
  return (
    <div className="PastTodo_Details_Wrapper">
      <span className="PastTodo_Details">{task.task}</span>
    </div>
  );
}

export default PastTask;
