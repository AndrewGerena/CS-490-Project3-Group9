import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './TodoList';
import { PastTodoList } from './PastTodoList';
import io from "socket.io-client";
import { socket } from '../App';

export function TodoPage(props) {
    const [tasks, setTasks] = useState([]);
    const taskNameRef = useRef();
    const [checkedForTasks, setCheckedForTasks] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [oldTasks, setOldTasks] = useState([]);
    
    var d = new Date();
    var month = String(d.getMonth() + 1);
    var date = String(d.getDate());
    var fullYear = String(d.getFullYear());
    var fullDate = month + date + fullYear;
    
    if (checkedForTasks === false) {
    
    // Retrieve users tasks from today.
    socket.emit('checkForTasks', { email: props.email, date: fullDate });
    setCheckedForTasks(true);
    }

    useEffect(() => {
        // Ensures current day's task list is displayed.
        socket.on('refreshCurrentTasks', (data) => {
            var taskArray = data['currentTasks'];
            setTasks(taskArray);
            console.log(taskArray);
        });
        
        //
        socket.on('refreshOldTasks', (data) => {
            var list = data['listOfOldTasks'];
            console.log(list);
            setOldTasks(list);
        });
    }, []);
    
    function clickSearchButton(){
        console.log("In clickSearchButton");
        console.log(showSearch);
        var value = !showSearch;
        console.log(value);
        setShowSearch(value);
    }
    
    function toggleTask(id, email, date) {
        socket.emit('toggleComplete', { id:id, email:email, date:date });
    }
    
    function eraseTasks(email, date) {
        socket.emit('eraseCompletedTasks', { email:email, date:date });
    }
    
    function submitTask(e) {
        e.preventDefault();
        const name = taskNameRef.current.value;
        if (name === '') return;
        taskNameRef.current.value = null;
        
        // Add a task to today's current tasks.
        socket.emit("addTask", { email: props.email, date: fullDate, task: name, completed: 0 });
    }
    
    function getSearchDate() {
            var selectMonthElement = document.querySelector('#month');
            var month = selectMonthElement.value;
            
            var selectDayElement = document.querySelector('#day');
            var day = selectDayElement.value;
            
            var selectYearElement = document.querySelector('#year');
            var year = selectYearElement.value;
            
            var searchDate = String(month) + String(day) + String(year) 
            
            socket.emit('searchDate', { email: props.email, date: searchDate });
            
            console.log(month);
            console.log(day);
            console.log(year);
            console.log(searchDate);
    }
    
    if (showSearch) {
        return (
            <div className="TodoPage_div">
                <div>Pick a date to view previous tasks:</div>
                <form className="dateForm">
                    <label for="month">Choose a month: </label>
                    <select name="month" id="month">
                    <option value="1">Jan - 01</option>
                    <option value="2">Feb - 02</option>
                    <option value="3">Mar - 03</option>
                    <option value="4">Apr - 04</option>
                    <option value="5">May - 05</option>
                    <option value="6">Jun - 06</option>
                    <option value="7">Jul - 07</option>
                    <option value="8">Aug - 08</option>
                    <option value="9">Sept - 09</option>
                    <option value="10">Oct - 10</option>
                    <option value="11">Nov - 11</option>
                    <option value="12">Dec - 12</option>
                    </select>
                    <br></br>
                    <label for="day">Choose a day: </label>
                    <select name="day" id="day">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    </select>
                    <br></br>
                    <label for="year">Choose a year: </label>
                    <select name="year" id="year">
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    </select>
                    <br></br>
                    <input type="button" value="Submit" onClick={() => getSearchDate()}/>
                </form>
                <div className="Left_Form_Wrapper">
                    <h1>Enter Your Task:</h1>
                    <form className="Todo_form">
                        <input type="text" ref={taskNameRef} placeholder="What is your Task?" autoFocus={true} className="Todo_inp" />
                        <button type="submit" onClick={submitTask} className="Todo_sub"> Add Task </button>
                    </form>
                </div>
                <div className="Todo_Divider"></div>
                <div className="Right_Form_Wrapper">
                    <div className="Task_Comp"><span className="Task_Num">{tasks.filter(task => !task.completed).length}</span> : tasks to complete today!</div>
                    <div className="Todo_Tasks"><TodoList tasks={tasks} toggle={toggleTask}/></div>
                    <button className="eraseButton" onClick={() => eraseTasks(props.email, fullDate)}>Erase Completed Tasks</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div><button className="displaySearch" onClick={() => clickSearchButton()}>Search For Past Tasks</button></div>
                <div className="Todo_Tasks"><PastTodoList tasks={oldTasks} /></div>
            </div>
            );
    }
    
    return (
        <div className="TodoPage_div">
            <div className="Left_Form_Wrapper">
                <h1>Enter Your Task:</h1>
                <form className="Todo_form">
                    <input type="text" ref={taskNameRef} placeholder="What is your Task?" autoFocus={true} className="Todo_inp" />
                    <button type="submit" onClick={submitTask} className="Todo_sub"> Add Task </button>
                </form>
            </div>
            <div className="Todo_Divider"></div>
            <div className="Right_Form_Wrapper">
                <div className="Task_Comp"><span className="Task_Num">{tasks.filter(task => !task.completed).length}</span> : tasks to complete today!</div>
                <div className="Todo_Tasks"><TodoList tasks={tasks} toggle={toggleTask}/></div>
                <button className="eraseButton" onClick={() => eraseTasks(props.email, fullDate)}>Erase Completed Tasks</button>
            </div>
            <div><button className="displaySearch" onClick={() => clickSearchButton()}>Search For Past Tasks</button></div>
        </div>
        
        );
}

export default TodoPage;
