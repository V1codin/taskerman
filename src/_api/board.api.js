import { Service } from './service.api';
import { boardsService } from './feathers.api';

class Board extends Service {
  create = async (props, dispatch, ...callbacks) => {
    try {
      const payload = await boardsService.create(props);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(payload);
        }
      });

      return payload;
    } catch (e) {
      console.log('create a board error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  find = async (props = {}, dispatch, ...callbacks) => {
    try {
      const boards = await boardsService.find(props);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(boards);
        }
      });

      return boards;
    } catch (e) {
      const errorFromHandler = this.handleError(e, dispatch);
      console.log('find boards error', errorFromHandler);
      throw errorFromHandler;
    }
  };

  delete = async (props = '', dispatch, ...callbacks) => {
    try {
      const { _id } = await boardsService.remove(props);

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

  patch = async (props, dispatch, ...callbacks) => {
    try {
      const { boardId, data } = props;
      const payload = await boardsService.patch(boardId, data);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(payload);
        }
      });

      return new Promise((res) => res('done'));
    } catch (e) {
      console.log('patch a board error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const board = new Board();

export { board };
