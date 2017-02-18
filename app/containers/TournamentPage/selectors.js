/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectTournament = (state) => state.get('tournament');

const makeSelectTournament = () => createSelector(
  selectTournament,
  (tournamentState) => tournamentState.get('tournament')
);

const makeSelectSlug = () => createSelector(
  selectTournament,
  (tournamentState) => tournamentState.get('slug')
);

export {
  selectTournament,
  makeSelectSlug,
  makeSelectTournament,
};
