import { z } from 'zod';

/*
const Note = z.object({
  _id: z.string(),
  type: NoteType,
  text: string,
  recipient: string,
  inviteToBoardId: string,
  createdAt: string,
  updatedAt: string,
});
*/

export interface User {
  username: string;
  password: string;
  displayName: string;
  email: string;

  _id: string;
  subs: string[];
  imageURL: string;
  nameAlias: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteType = 'info' | 'invite';
export interface Note {
  _id: string;
  type: NoteType;
  text: string;
  recipient: string;
  inviteToBoardId: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {}

export interface State {
  isAuthenticated: boolean;
  notifications: Note[];
  userInfo: User;
}
