import { IMasks, IValidationResult, IWarns } from '../../types/helpers';

export const masks: IMasks = {
  username: /^[a-zA-Z0-9]{4,16}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  displayName: /^[A-Z]{1}\w{2,10}\s{1}[A-Z]{1}\w{2,11}$/,
  email: /^[a-zA-Z\d]{1,15}@[a-z]{1,9}\.{1}([a-z]{2,4}){1}$/,
};

export const warns: IWarns = {
  username: 'Username must be from 4 to 16 numbers of latin characters',
  password:
    'Your password must be 4-16 characters, and include at least one number.',
  displayName:
    'Enter your name and surname divided by space. First letters are capital :)',
  confirmPassword: 'Passwords should match',
  email: 'Enter your email',
};

export const inputValidation = (value: string, name: keyof IMasks) => {
  const res: IValidationResult = { message: '', isValidated: true, name: '' };

  // * if there is the name in masks and if it if not valid
  // * update result object and turn validation check to false

  if (name in masks && !masks[name].test(value)) {
    res.message = warns[name];
    res.name = name;
    res.isValidated = false;
  }

  return res;
};
