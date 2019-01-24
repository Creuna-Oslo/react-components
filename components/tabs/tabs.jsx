import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

const tabId = id => `tab-${id}`;
const contentId = id => `content-${id}`;

const getZIndex = (items, index, currentIndex) => {
  if (index === currentIndex) return items.length; // Active (on top)
  if (index < currentIndex) return index; // Items before active
  return items.length - index; // Items after active
};

// NOTE: 'aria-role="tablist"' is intentionally not used for this component.
// Read about why here: https://simplyaccessible.com/article/danger-aria-tabs/

class Tabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.exact({
        guid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    children: PropTypes.node
  };

  static defaultProps = {
    tabs: [],
    content: []
  };

  state = {
    currentTab: (this.props.tabs[0] || {}).guid,
    currentTabIndex: 0
  };

  changeActiveTab = id => () => {
    this.setState({
      currentTab: id,
      currentTabIndex: this.props.tabs.findIndex(tab => tab.guid === id)
    });
  };

  render() {
    const { tabs } = this.props;

    return (
      <div className="tabs">
        <ul className="tabs-list">
          {tabs.map((tab, index) => {
            const isCurrent = tab.guid === this.state.currentTab;

            return (
              <li
                className={cn({ "is-active": isCurrent })}
                key={tab.guid}
                style={{
                  zIndex: getZIndex(tabs, index, this.state.currentTabIndex)
                }}
              >
                <a
                  className={cn({ "is-active": isCurrent })}
                  aria-selected={isCurrent}
                  href={`#${contentId(tab.guid)}`}
                  id={tabId(tab.guid)}
                  onClick={this.changeActiveTab(tab.guid)}
                >
                  {tab.name}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="tabs-content">
          {React.Children.map(this.props.children, (child, index) => {
            const tab = tabs[index];

            if (!tab) {
              return null;
            }

            const isCurrent = tab.guid === this.state.currentTab;

            return (
              <div
                aria-hidden={!isCurrent}
                aria-labelledby={tabId(tab.guid)}
                id={contentId(tab.guid)}
                style={{ display: isCurrent ? null : "none" }}
                tabIndex={isCurrent ? -1 : null}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
