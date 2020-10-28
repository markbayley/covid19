import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
// import { CONTINENT_URL } from "../api/api";
import { COUNTRY_URL } from "../api/api";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./skateboard-parks.json";

import Tooltip from "./Tooltip";
import ReactDOM from "react-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ";

const Map = ({ toggleInfo }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(152);
  const [lat, setLat] = useState(24);
  const [zoom, setZoom] = useState(1.8);

  // Initialize map when component mounts

  // const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {


    async function fetchCountries() {
      try {
        const result = await fetch(COUNTRY_URL);
        const countries = await result.json();
        setCountries([...countries]);
        console.log("COUNTRIES", countries);

        countries.forEach((country) => {
          const location = [country.countryInfo.long, country.countryInfo.lat];
          console.log(location, country);
          new mapboxgl.Marker({
            color: "turquoise",
          })
            .setLngLat([location[0], location[1]])
            .addTo(map);
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchCountries();

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    });


    

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  const getData = (key) => {
    return countries.map((country) => country[key]);
  };
  const countryLabels = getData("country");

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 2);
    return Math.round(value * multiplier) / multiplier;
  };

  return (
    <div>
      <h6
        style={{
          position: "absolute",
          zIndex: "10",
          color: "#fff",
          fontSize: "10px",
        }}
      >
        {" "}
        {countryLabels}
      </h6>
      <h6
        style={{
          position: "absolute",
          zIndex: "10",
          color: "#fff",
          fontSize: "8px",
        }}
      >
        {getData("cases")}
      </h6>

      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>

      <div className="map-container" ref={mapContainerRef} />

     
    </div>
  );
};

export default Map;
