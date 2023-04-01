export interface IMasks {
  username: RegExp;
  password: RegExp;
  confirmPassword: RegExp;
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

export type TCSSMeasurementValue =
  | `${number}px`
  | `${number}em`
  | `${number}%`
  | `${number}rem`;

export type TDropDownMinWidth = TCSSMeasurementValue;
