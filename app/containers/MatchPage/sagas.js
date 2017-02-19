/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_MATCH } from 'containers/MatchPage/constants';
import { matchLoaded, matchLoadingError } from 'containers/MatchPage/actions';

import request from 'utils/request';

export function* getMatch(action) {
  const { id } = action;
  const requestURL = `/api/match/${id}/`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(matchLoaded(data));
  } catch (err) {
    yield put(matchLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* matchData() {
  const watcher = yield takeLatest(LOAD_MATCH, getMatch);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  matchData,
];