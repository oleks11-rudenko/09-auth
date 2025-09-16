import { cookies } from 'next/headers';
import { nextServer } from './api';
import { NotesHttpResponse } from './clientApi';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export const fetchServerNotes = async (
  page: number,
  search: string,
  tag?: string | undefined
): Promise<NotesHttpResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesHttpResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      tag,
      page,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
