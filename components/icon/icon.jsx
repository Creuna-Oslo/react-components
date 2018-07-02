import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const sizes = {
  small: "small",
  medium: "medium",
  large: "large"
};

const Icon = ({ className, name, size }) =>
  !name ? null : (
    <span className={cn("icon", `icon--${name}`, `icon--${size}`, className)} />
  );

Icon.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes).map(key => sizes[key]))
};

Icon.defaultProps = {
  size: sizes.small
};

Icon.sizes = sizes;

export default Icon;
