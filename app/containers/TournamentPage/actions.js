import {
  LOAD_TOURNAMENT_SUCCESS,
  LOAD_TOURNAMENT,
  LOAD_TOURNAMENT_ERROR,
} from './constants';

export function loadTournament(slug) {
  return {
    type: LOAD_TOURNAMENT,
    slug,
  };
}

export function tournamentLoaded(data) {
  return {
    type: LOAD_TOURNAMENT_SUCCESS,
    data,
  };
}

export function tournamentLoadingError(error) {
  return {
    type: LOAD_TOURNAMENT_ERROR,
    error,
  };
}