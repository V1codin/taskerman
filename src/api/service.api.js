import { LOGOUT_ACTION } from '../utils/actions.types';

class Service {
  handleError(error, dispatch) {
    const { code } = error;
    switch (code) {
      case 401:
        if (typeof dispatch === 'function') dispatch({ type: LOGOUT_ACTION });
        return {
          message: 'Invalid username or password',
          errorClass: error.className || '',
        };
      case 408:
        if (typeof dispatch === 'function') {
          console.log('need dispatch in Error Handler');
        }
        return {
          message: "Server doesn't respond",
          errorClass: error.className || '',
        };

      case 409:
        return {
          message: 'User with this parameters already exists',
          errorClass: error.className || '',
        };

      case 4011:
        return {
          message: error.message,
          errorClass: error.className || '',
        };

      default:
        return {
          message: 'Unexpected error',
          errorClass: '',
        };
    }
  }
}

export { Service };
