/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectMatch = (state) => state.get('match');

const makeSelectMatch = () => createSelector(
  selectMatch,
  (matchState) => matchState.get('match')
);

const makeSelectActiveGame = () => createSelector(
  selectMatch,
  (matchState) => matchState.get('activeGame')
);

export {
  selectMatch,
  makeSelectMatch,
  makeSelectActiveGame,
};
