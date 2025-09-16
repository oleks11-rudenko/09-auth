'use client';

import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { AuthRequest, login } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;
      const response = await login(formValues);
      if (response) {
        setUser(response);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.error ?? error.message ?? 'Oops... some error');
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
}
