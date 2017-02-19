import {
  LOAD_MATCH_SUCCESS,
  LOAD_MATCH,
  LOAD_MATCH_ERROR,
  CHANGE_GAME,
} from './constants';

export function loadMatch(id) {
  return {
    type: LOAD_MATCH,
    id,
  };
}

export function matchLoaded(data) {
  return {
    type: LOAD_MATCH_SUCCESS,
    data,
  };
}

export function matchLoadingError(error) {
  return {
    type: LOAD_MATCH_ERROR,
    error,
  };
}

export function changeGame(index) {
  return {
    type: CHANGE_GAME,
    index,
  };
}
