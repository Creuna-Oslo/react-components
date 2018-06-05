import React from "react";
import PropTypes from "prop-types";

class StaticContainer extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    shouldUpdate: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  render() {
    return this.props.children;
  }
}

export default StaticContainer;
