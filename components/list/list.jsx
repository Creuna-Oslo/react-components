import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

const List = ({ inline, ordered, className, children }) =>
  React.createElement(
    ordered ? 'ol' : 'ul',
    { className: cn('list', { 'list--inline': inline }, className) },
    React.Children.map(children, (child, index) => (
      <li key={index} className="list__item">
        {child}
      </li>
    ))
  );

List.propTypes = {
  inline: PropTypes.bool,
  ordered: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

export default List;
