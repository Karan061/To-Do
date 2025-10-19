'use client';

import React from "react";
import styles from './ThemeButton.module.css';

export default function ThemeButton({ currentTheme, onToggleTheme }) {
    const nextTheme = currentTheme === 'dark' ? 'Light' : 'Dark';
    return(
        <button onClick={onToggleTheme} className={styles.theme}>
            Change to {nextTheme} Mode
        </button>
    );
}
