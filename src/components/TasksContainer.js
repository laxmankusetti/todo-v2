import React, { useState } from 'react';
import crossIcon from '../images/icon-cross.svg';
import { nanoid } from 'nanoid';

const TasksContainer = () => {
    
    const [tasks, setTasks] = useState([]);
    const [userInp, setUserInp] = useState('');
    const [category, setCategory] = useState('');

    const handleCategory = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const getFilteredTasks = () => {
        switch (category) {
            case 'completed':
                return tasks.filter(task => task.isCompleted)
            case 'active':
                return tasks.filter(task => !task.isCompleted);
            default:
                return tasks;
        }
    };

    const handleCheckboxChange = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((prevTask) =>
                prevTask.id === taskId
                    ? { ...prevTask, isCompleted: !prevTask.isCompleted }
                    : prevTask
            )
        );
    };

    function handleCrossIcon(taskId){
        let remainTasks = tasks.filter(task => task.id !== taskId)
        setTasks(remainTasks)
    }

    const tasksToRender = getFilteredTasks();

    const tasksList = tasksToRender.map(task => (
        <li className='task' key={task.id} draggable>
            <div className='task-check-content-container'>
                <input
                    type='checkbox'
                    id={`task-check`}
                    checked={task.isCompleted}
                    onChange={() => handleCheckboxChange(task.id)}
                />
                <span className='task-content'>{task.content}</span>
            </div>
            <img src={crossIcon} alt='cross-icon' id='cross-icon' onClick={() => {handleCrossIcon(task.id)}}/>
        </li>
    ));

    let message = '';

    if (category === 'completed' && tasksToRender.length === 0) {
        message = 'No completed tasks found. Keep adding and completing tasks!';
    }
    return (
        <div className='tasks-container'>
            <div className='input-addBtn-container'>
                <input
                    type='text'
                    placeholder='Enter your daily tasks here...'
                    value={userInp}
                    onChange={(e) => setUserInp(e.target.value)}
                    id='userInp'
                />
                <button
                    className='add-btn'
                    onClick={() => {
                        setTasks((prevTasks) => [
                            ...prevTasks,
                            {
                                id: nanoid(),
                                content: userInp,
                                isCompleted: false,
                            },
                        ]);
                        setUserInp('');
                    }}
                >
                    Add Task
                </button>
            </div>

            <ul className='tasks'>{tasksList}</ul>

            {tasksToRender.length ? (
                <div className='categories-container'>
                    <span className={`all ${category === 'all' ? 'clicked' : ''}`} onClick={() => handleCategory('all')}>all</span>
                    <span className={`completed ${category === 'completed' ? 'clicked' : ''}`} onClick={() => handleCategory('completed')}>completed</span>
                    <span className={`active ${category === 'active' ? 'clicked' : ''}`} onClick={() => handleCategory('active')}>active</span>
                </div>
            ) : (
                <h4 className='add-tasks-as-complete-msg'>{message}</h4>
            )}
        </div>
    );
};

export default TasksContainer;
