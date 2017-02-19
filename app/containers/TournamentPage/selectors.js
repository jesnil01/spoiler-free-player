/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectTournament = (state) => state.get('tournament');

const makeSelectTournament = () => createSelector(
  selectTournament,
  (tournamentState) => tournamentState.get('tournament')
);

export {
  selectTournament,
  makeSelectTournament,
};
