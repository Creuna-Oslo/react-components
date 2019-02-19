// Map
import React from "react";
import Layout from "../../layout";

import Map from "components/map";

require("components/map/map.scss");

const MapPage = () => {
  return (
    <Layout>
      <Map
        markers={[
          {
            name: "Creuna",
            latitude: 59.920938,
            longitude: 10.688352,
            popup: {
              title: "Creuna",
              text: "Her bor vi!"
            }
          },
          {
            name: "Creuna (gamle kontoret)",
            latitude: 59.92066,
            longitude: 10.683382,
            popup: {
              title: "Creuna",
              text: "Her bodde vi før!"
            }
          }
        ]}
      />
    </Layout>
  );
};

export default MapPage;
