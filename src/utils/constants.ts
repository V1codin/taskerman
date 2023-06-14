import { TUserBoardRoles } from '@/models/boards';
import { ToastProps } from '@/types/helpers';
import { IModal } from '@/types/state';

export const STANDARD_BG = '#091921';
export const BG_IMAGE = '';

export const isServer = () => {
  return typeof window === 'undefined';
};
export const getBodyRef = () => {
  return !isServer() ? document.getElementsByTagName('body')[0] : null;
};

export const DEFAULT_ADD_BOARD_BUTTON_COLORS = [
  {
    name: '#003b5c',
    backgroundColor: '#003b5c',
    classes:
      'cursor-pointer p-4 border border-dashed border-transparent colored designed active:shadow-none !bg-[#003b5c] hover:shadow-[0_0_5px_#42c5e4]',
  },
  {
    name: '#7e2861',
    backgroundColor: '#7e2861',
    classes:
      'cursor-pointer p-4 border border-dashed border-transparent colored designed active:shadow-none !bg-[#7e2861] hover:shadow-[0_0_5px_#42c5e4]',
  },
  {
    name: '#27461c',
    backgroundColor: '#27461c',
    classes:
      'cursor-pointer p-4 border border-dashed border-transparent colored designed active:shadow-none !bg-[#27461c] hover:shadow-[0_0_5px_#42c5e4]',
  },
  {
    name: '#4e2118',
    backgroundColor: '#4e2118',
    classes:
      'cursor-pointer p-4 border border-dashed border-transparent colored designed active:shadow-none !bg-[#4e2118] hover:shadow-[0_0_5px_#42c5e4]',
  },
];

export const authFormTypeLogin = 'login';
export const authFormTypeSignup = 'signup';

export const isDev = () => process.env.NODE_ENV === 'development';

export const PORT = '8080';
export const BASE_URL = isDev()
  ? `http://localhost:${PORT}`
  : process.env['BASE_URL'];
export const DOMAIN = isDev() ? '.localhost' : process.env['DOMAIN'];

export const MONGO_DB_NAME = isDev() ? 'Local_Trello' : process.env['DB_NAME'];

export const AUTH_TOKEN_COOKIE_NAME = isDev()
  ? 'next-auth.session-token'
  : process.env['AUTH_TOKEN_COOKIE_NAME']!;

export const SESSION_MAX_AGE_DAYS = isDev()
  ? 30
  : Number(process.env['JWT_OPT_EXPIRE_DAYS']);
export const JWT_MAX_AGE_DAYS = SESSION_MAX_AGE_DAYS;

export const UNSAFE_USER_PROPS = ['password'];

export const DEFAULT_TOAST_TIMEOUT = 2000;
export const EMPTY_TOAST: ToastProps = {
  message: '',
  typeClass: 'notification',
  timeout: 0,
};

export const DEFAULT_INVITED_MEMBER_ROLE: TUserBoardRoles = 'member';

export const API_BOARDS_URL = '/api/boards';
export const API_SINGLE_BOARD_URL = '/api/single_board';

export const API_REQUEST_SESSION_URL = '/api/auth/session';
export const API_SIGNUP_URL = '/api/auth/user';
export const API_USER_UPDATE_URL = '/api/auth/user';

// TODO server handle the routes
export const API_BOARD_UPDATE_URL = '/api/update_board';
export const API_USER_DELETE_URL = '/api/auth/user';
// ? get user for getting board member's info for example
export const API_USER_GET_URL = '/api/auth/user';

export const API_MEMBERS_URL = '/api/board_members';

export const DEFAULT_MODAL_STATE: IModal<false> = {
  isOpen: false,
  window: null,
};

export const RAINBOW_COLORS = [
  '#00FFFF',
  '#FF0000',
  '#0000FF',
  '#FFA500',
  '#008000',
  '#FFFF00',
  '#800080',
] as const;

export const PROFILE_SUBS_SLIDE_WIDTH = 465;
export const SUBS_SLIDE_HALF = PROFILE_SUBS_SLIDE_WIDTH / 2;
export const SUBS_MAP_LINE_WIDTH = 10;

export const LAPTOP_MEDIA_POINT_WIDTH = 975;
export const MOBILE_MEDIA_POINT_WIDTH = 575;

export const BOARD_TITLE_SLICE_INDEX = 15;
export const BOARD_SUBS_TITLE_SLICE_INDEX = 40;
export const BOARD_MEMBERS_DISPLAY_SLICE_INDEX = 2;

export const SKELETON_CLASS_NAMES =
  'skeleton_block skeleton_bg_l skeleton_bg_d';
