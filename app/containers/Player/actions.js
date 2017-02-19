import {
  VIDEO_LOADED,
  PLAY_VIDEO,
  PAUSE_VIDEO,
} from './constants';

export function videoLoaded(obj) {
  return {
    type: VIDEO_LOADED,
    obj,
  };
}

export function toggleVideoStatus(status) {
  const type = status ? PLAY_VIDEO : PAUSE_VIDEO;
  return {
    type,
    status,
  };
}
