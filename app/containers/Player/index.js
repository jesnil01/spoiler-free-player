import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { push } from 'react-router-redux';

import { makeSelectVideoObj, makeSelectPlaying } from 'containers/Player/selectors';
import { videoLoaded, toggleVideoStatus } from 'containers/Player/actions';

import YoutubePlayer from 'react-youtube';

import { Button } from 'components/Buttons';
import PlayerHolder from './PlayerHolder';
import Controls from './Controls';

class Player extends React.PureComponent {
  constructor(props){
    super(props);

    this.opts = {
      height: '1080',
      width: '1920',
      playerVars: { 
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo:0,
        disablekb: 0,
        iv_load_policy: 3,
        suggestedQuality: 'hd1080',
      }
     };
  }

  // onStateChange = (e) =>{
  //   console.log('On State changed', e.target.getAvailableQualityLevels());
  // }

  render() {
    const {
      id,
      video,
      playing,
    } = this.props;

    const playPauseButton = !playing ? <Button onClick={this.props.playVideo}>Play</Button> : <Button onClick={this.props.pauseVideo}>Pause</Button>;

    const player = id ? <YoutubePlayer 
        // id="player_iframe"
        videoId={id}
        opts={this.opts}
        onReady={this.props.onReady}
        onStateChange={this.onStateChange}
        // onPlaybackQualityChange={this.onPlaybackQualityChange}
        // onPlay={this.onPlay.bind(this)}
        // onPause={this.onPause.bind(this)}
      /> : 'There was no game played';

    return (
      <div>
      <PlayerHolder>
        {player}
      </PlayerHolder>
      <Controls>
        {playPauseButton}
      </Controls>
      </div>
    );
  }
};

export function mapDispatchToProps(dispatch) {
  return {
    onReady: (e) => dispatch(videoLoaded(e.target)),
    playVideo: (e) => dispatch(toggleVideoStatus(true)),
    pauseVideo: (e) => dispatch(toggleVideoStatus(false)),
    // changeGame: (e) => dispatch(changeGame(parseInt(e.target.value))),
    // goToMatch: (e) => dispatch(push(`/match/${e.target.value}/`)),
    // goHome: (e) => dispatch(push(`/`)),
  };
}

const mapStateToProps = createStructuredSelector({
  video: makeSelectVideoObj(),
  playing: makeSelectPlaying(),
  // activeGame: makeSelectActiveGame(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
