import { ToastProps } from '@/types/helpers';
import { IModal } from '@/types/state';

const STANDARD_BG = '#091921';
const BG_IMAGE = '';

const isServer = () => {
  return typeof window === 'undefined';
};
const getBodyRef = () => {
  return !isServer() ? document.getElementsByTagName('body')[0] : null;
};

const DEFAULT_ADD_BOARD_BUTTON_COLORS = [
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
const DOMAIN = isDev() ? '.localhost' : process.env['DOMAIN'];

const MONGO_DB_NAME = isDev() ? 'Local_Trello' : process.env['DB_NAME'];

const AUTH_TOKEN_COOKIE_NAME = isDev()
  ? 'next-auth.session-token'
  : process.env['AUTH_TOKEN_COOKIE_NAME']!;

const SESSION_MAX_AGE_DAYS = isDev()
  ? 30
  : Number(process.env['JWT_OPT_EXPIRE_DAYS']);
const JWT_MAX_AGE_DAYS = SESSION_MAX_AGE_DAYS;

const UNSAFE_USER_PROPS = ['password'];

const DEFAULT_TOAST_TIMEOUT = 2000;
const EMPTY_TOAST: ToastProps = {
  message: '',
  typeClass: 'notification',
  timeout: 0,
};

const API_BOARDS_URL = '/api/boards';
const API_SINGLE_BOARD_URL = '/api/single_board';

const API_LISTS_URL = '/api/lists';

const API_REQUEST_SESSION_URL = '/api/auth/session';
const API_SIGNUP_URL = '/api/auth/sign_up';
const API_USER_UPDATE_URL = '/api/auth/update_user';

// TODO server handle the routes
const API_LIST_UPDATE_URL = '/api/update_list';
const API_BOARD_UPDATE_URL = '/api/update_board';
const API_USER_DELETE_URL = '/api/auth/delete_user';
const API_USER_GET_URL = '/api/auth/user';

const DEFAULT_MODAL_STATE: IModal<false> = {
  isOpen: false,
  window: null,
};

const RAINBOW_COLORS = [
  '#00FFFF',
  '#FF0000',
  '#0000FF',
  '#FFA500',
  '#008000',
  '#FFFF00',
  '#800080',
] as const;

const PROFILE_SUBS_SLIDE_WIDTH = 470;
const SUBS_SLIDE_HALF = PROFILE_SUBS_SLIDE_WIDTH / 2;
const SUBS_MAP_LINE_WIDTH = 10;

export {
  API_LIST_UPDATE_URL,
  API_BOARD_UPDATE_URL,
  API_USER_GET_URL,
  API_USER_DELETE_URL,
  API_LISTS_URL,
  SUBS_MAP_LINE_WIDTH,
  SUBS_SLIDE_HALF,
  PROFILE_SUBS_SLIDE_WIDTH,
  RAINBOW_COLORS,
  API_USER_UPDATE_URL,
  API_SIGNUP_URL,
  API_REQUEST_SESSION_URL,
  API_SINGLE_BOARD_URL,
  DEFAULT_MODAL_STATE,
  AUTH_TOKEN_COOKIE_NAME,
  DOMAIN,
  SESSION_MAX_AGE_DAYS,
  JWT_MAX_AGE_DAYS,
  API_BOARDS_URL,
  DEFAULT_TOAST_TIMEOUT,
  EMPTY_TOAST,
  UNSAFE_USER_PROPS,
  MONGO_DB_NAME,
  STANDARD_BG,
  BG_IMAGE,
  DEFAULT_ADD_BOARD_BUTTON_COLORS,
  authFormTypeLogin,
  authFormTypeSignup,
  BASE_URL,
  getBodyRef,
  isServer,
  isDev,
};
