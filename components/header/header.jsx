import React from "react";
import cn from "classnames";
import TinyTransition from "react-tiny-transition";

import MainMenu from "./main-menu";

class Header extends React.Component {
  state = { isMenuOpen: false };

  handleMenuButtonClick() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render() {
    return (
      <div
        className={cn("header", {
          "header--is-expanded": this.state.isMenuOpen
        })}
      >
        <div className="header__toolbar">
          <a className="header__logo" href="#home" />
          <ul className="header__links">
            <li className="header__link">
              <a href="#about">About</a>
            </li>
            <li className="header__link">
              <a href="#headers">Headers</a>
            </li>
            <li className="header__link">
              <a href="#mockup">Mockup Masterclass</a>
            </li>
          </ul>
          <button
            onClick={() => this.handleMenuButtonClick()}
            className={cn("header__menu-button", {
              "header__menu-button--is-active": this.state.isMenuOpen
            })}
          >
            <span className="header__visually-hidden">MENU</span>
          </button>
        </div>

        {this.state.isMenuOpen && (
          <TinyTransition duration={500}>
            <MainMenu />
          </TinyTransition>
        )}
      </div>
    );
  }
}

export default Header;
