import { createSelector } from 'reselect';

const selectPlayer = (state) => state.get('player');

const makeSelectVideoObj = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('videoObj')
);

const makeSelectPlaying = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('playing')
);

export {
  selectPlayer,
  makeSelectVideoObj,
  makeSelectPlaying,
};
