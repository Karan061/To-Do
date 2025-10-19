'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.js';
import TodoList from './components/TodoList/TodoList.js';
import ThemeButton from './components/ThemeButton/ThemeButton.js';
import styles from './css/page.module.css';
import navstyles from './components/Navbar/navbar.module.css';

export default function HomePage() {
  const [theme, setTheme] = useState('dark');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(currentValue => !currentValue);
  };
  const toggleTheme = () => {
    setTheme(currentValue => (currentValue === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <button 
        className={navstyles.menuButton} 
        onClick={toggleNav}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          className={navstyles.hamburger} 
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
      </button>

      <Navbar 
        isOpen={isNavOpen} 
        onClose={toggleNav} 
      />
      <ThemeButton 
          currentTheme={theme}
          onToggleTheme={toggleTheme}
        />
      <main className={styles.container}>
        <TodoList />
      </main>
    </div>
  );
}

