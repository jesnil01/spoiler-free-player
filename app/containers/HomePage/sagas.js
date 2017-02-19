/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_TOURNAMENTS } from 'containers/App/constants';
import { tournamentsLoaded, tournamentsLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getTournaments() {
  // Select username from store
  const requestURL = `/api/tournaments/`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(tournamentsLoaded(data));
  } catch (err) {
    yield put(tournamentsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* tournamentsData() {
  const watcher = yield takeLatest(LOAD_TOURNAMENTS, getTournaments);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  tournamentsData,
];