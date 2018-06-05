import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import cn from "classnames";

import debounce from "./debounce";

function getNewState(newIndex, numberOfItems) {
  const lastIndex = numberOfItems - 1;
  const newIndexClamped = clamp(newIndex, 0, lastIndex);

  return {
    currentIndex: newIndexClamped,
    currentIndexRounded: Math.round(newIndexClamped),
    hasNextItem: newIndexClamped < lastIndex,
    hasPreviousItem: newIndexClamped > 0
  };
}

function clamp(currentValue, minimumValue, maximumValue) {
  return Math.max(Math.min(currentValue, maximumValue), minimumValue);
}

class Carousel extends React.Component {
  static propTypes = {
    goToItemText: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    nextItemText: PropTypes.string,
    previousItemText: PropTypes.string,
    startIndex: PropTypes.number,
    thumbnails: PropTypes.arrayOf(PropTypes.node)
  };

  static defaultProps = {
    goToItemText: "Gå til bilde nr ",
    nextItemText: "Neste bilde",
    previousItemText: "Forrige bilde",
    startIndex: 0,
    thumbnails: []
  };

  state = Object.assign(
    {
      isMounted: false,
      shouldShowNavigation: false,
      visibleThumbnailCount: 3
    },
    getNewState(
      this.props.startIndex,
      React.Children.count(this.props.children)
    )
  );

  debouncedResizeHandler = debounce(() => {
    if (!this.thumbsWrapper) {
      return;
    }

    this.setState({
      visibleThumbnailCount: this.thumbsWrapper.offsetWidth < 400 ? 2 : 3
    });
  }, 300);

  onTouchEnd = startPropName => {
    this.goToItem(this.state.currentIndex);
    this[startPropName] = undefined;
    this.travel = 0;
  };

  onTouchMove = (e, touch, startPropName, wrapperWidth, travelModifier = 1) => {
    if (this.isAnimating || !touch) {
      return;
    }

    const xDiff = this[startPropName] - touch.clientX;

    if (Math.abs(xDiff) > 5) {
      e.preventDefault();
    }

    this.travel = xDiff / wrapperWidth * travelModifier;
    this.isAnimating = true;

    window.requestAnimationFrame(() => {
      this.setState(
        getNewState(
          this.indexOnTouchStart + this.travel,
          React.Children.count(this.props.children)
        ),
        () => {
          this.isAnimating = false;
        }
      );
    });
  };

  onTouchStart = (touch, startPropName) => {
    if (!touch) {
      return;
    }

    this[startPropName] = touch.clientX;
    this.indexOnTouchStart = this.state.currentIndex;
    this.travel = 0;
  };

  onItemsWrapperTouchEnd = () => {
    this.onTouchEnd("itemsTouchStartX");
  };

  onItemsWrapperTouchMove = e => {
    this.onTouchMove(
      e,
      e.touches[0],
      "itemsTouchStartX",
      this.itemsWrapper.offsetWidth
    );
  };

  onItemsWrapperTouchStart = e => {
    this.onTouchStart(e.touches[0], "itemsTouchStartX");
  };

  onThumbsWrapperTouchEnd = () => {
    this.onTouchEnd("thumbsTouchStartX");
  };

  onThumbsWrapperTouchMove = e => {
    this.onTouchMove(
      e,
      e.touches[0],
      "thumbsTouchStartX",
      this.thumbsWrapper.offsetWidth,
      1 + this.state.visibleThumbnailCount / 2
    );
  };

  onThumbsWrapperTouchStart = e => {
    this.onTouchStart(e.touches[0], "thumbsTouchStartX");
  };

