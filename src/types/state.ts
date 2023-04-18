import { z } from 'zod';

import type { SessionUser, TUserDataClient } from './db';
import type { IMasks } from '@/types/helpers';

const masks: IMasks = {
  username: /^[a-zA-Z0-9]{4,16}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  confirmPassword: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  displayName: /^[A-Z]{1}\w{1,10}\s{1}[A-Z]{1}\w{1,11}$/,
  email: /^[a-zA-Z\d]{1,15}@[a-z]{1,9}\.{1}([a-z]{2,4}){1}$/,
};

const warns = {
  username: 'Username must be from 4 to 16 numbers of latin characters',
  password:
    'Your password must be 4-16 characters, and include at least one number.',
  displayName:
    'Enter your name and surname divided by space. First letters are capital :)',
  confirmPassword: 'Passwords should match',
  email: 'Invalid email',
};

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

export const userLoginSchema = z.object({
  username: z.string().regex(masks.username, {
    message: warns.username,
  }),
  password: z.string().regex(masks.password, {
    message: warns.password,
  }),
});

export const credentialsSignUpSchema = z
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

export namespace AuthClient {
  export type TUserLogin = z.infer<typeof userLoginSchema>;
  export type TUserSignUp = z.infer<typeof credentialsSignUpSchema>;

  export type TSignUpBodyReducer<T extends TSignUp> = T extends 'credentials'
    ? TUserSignUp
    : // TODO body for google auth type etc.
      never;
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

export interface State {
  isAuthenticated: boolean;
  notifications: Note[];
  userInfo: TUserDataClient;
}

export type TEntities = 'board' | 'list' | 'card';

export type TModalAuth = 'auth';
export type TModalCreate = 'create';
export type TModalDelete = 'delete';

export type TMenuCreateModalNames = `create_${TEntities}`;
export type TMenuDeleteModalNames = `delete_${TEntities}`;

export type TAuthForms = 'login' | 'signup' | 'resetPassword';
export type TModalForms =
  | TAuthForms
  | TMenuCreateModalNames
  | TMenuDeleteModalNames;

export type TAuthModalData = {};
export type TCreateModalData = {};
export type TDeleteModalData = {
  id: string;
  text?: string;
  entity: TEntities;
};

export type IModalWindow =
  | {
      type: TModalAuth;
      view: TAuthForms;
      data?: TAuthModalData;
    }
  | {
      type: TModalCreate;
      view: TMenuCreateModalNames;
      data?: TCreateModalData;
    }
  | {
      type: TModalDelete;
      view: TMenuDeleteModalNames;
      data?: TDeleteModalData;
    };

export interface IModal<T extends boolean> {
  isOpen: T;
  window: T extends true ? IModalWindow : null;
}

export type TUserHeaderProps = Omit<SessionUser, 'subs'>;
