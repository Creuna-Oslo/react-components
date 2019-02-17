// Tabs
import React from "react";
import Layout from "../../layout";

import content from "./tabs.json";

import Tabs from "components/tabs";

require("components/tabs/tabs.scss");

const CarouselPage = () => {
  return (
    <Layout>
      <Tabs tabs={content.tabs}>
        {content.content.map(string => (
          <div key={string}>{string}</div>
        ))}
      </Tabs>
    </Layout>
  );
};

export default CarouselPage;
