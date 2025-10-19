'use client';

import React from 'react';
import styles from './navbar.module.css'

export default function Navbar({isOpen,onClose}) {
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
      <nav className={`${styles.navbar} ${isOpen ? styles.navOpen : ''}`}>
        <a href="#" className={styles.navLink}>New List</a>
        <a href="#" className={styles.navLink}>My Lists</a>
        <a href="#" className={styles.navLink}>Pending Tasks</a>
        <hr className={styles.navDivider} />
        <a href="#" className={styles.navLink}>Settings</a>
      </nav>
    </>
  );
}
