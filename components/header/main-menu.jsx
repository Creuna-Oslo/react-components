import React from "react";

const MainMenu = () => (
  <div className="main-menu">
    <div className="main-menu__link-group">
      <h3 className="main-menu__links-header">Who</h3>
      <ul className="main-menu__links">
        <li>
          <a href="#item1">Menu Item 1</a>
        </li>
        <li>
          <a href="#item2">Menu Item 2</a>
        </li>
        <li>
          <a href="#item3">Menu Item 3</a>
        </li>
        <li>
          <a href="#item4">Menu Item 4</a>
        </li>
      </ul>
    </div>
    <div className="main-menu__link-group">
      <h3 className="main-menu__links-header">What</h3>
      <ul className="main-menu__links">
        <li>
          <a href="#item5">Menu Item 5</a>
        </li>
        <li>
          <a href="#item6">Menu Item 6</a>
        </li>
        <li>
          <a href="#item7">Menu Item 7</a>
        </li>
        <li>
          <a href="#item8">Menu Item 8</a>
        </li>
        <li>
          <a href="#item9">Menu Item 9</a>
        </li>
      </ul>
    </div>
    <div className="main-menu__link-group">
      <h3 className="main-menu__links-header">Where</h3>
      <ul className="main-menu__links">
        <li>
          <a href="#item10">Menu Item 10</a>
        </li>
        <li>
          <a href="#item11">Menu Item 11</a>
        </li>
        <li>
          <a href="#item12">Menu Item 12</a>
        </li>
      </ul>
    </div>
    <div className="main-menu__link-group--anchored-lower-right">
      <ul className="main-menu__icons">
        <li className="main-menu__icon--facebook">
          <a href="#facebook" />
        </li>
        <li className="main-menu__icon--twitter">
          <a href="#twitter" />
        </li>
        <li className="main-menu__icon--instagram">
          <a href="#instagram" />
        </li>
      </ul>
    </div>
  </div>
);

export default MainMenu;
