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

import { makeSelectTournament } from 'containers/TournamentPage/selectors';
import { loadTournament } from 'containers/TournamentPage/actions';

import Wrapper from 'components/Wrapper';
import { Button } from 'components/Buttons';

class TournamentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { slug } = this.props.params;

    this.props.loadTournament(slug);
  }

  render() {
    const {
      tournament,
    } = this.props;
    console.log(tournament);

    const listMatches = (list) => {
      return list.map((item, i) => {
        const team1 = item.safeToSpoil ? item.teams.team1 : <span title={item.teams.team1}>Hidden</span>;
        const team2 = item.safeToSpoil ? item.teams.team2 : <span title={item.teams.team2}>Hidden</span>;
        return (
          <div style={{margin: '20px 0'}} key={i}>
            <div><strong>{item.title}</strong>: {team1} - {team2} <Button onClick={this.props.goToMatch} value={item.id} active>Watch</Button></div>
          </div>
        );
      });
    }

    const tournamentTitle = !tournament ? '' : <h1 onClick={this.props.goHome}>{tournament.title}</h1>;
    let blocks;

    if(tournament) {
      blocks = tournament.blocks.map((item, i) => {
        return (
          <div key={i}>
            <h3>{item.title}</h3>
            <div>{listMatches(item.matchList)}</div>
          </div>
        );
      });
    }

    return (
      <Wrapper>
        {tournamentTitle}
        {blocks}
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loadTournament: (slug) => dispatch(loadTournament(slug)),
    goToMatch: (e) => dispatch(push(`/match/${e.target.value}/`)),
    goHome: (e) => dispatch(push(`/`)),
  };
}

const mapStateToProps = createStructuredSelector({
  tournament: makeSelectTournament(),
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);
