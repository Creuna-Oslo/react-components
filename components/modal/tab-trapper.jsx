import React from "react";
import PropTypes from "prop-types";

class TabTrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool
  };

  state = {
    shiftKeyIsPressed: false
  };

  previouslyFocusedElement = null;

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);

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

  jumpToEnd = () => {
    this.afterWrapper.focus();
  };

  jumpToStart = () => {
    this.beforeWrapper.focus();
  };

  buttonStyle = {
    position: "absolute",
    width: 0,
    height: 0,
    left: "-999em",
    overflow: "hidden"
  };

  render() {
    return (
      <React.Fragment>
        {this.props.isActive && (
          <button
            onFocus={this.jumpToEnd}
            style={this.buttonStyle}
            disabled={!this.state.shiftKeyIsPressed}
          />
        )}
        <div ref={div => (this.beforeWrapper = div)} tabIndex={-1} />

        {this.props.children}

        <div ref={div => (this.afterWrapper = div)} tabIndex={-1} />
        {this.props.isActive && (
          <button onFocus={this.jumpToStart} style={this.buttonStyle} />
        )}
      </React.Fragment>
    );
  }
}

export default TabTrapper;
