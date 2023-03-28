import { z } from 'zod';
import { masks, warns } from '@/utils/helpers';
import { OmitedSafeUser, TUserDataClient } from './db';

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

export const userSignUpSchema = z
  .object({
    username: z.string().regex(masks.username, {
      message: warns.username,
    }),
    password: z.string().regex(masks.password, {
      message: warns.password,
    }),
    confirmPassword: z.string().regex(masks.confirmPassword, {
      message: warns.confirmPassword,
    }),
    displayName: z.string().regex(masks.displayName, {
      message: warns.displayName,
    }),
    email: z.string().regex(masks.email, {
      message: warns.email,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: warns.confirmPassword,
    path: ['confirmPassword'],
  });

export type TUserLogin = z.infer<typeof userLoginSchema>;
export type TUserSignUp = z.infer<typeof userSignUpSchema>;

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

export type TError = {
  message: string;
  code: number;
};

export type TAuthTypes = 'google';

export type TAuthForms = 'login' | 'signup' | 'resetPassword';

export type TModalView<T extends boolean> = T extends true ? TAuthForms : '';
export interface AuthModal<T extends boolean> {
  isOpen: T;
  view: TModalView<T>;
}

export type TUserHeaderProps = Omit<OmitedSafeUser, 'subs'>;
