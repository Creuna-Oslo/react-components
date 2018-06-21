import React from 'react';
import PropTypes from 'prop-types';

class DebounceRender extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    wait: PropTypes.number
  };

  static defaultProps = {
    wait: 0
  };

  state = {
    children: this.props.children
  };

  timer = null;

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ children: this.props.children });
      }, this.props.wait);
    }
  }

  render() {
    return this.state.children;
  }
}

export default DebounceRender;
