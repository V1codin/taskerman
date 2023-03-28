import { IMasks } from '../../types/helpers';

export const masks: IMasks = {
  username: /^[a-zA-Z0-9]{4,16}$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  confirmPassword: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{4,16}$/,
  displayName: /^[A-Z]{1}\w{1,10}\s{1}[A-Z]{1}\w{1,11}$/,
  email: /^[a-zA-Z\d]{1,15}@[a-z]{1,9}\.{1}([a-z]{2,4}){1}$/,
};

export const warns = {
  username: 'Username must be from 4 to 16 numbers of latin characters',
  password:
    'Your password must be 4-16 characters, and include at least one number.',
  displayName:
    'Enter your name and surname divided by space. First letters are capital :)',
  confirmPassword: 'Passwords should match',
  email: 'Invalid email',
};

export const isLink = (str: string) => {
  return /^https:\/\/images\.unsplash\.com\/.{1,}/g.test(str);
};
