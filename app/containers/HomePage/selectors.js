/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

// const makeSelectUsername = () => createSelector(
//   selectHome,
//   (homeState) => homeState.get('username')
// );

// const makeSelectTournaments = () => createSelector(
//   selectHome,
//   (homeState) => homeState.get('tournaments')
// );

export {
  selectHome,
  // makeSelectUsername,
  // makeSelectTournaments,
};
