import { Metadata } from 'next';
import css from './NotFound.module.css';
import { getPageUrl } from '@/lib/api';

export const metadata: Metadata = {
  title: 'NoteHub - Managing online notes',
  description: "Oops! The page you're looking for doesn't exist.",
  openGraph: {
    title: 'NoteHub - Managing online notes',
    description: 'App for creating, filtering and removing notes. Created by @oleks11-rudenko',
    url: getPageUrl(''),
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
    description: "Oops! The page you're looking for doesn't exist.",
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

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
