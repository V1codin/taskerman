import {
  GET_LISTS_AND_CARDS,
  NEW_CARD_CREATED,
  CARD_DELETED,
  LIST_DELETED,
  NEW_LIST_CREATED,
  CARD_PATCHED
} from './actions.types';

import { isPropInObject } from './helpers';

const init = {};

function cards(state = init, { type, payload, cards }) {
  switch (type) {
    case CARD_PATCHED:
      const updatedList = state[payload.listId].map((card) => {
        if (card._id === payload._id) return payload;

        return card;
      });

      return {
        ...state,
        [payload.listId]: updatedList
      };

    case NEW_LIST_CREATED:
      return {
        ...state,
        [payload._id]: []
      };

    case LIST_DELETED:
      if (payload in state) delete state[payload];

      return state;
    case CARD_DELETED:
      const deletedCardListId = payload.listId;
      const deletedId = payload._id;

      // ? switch case is bs cause of no creating scopes
      const isListOfDeletedCardInState = isPropInObject(deletedCardListId, state);

      if (isListOfDeletedCardInState) {
        return {
          ...state,
          [deletedCardListId]: state[deletedCardListId].filter(({ _id }) => _id !== deletedId)
        };
      }

      return { ...state };

    case NEW_CARD_CREATED:
      const cardCreatedListId = payload.listId;

      // ? switch case is bs cause of no creating scopes
      const isListOfCreatedCardInState = isPropInObject(cardCreatedListId, state);

      if (isListOfCreatedCardInState) {
        return {
          ...state,
          [cardCreatedListId]: [...state[cardCreatedListId], payload]
        };
      }
      return {
        ...state,
        [cardCreatedListId]: [payload]
      };

    case GET_LISTS_AND_CARDS:
      const additionalCards = cards.reduce((ac, card) => {
        const { listId } = card;

        if (listId in ac) {
          ac[listId].push(card);
        } else {
          ac[listId] = [card];
        }
        return ac;
      }, {});

      return {
        ...state,
        ...additionalCards
      };
    default:
      return state;
  }
}

export { cards };
