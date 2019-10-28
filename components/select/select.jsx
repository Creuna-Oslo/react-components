import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

// NOTE: These should be moved to a centralized hooks folder if possible.
import useIsMounted from "./use-is-mounted";
import useEvent from "./use-event";
import useToggle from "./use-toggle";
import useClickOutside from "./use-click-outside";

// NOTE: This is a naive implementation of 'lodash/get'. Replace it if you have 'lodash' as a dependency
const get = (object, key, fallback) => {
  try {
    return object[key];
  } catch (_) {
    return fallback;
  }
};

// NOTE: Since an option can't have `null` or `false` as a value (the text label of the option will be used instead), the "null" choice is represented using a single space. A single space is serialized to an empty value when submitting a form (which is what we want). Comparing against `magicNullValue` also lets the component return `null` from its `onChange` callback when selecting the placeholder option.
const magicNullValue = " ";

const Select = ({
  defaultSelectedValue,
  disabled,
  id,
  name,
  onChange,
  options,
  placeholder
}) => {
  const [isOpen, toggle, setIsOpen] = useToggle(false);

  const [hasTouch, setHasTouch] = React.useState(false);
  useEvent("touchstart", () => setHasTouch(true));

  const fakeSelectRef = React.useRef();
  useClickOutside(fakeSelectRef, () => setIsOpen(false));

  const [value, setValue] = React.useState(defaultSelectedValue);

  const isMounted = useIsMounted();
  React.useEffect(() => {
    // NOTE: The `onChange` callback indicates the user action of selecting, so it's not called for the initial render
    isMounted && onChange(value);
  }, [value]);

  const handleChange = value => {
    setValue(value === magicNullValue ? null : value);
    setIsOpen(false);
  };

  const label = React.useMemo(
    () => get(options.find(o => o.value === value), "label", placeholder),
    [options, value]
  );

  return (
    <div
      className={cn("select", {
        "select--has-touch": hasTouch,
        "select--is-mounted": isMounted,
        "select--is-disabled": disabled
      })}
    >
      <select
        disabled={disabled}
        name={name}
        id={id}
        onChange={e => handleChange(e.target.value)}
        value={value || ""}
      >
        {placeholder && <option value={magicNullValue}>{placeholder}</option>}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <div className="select__fake" ref={fakeSelectRef}>
        <div
          className={cn("select__element", {
            "select__element--active": isOpen
          })}
          onClick={disabled ? () => {} : toggle}
        >
          {label}
        </div>
        {isOpen && (
          <ul>
            {options.map(({ label, value }) => (
              <li
                className="select__option"
                key={value}
                onClick={() => handleChange(value)}
              >
                <span>{label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Select.propTypes = {
  defaultSelectedValue: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  placeholder: PropTypes.string
};

Select.propTypesMeta = {
  disabled: "exclude"
};

Select.defaultProps = {
  onChange: () => {},
  options: []
};

export default Select;
