import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";

const isRunningOnClient =
  typeof window !== "undefined" && window.document ? true : false;
// NOTE: google-maps does stuff with window and is not safe for server side rendering. It's only imported client side (webpack converts commonjs import to something else that works in the browser).
const GoogleMapsLoader = isRunningOnClient ? require("google-maps") : false;

import mapOptions from "./map-options";
import MapPopup from "./map-popup";

class Map extends React.Component {
  static propTypes = {
    googleMapsAPIKey: PropTypes.string,
    markers: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        popup: PropTypes.exact(MapPopup.propTypes)
      })
    )
  };

  static defaultProps = {
    markers: []
  };

  google = null;
  map = null;
  mapElement = null;

  getBounds = markers => {
    const google = this.google;
    const bounds = new google.maps.LatLngBounds();

    if (markers && markers.length) {
      markers.forEach(marker => {
        bounds.extend(
          new google.maps.LatLng(marker.latitude, marker.longitude)
        );
      });
    }

    return bounds;
  };

  fitMapToMarkers = markers => {
    const bounds = this.getBounds(markers);

    if (markers.length === 1) {
      this.map.setCenter(bounds.getCenter());
      this.map.setZoom(16);
    } else {
      this.map.fitBounds(bounds);
    }
  };

  componentDidMount() {
    GoogleMapsLoader.KEY = this.props.googleMapsAPIKey;
    GoogleMapsLoader.VERSION = "3.36";
    GoogleMapsLoader.LIBRARIES = ["geometry", "places"];
    GoogleMapsLoader.load(google => {
      this.google = google;
      this.map = new google.maps.Map(this.mapElement, mapOptions);

      this.fitMapToMarkers(this.props.markers);

      const popupsAndMarkers = this.props.markers.map(marker => {
        return {
          popup: new google.maps.InfoWindow({
            content: ReactDOMServer.renderToString(
              <MapPopup {...marker.popup} />
            )
          }),
          marker: new google.maps.Marker({
            position: {
              lat: marker.latitude,
              lng: marker.longitude
            },
            title: marker.name,
            map: this.map
          })
        };
      });

      popupsAndMarkers.forEach(({ popup, marker }) => {
        marker.addListener("click", () => {
          popupsAndMarkers.forEach(({ popup }) => popup.close()); // Close all popups
          popup.open(this.map, marker); // Open clicked popup
        });
      });
    });
  }

  render() {
    return <div className="map" ref={div => (this.mapElement = div)} />;
  }
}

export default Map;
