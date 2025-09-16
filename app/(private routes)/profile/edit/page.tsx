'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { AuthRequest, editMe } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;
      const response = await editMe(formValues);
      if (response) {
        setUser(response);
        router.push('/profile');
      } else {
        setError('Error occured while editing your profile');
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error.response?.data?.error ?? error.message ?? 'Oops... some error');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {user ? (
          <>
            <h1 className={css.formTitle}>Edit Profile</h1>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
            <form className={css.profileInfo} action={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username: {user?.username}:</label>
                <input
                  name="username"
                  type="text"
                  id="username"
                  className={css.input}
                  defaultValue={user.username}
                />
              </div>
              <div className={css.usernameWrapper}>
                <label htmlFor="email">Email: {user?.email}:</label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  className={css.input}
                  defaultValue={user.email}
                  disabled
                />
              </div>
              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={() => router.push('/profile')}
                >
                  Cancel
                </button>
              </div>
              {error && <p className={css.error}>{error}</p>}
            </form>
          </>
        ) : (
          <p>Loading your profile....</p>
        )}
      </div>
    </main>
  );
}
