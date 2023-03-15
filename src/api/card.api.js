import { cardsService } from './feathers.api';
import { Service } from './service.api';

class Card extends Service {
  create = async (props, dispatch, ...callbacks) => {
    try {
      const payload = await cardsService.create(props);

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(payload);
        }
      });

      return payload;
    } catch (e) {
      console.log('create a card error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  find = async (props, dispatch, ...callbacks) => {
    try {
      const { data } = await cardsService.find({ query: { props } });

      callbacks.forEach((cb) => {
        if (typeof cb === 'function') {
          cb(data);
        }
      });

      return data;
    } catch (e) {
      console.log('find a card error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
  delete = async (id, dispatch) => {
    try {
      await cardsService.remove({ _id: id });

      return id;
    } catch (e) {
      console.log('delete card error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };

  patch = async (data, id, dispatch) => {
    try {
      const patchedCard = await cardsService.patch(id, data);

      return patchedCard;
    } catch (e) {
      console.log('patch card error', e);
      const errorFromHandler = this.handleError(e, dispatch);
      throw errorFromHandler;
    }
  };
}

const card = new Card();

export { card };
