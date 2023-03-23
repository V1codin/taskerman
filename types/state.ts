import { z } from 'zod';
import { masks, warns } from '@/utils/helpers';
import { TUserDataClient } from './db';

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

/*
export const signInLoginSchema = z
  .object({
    username: z.string().regex(masks.username),
    password: z.string().regex(masks.password),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords should match',
      });
    }
  });
  */

export const userLoginSchema = z.object({
  username: z.string().regex(masks.username, {
    message: warns.username,
  }),
  password: z.string().regex(masks.password, {
    message: warns.password,
  }),
});

export type TUserLogin = z.infer<typeof userLoginSchema>;

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

export interface State {
  isAuthenticated: boolean;
  notifications: Note[];
  userInfo: TUserDataClient;
}

export type TModalView = 'login' | 'signup' | 'resetPassword';
export interface AuthModal {
  isOpen: boolean;
  view: TModalView;
}
