import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { getPageUrl } from '@/lib/api';

export const metadata: Metadata = {
  title: 'NoteHub - Managing online notes',
  description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
  openGraph: {
    title: 'NoteHub - Managing online notes',
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
    url: getPageUrl('/notes/action/create'),
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
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
