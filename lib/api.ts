import { NewNote, Note } from '@/types/note';
import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const tags: string[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteshttpResponse {
  notes: Note[];
  totalPages: number;
}

export function getPageUrl(currentUrl: string) {
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl = vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000';
  return `${baseUrl}${currentUrl}`;
}

export async function fetchNotes(page: number, search: string, tag?: string | undefined) {
  const response = await axios.get<NoteshttpResponse>('notes/', {
    params: {
      ...(search !== '' && { search }),
      tag,
      page,
      perPage: 12,
    },
  });
  return response.data;
}

export async function fetchNoteById(noteId: Note['id']) {
  const response = await axios.get<Note>(`notes/${noteId}`);
  return response.data;
}

export async function createNote(newNote: NewNote) {
  const response = await axios.post<Note>('notes/', newNote);
  return response.data;
}

export async function deleteNote(noteId: Note['id']) {
  const response = await axios.delete<Note>(`notes/${noteId}`);
  return response.data;
}
