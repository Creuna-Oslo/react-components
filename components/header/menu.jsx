import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ navigationLinks, socialMediaLinks }) => (
  <div className="menu">
    <div className="menu__navigation">
      {navigationLinks.map((navGroup, index) => (
        <div key={index}>
          <h3>{navGroup.heading}</h3>
          <ul>
            {navGroup.links.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="menu__social-media">
      <ul>
        {socialMediaLinks.map((link, index) => (
          <li className="menu__social-media-icon" key={index}>
            <a
              className="menu__social-media-link"
              href={link.href}
              style={{
                backgroundImage: `url(${link.iconUrl})`
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

Menu.propTypes = {
  navigationLinks: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  socialMediaLinks: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      iconUrl: PropTypes.string.isRequired
    })
  )
};

Menu.defaultProps = {
  linkGroups: [],
  socialMediaLinks: []
};

export default Menu;
