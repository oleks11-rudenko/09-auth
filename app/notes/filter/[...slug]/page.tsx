import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes, getPageUrl } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';

interface NotesProps {
  params: Promise<{ slug: Tag[] }>;
}

export async function generateMetadata({ params }: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const descriptions = {
    All: 'Browse all your notes in one place. Stay organized and access everything instantly with NoteHub.',
    Work: 'Manage and share your work notes with ease. Stay productive and organized using Notehub.',
    Todo: 'Keep track of your tasks and to-dos effortlessly. NoteHub helps you stay on top of your list.',
    Personal:
      'Store and organize your personal notes securely. NoteHub makes it simple and private.',
    Meeting: 'Capture and share meeting notes instantly. Stay aligned and productive with NoteHub.',
    Shopping:
      'Plan and manage your shopping lists in seconds. NoteHub keeps your essentials organized.',
  };
  return {
    title: 'NoteHub - Managing online notes',
    description: descriptions[slug[0]],
    openGraph: {
      title: 'NoteHub - Managing online notes',
      description: descriptions[slug[0]],
      url: getPageUrl(`/notes/filter/${slug[0]}`),
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
      description: descriptions[slug[0]],
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

export default async function Notes({ params }: NotesProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, search: '', tag }],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
