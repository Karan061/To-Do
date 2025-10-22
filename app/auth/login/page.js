'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './login.module.css';

export default function Login_Page(){
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [submitting,setSubmitting] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try{
            const response = await fetch('/api/auth/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({email,password}),
            });
            const data = await response.json();
            if(!response.ok){
                setError(data.error || 'Unable to Login');
                return;
            }
            localStorage.setItem('isLoggedIn','true');
            router.push('/');
        }
        catch(err){
            console.error(err);
            setError('Something went wrong');
        }
        finally{
            setSubmitting(false);
        }
    }
    return (
    <div className={styles.container}>
      <h2 className={styles.header2}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
            className={styles.login_input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            className={styles.login_input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            {error && <p className={styles.error}>{error}</p>}
                <button className={styles.button} type="submit" disabled={submitting}>
                   {submitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className={styles.para}>
                Don't have an account? <a href="/auth/signup">Sign up</a>
            </p>
        </div>
    );
}