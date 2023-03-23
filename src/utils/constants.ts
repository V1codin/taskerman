import { TMongoConnectOptions } from '../../types/db';
import { ToastProps } from '../../types/helpers';
import { EncrypOptions } from '../../types/services';

const STRATEGY = 'local';
const GOOGLE_STRATEGY = 'google';

const STANDARD_BG = '#091921';
const BG_IMAGE = '';

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

const BASE_URL = isDev() ? 'http://localhost:3030' : process.env['BASE_URL'];

const isServer = () => {
  return typeof window === 'undefined';
};

const MONGO_DB_CONNECT_OPTIONS: TMongoConnectOptions = {
  uri: process.env['MONGO_DB_URI']!,
};

const MONGO_DB_NAME = isDev() ? 'Local_Trello' : process.env['DB_NAME'];

const ENCRYPT_CONFIG: EncrypOptions = {
  saltRounds: Number(process.env['SALT_ROUNDS']!),
};

const UNSAFE_USER_PROPS = ['password'];

const AUTH_URL = 'api/auth/login';

const DEFAULT_TOAST_TIMEOUT = 2000;
const EMPTY_TOAST: ToastProps = {
  message: '',
  typeClass: 'notification',
  timeout: 0,
};

const AUTH_TOKEN_COOKIE_NAME = 'sessionToken';
export {
  AUTH_TOKEN_COOKIE_NAME,
  DEFAULT_TOAST_TIMEOUT,
  EMPTY_TOAST,
  UNSAFE_USER_PROPS,
  AUTH_URL,
  ENCRYPT_CONFIG,
  MONGO_DB_NAME,
  MONGO_DB_CONNECT_OPTIONS,
  STRATEGY,
  STANDARD_BG,
  BG_IMAGE,
  addBoardColors,
  authFormTypeLogin,
  authFormTypeSignup,
  BASE_URL,
  GOOGLE_STRATEGY,
  isServer,
  isDev,
};
