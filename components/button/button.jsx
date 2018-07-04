import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from '../icon';

const themes = {
  primary: 'primary',
  secondary: 'secondary'
};

const Button = ({
  text,
  onClick,
  children,
  theme,
  className,
  isDisabled,
  isActive,
  iconSize,
  iconName,
  iconNameActive
}) => (
  <button
    className={cn(
      'button',
      `button--theme-${theme}`,
      {
        'button--is-active': isActive,
        'button--has-icon': iconName
      },
      className
    )}
    onClick={onClick}
    disabled={isDisabled}
  >
    <span className="button__text">{text || children}</span>
    {iconName && (
      <Icon
        className="button__icon"
        name={isActive ? iconNameActive : iconName}
        size={iconSize}
      />
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isDisabled: PropTypes.bool,
  iconName: PropTypes.string,
  iconNameActive: PropTypes.string,
  iconSize: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  theme: PropTypes.oneOf(Object.keys(themes).map(key => themes[key]))
};

Button.defaultProps = {
  theme: themes.primary
};

Button.themes = themes;

export default Button;
