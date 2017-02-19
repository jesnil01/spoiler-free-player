import React from 'react';
import withProgressBar from 'components/ProgressBar';
import Logo from './Logo';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Logo to="/">Spoiler free</Logo>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export default withProgressBar(App);
