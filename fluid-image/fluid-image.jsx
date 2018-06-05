import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const FluidImage = ({ alt, className, focusPoint, src }) => {
  return (
    <div
      className={cn("fluid-image", className)}
      style={{
        backgroundImage: src,
        backgroundPosition: focusPoint
          ? `${focusPoint.x}% ${focusPoint.y}%`
          : null
      }}
    >
      {src && <img src={src} />}
    </div>
  );
};

FluidImage.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string,
  focusPoint: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  fallback: PropTypes.string
};

export default FluidImage;
