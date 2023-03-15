import { Service } from './service.api';
import { notificationsService } from './feathers.api';

class Notification extends Service {
  // ! create only for dev so far
  create = async (props, dispatch, ...callbacks) => {
    try {
      const payload = await notificationsService.create(props);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(payload);
        }
      });

      return payload;
    } catch (e) {
      console.log('create a notification error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  find = async (props = {}, dispatch, ...callbacks) => {
    try {
      const notes = await notificationsService.find(props);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(notes);
        }
      });

      return notes;
    } catch (e) {
      const errorFromHandler = this.handleError(e, dispatch);
      console.log('find notifications error', errorFromHandler);
      throw errorFromHandler;
    }
  };

  delete = async (props = '', dispatch, ...callbacks) => {
    try {
      const { _id } = await notificationsService.remove(props);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(_id);
        }
      });

      return new Promise((res) => res('done'));
    } catch (e) {
      console.log('delete a board error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const note = new Notification();

export { note };
