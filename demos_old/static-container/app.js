import React from "react";
import { render } from "react-dom";

import { Motion, spring } from "react-motion";

import StaticContainer from "../../components/static-container";

class Main extends React.Component {
  state = {
    isAnimating: false,
    isActive: false
  };

  componentDidMount() {
    this.setState({ button: this.button });
  }

  toggle = () => {
    this.setState(state => ({
      isAnimating: true,
      isActive: !state.isActive
    }));
  };

  onMotionRest = () => {
    this.setState({
      isAnimating: false
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggle} ref={b => (this.button = b)}>
          Animate
        </button>

        <Motion
          defaultStyle={{ x: 0 }}
          style={{ x: spring(this.state.isActive ? 300 : 0) }}
          onRest={this.onMotionRest}
        >
          {motion => (
            <div>
              <div style={{ transform: `translateX(${motion.x}px)` }}>
                {/* This will be rendered every frame */}
                <h2>{"Non-static: " + parseInt(motion.x)}</h2>
              </div>

              <div style={{ transform: `translateX(${motion.x}px)` }}>
                <StaticContainer shouldUpdate={!this.state.isAnimating}>
                  {/* This will be rendered while animation is not running */}
                  <h2>{"Static: " + parseInt(motion.x)}</h2>
                </StaticContainer>
              </div>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

window.onload = function() {
  render(<Main />, document.getElementById("app"));
};
