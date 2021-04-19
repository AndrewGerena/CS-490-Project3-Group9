import React from 'react';
import PropTypes from 'prop-types';

export function Task({ task, toggle }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.complete}
        onChange={() => toggle(task.id)}
      />
      {task.name }
    </div>
  );
}

// Task.propTypes = {
//  task: PropTypes.objectOf(PropTypes.object()).isRequired,
//  toggle: PropTypes.func.isRequired,
// };

export default Task;
