'use client';

import React, { useState } from 'react';
import styles from './todo.module.css';

const defaultTasks = [
  'Finalise the work',
  'Drink water',
  'Push it to github',
  'Take a break',
];

export default function TodoList() {
  const [tasks, setTasks] = useState(defaultTasks);
  return (
    <div className={styles.todoListContainer}>
      <div className={styles.todoList}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.todoItem}>
            {task}
          </div>
        ))}
      </div>
    </div>
  );
}