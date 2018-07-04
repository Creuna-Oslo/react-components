import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const types = {
  email: 'email',
  password: 'password',
  text: 'text',
  tel: 'tel',
  url: 'url',
  time: 'time',
  number: 'number',
  search: 'search'
};

class TextInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyDown: PropTypes.func,
    onRef: PropTypes.func,
    className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    type: PropTypes.oneOf(Object.keys(types).map(key => types[key]))
  };

  static defaultProps = {
    type: types.text
  };

  state = {
    isInFocus: false,
    onRef: () => {},
    hasValue: false
  };

  onChange = e => {
    const value = e.target.value || '';

    this.setState({
      hasValue: !!value,
      value
    });
  };

  onFocus = () => {
    this.setState({ isInFocus: true });
  };

  onBlur = () => {
    this.setState({ isInFocus: false });
  };

  render() {
    return (
      <label
        className={cn(
          'text-input',
          `text-input--type-${this.props.type}`,
          { 'text-input--in-focus': this.state.isInFocus },
          this.props.className
        )}
      >
        <span className="text-input__label">{this.props.label}</span>
        <input
          type={this.props.type}
          className="text-input__input"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          onKeyDown={this.props.onKeyDown}
          ref={ref => {
            this.props.onRef ? this.props.onRef(ref) : (this.input = ref);
          }}
          {...this.props}
        />
      </label>
    );
  }
}

export default TextInput;
