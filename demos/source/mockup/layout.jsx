import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children, showLink }) => (
  <div className="page">
    {showLink && (
      <a className="page-back-link" href="/">
        Back
      </a>
    )}
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
  showLink: PropTypes.bool
};

Layout.defaultProps = {
  showLink: true
};

export default Layout;
