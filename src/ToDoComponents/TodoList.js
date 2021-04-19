import React from 'react';
import { Task } from './Task';

export function TodoList({ tasks, toggle }) {
  console.log(tasks);

  return (
    <div>
      {tasks.map((task) => <Task key={task.id} task={task} toggle={toggle} />)}
    </div>
  );
}

export default TodoList;

