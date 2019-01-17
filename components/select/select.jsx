import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

// NOTE: This is a naiive implementation of 'lodash/get'. Replave it if you have 'lodash' as a dependency
const get = (object, key, fallback) => {
  try {
    return object[key];
  } catch (_) {
    return fallback;
  }
};

const getInitialOption = options => {
  const selectedOption = options.find(o => o.selected);
  return get(selectedOption, "value") || get(options[0], "value");
};

class Select extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        value: PropTypes.string.isRequired
      })
    )
  };

  static defaultProps = {
    options: []
  };

  state = {
    dropdownIsVisible: false,
    hasTouch: false,
    isMounted: false,
    value: getInitialOption(this.props.options)
  };

  componentDidMount() {
    this.setState({ isMounted: true });

    window.addEventListener("click", this.handleClickOutside);
    window.addEventListener("touchstart", this.onTouchStart);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("touchstart", this.onTouchStart);
  }

  onTouchStart = () => {
    this.setState({ hasTouch: true });
    window.removeEventListener("touchstart", this.onTouchStart);
  };

  handleClickOutside = e => {
    if (e.target !== this.fakeSelect && !this.fakeSelect.contains(e.target)) {
      this.setState({ dropdownIsVisible: false });
    }
  };

  handleChange = value => {
    this.setState({ dropdownIsVisible: false });
    this.setState({ value });
  };

  onChange = e => {
    this.handleChange(e.target.value);
  };

  onOptionClick(value, e) {
    e.stopPropagation();
    this.handleChange(value);
  }

  toggleDropdown = () => {
    this.setState(state => ({ dropdownIsVisible: !state.dropdownIsVisible }));
  };

  getLabel = () =>
    get(this.props.options.find(o => o.value === this.state.value), "label");

  render() {
    return (
      <div
        className={cn("select", {
          "has-touch": this.state.hasTouch,
          "is-mounted": this.state.isMounted
        })}
      >
        <select
          name={this.props.name}
          id={this.props.id}
          onChange={this.onChange}
          value={this.state.value || ""}
        >
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="select-fake">
          <div
            className="select-element"
            onClick={this.toggleDropdown}
            ref={div => (this.fakeSelect = div)}
          >
            {this.getLabel()}
          </div>
          {this.state.dropdownIsVisible && (
            <ul>
              {this.props.options.map(option => (
                <li
                  className={cn({
                    "is-active": option.value === this.state.value
                  })}
                  key={option.value}
                  onClick={this.onOptionClick.bind(this, option.value)}
                >
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Select;
