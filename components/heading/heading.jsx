import cn from "classnames";
import React from "react";
import PropTypes from "prop-types";

const Heading = ({ children, className, level }) => {
  return React.createElement(
    `h${level}`,
    {
      className: cn("heading", `heading--level-${level}`, className)
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
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};

Heading.defaultProps = {
  level: 2
};

export default Heading;
