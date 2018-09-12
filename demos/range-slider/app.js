import "../../components/range-slider/range-slider.scss";

import React from "react";
import { render } from "react-dom";

import RangeSlider from "../../components/range-slider";

const data = {
  from: {
    label: "Fra",
    name: "range-from",
    value: "10"
  },
  label: "Range select",
  max: 30,
  min: 0,
  to: {
    label: "Til",
    name: "range-to",
    value: "20"
  }
};

class Main extends React.Component {
  render() {
    return (
      <div>
        <RangeSlider {...data} />
      </div>
    );
  }
}

window.onload = function() {
  render(<Main />, document.getElementById("app"));
};
