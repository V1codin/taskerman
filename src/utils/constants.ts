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

const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3030'
    : process.env['BASE_URL'];

const isServer = () => {
  return typeof window === 'undefined';
};

const isDev = () => process.env.NODE_ENV === 'development';

enum LOGIN_KEYS {
  USERNAME = 'username',
  PASSWARD = 'password',
  DISPLAY_NAME = 'displayName',
  CONFIG_PASSWORD = 'confirmPassword',
  EMAIL = 'email',
}

export {
  LOGIN_KEYS,
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
