import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";
import clamp from "@creuna/utils/clamp";
import rangeMap from "@creuna/utils/range-map";

class RangeSlider extends React.Component {
  static propTypes = {
    from: PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string
    }).isRequired,
    label: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    to: PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string
    }).isRequired
  };

  state = {
    draggingFrom: false,
    draggingTo: false,
    from: parseInt(this.props.from.value) || this.props.min,
    screenLeft: 0,
    to: parseInt(this.props.to.value) || this.props.max,
    width: 0
  };

  // Intentional duplicate of state equivalents. On mouseup, these are both set to false. The state equivalents are not reset on mouseup, to allow positioning the last modified knob on top
  draggingFrom = false;
  draggingTo = false;

  onSliderRef = wrapper => {
    this.setState({
      width: wrapper.offsetWidth,
      screenLeft: wrapper.getBoundingClientRect().left
    });
  };

  clampFrom = (value, state) => {
    return clamp(value, this.props.min, state.to - 1);
  };

  clampTo = (value, state) => {
    return clamp(value, state.from + 1, this.props.max);
  };

  setFrom = e => {
    e.persist();
    this.setState(state => ({
      from: this.clampFrom(parseInt(e.target.value), state)
    }));
  };

  setTo = e => {
    e.persist();
    this.setState(state => ({
      to: this.clampTo(parseInt(e.target.value), state)
    }));
  };

  onDrag = e => {
    if (!this.draggingFrom && !this.draggingTo) {
      return;
    }

    this.setState(state => {
      const position = e.clientX - state.screenLeft;
      const value = Math.round(
        rangeMap(position, 0, state.width, this.props.min, this.props.max)
      );

      if (state.draggingFrom) {
        return { from: this.clampFrom(value, state) };
      }

      if (state.draggingTo) {
        return { to: this.clampTo(value, state) };
      }
    });
  };

  onFromMouseDown = () => {
    this.draggingFrom = true;
    this.setState({ draggingFrom: true, draggingTo: false });
  };

  onToMouseDown = () => {
    this.draggingTo = true;
    this.setState({ draggingFrom: false, draggingTo: true });
  };

  resetDragging = () => {
    this.draggingFrom = false;
    this.draggingTo = false;
  };

  componentDidMount() {
    window.addEventListener("mouseup", this.resetDragging);
    window.addEventListener("mousemove", this.onDrag);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.resetDragging);
    window.removeEventListener("mousemove", this.onDrag);
  }

  render() {
    const { min, max } = this.props;
    const { from, to, width } = this.state;

    // Adds 10px of padding to the output range, to keep knobs within the parent container
    const fromPosition = rangeMap(from, min, max, 10, width - 10);
    const toPosition = rangeMap(to, min, max, 10, width - 10);

    return (
      <fieldset className={cn("range-slider", this.props.className)}>
        <legend>{this.props.label}</legend>

        <div className="range-slider-inputs">
          <label>
            {this.props.from.label}
            <input
              type="number"
              name={this.props.from.name}
              onChange={this.setFrom}
              value={this.state.from}
            />
          </label>
          <label>
            {this.props.to.label}
            <input
              type="number"
              name={this.props.to.name}
              onChange={this.setTo}
              value={this.state.to}
            />
          </label>
        </div>

        <div className="range-slider-slider" ref={this.onSliderRef}>
          {this.state.width > 0 && (
            <React.Fragment>
              <div
                className="range-slider-active-region"
                style={{
                  left: fromPosition,
                  width: toPosition - fromPosition
                }}
              />
              <div
                className="range-slider-knob from"
                onMouseDown={this.onFromMouseDown}
                style={{
                  left: fromPosition,
                  zIndex: this.state.draggingFrom ? 2 : null
                }}
              />
              <div
                className="range-slider-knob to"
                onMouseDown={this.onToMouseDown}
                style={{
                  left: toPosition,
                  zIndex: this.state.draggingTo ? 2 : null
                }}
              />
            </React.Fragment>
          )}
        </div>
      </fieldset>
    );
  }
}

export default RangeSlider;
