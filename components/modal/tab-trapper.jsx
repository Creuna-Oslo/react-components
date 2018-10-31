import React from "react";
import PropTypes from "prop-types";

class TabTrapper extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    isActive: PropTypes.bool
  };

  state = {
    shiftKeyIsPressed: false
  };

  previouslyFocusedElement = null;

  componentDidMount() {
    this.container.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    this.container.removeEventListener("keydown", this.onKeyDown);

    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      this.previouslyFocusedElement = document.activeElement;
    }

    if (
      prevProps.isActive &&
      !this.props.isActive &&
      this.previouslyFocusedElement
    ) {
      this.previouslyFocusedElement.focus();
    }
  }

  onKeyDown = e => {
    this.setState({ shiftKeyIsPressed: e.shiftKey });
  };

  trapFirst = () => {
    this.afterWrapper.focus();
  };

  trapLast = () => {
    this.beforeWrapper.focus();
  };

  getButtonStyle = () => {
    return {
      position: "absolute",
      width: 0,
      height: 0,
      left: "-999em",
      overflow: "hidden"
    };
  };

  render() {
    return (
      <div ref={div => (this.container = div)}>
        {this.props.isActive && (
          <button
            onFocus={this.trapFirst}
            style={this.getButtonStyle()}
            disabled={!this.state.shiftKeyIsPressed}
          />
        )}
        <div ref={div => (this.beforeWrapper = div)} tabIndex={-1} />

        {this.props.children}

        <div ref={div => (this.afterWrapper = div)} tabIndex={-1} />
        {this.props.isActive && (
          <button onFocus={this.trapLast} style={this.getButtonStyle()} />
        )}
      </div>
    );
  }
}

export default TabTrapper;
