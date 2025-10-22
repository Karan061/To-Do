'use client';

import React, { useState, useEffect } from 'react';
import styles from './TodoList.module.css';
import AddTaskForm from '../TaskForm/form';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tasksOpen,setTasksOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.todoListContainer}>
      <AddTaskForm onTaskAdded={handleTaskAdded} />

      <input
        type="text"
        placeholder="Search for a task..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading && <div className={styles.statusText}>Loading tasks...</div>}
      {error && <div className={styles.errorText}>Error: {error}</div>}
      
      {!isLoading && !error && (
        <div className={styles.todoList}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task._id} className={styles.todoItem}>
                <span className={styles.taskText}>{task.text}</span>
                <div className={styles.taskActions}>
                  <button className={`${styles.actionButton} ${styles.editButton}`}>Edit</button>
                  <button className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.statusText}>No tasks found. Add one above!</div>
          )}
        </div>
      )}
    </div>
  );
}

