export type Tag = 'All' | 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: Tag;
}

export type NewNote = {
  title: string;
  content?: string;
  tag: Tag;
};
