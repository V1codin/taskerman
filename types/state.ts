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

export type TMenuModalNames = 'create_board';
export type TAuthForms = 'login' | 'signup' | 'resetPassword';
export type TModalForms = TAuthForms | TMenuModalNames;
export type TModalTypes = 'auth' | 'create';

type ModalsReducer = {
  [K in TModalTypes]: K extends 'auth'
    ? TAuthForms
    : K extends 'create'
    ? TMenuModalNames
    : never;
};

export type TModalView<T extends boolean, K extends unknown> = T extends true
  ? K extends TModalTypes
    ? ModalsReducer[K]
    : null
  : null;

export interface IModal<T extends boolean, K = TModalTypes> {
  isOpen: T;
  type: T extends true ? K : null;
  view: TModalView<T, K>;
}

export interface IAuthModal {
  isOpen: true;
  type: 'auth';
  view: TAuthForms;
}

export interface ICreateBoardModal {
  isOpen: true;
  type: 'create';
  view: TMenuModalNames;
}

export type TModalUpdates = IAuthModal | ICreateBoardModal | IModal<false>;

export type TUserHeaderProps = Omit<OmitedSafeUser, 'subs'>;
