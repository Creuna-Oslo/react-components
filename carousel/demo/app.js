require("../carousel.scss");

import React from "react";
import { render } from "react-dom";

import Carousel from "../carousel";

const items = [
  {
    id: "slide-1",
    title: "Slide 1",
    image: "doge.jpg"
  },
  {
    id: "slide-2",
    title: "Slide 2",
    image: "doge.jpg"
  },
  {
    id: "slide-3",
    title: "Slide 3",
    image: "doge.jpg"
  },
  {
    id: "slide-4",
    title: "Slide 4",
    image: "doge.jpg"
  }
];

class Main extends React.Component {
  render() {
    const thumbnails = items.map(item => (
      <div key={item.id}>
        <img src={item.image} style={{ width: "100%" }} />
        <p>{item.title}</p>
      </div>
    ));

    return (
      <div>
        <Carousel thumbnails={thumbnails}>
          {items.map(item => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <img src={item.image} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

window.onload = function() {
  render(<Main />, document.getElementById("app"));
};
