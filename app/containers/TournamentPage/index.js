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

class TournamentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { slug } = this.props.params;

    this.props.loadTournament(slug);
  }

  render() {
    const {
      tournament,
    } = this.props;

    const listMatches = (list) => {
      return list.map((item, i) => {
        return <button onClick={this.props.goToMatch} value={item.id} key={i}>{item.title}</button>
      });
    }

    const tournamentTitle = !tournament ? '' : <h1 onClick={this.props.goHome}>{tournament.title}</h1>;
    let blocks;

    if(tournament) {
      blocks = tournament.blocks.map((item, i) => {
        return (
          <div key={i}>
            <h3>{item.title}</h3>
            <div> LIst: {listMatches(item.matchList)}</div>
          </div>
        );
      });
    }

    return (
      <div>
        {tournamentTitle}
        {blocks}
      </div>
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
