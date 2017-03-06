import { fromJS } from 'immutable';

import {
  VIDEO_LOADED,
  CURRENT_QUALITY_UPDATED,
  QUALITY_LEVELS_LOADED,
  VIDEO_PLAY,
  VIDEO_PAUSE,
  FORWARD_VIDEO,
  REWIND_VIDEO,
  ENTER_FULLSCREEN,
  EXIT_FULLSCREEN,
  SET_VOLUME,
  SEEK_TO,
} from './constants';

const initialState = fromJS({
  videoObj: false,
  playing: false,
  quality: {
    current: false,
    availableLevels: false,
  },
  fullscreen: false,
  volume: 0,
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case VIDEO_LOADED:
      const volume = action.obj.getVolume();
      return state
        .set('videoObj', action.obj)
        .set('volume', volume);
    case CURRENT_QUALITY_UPDATED:
      return state
        .setIn(['quality', 'current'], action.level);
    case QUALITY_LEVELS_LOADED:
      return state
        .setIn(['quality', 'availableLevels'], action.levels);
    case VIDEO_PLAY:
      return state
      .set('playing', true);
    case VIDEO_PAUSE:
      return state
      .set('playing', false);
    case FORWARD_VIDEO:
      state.get('videoObj').seekTo(action.elapsed + 10);
      return state;
    case REWIND_VIDEO:
      state.get('videoObj').seekTo(action.elapsed - 10);
      return state;
    case ENTER_FULLSCREEN:
      return state
      .set('fullscreen', true);
    case EXIT_FULLSCREEN:
      return state
      .set('fullscreen', false);
    case SET_VOLUME:
      state.get('videoObj').setVolume(action.value);
      return state
      .set('volume', action.value);
    case SEEK_TO:
      state.get('videoObj').seekTo(action.seconds);
    default:
      return state;
  }
}

export default playerReducer;
