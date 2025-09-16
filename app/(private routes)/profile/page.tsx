import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: 'NoteHub - Managing online notes',
    description: `This is your profile ${user.username}. Created by @oleks11-rudenko`,
    openGraph: {
      title: 'NoteHub - Managing online notes',
      description: `This is your profile ${user.username}. Created by @oleks11-rudenko`,
      siteName: 'NoteHub',
      type: 'website',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub - Managing online notes',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NoteHub - Managing online notes',
      description: `This is your profile ${user.username}. Created by @oleks11-rudenko`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub - Managing online notes',
        },
      ],
    },
  };
}

export default async function ProfilePage() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
