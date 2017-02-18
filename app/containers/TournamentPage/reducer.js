import { fromJS } from 'immutable';

import {
  LOAD_TOURNAMENT_SUCCESS,
  LOAD_TOURNAMENT,
  LOAD_TOURNAMENT_ERROR,
} from './constants';

const initialState = fromJS({
  tournament: false,
  loading: false,
  error: false,
  slug: false,
});

function tournamentReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOURNAMENT:
      return state
        .set('loading', true)
        .set('error', false)
        .set('tournament', false)
        .set('slug', action.slug);
    case LOAD_TOURNAMENT_SUCCESS:
      return state
        .set('loading', false)
        .set('tournament', action.data);
    case LOAD_TOURNAMENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default tournamentReducer;
