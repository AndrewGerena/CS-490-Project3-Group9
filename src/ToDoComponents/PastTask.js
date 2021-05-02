import React from 'react';
import './TodoStyle.css';

export function PastTask({ task, toggle }) {
  return (
      <div className = "Todo_Details_Wrapper">
        <span className="Todo_Details">{task.task}</span>
      </div>                                
  );
}

export default PastTask;
