/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_TOURNAMENTS_SUCCESS,
  LOAD_TOURNAMENTS,
  LOAD_TOURNAMENTS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  tournaments: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOURNAMENTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('tournaments', false);
    case LOAD_TOURNAMENTS_SUCCESS:
      return state
        .set('loading', false)
        .set('tournaments', action.data);
    case LOAD_TOURNAMENTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;