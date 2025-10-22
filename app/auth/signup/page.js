'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './signup.module.css';

export default function SignUp_Page(){
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [submitting,setSubmitting] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try{
            const response = await fetch('/api/auth/signup',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email,password}),
                }
            );
            const data = await response.json();
            if(!response.ok){
                setError(data.error || 'Unable to signup');
                return;
            }
            router.push('/auth/login');//Signup Successful go to login page
        }
        catch(err){
            console.error(err);
            setError('Something went wrong');
        }
        finally{
            setSubmitting(false);
        }
    };
    return (
    <div className={styles.container}>
      <h2 className={styles.header2}>Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
        className={styles.signup_input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
        className={styles.signup_input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <p className={styles.para}>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
    </div>
  );
}