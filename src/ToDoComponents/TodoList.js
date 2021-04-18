import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

export function TodoList({ tasks, toggle }) {
  return (
    <div>
      {tasks.map((task) => <Task key={task.id} task={task} toggle={toggle} />)}
    </div>
  );
}

export default TodoList;

TodoList.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.object()).isRequired,
  toggle: PropTypes.func.isRequired,
};
