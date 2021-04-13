import React from 'react';
import { TodoList } from './TodoList.js';
import { useState} from 'react';

export function TodoPage() {
    //{id: , name: , complete: }
    const [tasks, setTasks] = useState([{ id: 1, name: 'TodoTask', complete: false }]);
    
    return (
        <div>
            <form>
                <input type="text" placeholder="What is your ToDo?" autoFocus={true} />
                <button type="submit"> Add ToDo </button>
                <TodoList tasks={tasks}/>
            </form>
        </div>
        );
    
}