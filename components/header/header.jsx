import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import TinyTransition from 'react-tiny-transition';

import Menu from './menu';

class Header extends React.Component {
  static propTypes = {
    logo: PropTypes.shape({
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    }).isRequired,
    menuButton: PropTypes.shape({
      iconUrl: PropTypes.string.isRequired,
      activeIconUrl: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ),
    menu: PropTypes.object.isRequired
  };

  static defaultProps = {
    links: []
  };

  state = { isMenuOpen: true };

  handleMenuButtonClick() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render() {
    return (
      <div
        className={cn('header', {
          'header--is-expanded': this.state.isMenuOpen
        })}
      >
        <div className="header__toolbar">
          <a className="header__logo" href={this.props.logo.href}>
            <img src={this.props.logo.src} alt={this.props.logo.alt} />
          </a>
          <ul className="header__links">
            {this.props.links.map((link, index) => (
              <li key={index} className="header__link">
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => this.handleMenuButtonClick()}
            className={cn('header__menu-button', {
              'header__menu-button--is-active': this.state.isMenuOpen
            })}
            style={{
              backgroundImage: `url(${
                this.state.isMenuOpen
                  ? this.props.menuButton.activeIconUrl
                  : this.props.menuButton.iconUrl
              })`
            }}
          >
            <span className="header__visually-hidden">
              {this.props.menuButton.text}
            </span>
          </button>
        </div>

        {this.state.isMenuOpen && (
          <TinyTransition duration={500}>
            <Menu {...this.props.menu} />
          </TinyTransition>
        )}
      </div>
    );
  }
}

export default Header;
