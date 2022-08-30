import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";
import { numberWithCommas } from "../utils/numberWithCommas";
import "./Map2.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import Badge from "react-bootstrap/Badge";
import { Button } from "react-bootstrap";
import { Chart } from "react-chartjs-2";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Animated } from "react-animated-css";

import MapboxChoropleth from "mapbox-choropleth";

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA";

const Map2 = () => {
  const mapboxElRef = useRef(null);

  const fetcher = async (url) =>
    fetch(url)
      .then((r) => r.json())

      .then((data) =>
        data.map((point, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude,
            ],
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths,
            mort: point.stats.deaths / point.stats.confirmed,
          },
        }))
      );

  const { data } = useSWR("https://disease.sh/v3/covid-19/jhucsse", fetcher);

  //   const [data1, setCountries] = useState([])

  //   useEffect(() => {
  //     const getCountriesData = async () => {
  //       await fetch("https://disease.sh/v3/covid-19/countries")
  //         .then(response => response.json())
  //         .then(data => {
  //           const data1 = data.map((point, index) => ({
  //             type: "Feature",
  //             geometry: {
  //                 type: "Point",
  //                 coordinates: [
  //                     point.countryInfo.long,
  //                     point.countryInfo.lat
  //                 ],
  //               },
  //               properties: {
  //                 id: index,
  //                 country: point.country,
  //                 cases: point.casesPerOneMillion,
  //                 deaths: point.deathsPerOneMillion,
  //                 active: point.activePerOneMillion,
  //                 mort: point.deathsPerOneMillion / point.casesPerOneMillion
  //               },
  //           }));
  //           setCountries(data1);
  //         });
  //     };
  //     getCountriesData();
  //   }, []);
  // ;

  //   console.log(data1)

  //   const data1 = countries.map((itm, index) => ({
  //     ...data.find((item) => item.properties.country === itm.country && item),
  //     ...itm,
  //   }));

  //   const continentCountries = countries.filter(
  //     (country) => country.continent === region
  //   );

  //   const countryNames = continentCountries.map(
  //     (selectedCountry) => selectedCountry.country
  //   );

  //   const data2 = data1.filter((item) => countryNames.includes(item.country));

  //   console.log(data2, "data2");
  //   console.log(data1, "data1");
  //   console.log(data, "data");

  // Initialize our map
  useEffect(() => {
    if (data) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [131, -28],
        zoom: 3,
        minZoom: 2.5,
        // pitch: 10,
        // projection: 'globe',
      });

      // Update map on first load
      updateMap();

      // updateMap function - Updates data and marks cases on the map

      function updateMap() {
        // Fetch data from API
        fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((rsp) => {
            // Displaying data
            console.log(rsp);
            // const data = rsp;

            // map.addSource("ok", {
            //   type: "geojson",
            //   data: {
            //     type: "FeatureCollection",
            //     features: data,
            //   },
            // });

            // map.addLayer({
            //   id: "ok",
            //   source: "ok",
            //     filter: ["!=", "cluster", true],
            //   type: "circle",
            //   paint: {
            //     "circle-color": "red",
            //     "circle-opacity": 1,
            //     "circle-radius": 50,
            //   },
            // });

            rsp.forEach((country) => {
              // Latitude
              const latitude = country.countryInfo.lat;
              // Longitude
              const longitude = country.countryInfo.long;
              // Confirmed cases today
              const flag = country.countryInfo.flag;
              const title = country.country;

              const todayCases = country.todayCases.toFixed(0);
              const todayDeaths = country.todayDeaths.toFixed(0);
              const todayRecovered = country.todayRecovered.toFixed(0);

              const critical = country.critical.toFixed(0);

              const tests = (country.tests / 1000000).toFixed(2);
              const cases = country.cases.toFixed(0);
              const active = country.active.toFixed(0);
              const deaths = country.deaths.toFixed(0);

              const active1k = (country.activePerOneMillion / 1000).toFixed(2);
              const deaths1k = (country.deathsPerOneMillion / 1000).toFixed(2);
              const cases1k = (country.casesPerOneMillion / 1000).toFixed(2);
              const tests1k =
                country.population > 0
                  ? (country.testsPerOneMillion / 1000).toFixed(0)
                  : (country.tests / 1000).toFixed(0);

              const mortality = ((deaths / cases) * 100).toFixed(2);
              const activity = ((active / cases) * 100).toFixed(2);
              const positive = ((cases / tests) * 100).toFixed(2);

              const population = (country.population / 1000000).toFixed(1);

              const elactive = document.createElement("div");
              const elcases = document.createElement("div");
              const eltests = document.createElement("div");

              const statusActive =
                active1k < 5
                  ? `Mild`
                  : active1k < 10
                  ? `Limited`
                  : active1k < 15
                  ? `Moderate`
                  : active1k < 35
                  ? `Serious`
                  : `Extreme`;

              const statusCases =
                cases1k < 50
                  ? `Mild`
                  : cases1k < 100
                  ? `Limited`
                  : cases1k < 150
                  ? `Moderate`
                  : cases1k < 350
                  ? `Serious`
                  : `Extreme`;

              const statusDeaths =
                deaths1k < 0.5
                  ? `Mild`
                  : deaths1k < 1.0
                  ? `Limited`
                  : deaths1k < 1.5
                  ? `Moderate`
                  : deaths1k < 3.5
                  ? `Serious`
                  : `Extreme`;
              // el.innerHTML = `i`;

              // active < .05
              // ? (elactive.className = "")
              // :

              // active1k < 50
              // ? (elactive.className = "active1")
              // : active1k < 100
              // ? (elactive.className = "active2")
              // : active1k < 150
              // ? (elactive.className = "active3")
              // : active1k < 350
              // ? (elactive.className = "active4")
              // : (elactive.className = "active5");

              // cases <= 50
              // ? (elcases.className = "cases1")
              // : cases <= 100
              // ? (elcases.className = "cases2")
              // : cases <= 150
              // ? (elcases.className = "cases3")
              // : cases <= 350
              // ? (elcases.className = "cases4")
              // : (elcases.className = "cases5");

              // tests1k < 50
              // ? (eltests.className = "tests1")
              // : tests1k < 1000
              // ? (eltests.className = "tests2")
              // : tests1k < 1500
              // ? (eltests.className = "tests3")
              // : tests1k < 20000
              // ? (eltests.className = "tests4")
              // : (eltests.className = "tests5");
              eltests.style.height = `${tests1k * 0.01}px`;
              eltests.style.maxHeight = "100px";
              eltests.style.minHeight = "10px";
              eltests.style.width = `${tests1k * 0.01}px`;
              eltests.style.maxWidth = "100px";
              eltests.style.minWidth = "10px";
              eltests.style.backgroundColor = "turquoise";
              eltests.style.borderRadius = "50%";
              eltests.style.opacity = 0.25;

              elactive.style.height = `${active1k * 0.1}px`;
              elactive.style.minHeight = "3px";
              elactive.style.width = `${active1k * 0.1}px`;
              elactive.style.minWidth = "3px";
              elactive.style.backgroundColor = "rgb(200,120,0)";
              elactive.style.borderRadius = "50%";
              elactive.style.opacity = 1;

              elcases.style.height = "100px";
              elcases.style.width = "100px";
              elcases.style.background = "transparent";
              elcases.style.borderRadius = "50%";
              elcases.style.opacity = 0.5;
              elcases.style.cursor = "pointer";

              //  function Toggle(e) {
              //    { el3.className ? new mapboxgl.Marker(el3)
              //     .setLngLat([longitude, latitude])
              //     .addTo(map)

              //    :

              new mapboxgl.Marker(eltests)
                .setLngLat([longitude, latitude])
                .addTo(map);

              new mapboxgl.Marker(elactive)
                .setLngLat([longitude, latitude])
                .addTo(map);

              //    }
              //   }

              // elcases.addEventListener("mouseenter", function () {
              //   // Change the cursor style as a UI indicator.
              //   map.getCanvas().style.cursor = "pointer";

              //    "mouseenter" ?

              new mapboxgl.Marker(elcases)
                .setLngLat([longitude, latitude])
                .addTo(map);

              //   :

              //   mapboxgl.Marker(el3)
              //   .setLngLat([longitude, latitude])
              //   .remove()

              // });

              // elcases.addEventListener("mouseleave", function () {
              //   map.getCanvas().style.cursor = "";
              //   mapboxgl.Marker(el3).remove();
              // });

              // el.addEventListener("mouseenter", function () {
              //   // Change the cursor style as a UI indicator.
              //   map.getCanvas().style.cursor = "pointer";
              // })

              elcases.addEventListener("mouseenter", function () {
                // Change the cursor style as a UI indicator.

                // <p class="deaths">Mortality: <b>${numberWithCommas(mortality)}%</b>&nbsp;</p>

                //
                //  <button class="close"><h6>x</h6></button>
                // <p>Population: <b>${numberWithCommas(population)}m </b>&nbsp;</p>
                // <p>Recovered: <b>+${numberWithCommas(todayRecovered)}</b>&nbsp;</p>
                // <p class="deaths">Mortality: <b>${numberWithCommas(mortality)}%</b>&nbsp;&nbsp;&nbsp;</p>
                // <p>Critical: <b>${numberWithCommas(critical)} </b>&nbsp;&nbsp;&nbsp;</p>

                const popup =
                  "mouseenter" === true
                    ? " "
                    : new mapboxgl.Popup({
                        // offset: 5,

                        closeButton: true,
                        closeOnClick: true,
                        closeOnMove: false,
                        className: "popup2 animated fadeInUp",
                      });

                popup
                  .setLngLat([longitude, latitude])
                  .setHTML(
                    `<div class="right">
                  
                    <p><img src=${flag} alt="flag" /></p>
                    <p><b>${title}</b>&nbsp;&nbsp;</p>
                     
                    <p class="deaths">Deaths Today:<b>+${numberWithCommas(
                      todayDeaths
                    )}</b>&nbsp;</p>
                    <p class="deaths">Deaths/1k:<b>${numberWithCommas(
                      deaths1k
                    )}</b>&nbsp;</p>
                    <p class="deaths">(${statusDeaths})&nbsp;&nbsp;&nbsp;</p>

                    <p class="active">Active:<b>${numberWithCommas(
                      active
                    )}</b>&nbsp;</p>
                    <p class="active">Active/1k:<b>${numberWithCommas(
                      active1k
                    )}</b>&nbsp;</p>
                    <p class="active">(${statusActive})&nbsp;&nbsp;&nbsp;</p>

                    <p class="cases">Cases Today:<b>+${numberWithCommas(
                      todayCases
                    )}</b>&nbsp;</p>
                    <p class="cases">Cases/1k:<b>${numberWithCommas(
                      cases1k
                    )}</b>&nbsp;</p>
                    <p class="cases">(${statusCases})</p>&nbsp;&nbsp;&nbsp;
              
                    <p class="tests">Tests: <b>${numberWithCommas(
                      tests
                    )}m</b>&nbsp;</p>
                    <p class="tests">Tests/1k:<b >${numberWithCommas(
                      tests1k
                    )}</b>&nbsp;</p>

                    </div>`
                  )
                  .addTo(map);

                elcases.addEventListener("mouseleave", function () {
                  map.getCanvas().style.cursor = "";
                  popup.remove();
                });
              });
            });
          });
      }

      // // Updates data after 20000ms
      // let interval = 20000;

      // // Calls updateMap function after set intervals
      // setInterval(updateMap, interval);

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
            center: [-120, 35],
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
          zoom: 3,
          center: [131, -28],
          essential: true,
        });
      });

      /**
       * Assign a unique id to each store. You'll use this `id`
       * later to associate each point on the map with a listing
       * in the sidebar.
       */

      data.forEach((point, i) => {
        point.properties.id = i;
      });

      // Holds visible features for filtering
      let points = [];

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        className: "popup",
        // offset: [0, 30]
        // className: "pop",

        offset: 12,
      });

      const filterEl = document.getElementById("feature-filter");
      const listingEl = document.getElementById("feature-listing");

      function renderListings(features) {
        const empty = document.createElement("p");
        // Clear any existing listings
        listingEl.innerHTML = `<div class="deaths">SELECT A LOCATION</div>`;
        if (features.length) {
          for (const feature of features) {
            const label =
              feature.properties.province !== "null"
                ? `Hover over marker to view...  ${feature.properties.province}, ${feature.properties.country}  `
                : `Hover over marker to view...  ${feature.properties.country}.`;

            // itemLink.href = feature.properties.wikipedia;
            // itemLink.target = '_blank';

            /* Add the link to the individual listing created above. */
            const itemLink = listingEl.appendChild(document.createElement("a"));
            itemLink.href = "#";
            itemLink.className = "item";
            itemLink.id = `link-${feature.properties.id}`;
            itemLink.innerHTML =
              feature.properties.province !== "null"
                ? `<b>${feature.properties.province}, ${feature.properties.country}.</b><em> View details...</em></b>`
                : `<b>${feature.properties.country}.</b><em> View details...</em>`;

            // itemLink.textContent = label;
            /* Add dbetails to the individual listing. */
            // const details = listingEl.appendChild(
            //   document.createElement("div")
            // );
            //  details.innerHTML = `${point.properties.province}`;
            // if (feature.properties.province) {
            //   details.innerHTML += `${feature.properties.country}`;
            // }

            itemLink.addEventListener("click", function () {
              for (const feature of features) {
                if (this.id === `link-${feature.properties.id}`) {
                  flyToStore(feature);
                  createPopUp(feature);
                }
              }
              const activeItem = document.getElementsByClassName("active");
              if (activeItem[0]) {
                activeItem[0].classList.remove("active");
              }
              this.parentNode.classList.add("active");
            });

            function flyToStore(currentFeature) {
              map.flyTo({
                center: currentFeature.geometry.coordinates,
                zoom: 5,
              });
            }

            itemLink.addEventListener("mouseover", () => {
              // Highlight corresponding feature on the map
              popup
                .setLngLat(feature.geometry.coordinates)
                .setText(label)
                .addTo(map);
            });
            listingEl.appendChild(itemLink);
          }

          // Show the filter input
          filterEl.parentNode.style.display = "block";
        } else if (features.length === 0 && filterEl.value !== "") {
          empty.textContent = "No results found";
          listingEl.appendChild(empty);
        } else {
          empty.textContent = "Drag the map to populate results";
          listingEl.appendChild(empty);

          // Hide the filter input
          filterEl.parentNode.style.display = "none";

          // remove features filter
          map.setFilter("Cases", ["has", "id"]);
        }
      }

      function normalize(string) {
        return string.trim().toLowerCase();
      }

      // Because features come from tiled vector data,
      // feature geometries may be split
      // or duplicated across tile boundaries.
      // As a result, features may appear
      // multiple times in query results.
      function getUniqueFeatures(features, comparatorProperty) {
        const uniqueIds = new Set();
        const uniqueFeatures = [];
        for (const feature of features) {
          const id = feature.properties[comparatorProperty];
          if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
          }
        }
        return uniqueFeatures;
      }

      //DOT
      const size = 150;
      // This implements `StyleImageInterface`
      // to draw a pulsing dot icon on the map.
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // When the layer is added to the map,
        // get the rendering context for the map canvas.
        onAdd: function () {
          const canvas = document.createElement("canvas");
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext("2d");
        },

        // Call once before every frame where the icon will be used.
        render: function () {
          const duration = 3000;
          const t = (performance.now() % duration) / duration;

          const radius = (size / 2) * 0.1;
          const outerRadius = (size / 2) * 0.5 * t + radius;
          const context = this.context;

          // Draw the outer circle.
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          context.fillStyle = `rgba(160, 160, 160, ${0.4 - t})`;
          context.fill();

          // Draw the inner circle.
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          // context.fillStyle = 'rgba(255, 100, 100, 0.1)';
          // context.strokeStyle = 'grey';
          // context.lineWidth = 2 + 4 * (1 - t);
          // context.fill();
          // context.stroke();

          // Update this image's data with data from the canvas.
          this.data = context.getImageData(0, 0, this.width, this.height).data;

          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          map.triggerRepaint();

          // Return `true` to let the map know that the image was updated.
          return true;
        },
      };

      map.on("load", () => {
        /**
         * This is where your '.addLayer()' used to be, instead
         * add only the source without styling a layer
         */
        const cases1 = ["<", ["get", "cases"], 50000];
        const cases2 = [
          "all",
          [">=", ["get", "cases"], 50000],
          ["<", ["get", "cases"], 100000],
        ];
        const cases3 = [
          "all",
          [">=", ["get", "cases"], 100000],
          ["<", ["get", "cases"], 400000],
        ]; //800,000
        const cases4 = [
          "all",
          [">=", ["get", "cases"], 400000],
          ["<", ["get", "cases"], 1600000],
        ]; //32,000,000
        const cases5 = [">=", ["get", "cases"], 1600000];

        const deaths1 = ["<", ["get", "deaths"], 2500];
        const deaths2 = [
          "all",
          [">=", ["get", "deaths"], 2500],
          ["<", ["get", "deaths"], 5000],
        ];
        const deaths3 = [
          "all",
          [">=", ["get", "deaths"], 5000],
          ["<", ["get", "deaths"], 20000],
        ]; //8,000
        const deaths4 = [
          "all",
          [">=", ["get", "deaths"], 20000],
          ["<", ["get", "deaths"], 80000],
        ]; // 175,000
        const deaths5 = [">=", ["get", "deaths"], 80000];

        const mr1 = ["<", ["get", "mort"], 0.003];
        const mr2 = [
          "all",
          [">=", ["get", "mort"], 0.003],
          ["<", ["get", "mort"], 0.005],
        ];
        const mr3 = [
          "all",
          [">=", ["get", "mort"], 0.005],
          ["<", ["get", "mort"], 0.02],
        ]; //.011 amr
        const mr4 = [
          "all",
          [">=", ["get", "mort"], 0.02],
          ["<", ["get", "mort"], 0.05],
        ]; //.18
        const mr5 = [">=", ["get", "mort"], 0.05];

        const colors = ["#6a5dfc", "#a13ed5", "#ca32ad", "#e72585", "#ff125e"];
        // const colors2 = ["#ff7200", "#ff8300","#ff9400","#ffa400", "#ffb300"];

        //DOT
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

        map.addSource("dot-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data,
          },
        });
        map.addLayer({
          id: "layer-with-pulsing-dot",
          type: "symbol",
          source: "dot-point",
          layout: {
            "icon-image": "pulsing-dot",
          },
        });

        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: data,
          },
          cluster: true,
          clusterRadius: 50,
          clusterProperties: {
            // keep separate counts for each magnitude category in a cluster
            deaths1: ["+", ["case", deaths1, 1, 0]],
            deaths2: ["+", ["case", deaths2, 1, 0]],
            deaths3: ["+", ["case", deaths3, 1, 0]],
            deaths4: ["+", ["case", deaths4, 1, 0]],
            deaths5: ["+", ["case", deaths5, 1, 0]],
            cases1: ["+", ["case", cases1, 1, 0]],
            cases2: ["+", ["case", cases2, 1, 0]],
            cases3: ["+", ["case", cases3, 1, 0]],
            cases4: ["+", ["case", cases4, 1, 0]],
            cases5: ["+", ["case", cases5, 1, 0]],
            mr1: ["+", ["case", mr1, 1, 0]],
            mr2: ["+", ["case", mr2, 1, 0]],
            mr3: ["+", ["case", mr3, 1, 0]],
            mr4: ["+", ["case", mr4, 1, 0]],
            mr5: ["+", ["case", mr5, 1, 0]],
          },
        });

        map.addLayer({
          id: "Mortality",
          type: "circle",
          source: "points",
          filter: ["!=", "cluster", true],

          paint: {
            "circle-color": "grey",
            //    [
            //     "case",
            //     mr1,
            //     colors[0],
            //     mr2,
            //     colors[1],
            //     mr3,
            //     colors[2],
            //     mr4,
            //     colors[3],
            //     colors[4],
            //   ],
            "circle-opacity": 0.5,

            // 'circle-radius': 18,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "mort"],
              0.0001,
              5,
              0.2,
              50,
            ],
          },
        });

        // map.addLayer({
        //   id: "Cases",
        //   type: "heatmap",
        //   source: "points",
        //   filter: ["!=", "cluster", true],
        //   paint: {
        //     'heatmap-intensity': .7,
        //     'heatmap-weight': 3,
        //     'heatmap-radius': [ 'interpolate', [ 'linear' ], [ 'get', 'cases' ],
        //     1,
        //     10,
        //     1000000,
        //     200, ],
        //     'heatmap-opacity': 0.2,
        //   },

        // });

        //initialize choropleth colors

        map.addLayer({
          id: "Deaths",
          type: "circle",
          source: "points",
          filter: ["!=", "cluster", true],
          paint: {
            "circle-color": "grey",
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "deaths"],
              10,
              5,
              1000000,
              36,
            ],
          },
        });

        map.addLayer({
          id: "Cases",
          source: "points",
          filter: ["!=", "cluster", true],
          type: "circle",
          paint: {
            "circle-color": [
              "case",
              cases1,
              colors[0],
              cases2,
              colors[1],
              cases3,
              colors[2],
              cases4,
              colors[3],
              colors[4],
            ],
            "circle-opacity": 0.5,

            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              10,
              10000000,
              50,
            ],
          },
        });

        map.addLayer({
          id: "Pop",
          source: "points",
          // filter: ["!=", "cluster", true],
          type: "circle",
          paint: {
            "circle-color": "transparent",
            "circle-radius": 30,
          },
        });

        //START DOUGHNUT

        // map.addLayer({
        //   id: "clusters",
        //   type: "symbol",
        //   source: "points",
        //   // filter: ["!=", "cluster", true],
        //   layout: {
        //     "text-field": [
        //       "number-format",
        //       ["get", "points"],
        //       { "min-fraction-digits": 1, "max-fraction-digits": 1 },
        //     ],
        //     "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        //     "text-size": 10,
        //     visibility: "visible",
        //   },
        //   paint: {
        //     "text-color": [
        //       "case",
        //       ["<", ["get", "cases"], 3],
        //       "black",
        //       "white",
        //     ],
        //   },
        // });

        // objects for caching and keeping track of HTML marker objects (for performance)
        const markers = {};
        let markersOnScreen = {};

        function updateMarkers() {
          const newMarkers = {};
          const features = map.querySourceFeatures("points");

          // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
          // and add it to the map if it's not there already
          for (const feature of features) {
            const coords = feature.geometry.coordinates;
            const props = feature.properties;
            if (!props.cluster) continue;
            const id = props.cluster_id;

            let marker = markers[id];
            if (!marker) {
              const el = createDonutChart(props);
              marker = markers[id] = new mapboxgl.Marker({
                element: el,
              }).setLngLat(coords);
            }
            newMarkers[id] = marker;

            if (!markersOnScreen[id]) marker.addTo(map);
          }
          // for every marker we've added previously, remove those that are no longer visible
          for (const id in markersOnScreen) {
            if (!newMarkers[id]) markersOnScreen[id].remove();
          }
          markersOnScreen = newMarkers;
        }

        // after the GeoJSON data is loaded, update markers on the screen on every frame
        map.on("render", () => {
          if (!map.isSourceLoaded("points")) return;
          updateMarkers();
        });

        // code for creating an SVG donut chart from feature properties
        function createDonutChart(props) {
          const offsets = [];
          const counts = [
            props.deaths1,
            props.deaths2,
            props.deaths3,
            props.deaths4,
            props.deaths5,
          ];
          const counts2 = [
            props.cases1,
            props.cases2,
            props.cases3,
            props.cases4,
            props.cases5,
          ];

          let total = 0;
          for (const count of counts) {
            offsets.push(total);
            total += count;
          }
          let total2 = 0;
          for (const count2 of counts2) {
            offsets.push(total2);
            total2 += count2;
          }
          const fontSize =
            total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
          const r =
            total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
          const r0 = Math.round(r * 0.6);
          const w = r * 2;

          const fontSize2 =
            total2 >= 1000 ? 22 : total2 >= 100 ? 20 : total2 >= 10 ? 18 : 16;
          const r2 =
            total2 >= 1000 ? 50 : total2 >= 100 ? 32 : total2 >= 10 ? 24 : 18;
          const r02 = Math.round(r2 * 0.6);
          const w2 = r2 * 2;

          let html = `<div>
          <svg "class="zoom" width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px ; display: "block"; >`;

          let html2 = `<div>
          <svg "class="zoom" width="${w2}" height="${w2}" viewbox="0 0 ${w2} ${w2}" text-anchor="middle" style="font: ${fontSize2}px ; display: "block"; >`;

          for (let i = 0; i < counts.length; i++) {
            html += donutSegment(
              offsets[i] / total,
              (offsets[i] + counts[i]) / total,
              r,
              r0,
              colors[i]
            );
          }

          for (let i = 0; i < counts2.length; i++) {
            html += donutSegment(
              offsets[i] / total2,
              (offsets[i] + counts2[i]) / total2,
              r,
              r0,
              colors[i]
            );
          }
          html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="#212529" />
          <text  dominant-baseline="central" transform="translate(${r}, ${r})" fill="#dfdfdf" >
          ${total.toLocaleString()}
          </text>
          </svg>
          </div>`;

          const el = document.createElement("div");
          el.innerHTML = html;
          return el.firstChild;
        }

        function donutSegment(start, end, r, r0, color) {
          if (end - start === 1) end -= 0.00001;
          const a0 = 2 * Math.PI * (start - 0.25);
          const a1 = 2 * Math.PI * (end - 0.25);
          const x0 = Math.cos(a0),
            y0 = Math.sin(a0);
          const x1 = Math.cos(a1),
            y1 = Math.sin(a1);
          const largeArc = end - start > 0.5 ? 1 : 0;

          // draw an SVG path
          return `<path  d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${
            r + r * y0
          } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${
            r + r0 * x1
          } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${
            r + r0 * y0
          }" fill="${color}" />`;
        }

        //END DOUGHNUT

        // inspect a cluster on click
        map.on("click", "Cases", function (e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          map.flyTo({ center: coordinates, zoom: 6 });
        });

        map.on("click", "Pop", function (e) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          map.flyTo({ center: coordinates, zoom: 6 });
        });

        //TOGGLE
        // After the last frame rendered before the map enters an "idle" state.
        map.on("idle", () => {
          // If these two layers were not added to the map, abort
          if (
            !map.getLayer("Cases") ||
            !map.getLayer("Deaths") ||
            !map.getLayer("Mortality")
          ) {
            return;
          }

          // Enumerate ids of the layers.
          const toggleableLayerIds = ["Cases", "Deaths", "Mortality"];

          // Set up the corresponding toggle button for each layer.
          for (const id of toggleableLayerIds) {
            // Skip layers that already have a button set up.
            if (document.getElementById(id)) {
              continue;
            }

            // Create a link.
            const link = document.createElement("a");
            link.id = id;
            link.href = "#";
            link.textContent = id;
            link.className = "active";

            // Show or hide layer when the toggle is clicked.
            link.onclick = function (e) {
              const clickedLayer = this.textContent;
              e.preventDefault();
              e.stopPropagation();

              const visibility = map.getLayoutProperty(
                clickedLayer,
                "visibility"
              );

              // Toggle layer visibility by changing the layout object's visibility property.
              if (visibility === "visible") {
                map.setLayoutProperty(clickedLayer, "visibility", "none");
                this.className = "";
              } else {
                this.className = "active";
                map.setLayoutProperty(clickedLayer, "visibility", "visible");
              }
            };
            const layers = document.getElementById("menu");
            layers.appendChild(link);
          }
        }); // map(idle) End

        //Add navigation controls to the top right of the canvas
        //   map.addControl(new mapboxgl.NavigationControl());

        // Add navigation to center the map on your geo location
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        });

        document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

        map.addControl(
          new mapboxgl.GeolocateControl({
            fitBoundsOptions: { maxZoom: 6 },
          })
        );

        map.on("movestart", () => {
          // reset features filter as the map starts moving
          map.setFilter("Cases", ["has", "id"]);
        });

        map.on("moveend", () => {
          const features = map.queryRenderedFeatures({ layers: ["Cases"] });

          if (features) {
            const uniqueFeatures = getUniqueFeatures(features, "id");
            // Populate features for the listing overlay.
            renderListings(uniqueFeatures);

            // Clear the input container
            filterEl.value = "";

            // Store the current features in sn `airports` variable to
            // later use for filtering on `keyup`.
            points = uniqueFeatures;
            console.log(points, "points");
          }
        });

        var i = 0;

        map.on("mouseenter", "Pop", (e) => {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = "pointer";

          // Populate the popup and set its coordinates based on the feature.
          const feature = e.features[0];

          const { cases, deaths, country, province } = e.features[0].properties;

          const colorCase = [];
          const statusCase = [];
          const classText = [];
          if (cases < 50000) {
            colorCase.push("#6a5dfc");
            statusCase.push("Mild");
            classText.push("mild");
          }
          if (cases >= 50000 && cases < 100000) {
            colorCase.push("#a13ed5");
            statusCase.push("Limited");
            classText.push("limited");
          }
          if (cases >= 100000 && cases < 400000) {
            colorCase.push("#ca32ad");
            statusCase.push("Moderate");
            classText.push("moderate");
          }
          if (cases >= 400000 && cases < 16000000) {
            colorCase.push("#e72585");
            statusCase.push("Serious");
            classText.push("serious");
          }
          if (cases >= 16000000) {
            colorCase.push("#ff125e");
            statusCase.push("Extreme");
            classText.push("extreme");
            //   pink
          }

          const colorDeath = [];
          const statusDeath = [];
          const classText2 = [];
          if (deaths < 2500) {
            colorDeath.push("#6a5dfc");
            statusDeath.push("Mild");
            classText2.push("mild");
            //   blue
          }
          if (deaths >= 2500 && deaths < 5000) {
            colorDeath.push("#a13ed5");
            statusDeath.push("Limited");
            classText2.push("limited");
          }
          if (deaths >= 5000 && deaths < 20000) {
            colorDeath.push("#ca32ad");
            statusDeath.push("Moderate");
            classText2.push("moderate");
          }
          if (deaths >= 20000 && deaths < 80000) {
            colorDeath.push("#e72585");
            statusDeath.push("Serious");
            classText2.push("serious");
          }
          if (deaths >= 80000) {
            colorDeath.push("#ff125e");
            statusDeath.push("Extreme");
            classText2.push("extreme");
            //   pink
          }

          //POPUP
          // const countryISO =
          //   lookup.byCountry(feature.properties.country)?.iso2 ||
          //   lookup.byInternet(feature.properties.country)?.iso2;
          // const countryFlag = `https://raw.githubusercontent.com/stefangabos/world_countries/master/data/flags/64x64/${countryISO?.toLowerCase()}.png`;
          const provinceHTML =
            feature.properties.province !== "null"
              ? `<p>Province: <b>${feature.properties.province}</b></p>`
              : "";
          const mortalityRate = (
            (feature.properties.deaths / feature.properties.cases) *
            100
          ).toFixed(2);
          // const countryFlagHTML = Boolean(countryISO)
          //   ? `<img src="${countryFlag}"></img>`
          //   : "";

          const HTML = country
            ? ` 
        
          <p>Country: <b>${country}</b></p>
          ${provinceHTML}
          <p>Cases: <b>${numberWithCommas(
            cases
          )}</b><span class="${classText}">${statusCase}</span></p>
          <p>Deaths: <b>${numberWithCommas(
            deaths
          )}</b><span class="${classText2}"}>${statusDeath}</span></p>
          <p>Mortality Rate: <b>${mortalityRate}%</b></p>
         
          `
            : ` 
          <p class=""><em>Click on the cluster to zoom in...</em></p>
       
         
          `;

          popup
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
              '<canvas className="info" id="foo' +
                feature.properties.country +
                '"></canvas>' +
                HTML
            )
            .addTo(map);

          var ctx = document.getElementById("foo" + country).getContext("2d");

          // document
          // .getElementById(ctx)
          // .addEventListener("click", function () {
          //   map.flyTo({
          //     zoom: 3,
          //     center: [3.2, 1.8],
          //     essential: true,
          //   });
          // });

          console.log(ctx);
          var chart = new Chart(ctx, {
            type: "doughnut",
            options: {
              elements: {
                arc: {
                  borderColor: "#212529",
                  borderWidth: 1,
                },
              },

              responsive: true,
              maintainAspectRatio: true,
              legend: {
                display: false,
                position: "",
              },
              title: {
                display: false,
                text: "",
              },
              animation: {
                animateScale: true,
                animateRotate: true,
              },
              tooltips: {
                backgroundColor: "#212529",
                borderColor: "turquoise",
                borderWidth: 1,
                cornerRadius: 2,
                displayColors: true,
                bodyFontSize: 12,
                labels: {
                  usePointStyle: true,
                },
                callbacks: {
                  label: function (item, data) {
                    console.log(data.labels, item);
                    return (
                      data.datasets[item.datasetIndex].label +
                      ": " +
                      data.labels[item.index] +
                      ": " +
                      data.datasets[item.datasetIndex].data[item.index]
                    );
                  },
                },
              },
            },
            data: {
              labels: ["Cases", "Deaths"],
              datasets: [
                {
                  label: "Distribution",
                  backgroundColor: [colorDeath, colorCase],
                  borderColor: colorCase,
                  // data: caseChart,
                  // data: [12, 34, 16, 52, 13]
                  data: [deaths * 2, cases],
                },
              ],
            },
          });
          i++;
        });

        map.on("mouseleave", "Pop", () => {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        filterEl.addEventListener("keyup", (e) => {
          const value = normalize(e.target.value);

          // Filter visible features that match the input value.
          const filtered = [];
          for (const feature of points) {
            const name = normalize(feature.properties.country);
            const code = normalize(feature.properties.province);
            if (name.includes(value) || code.includes(value)) {
              filtered.push(feature);
            }
          }

          // Populate the sidebar with filtered results
          renderListings(filtered);

          // Set the filter to populate features into the layer.
          if (filtered.length) {
            map.setFilter("Cases", [
              "match",
              ["get", "id"],
              filtered.map((feature) => {
                return feature.properties.province;
              }),
              true,
              false,
            ]);
          }
        });

        // Call this function on initialization
        // passing an empty array to render an empty state
        renderListings([]);
      });

      //Create a Mapbox GL JS `Popup`.

      function createPopUp(currentFeature) {
        const popUps = document.getElementsByClassName("mapboxgl-popup");
        if (popUps[0]) popUps[0].remove();
      }
    }
  }, [data]);
  //useEffect End

  return (
    <div className="mapContainer">
      {/* <div className="sb">
      
        
      </div> */}

      <div id="map" className="mapBox map" ref={mapboxElRef} />
    </div>
  );
};
//Map End
export default Map2;
