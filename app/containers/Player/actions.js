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

export function videoLoaded(obj) {
  return {
    type: VIDEO_LOADED,
    obj,
  };
}

export function currentQualityUpdated(level) {
  return {
    type: CURRENT_QUALITY_UPDATED,
    level,
  }
}

export function qualityLevelsLoaded(levels) {
  return {
    type: QUALITY_LEVELS_LOADED,
    levels,
  };
}

export function forwardVideo(elapsed){
  return {
    type: FORWARD_VIDEO,
    elapsed,
  };
}

export function rewindVideo(elapsed){
  return {
    type: REWIND_VIDEO,
    elapsed,
  };
}

export function toggleVideoStatus(status) {
  const type = status ? VIDEO_PLAY : VIDEO_PAUSE;
  return {
    type,
  };
}

export function toggleFullScreen(status) {
  const type = status ? ENTER_FULLSCREEN : EXIT_FULLSCREEN;
  return {
    type,
  };
}

export function setVolume(value){
  return {
    type: SET_VOLUME,
    value,
  };
}

export function seekTo(seconds){
  console.log(seconds);
  return {
    type: SEEK_TO,
    seconds,
  };
}
