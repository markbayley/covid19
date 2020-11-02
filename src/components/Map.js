import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

import { COUNTRY_URL } from "../api/api";

import { numberWithCommas } from "../utils/numberWithCommas";
import GlobalStats from "./GlobalStats";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ";

const Map = ({ toggleInfo }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(20);
  const [zoom, setZoom] = useState(1.7);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const result = await fetch(COUNTRY_URL);
        const countries = await result.json();
        setCountries([...countries]);
        console.log("COUNTRIES", countries);

        countries.forEach((country) => {
          const location = [country.countryInfo.long, country.countryInfo.lat];
          const name = country.country;
          const cases = country.cases;
          const active = country.active;
          const deaths = country.deaths;
          const flag = country.countryInfo.flag;

          console.log(location, country, "FLAG", flag);

          const popup = new mapboxgl.Popup({
            className: "popup",
          })
            .setLngLat([location[0], location[1]])
            .setHTML(
              `
            <img src=${flag} alt="" width="30px" height="50px"></img><br />
            <strong>${name.toUpperCase()}</strong><br/>
            Cases: ${numberWithCommas(cases)}<br>
            Active: ${numberWithCommas(active)}<br>
            Deaths: ${numberWithCommas(deaths)}<br>
           
            `
            )
            .setMaxWidth("100px")
            .addTo(map);

          // create a HTML element for each feature
          var el = document.createElement("div");
          el.className = "marker";

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat([location[0], location[1]])

            .setPopup(popup)
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

    map.doubleClickZoom.enable();

    document.getElementById("africa").addEventListener("click", function () {
      map.flyTo({
        zoom: 3,
        center: [3.2, 1.8],
        essential: true,
      });
    });

    document.getElementById("europe").addEventListener("click", function () {
      map.flyTo({
        zoom: 4,
        center: [6, 47],
        essential: true,
      });
    });

    document
      .getElementById("northamerica")
      .addEventListener("click", function () {
        map.flyTo({
          zoom: 3,
          center: [-120, 45],
          essential: true,
        });
      });

    document
      .getElementById("southamerica")
      .addEventListener("click", function () {
        map.flyTo({
          zoom: 3.5,
          center: [-74, -4],
          essential: true,
        });
      });

    document.getElementById("asia").addEventListener("click", function () {
      map.flyTo({
        zoom: 3.1,
        center: [100, 17],
        essential: true,
      });
    });

    document.getElementById("oceania").addEventListener("click", function () {
      map.flyTo({
        zoom: 3.7,
        center: [131, -28],
        essential: true,
      });
    });

      document.getElementById("global").addEventListener("click", function () {
        map.flyTo({
          zoom: 1.7,
          center: [0, 20],
          essential: true,
        });
      });

    //Pulsing Dots
    var size = 100;

    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // get rendering context for the map canvas when layer is added to the map
      onAdd: function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      // called once before every frame where the icon will be used
      render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = "rgba(5, 200, 200," + (1 - t) + ")";
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(5, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      },
    };

    map.on("load", function () {
      map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [50, 0],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "pulsing-dot",
        },
      });
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
