/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_TOURNAMENT } from 'containers/TournamentPage/constants';
import { tournamentLoaded, tournamentLoadingError } from 'containers/TournamentPage/actions';
import { makeSelectSlug } from 'containers/TournamentPage/selectors';

import request from 'utils/request';

export function* getTournament() {

  const slug = yield select(makeSelectSlug());
  const requestURL = `/api/tournament/${slug}/`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(tournamentLoaded(data));
  } catch (err) {
    yield put(tournamentLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tournamentData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_TOURNAMENT, getTournament);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  tournamentData,
];