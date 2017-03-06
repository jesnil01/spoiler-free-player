import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  makeSelectVideoObj,
  makeSelectCurrentQuality,
  makeSelectQualityLevels,
  makeSelectPlaying,
  makeSelectFullscreen,
  makeSelectVolume,
} from 'containers/Player/selectors';

import { 
  videoLoaded, 
  toggleVideoStatus,
  qualityLevelsLoaded,
  currentQualityUpdated,
  forwardVideo,
  rewindVideo,
  toggleFullScreen,
  setVolume,
  seekTo,
} from 'containers/Player/actions';

import YoutubePlayer from 'react-youtube';

import { Button } from 'components/Buttons';
import PlayerHolder from './PlayerHolder';
import Container from './Container';
import Controls from './Controls';

class Player extends React.PureComponent {
  constructor(props){
    super(props);

    this.state = {
      elapsed: false,
    };

    this.opts = {
      height: '1080',
      width: '1920',
      playerVars: { 
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo:0,
        disablekb: 1,
        iv_load_policy: 3,
        // suggestedQuality: 'small',
      }
     };
  }

  startTimer = () => {
     this.intervalId = setInterval(this.checkElapsed, 500);
  }

  componentDidMount() {
    document.addEventListener('webkitfullscreenchange', this.fullScreenChange);
  }

  componentWillUnmount() {
     clearInterval(this.intervalId);
  }

  fullScreenChange = () => {
    if ( document.webkitIsFullScreen ) {
      this.props.toggleFullScreen(true);
    } else {
      this.props.toggleFullScreen(false);
    }
  }
  
  checkElapsed = () => {
    const elapsed = this.props.video.getCurrentTime().toFixed(0);
    this.setState({ elapsed: elapsed });
  }

  secondsToHms(d) {
    function addZero(value) {
      return value < 10 ? '0' + value : value;
    }

    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ':' : "";
    var mDisplay = m > 0 ? m : 0;
    var sDisplay = s > 0 ? s : 0;
    return hDisplay + addZero(mDisplay) + ':' + addZero(sDisplay); 
  }

  onPlaybackQualityChange = () => {
    console.log('onPlaybackQualityChange');

    const quality = this.props.video.getPlaybackQuality();
    if (!this.props.currentQuality && quality !== 'unknown') {
      this.props.currentQualityUpdated(quality);
    }
     
  }

  onStateChange = () => {
    if(!this.intervalId) {

      this.startTimer();
    }

    const levels = this.props.video.getAvailableQualityLevels();
    if (!this.props.qualityLevels && levels.length > 0) {
      console.log('Send update');
      this.props.qualityLevelsLoaded(levels);
    }
  }

  requestPlay = () => {
    this.props.video.playVideo();
  }

  requestPause = () => {
    this.props.video.pauseVideo();
  }

  requestQuality = (level) => {
    console.log(this.props.video.setPlaybackQuality(level));
  }

  requestFullscreen = (value) => {
    const elem = this.videoElement;

    if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  render() {
    const {
      id,
      video,
      playing,
      currentQuality,
      qualityLevels,
      fullscreen,
      volume,
      gameStart,
    } = this.props;

    const {
      elapsed,
    } = this.state;

    const formattedElapsed = elapsed ? this.secondsToHms(elapsed) : '00:00';
    
    const playPauseButton = !playing ? <Button onClick={this.requestPlay}>Play</Button> : <Button onClick={this.requestPause}>Pause</Button>;

    const gameStartButton = elapsed < gameStart ? <Button onClick={() => { this.props.seekTo(gameStart)} }>Game Start</Button> : '';

    const player = id ? <YoutubePlayer         
        videoId={id}
        opts={this.opts}
        onReady={this.props.onReady}
        onStateChange={this.onStateChange}
        onPlaybackQualityChange={this.onPlaybackQualityChange}
        onPlay={this.props.playVideo}
        onPause={this.props.pauseVideo}
      /> : 'There was no game played';

    const levels = !qualityLevels ? '' : qualityLevels.map((level, i) => <button key={i} onClick={() => {this.requestQuality(level)}}>{level}</button>);

    const fullscreenText = fullscreen ? 'Exit fullscreen' : 'Enter fullscreen';

    return (
      <Container innerRef={(elem) => { this.videoElement = elem; }}>
        <PlayerHolder fullscreen={fullscreen}>
          {player}
        </PlayerHolder>
        <Controls fullscreen={fullscreen}>
          {playPauseButton}
          {formattedElapsed}
          {gameStartButton}
          <button onClick={() => { this.props.rewindVideo(elapsed); }}>Rewind</button>
          <button onClick={() => { this.props.forwardVideo(elapsed); }}>Forward</button>
          <input type="range" onChange={this.props.setVolume} value={volume} min="0" max="100" />
          <Button onClick={this.requestFullscreen}>{fullscreenText}</Button>
        </Controls>
      </Container>
    );
  }
};

export function mapDispatchToProps(dispatch) {
  return {
    onReady: (e) => dispatch(videoLoaded(e.target)),
    playVideo: (e) => dispatch(toggleVideoStatus(true)),
    pauseVideo: (e) => dispatch(toggleVideoStatus(false)),
    qualityLevelsLoaded: (levels) => dispatch(qualityLevelsLoaded(levels)),
    currentQualityUpdated: (level) => dispatch(currentQualityUpdated(level)),
    forwardVideo: (elapsed) => dispatch(forwardVideo(parseInt(elapsed))),
    rewindVideo: (elapsed) => dispatch(rewindVideo(parseInt(elapsed))),
    toggleFullScreen: (status) => dispatch(toggleFullScreen(status)),
    setVolume: (e) => dispatch(setVolume(e.target.value)),
    seekTo: (seconds) => dispatch(seekTo(parseInt(seconds))),
  };
}

const mapStateToProps = createStructuredSelector({
  video: makeSelectVideoObj(),
  playing: makeSelectPlaying(),
  currentQuality: makeSelectCurrentQuality(),
  qualityLevels: makeSelectQualityLevels(),
  fullscreen: makeSelectFullscreen(),
  volume: makeSelectVolume(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
