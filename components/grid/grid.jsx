import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const Grid = ({ children, numberOfColumns }) => (
  <div className={cn("grid", [`grid--columns-${numberOfColumns}`])}>
    {React.Children.map(children, (child, index) => (
      <div
        key={index}
        className={cn("grid__item", [`grid__item--number-${index + 1}`])}
      >
        {child}
      </div>
    ))}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  numberOfColumns: PropTypes.number
};

Grid.defaultProps = {
  numberOfColumns: 4
};

export default Grid;
