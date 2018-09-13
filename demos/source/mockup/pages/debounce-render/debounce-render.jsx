// DebounceRender
import React from "react";
import Layout from "../../layout";

import { Motion, spring } from "react-motion";

import DebounceRender from "components/debounce-render";

class DebounceRenderPage extends React.Component {
  state = {
    isActive: false
  };

  componentDidMount() {
    this.setState({ button: this.button });
  }

  toggle = () => {
    this.setState(state => ({
      isActive: !state.isActive
    }));
  };

  render() {
    return (
      <Layout>
        <div style={{ marginTop: 40 }}>
          <button onClick={this.toggle} ref={b => (this.button = b)}>
            Animate
          </button>

          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(this.state.isActive ? 300 : 0) }}
          >
            {motion => (
              <div>
                <div style={{ transform: `translateX(${motion.x}px)` }}>
                  {/* This will be rendered every frame */}
                  <h2>{"Animated: " + parseInt(motion.x)}</h2>
                </div>

                <div style={{ transform: `translateX(${motion.x}px)` }}>
                  <DebounceRender wait={30}>
                    {/* This will be rendered while animation is not running */}
                    <h2>{"DebounceRender: " + parseInt(motion.x)}</h2>
                  </DebounceRender>
                </div>
              </div>
            )}
          </Motion>
        </div>
      </Layout>
    );
  }
}

export default DebounceRenderPage;
