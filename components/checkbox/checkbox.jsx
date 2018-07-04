import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import icon from './close.svg';

const Checkbox = ({ id, checked, inputName, onChange, text, url }) => {
  const label = React.createElement(
    url ? 'a' : 'label',
    {
      className: cn('checkbox__toggler', {
        'checkbox__toggler--checked': checked
      }),
      href: url ? url : undefined,
      htmlFor: id ? id : undefined,
      onClick: url
        ? e => {
            onChange(e, id);
          }
        : undefined
    },
    <React.Fragment>
      <div className="checkbox__frame">
        {checked && (
          <div
            className="checkbox__icon"
            style={{ backgroundImage: `url(${icon})` }}
          />
        )}
      </div>
      <span className="checkbox__text">{text}</span>
    </React.Fragment>
  );

  return (
    <div className="checkbox">
      {url ? (
        <React.Fragment />
      ) : (
        <input
          className="checkbox__input"
          type="checkbox"
          name={inputName}
          onChange={e => onChange(e, id)}
          id={id}
          checked={checked}
        />
      )}
      {label}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  inputName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string
};

Checkbox.defaultProps = {
  onChange: () => {}
};

export default Checkbox;
