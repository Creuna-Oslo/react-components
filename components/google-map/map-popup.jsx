import React from "react";
import PropTypes from "prop-types";

const MapPopup = ({ text, title }) => (
  <div>
    <h2>{title}</h2>
    <p>{text}</p>
  </div>
);

MapPopup.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string
};

export default MapPopup;
