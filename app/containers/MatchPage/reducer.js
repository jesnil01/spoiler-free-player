import { fromJS } from 'immutable';

import {
  LOAD_MATCH_SUCCESS,
  LOAD_MATCH,
  LOAD_MATCH_ERROR,
  CHANGE_GAME,
} from './constants';

const initialState = fromJS({
  match: false,
  loading: false,
  error: false,
  activeGame: 0,
});

function matchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MATCH:
      return state
        .set('loading', true)
        .set('error', false)
        .set('match', false)
        .set('activeGame', 0)
        ;
    case LOAD_MATCH_SUCCESS:
      return state
        .set('loading', false)
        .set('match', action.data);
    case LOAD_MATCH_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CHANGE_GAME:
      return state
        .set('activeGame', action.index);
    default:
      return state;
  }
}

export default matchReducer;
