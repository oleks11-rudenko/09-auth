import axios from 'axios';
import { nextServer } from './api';
import { NewNote, Note } from '@/types/note';
import { User } from '@/types/user';

export const tags: string[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export function getPageUrl(currentUrl: string) {
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl = vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000';
  return `${baseUrl}${currentUrl}`;
}

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(page: number, search: string, tag?: string | undefined) {
  const response = await axios.get<NotesHttpResponse>('/notes/', {
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
  const response = await axios.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function createNote(newNote: NewNote) {
  const response = await axios.post<Note>('/notes/', newNote);
  return response.data;
}

export async function deleteNote(noteId: Note['id']) {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export type AuthRequest = {
  email: string;
  password: string;
};

export async function register(data: AuthRequest) {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
}

export async function login(data: AuthRequest) {
  const response = await nextServer.post<User>('/auth/login', data);
  return response.data;
}

export interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession() {
  const response = await nextServer.get<CheckSessionRequest>('/auth/session');
  return response.data.success;
}

export async function getMe() {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
}

export interface EditRequest {
  email?: string;
  username?: string;
}

export async function editMe(data: EditRequest) {
  const response = await nextServer.patch<User>('/users/me', data);
  return response.data;
}

export async function logout() {
  await nextServer.post('/auth/logout');
}
