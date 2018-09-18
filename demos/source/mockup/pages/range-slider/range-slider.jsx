// RangeSlider
import React from "react";
import Layout from "../../layout";

import content from "./range-slider.json";

import RangeSlider from "components/range-slider";

require("components/range-slider/range-slider.scss");

const RangeSliderPage = () => (
  <Layout>
    <RangeSlider {...content} />
  </Layout>
);

export default RangeSliderPage;
