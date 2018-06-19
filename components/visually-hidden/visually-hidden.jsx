import React from "react";
import PropTypes from "prop-types";

const VisuallyHidden = ({ children }) =>
  React.Children.count(children) === 0 ? null : (
    <span className="visually-hidden">{children}</span>
  );

VisuallyHidden.propTypes = {
  children: PropTypes.node
};

export default VisuallyHidden;