  componentDidMount() {
    this.setState({
      isMounted: true,
      shouldShowNavigation: React.Children.count(this.props.children) > 1,
      visibleThumbnailCount: this.thumbsWrapper
        ? this.thumbsWrapper.offsetWidth < 400 ? 2 : 3
        : 3
    });

    window.addEventListener("resize", this.debouncedResizeHandler);

    if (this.itemsWrapper) {
      this.itemsWrapper.addEventListener(
        "touchend",
        this.onItemsWrapperTouchEnd
      );
      this.itemsWrapper.addEventListener(
        "touchmove",
        this.onItemsWrapperTouchMove
      );
      this.itemsWrapper.addEventListener(
        "touchstart",
        this.onItemsWrapperTouchStart
      );
    }

    if (this.thumbsWrapper) {
      this.thumbsWrapper.addEventListener(
        "touchend",
        this.onThumbsWrapperTouchEnd
      );
      this.thumbsWrapper.addEventListener(
        "touchmove",
        this.onThumbsWrapperTouchMove
      );
      this.thumbsWrapper.addEventListener(
        "touchstart",
        this.onThumbsWrapperTouchStart
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.debouncedResizeHandler);

    if (this.itemsWrapper) {
      this.itemsWrapper.removeEventListener(
        "touchend",
        this.onItemsWrapperTouchEnd
      );
      this.itemsWrapper.removeEventListener(
        "touchmove",
        this.onItemsWrapperMove
      );
      this.itemsWrapper.removeEventListener(
        "touchstart",
        this.onItemsWrapperStart
      );
    }

    if (this.thumbsWrapper) {
      this.thumbsWrapper.removeEventListener(
        "touchend",
        this.onThumbsWrapperTouchEnd
      );
      this.thumbsWrapper.removeEventListener(
        "touchmove",
        this.onThumbsWrapperTouchMove
      );
      this.thumbsWrapper.removeEventListener(
        "touchstart",
        this.onThumbsWrapperTouchStart
      );
    }
  }

  goToItem = newIndex => {
    this.setState(
      getNewState(
        Math.round(newIndex),
        React.Children.count(this.props.children)
      )
    );
  };

  goToNextItem = () => {
    this.goToItem(this.state.currentIndex + 1);
  };

  goToPreviousItem = () => {
    this.goToItem(this.state.currentIndex - 1);
  };

  onThumbNailClick = index => {
    this.goToItem(index);
  };

  render() {
    const slidesCount = React.Children.count(this.props.children);
    const currentSlide = this.state.currentIndexRounded;

    return slidesCount === 0 ? null : (
      <div className="carousel">
        <div className="carousel-content">
          <div
            className="carousel-items-wrapper"
            ref={e => (this.itemsWrapper = e)}
          >
            <Motion
              defaultStyle={{ x: 0 }}
              style={{ x: spring(this.state.currentIndex) }}
            >
              {({ x }) => {
                const itemWidth = 100 / slidesCount;

                return (
                  <ul
                    className="carousel-items"
                    style={{
                      transform: `translateX(-${itemWidth * x}%)`,
                      width: `${slidesCount * 100}%`
                    }}
                  >
                    {React.Children.map(this.props.children, (child, index) => (
                      <li
                        className={cn({ "is-current": currentSlide === index })}
                        style={{ width: `${itemWidth}%` }}
                      >
                        {child}
                      </li>
                    ))}
                  </ul>
                );
              }}
            </Motion>
          </div>

          {!!this.props.thumbnails.length && (
            <div
              className="carousel-thumbs-wrapper"
              ref={e => (this.thumbsWrapper = e)}
            >
              <Motion
                defaultStyle={{ x: 0 }}
                style={{
                  x: spring(
                    Math.min(
                      this.state.visibleThumbnailCount > 2
                        ? this.state.currentIndex - 1
                        : this.state.currentIndex,
                      slidesCount - this.state.visibleThumbnailCount
                    )
                  )
                }}
              >
                {({ x }) => {
                  const itemWidth =
                    100 / slidesCount / this.state.visibleThumbnailCount;
                  const { goToItemText } = this.props;

                  return (
                    <ul
                      className="carousel-thumbs"
                      style={{
                        transform: `translateX(-${itemWidth * x}%`,
                        width: `${slidesCount * 100}%`
                      }}
                    >
                      {React.Children.map(
                        this.props.thumbnails,
                        (item, index) => (
                          <li
                            className={cn("carousel-thumbnail", {
                              "is-current": currentSlide === index
                            })}
                            style={{ width: `${itemWidth}%` }}
                          >
                            <button
                              onClick={() => this.goToItem(index)}
                              type="button"
                            >
                              <span>{`${goToItemText}${index + 1}`}</span>
                            </button>
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  );
                }}
              </Motion>
            </div>
          )}

          {this.state.shouldShowNavigation && (
            <div className="carousel-nav">
              <button
                className="carousel-prev"
                disabled={!this.state.hasPreviousItem}
                onClick={this.goToPreviousItem}
                type="button"
              >
                <span>{this.props.previousItemText}</span>
              </button>

              <div className="carousel-steps">
                <span className="carousel-current">
                  {this.state.currentIndexRounded + 1}
                </span>
                <span className="carousel-total">{"/" + slidesCount}</span>
              </div>

              <button
                className="carousel-next"
                disabled={!this.state.hasNextItem}
                onClick={this.goToNextItem}
                type="button"
              >
                <span>{this.props.nextItemText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
