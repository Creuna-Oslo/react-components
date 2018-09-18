// Carousel
import React from "react";
import Layout from "../../layout";

import content from "./carousel.json";

import Carousel from "components/carousel";

require("components/carousel/carousel.scss");

const CarouselPage = () => {
  const thumbnails = content.map(item => (
    <div key={item.id}>
      <img src={item.image} style={{ width: "100%" }} />
      <p>{item.title}</p>
    </div>
  ));

  return (
    <Layout>
      <Carousel thumbnails={thumbnails}>
        {content.map(item => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} />
          </div>
        ))}
      </Carousel>
    </Layout>
  );
};

export default CarouselPage;
