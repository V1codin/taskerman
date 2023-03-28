import { ToastProps } from '../../types/helpers';

const STANDARD_BG = '#091921';
const BG_IMAGE = '';

const isServer = () => {
  return typeof window === 'undefined';
};
const getBodyRef = () => {
  return isServer() ? document.getElementsByTagName('body')[0] : null;
};

const addBoardColors = [
  {
    name: '#003b5c',
    backgroundColor: '#003b5c',
  },
  {
    name: '#7e2861',
    backgroundColor: '#7e2861',
  },
  {
    name: '#27461c',
    backgroundColor: '#27461c',
  },
  {
    name: '#4e2118',
    backgroundColor: '#4e2118',
  },
];

const authFormTypeLogin = 'login';
const authFormTypeSignup = 'signup';

const isDev = () => process.env.NODE_ENV === 'development';
const BASE_URL = isDev() ? 'http://localhost:3000' : process.env['BASE_URL'];
const MONGO_DB_NAME = isDev() ? 'Local_Trello' : process.env['DB_NAME'];

const UNSAFE_USER_PROPS = ['password'];

const DEFAULT_TOAST_TIMEOUT = 2000;
const EMPTY_TOAST: ToastProps = {
  message: '',
  typeClass: 'notification',
  timeout: 0,
};

const API_BOARDS_URL = '/api/boards';

export {
  API_BOARDS_URL,
  DEFAULT_TOAST_TIMEOUT,
  EMPTY_TOAST,
  UNSAFE_USER_PROPS,
  MONGO_DB_NAME,
  STANDARD_BG,
  BG_IMAGE,
  addBoardColors,
  authFormTypeLogin,
  authFormTypeSignup,
  BASE_URL,
  getBodyRef,
  isServer,
  isDev,
};
