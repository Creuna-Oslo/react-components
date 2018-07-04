import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const themes = {
  default: "default",
  underlined: "underlined"
};

const Link = ({
  text,
  href,
  children,
  theme,
  className,
  shouldOpenInNewTab
}) => {
  const targetAttributes = shouldOpenInNewTab
    ? {
        target: "_blank",
        rel: "noopener noreferrer"
      }
    : {};

  return (
    <a
      className={cn("link", `link--theme-${theme}`, className)}
      href={href}
      {...targetAttributes}
    >
      <span className="link__content">{children || text || href}</span>
    </a>
  );
};

Link.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.node,
  shouldOpenInNewTab: PropTypes.bool,
  theme: PropTypes.oneOf(Object.keys(themes).map(key => themes[key]))
};

Link.defaultProps = {
  theme: themes.default
};

Link.themes = themes;

export default Link;
