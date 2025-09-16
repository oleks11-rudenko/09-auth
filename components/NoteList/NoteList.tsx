import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button onClick={() => mutate(note.id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
