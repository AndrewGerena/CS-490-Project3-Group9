import React from "react";

export function Task({ task, toggle }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.complete}
          onChange={(handleCheckbox) => toggle(task.id)}
        />
        {task.name}
      </label>
    </div>
  );
}
