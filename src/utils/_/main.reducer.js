import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { boards } from './boards.reducer';
import { cards } from './cards.reducer';
import { lists } from './lists.reducer';
import { notes } from './notes.reducer';

const reducer = combineReducers({ auth, boards, cards, lists, notes });

export { reducer };
