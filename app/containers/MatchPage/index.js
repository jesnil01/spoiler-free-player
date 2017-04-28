/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';

import { makeSelectMatch, makeSelectActiveGame } from 'containers/MatchPage/selectors';
import { loadMatch, changeGame } from 'containers/MatchPage/actions';

import Wrapper from 'components/Wrapper';
import Player from 'containers/Player';
import { Button } from 'components/Buttons';
import { Tabs, Tab } from 'components/Tabs';
import { Teams, Team } from 'components/Teams';

class MatchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { id } = this.props.params;
    this.props.loadMatch(id);
  }

  render() {
    const {
      match,
      activeGame,
    } = this.props;

    const listGames = !match ? '' : match.games.map((game, i) => {
      return <Tab onClick={this.props.changeGame} active={activeGame === i} key={i} value={i}>Game {i+1}</Tab>;
    });

    // console.log(match);   
    // console.log(activeGame);

    let team1, team2, player;
    if(match){
      team1 = match.teams[0].name;
      team2 = match.teams[1].name;

      const { id, gameStart, winner } = match.games[activeGame];

      player = <Player id={id} gameStart={gameStart} winner={winner} />;
    }

    return (
      <Wrapper>
        <Teams>
          <Team>{team1}</Team>
          <Team>{team2}</Team>
        </Teams>
        <Tabs>{listGames}</Tabs>
        {player}
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loadMatch: (id) => dispatch(loadMatch(id)),
    changeGame: (e) => dispatch(changeGame(parseInt(e.target.value))),
    // goToMatch: (e) => dispatch(push(`/match/${e.target.value}/`)),
    // goHome: (e) => dispatch(push(`/`)),
  };
}

const mapStateToProps = createStructuredSelector({
  match: makeSelectMatch(),
  activeGame: makeSelectActiveGame(),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchPage);
