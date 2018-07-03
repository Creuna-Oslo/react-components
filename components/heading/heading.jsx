import cn from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const themes = {
  default: 'default',
  chapter: 'chapter'
};

const Heading = ({ children, className, level, theme }) => {
  return React.createElement(
    `h${level}`,
    {
      className: cn(
        'heading',
        {
          [`heading--level-${level}`]: !themes[theme],
          [`heading--theme-${themes[theme]}`]: themes[theme]
        },
        className
      )
    },
    children
  );
};

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  theme: PropTypes.oneOf(Object.keys(themes).map(key => themes[key]))
};

Heading.defaultProps = {
  theme: themes.default,
  level: 2
};

Heading.themes = themes;

export default Heading;
