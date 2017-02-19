import { fromJS } from 'immutable';

import {
  VIDEO_LOADED,
  PLAY_VIDEO,
  PAUSE_VIDEO,
} from './constants';

const initialState = fromJS({
  videoObj: false,
  playing: false,
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case VIDEO_LOADED:
      return state
        .set('videoObj', action.obj);
    case PLAY_VIDEO:
      state.get('videoObj').playVideo();
      return state
      .set('playing', true);
    case PAUSE_VIDEO:
      state.get('videoObj').pauseVideo();
      return state
      .set('playing', false);
    default:
      return state;
  }
}

export default playerReducer;
