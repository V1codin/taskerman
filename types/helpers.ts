export interface IMasks {
  username: RegExp;
  password: RegExp;
  displayName: RegExp;
  email: RegExp;
}

export interface IWarns {
  username: string;
  password: string;
  displayName: string;
  confirmPassword: string;
  email: string;
}

export interface IValidationResult {
  message: string;
  isValidated: boolean;
  name: keyof IMasks | '';
}

export interface ILoginForm {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  email: string;
}

export type TOAuth = ['google'];
