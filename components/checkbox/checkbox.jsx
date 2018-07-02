import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import Icon from "../icon";

const themes = {
  default: "default",
  big: "big"
};

const Checkbox = ({
  id,
  isActive,
  inputName,
  iconName,
  onChange,
  text,
  theme,
  url
}) => {
  const label = React.createElement(
    url ? "a" : "label",
    {
      className: cn("checkbox__toggler", {
        "checkbox__toggler--active": isActive
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
        <Icon
          className="checkbox__icon"
          name={isActive ? iconName : undefined}
        />
      </div>
      {text}
    </React.Fragment>
  );

  return (
    <div
      className={cn("checkbox", {
        [`checkbox--${themes[theme]}`]: themes[theme]
      })}
    >
      {url ? (
        <React.Fragment />
      ) : (
        <input
          className="checkbox__input"
          type="checkbox"
          name={inputName}
          onChange={e => onChange(e, id)}
          id={id}
          checked={isActive}
        />
      )}
      {label}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(Object.keys(themes).map(key => themes[key])),
  url: PropTypes.string
};

Checkbox.defaultProps = {
  theme: themes.default
};

Checkbox.themes = themes;

export default Checkbox;
