'use client';

import React, { useState, useEffect } from 'react';
import ThemeButton from './components/ThemeButton/ThemeButton.js';
import styles from './css/page.module.css';
import { useRouter } from 'next/navigation.js';

export default function HomePage() {
  const router = useRouter();
  const [theme, setTheme] = useState('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    if (!storedLogin) {
      router.push('/auth/login');
    }
    else{
      setIsLoggedIn(true);
    }
  }, [router]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div>
      <ThemeButton currentTheme={theme} onToggleTheme={toggleTheme} />
      <main className={styles.container}>
        {isLoggedIn === null ? (
        <p>Checking login...</p>
        ) : isLoggedIn ? (
        <h1>Welcome back!</h1>
        ) : (
    <p>Redirecting...</p>
  )}
</main>

    </div>
  );
}
