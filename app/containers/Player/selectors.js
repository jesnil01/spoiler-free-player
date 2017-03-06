import { createSelector } from 'reselect';

const selectPlayer = (state) => state.get('player');

const makeSelectVideoObj = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('videoObj')
);

const makeSelectCurrentQuality = () => createSelector(
  selectPlayer,
  (playerState) => playerState.getIn(['quality', 'current'])
);

const makeSelectQualityLevels = () => createSelector(
  selectPlayer,
  (playerState) => playerState.getIn(['quality', 'availableLevels'])
);

const makeSelectPlaying = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('playing')
);

const makeSelectFullscreen = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('fullscreen')
);
const makeSelectVolume = () => createSelector(
  selectPlayer,
  (playerState) => playerState.get('volume')
);

export {
  selectPlayer,
  makeSelectVideoObj,
  makeSelectCurrentQuality,
  makeSelectQualityLevels,
  makeSelectPlaying,
  makeSelectFullscreen,
  makeSelectVolume,
};
