import tasksData from '../data/Todo_tasks.json';
import React, { useState } from 'react';
import '../styles/TodoList.css';

const TodoList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);
    const [sortField, setSortField] = useState('task_id');
    const [selectedTasks, setSelectedTasks] = useState(new Set());

    const sortedTasks = [...tasksData].sort((a, b) => a[sortField].localeCompare(b[sortField]));

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

    const handleTaskSelect = (task_id) => {
        const newSelectedTasks = new Set(selectedTasks);
        if (newSelectedTasks.has(task_id)) {
            newSelectedTasks.delete(task_id);
        } else {
            newSelectedTasks.add(task_id);
        }
        setSelectedTasks(newSelectedTasks);
    };

    const getIcon = (type, value) => {
        let iconPath = '';
        if (type === 'status') {
            if (value === 'Done') {
                iconPath = 'done.png';
            } else if (value === 'Todo') {
                iconPath = 'todo.png';
            } else if (value === 'Canceled') {
                iconPath = 'canceled.png';
            } else if (value === 'In Progress') {
                iconPath = 'inprogress.png';
            } else if (value === 'Backlog') {
                iconPath = 'backlog.png';
            }
        } else if (type === 'priority') {
            if (value === 'High') {
                iconPath = 'high.png';
            } else if (value === 'Medium') {
                iconPath = 'medium.png';
            } else if (value === 'Low') {
                iconPath = 'low.png';
            }
        }
        return <img src={iconPath} className='taskIcons' alt={`${type} ${value}`} />;
    }

    return (
        <div className='TodoList'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => setSortField('task_id')}>Task ID</th>
                        <th onClick={() => setSortField('task_name')}>Task Name</th>
                        <th onClick={() => setSortField('status')}>Status</th>
                        <th onClick={() => setSortField('priority')}>Priority</th>
                        <th onClick={() => setSortField('category')}>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map((task, index) => (
                        <tr key={index}>
                            <td><input type='checkbox' checked={selectedTasks.has(task.task_id)} onChange={() => handleTaskSelect(task.task_id)} /></td>
                            <td>{task.task_id}</td>
                            <td>{task.task_name}</td>
                            <td>{getIcon('status', task.status)} {task.status} </td>
                            <td>{getIcon('priority', task.priority)} {task.priority}</td>
                            <td><span className="category-pill">{task.category}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}><img src='back.png' alt='first' className='pagination-btn' /></button>
                <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}><img src='prev.png' alt='previous' className='pagination-btn' /></button>
                <span>Page {currentPage} of {Math.ceil(tasksData.length / tasksPerPage)}</span>
                <button onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(tasksData.length / tasksPerPage)))} disabled={currentPage === Math.ceil(tasksData.length / tasksPerPage)}><img alt='next' src='next.png' className='pagination-btn' /></button>
                <button onClick={() => setCurrentPage(Math.ceil(tasksData.length / tasksPerPage))} disabled={currentPage === Math.ceil(tasksData.length / tasksPerPage)}><img alt='last' src='front.png' className='pagination-btn' /></button>
            </div>
            <p><a target='_blank' href='https://github.com/PelleNIlsen/Todo-list-design'>View code on github</a></p>
        </div>
    )
}

export default TodoList