export interface IMasks {
  username: RegExp;
  password: RegExp;
  displayName: RegExp;
  email: RegExp;
}

export type TOAuth = ['google'];

export type TToasts = 'conflict' | 'warning' | 'notification';

export type ToastComponentProps = {
  message: string;
  typeClass?: TToasts;
};
export type ToastProps = {
  timeout?: number;
} & ToastComponentProps;

export type TToast = ToastProps[];
