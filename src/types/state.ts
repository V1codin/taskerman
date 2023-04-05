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

export type TUserHeaderProps = Omit<OmitedSafeUser, 'subs'>;
