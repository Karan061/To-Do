import React from 'react';
import styles from './page.module.css';

const defaultTasks = [
  'Outline the week\'s top 3 goals',
  'Schedule a 15-minute daily cleanup',
  'Read one article related to your career',
  'Plan tomorrow\'s healthy meals',
  'Unsubscribe from 5 marketing emails',
  'Listen to a new podcast episode',
  'Write down one thing you\'re grateful for',
  'Stretch for 10 minutes',
  'Review your monthly budget',
  'Learn a new keyboard shortcut',
  'Organize your computer\'s desktop',
  'Water your house plants',
];

export default function HomePage() {
  return (
    <div>
    <main className={styles.container}>
      <div className={styles.todoList}>
        {defaultTasks.map((task, index) => (
          <div key={index} className={styles.todoItem}>
            {task}
          </div>
        ))}
      </div>
    </main>
    </div>
  );
}

