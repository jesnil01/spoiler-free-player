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

import { loadTournaments } from 'containers/App/actions';
import { makeSelectTournaments } from 'containers/App/selectors';

import Wrapper from 'components/Wrapper';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount(){
    this.props.loadTournaments();
  }

  render() {

    const {
      tournaments,
    } = this.props;

    // console.log(tournaments);

    const tournamentList = !tournaments ? '' : tournaments.map((item, i) => {
      return (
        <div><button onClick={this.props.goToTournament} value={item.slug} key={i}>{item.title}</button></div>
      );
    });

    return (
      <Wrapper>
        <h1>Tournaments</h1>
        {tournamentList}
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    loadTournaments: (e) => dispatch(loadTournaments()),
    goToTournament: (e) => dispatch(push(`/tournament/${e.target.value}/`)),
  };
}

const mapStateToProps = createStructuredSelector({
  tournaments: makeSelectTournaments(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
