import React from 'react';
import YoutubePlayer from 'react-youtube';
import PlayerHolder from './PlayerHolder';

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

  onReady = (e) => {
    // console.log(e);
    e.target.setVolume(0);
  }

  render() {
    const {
      id,
    } = this.props;

    const noVideoMessage = !id ? 'There was no game played' : '';
    const player = id ? <YoutubePlayer 
        // id="player_iframe"
        videoId={id}
        opts={this.opts}
        onReady={this.onReady}
        // onStateChange={this.onStateChange}
        // onPlaybackQualityChange={this.onPlaybackQualityChange}
        // onPlay={this.onPlay.bind(this)}
        // onPause={this.onPause.bind(this)}
      /> : '';

    return (
      <PlayerHolder>
        {noVideoMessage}
        {player}
      </PlayerHolder>
    );
  }
};

export default Player;
