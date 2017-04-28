import React from 'react';
import withProgressBar from 'components/ProgressBar';
import Logo from './Logo';
import Wrapper from 'components/Wrapper';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Wrapper>
          <Logo to="/">Dota2 vods</Logo>
        </Wrapper>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export default withProgressBar(App);
