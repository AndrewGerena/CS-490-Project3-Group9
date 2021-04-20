import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './TodoList';

const TODOLIST_STORAGE = 'todoApp.tasks';

export function TodoPage() {
  // {id: , name: , complete: }
  const [tasks, setTasks] = useState([]);
  const taskNameRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const storedTasks = JSON.parse(localStorage.getItem(TODOLIST_STORAGE));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(TODOLIST_STORAGE, JSON.stringify(tasks));
  }, [tasks]);

  function toggleTask(id) {
    const newTasks = [...tasks];
    const theTask = newTasks.find((task) => task.id === id);
    theTask.complete = !theTask.complete;
    setTasks(newTasks);
  }

  console.log('[...tasks]');
  console.log([...tasks]);
  console.log('tasks');
  console.log(tasks);

  function eraseTasks() {
    const newTasks = [...tasks].filter((task) => !task.complete);
    setTasks(newTasks);
  }

  function submitTask(e) {
    e.preventDefault();
    const name = taskNameRef.current.value;
    if (name === '') return;
    setTasks((prevTasks) => [...prevTasks, { id: uuidv4(), name, complete: false }]);
    taskNameRef.current.value = null;
  }

  return (
    <div>
      <form>
        <input type="text" ref={taskNameRef} placeholder="What is your Task?" />
        <button type="submit" onClick={submitTask}> Add Task </button>
      </form>
      <TodoList tasks={tasks} toggle={toggleTask} />
      <button type="button" onClick={eraseTasks}>Erase Completed Tasks</button>
      <div>
        {tasks.filter((task) => !task.complete).length}
        {' '}
        tasks to complete today!
      </div>
    </div>
  );
}

export default TodoPage;
