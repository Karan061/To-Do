'use client';

import React, { useState } from 'react';
import styles from './form.module.css'

export default function AddTaskForm({ onTaskAdded }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      onTaskAdded(newTask);
      setText('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className={styles.input}
      />
      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : '+ Add Task'}
      </button>
    </form>
  );
}

