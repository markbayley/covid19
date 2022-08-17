import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";
import "./Map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

import { Chart } from "react-chartjs-2";

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA";

const Map = ({ countries,  region, index }) => {
  const mapboxElRef = useRef(null);

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(20);
  const [zoom, setZoom] = useState(1.7);

  // const urls = ["https://disease.sh/v3/covid-19/jhucsse", "https://disease.sh/v3/covid-19/countries",];

  const fetcher = async (url) => 
    fetch(url)
      .then((r) => r.json())
  //  await Promise.all(
  //     urls.map((url) => fetch(url).then((res) => res.json()))
  //  )
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





//   const fetcher = React.useEffect(() => {
//     Promise.all([
//         fetch("https://disease.sh/v3/covid-19/jhucsse"),
//         // fetch("https://disease.sh/v3/covid-19/countries")
//     ]).then(function (response) {
//         // Get a JSON obje ct from each of the responses
//         return Promise.all(response.map(function (response) {
//             return response.json();
//         }));
//     }).then((data) => {
//       data.map((point, index) => ({
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [
//             point.coordinates.longitude,
//             point.coordinates.latitude,
//           ],
//         },
//         properties: {
//           id: index,
//           country: point.country,
//           province: point.province,
//           cases: point.stats.confirmed,
//           deaths: point.stats.deaths,
//           mort: point.stats.deaths / point.stats.confirmed,
//         },
//       }))
     
  
//         // Log the data to the console
//         // You would do something with both sets of data here
//         //     countries.map((itm, index) => ({
// //   ...data.find((item) => item.properties.country === itm.country && item),
// //   ...itm,
//         console.log(data, 'mydata');
//     }).catch(function (error) {
//         // if there's an error, log it
//         console.log(error);
//     });
//     },[])

//     const getData = (countries, data) => 
//     countries.map((itm, index) => ({
//   ...data.find((item) => item.properties.country === itm.country && item),
//   ...itm,
// }));
    
// const data1 = getData(countries, data);

const { data } = useSWR("https://disease.sh/v3/covid-19/jhucsse", fetcher);



  


//   const fetcher2 = async (url) => 
//   fetch(url)
//     .then((r) => r.json())
// //  await Promise.all(
// //     urls.map((url) => fetch(url).then((res) => res.json()))
// //  )
//      .then((data) =>

//       data.map((point, index) => ({
//         type: "Feature",
//         geometry: {
//           type: "Point",
//           coordinates: [
//             point.coordinates.longitude,
//             point.coordinates.latitude,
//           ],
//         },
//         properties: {
//           id: index,
//           country: point.country,
//           province: point.province,
//           cases: point.stats.confirmed,
//           deaths: point.stats.deaths,
//           mort: point.stats.deaths / point.stats.confirmed,
//         },
//       }))
//     );

// const { data1 } = useSWR("https://disease.sh/v3/covid-19/countries", fetcher2);

      

  // const [loading, setLoading] = useState(false);
  // const [dataOne, setDataOne] = useState([]);
  // const [dataTwo, setDataTwo] = useState([]);



  // const urls = ["https://disease.sh/v3/covid-19/jhucsse", "https://disease.sh/v2/countries",];

  // const getData = async () => {
  //   setLoading(true);
  //   const [result1, result2] = await Promise.all(
  //     urls.map((url) => fetch(url).then((res) => res.json()))
  //  );
  //   setLoading(false);
  //   setDataOne(result1);
  //   setDataTwo(result2);

  //   console.log(data, 'data');
   
  // };


    //Fetch Countries Data
    // const [countries, setCountries] = useState([]);
    // const [data1, setData] = useState([]);
    // useEffect(() => {
    //   async function fetchCountries() {
    //     try {
    //       const [countries, data1] = await Promise.all(
    //         urls.map((url) => fetch(url).then((res) => res.json()))
            
    //      ).then((data1) =>
    //      data1.map((point, index) => ({
    //        type: "Feature",
    //        geometry: {
    //          type: "Point",
    //          coordinates: [
    //            point.coordinates.longitude,
    //            point.coordinates.latitude,
    //          ],
    //        },
    //        properties: {
    //          id: index,
    //          country: point.country,
    //          province: point.province,
    //          cases: point.stats.confirmed,
    //          deaths: point.stats.deaths,
    //          mort: point.stats.deaths / point.stats.confirmed,
    //        },
    //      })));


    //       setCountries(countries);
    //       setData(data1);

    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   fetchCountries();
    // }, []);
    //Map Country Data
    // const getCountries = (key) => {
    //   return countries.map((country) => country[key]);
    // };



   

    // data1.map((point, index) => ({
    //   type: "Feature",
    //   geometry: {
    //     type: "Point",
    //     coordinates: [
    //       point.coordinates.longitude,
    //       point.coordinates.latitude,
    //     ],
    //   },
    //   properties: {
    //     id: index,
    //     country: point.country,
    //     province: point.province,
    //     cases: point.stats.confirmed,
    //     deaths: point.stats.deaths,
    //     mort: point.stats.deaths / point.stats.confirmed,
    //     population: point.population,
    //   },
    // }))




    // const  = [...countries, ...data1];

 
  // const globalCases = getCountries("casesPerOneMillion");

  // console.log(all, 'countriesCASES')
  // const getData = (key) => {
  //   return countries.map((country) => country[key]);
  // };

  // console.log( data1, 'data1')

  // Initialize our map
  useEffect(() => {
    if (data) {
      // console.log(data1, 'ok');
      const average =
        data.reduce((total, next) => total + next.properties.cases, 0) /
        data.length;
      //800,000
      const min = Math.min(...data.map((item) => item.properties.cases));
      const max = Math.max(...data.map((item) => item.properties.cases));
      //32,000,000

      const averageD =
        data.reduce((total, next) => total + next.properties.deaths, 0) /
        data.length;
      //8,000
      const minD = Math.min(...data.map((item) => item.properties.deaths));
      const maxD = Math.max(...data.map((item) => item.properties.deaths));
      //173,000

   
      // console.log(data1, 'data1');
      // console.log(data, 'data');
      // const merge = countries.map((country, key) => country.population);
      // const cas = data.map((item) => item.properties.cases);
      // console.log(cas, 'CAS')
      // console.log(merge, 'MER')
      // const m = [...cas, ...merge]
      // console.log(m, 'M')

      // console.log(average, min, max, "stats");
      // console.log(averageD, minD, maxD, "statsD");

      const amr = averageD / average;
      // const minmr = 1 / max;
      // const maxmr = maxD / 1;
      // console.log(amr, minmr, maxmr, 'amr')

      // ...data.map((item) => item.properties.cases,
      // const countryname = data.map((item) => item.properties.country);
      // console.log(countryname, 'countryname')

      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [lng, lat],
        zoom: zoom,
        pitch: 20,
      });

      //DOUGHNUT

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

      // console.log(mr1, mr2, mr3, mr4, mr5, "MR");
      // console.log(deaths1, "d/c");
      // colors to use for the categories
      const colors = [
        "#444e86",
        "#955196",
        "#ffa600",
        "#ff6e54",
        "#dd5182",

        //   "#ffaf1d",
        //  "#ff9435",
        //  "#ff7744",
        //  "#ff534f",
        //  "#ff1558",

        // "#2770b4",
        // "#6d68c1",
        // "#ae54b8",
        // "#e23295",
        // "#ff1560",

        // "#6a5dfc",
        // "#a13ed5",
        // "#ca32ad",
        // "#e72585",
        // "#ff125e",

//"  #a20d06",
// "#e54e17",
// "#e98410",
// "#d1b421",
// "#6ba34d"

// "#3a9456",
// "#217c54",
// "#358581",
// "#90b5e7",
// "#6e75d7"



        // "rgb(212, 23, 83)",
        // "rgb(45, 182, 130)",
      ];

      const colors2 = [
        // "#444e86",
        // "#955196",
        // "#ffa600",
        // "#ff6e54",
        // "#dd5182",
        //         "#ffaf1d",
        //  "#ff9435",
        //  "#ff7744",
        //  "#ff534f",
        //  "#ff1558"

        // "#2770b4",
        // "#6d68c1",
        // "#ae54b8",
        // "#e23295",
        // "#ff1560",

        // "#5748ff", "#a13ed5", "#ca32ad", "#e72585", "#ff125e"
        "#ff7200",
        "#ff8300",
        "#ff9400",
        "#ffa400",
        "#ffb300",

        // "rgb(212, 23, 83)",
        // "rgb(45, 182, 130)",
      ];

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
          context.fillStyle = `rgba(67, 66, 66, ${1 - t})`;
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
      var hoverId = null;
      //LAYERS
      map.on("load", () => {

        // map.addSource("mapbox-dem", {
        //   type: "raster-dem",
        //   url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        //   tileSize: 512,
        //   maxZoom: 16,
        // })
        // // map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
        // map.addLayer({
        //   id: "sky",
        //   type: "sky",
        //   paint: {
        //     "sky-type": "atmosphere",
        //     "sky-atmosphere-sun": [0.0, 90.0],
        //     "sky-atmosphere-sun-intensity": 15,
        //   },
        // })
        // add a clustered GeoJSON source for a sample set of earthquakes
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

        // circle and symbol layers for rendering individual earthquakes (unclustered points)
        map.addLayer({
          id: "Deaths",
          type: "circle",
          source: "points",

          filter: ["!=", "cluster", true],
          paint: {
            "circle-color": [
              "case",
              deaths1,
              colors[0],
              deaths2,
              colors[1],
              deaths3,
              colors[2],
              deaths4,
              colors[3],
              colors[4],
            ],
            "circle-opacity": 0.5,
            // 'circle-radius': 6,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "deaths"],
              minD,
              10,
              maxD,
              36,
            ],
          },
        });
        // circle and symbol layers for rendering individual earthquakes (unclustered points)

        // map.addLayer({
        //   id: "track",
        //   type: "fill-extrusion",
        //   source: "points",
        //   paint: {
        //     'fill-extrusion-opacity': 0.75,
        //     'fill-extrusion-color': "red",
        //     'fill-extrusion-height': ["get", "cases"],
        //   }
        // });
        map.addLayer({
          id: "Cases",
          type: "circle",
          source: "points",
          // filter: ["!=", "cluster", true],

          // 'layout': {
          //   'text-field': [
          //     'number-format',
          //     ['get', 'points'],
          //     { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
          //   ],
          //   'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          //   'text-size': 10,
          //   'visibility': 'visible'
          // },
        

        //   paint: {
        //     'fill-extrusion-color': {
        //         property: 'cases',
        //         type: 'interval',
        //         stops: [
        //             [337780, '#ffffd9'],
        //             [5754356, '#edf8b1'],
        //             [11364372, '#c7e9b4'],
        //             [32885991, '#7fcdbb'],
        //             [46017766, '#41b6c4'],
        //             [66573504, '#1d91c0'],
        //             [127185332, '#225ea8'],
        //             [143964709, '#253494'],
        //             [143964709, '#081d58']
        //         ]
        //     },
        //     'fill-extrusion-height': ['/', ['get', 'cases'], 50],
        //     'fill-extrusion-base': 0,
        //     'fill-extrusion-opacity': .9
        // },
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
            // 'circle-radius': 12,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "cases"],

              min,
              10,

              max,
              36,
            ],
          
        });








        const stores = {
          'type': 'FeatureCollection',
          'features': [
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.034084142948, 38.909671288923]
          },
          'properties': {
          'phoneFormatted': '(202) 234-7336',
          'phone': '2022347336',
          'address': '1471 P St NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at 15th St NW',
          'postalCode': '20005',
          'state': 'D.C.'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.049766, 38.900772]
          },
          'properties': {
          'phoneFormatted': '(202) 507-8357',
          'phone': '2025078357',
          'address': '2221 I St NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at 22nd St NW',
          'postalCode': '20037',
          'state': 'D.C.'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.043929, 38.910525]
          },
          'properties': {
          'phoneFormatted': '(202) 387-9338',
          'phone': '2023879338',
          'address': '1512 Connecticut Ave NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at Dupont Circle',
          'postalCode': '20036',
          'state': 'D.C.'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.0672, 38.90516896]
          },
          'properties': {
          'phoneFormatted': '(202) 337-9338',
          'phone': '2023379338',
          'address': '3333 M St NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at 34th St NW',
          'postalCode': '20007',
          'state': 'D.C.'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.002583742142, 38.887041080933]
          },
          'properties': {
          'phoneFormatted': '(202) 547-9338',
          'phone': '2025479338',
          'address': '221 Pennsylvania Ave SE',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'btwn 2nd & 3rd Sts. SE',
          'postalCode': '20003',
          'state': 'D.C.'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-76.933492720127, 38.99225245786]
          },
          'properties': {
          'address': '8204 Baltimore Ave',
          'city': 'College Park',
          'country': 'United States',
          'postalCode': '20740',
          'state': 'MD'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.097083330154, 38.980979]
          },
          'properties': {
          'phoneFormatted': '(301) 654-7336',
          'phone': '3016547336',
          'address': '4831 Bethesda Ave',
          'cc': 'US',
          'city': 'Bethesda',
          'country': 'United States',
          'postalCode': '20814',
          'state': 'MD'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.359425054188, 38.958058116661]
          },
          'properties': {
          'phoneFormatted': '(571) 203-0082',
          'phone': '5712030082',
          'address': '11935 Democracy Dr',
          'city': 'Reston',
          'country': 'United States',
          'crossStreet': 'btw Explorer & Library',
          'postalCode': '20190',
          'state': 'VA'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.10853099823, 38.880100922392]
          },
          'properties': {
          'phoneFormatted': '(703) 522-2016',
          'phone': '7035222016',
          'address': '4075 Wilson Blvd',
          'city': 'Arlington',
          'country': 'United States',
          'crossStreet': 'at N Randolph St.',
          'postalCode': '22203',
          'state': 'VA'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-75.28784, 40.008008]
          },
          'properties': {
          'phoneFormatted': '(610) 642-9400',
          'phone': '6106429400',
          'address': '68 Coulter Ave',
          'city': 'Ardmore',
          'country': 'United States',
          'postalCode': '19003',
          'state': 'PA'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-75.20121216774, 39.954030175164]
          },
          'properties': {
          'phoneFormatted': '(215) 386-1365',
          'phone': '2153861365',
          'address': '3925 Walnut St',
          'city': 'Philadelphia',
          'country': 'United States',
          'postalCode': '19104',
          'state': 'PA'
          }
          },
          {
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.043959498405, 38.903883387232]
          },
          'properties': {
          'phoneFormatted': '(202) 331-3355',
          'phone': '2023313355',
          'address': '1901 L St. NW',
          'city': 'Washington DC',
          'country': 'United States',
          'crossStreet': 'at 19th St',
          'postalCode': '20036',
          'state': 'D.C.'
          }
          }
          ]
          };
           
          /**
          * Assign a unique id to each store. You'll use this `id`
          * later to associate each point on the map with a listing
          * in the sidebar.
          */
          stores.features.forEach((store, i) => {
          store.properties.id = i;
          });
           
          /**
          * Wait until the map loads to make changes to the map.
          */
          map.on('load', () => {
          /**
          * This is where your '.addLayer()' used to be, instead
          * add only the source without styling a layer
          */
          map.addSource('places', {
          'type': 'geojson',
          'data': stores
          });
           
          /**
          * Add all the things to the page:
          * - The location listings on the side of the page
          * - The markers onto the map
          */
          buildLocationList(stores);
          addMarkers();
          });
           
          /**
          * Add a marker to the map for every store listing.
          **/
          function addMarkers() {
          /* For each feature in the GeoJSON object above: */
          for (const marker of stores.features) {
          /* Create a div element for the marker. */
          const el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = `marker-${marker.properties.id}`;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';
           
          /**
          * Create a marker using the div element
          * defined above and add it to the map.
          **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
           
          /**
          * Listen to the element and when it is clicked, do three things:
          * 1. Fly to the point
          * 2. Close all other popups and display popup for clicked store
          * 3. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          el.addEventListener('click', (e) => {
          /* Fly to the point */
          flyToStore(marker);
          /* Close all other popups and display popup for clicked store */
          createPopUp(marker);
          /* Highlight listing in sidebar */
          const activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          if (activeItem[0]) {
          activeItem[0].classList.remove('active');
          }
          const listing = document.getElementById(
          `listing-${marker.properties.id}`
          );
          listing.classList.add('active');
          });
          }
          }
           
          /**
          * Add a listing for each store to the sidebar.
          **/
          function buildLocationList(stores) {
          for (const store of stores.features) {
          /* Add a new listing section to the sidebar. */
          const listings = document.getElementById('listings');
          const listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = `listing-${store.properties.id}`;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';
           
          /* Add the link to the individual listing created above. */
          const link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = `link-${store.properties.id}`;
          link.innerHTML = `${store.properties.address}`;
           
          /* Add details to the individual listing. */
          const details = listing.appendChild(document.createElement('div'));
          details.innerHTML = `${store.properties.city}`;
          if (store.properties.phone) {
          details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
          }
           
          /**
          * Listen to the element and when it is clicked, do four things:
          * 1. Update the `currentFeature` to the store associated with the clicked link
          * 2. Fly to the point
          * 3. Close all other popups and display popup for clicked store
          * 4. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          link.addEventListener('click', function () {
          for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
          flyToStore(feature);
          createPopUp(feature);
          }
          }
          const activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
          activeItem[0].classList.remove('active');
          }
          this.parentNode.classList.add('active');
          });
          }
          }
           
          /**
          * Use Mapbox GL JS's `flyTo` to move the camera smoothly
          * a given center point.
          **/
          function flyToStore(currentFeature) {
          map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
          });
          }
           
          /**
          * Create a Mapbox GL JS `Popup`.
          **/
          function createPopUp(currentFeature) {
          const popUps = document.getElementsByClassName('mapboxgl-popup');
          if (popUps[0]) popUps[0].remove();
          const popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(
          `<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`
          )
          .addTo(map);
          }





  //       map.addSource('stadiumsData', {
  //         type: 'geojson',
  //         data: {
  //                 type: 'FeatureCollection',
  //                 features: [{
  //                     type: 'Feature',
  //                     geometry: {
  //                         type: 'Point',
  //                         coordinates: [37.44025, 55.817861]
  //                     },
  //                     properties: {
  //                         stadium: 'Otkritie Arena',
  //                         short: 'otkritie'
  //                     },
  //                     id: 1
  //                 }, {
  //                     type: 'Feature',
  //                     geometry: {
  //                         type: 'Point',
  //                         coordinates: [44.548611, 48.734444]
  //                     },
  //                     properties: {
  //                         stadium: 'Volgograd Arena',
  //                         short: 'volgograd'
  //                     },
  //                     id: 2
  //                 }, {
  //                     type: 'Feature',
  //                     geometry: {
  //                         type: 'Point',
  //                         coordinates: [39.737778, 47.209444]
  //                     },
  //                     properties: {
  //                         stadium: 'Rostov Arena',
  //                         short:'rostov'
  //                     },
  //                     id: 3
  //                 }]
  //             }
  //     });

  //     map.addLayer({
  //       id: 'stadium-halo',
  //       type: 'circle',
  //       source: 'stadiumsData',
  //       paint: {
  //           'circle-color': '#162026',
  //           'circle-radius': 10,
  //           'circle-stroke-color': '#f1dbb9',
  //           'circle-stroke-width': 1,
  //           'circle-opacity': 0.25
  //       }
  //   });

  //   map.addLayer({
  //       id: 'stadium-circle',
  //       type: 'circle',
  //       source: 'stadiumsData',
  //       paint: {
  //           'circle-color': ['case',
  //               ['boolean', ['feature-state', 'hover'], false],
  //               '#f1dbb9',
  //               '#162026'
  //           ],
  //           'circle-radius': 10,
  //           'circle-stroke-color': '#f1dbb9',
  //           'circle-stroke-width': 1,
  //           'circle-opacity': 1
  //       }
  //   });






  // map.on('mouseenter', 'stadium-circle', function(e) {
  //     if (e.features.length) {
  //         map.getCanvas().style.cursor = 'pointer';
  //         if (hoverId) {
  //             map.setFeatureState({source: 'stadiumsData', id: hoverId}, { hover: false});
  //         }
  //         hoverId = e.features[0].id;
  //         map.setFeatureState({source: 'stadiumsData', id: hoverId}, { hover: true});
  //         // $(`#stadium${hoverId}`).mouseenter();
  //     }
  // });

  // map.on('mouseleave', 'stadium-circle', function() {
  //     map.getCanvas().style.cursor = '';
  //     if (hoverId) {
  //         map.setFeatureState({source: 'stadiumsData', id: hoverId}, { hover: false});
  //         // (`#stadium${hoverId}`).mouseleave();
  //     }
  //     hoverId =  null;
  // });

  // map.on('mousemove', 'Cases', function(e) {
  //   // this.css('background-color', '#415766');
  //   map.setFeatureState({source: 'stadiumsData', id: parseInt(this.id.match(/\d+/)[0])}, { hover: true});
  // });

  // map.on('mouseleave', 'Cases', function(e) {
  //   // this.css('background-color', '');
  //   map.setFeatureState({source: 'stadiumsData', id: parseInt(this.id.match(/\d+/)[0])}, { hover: false});
  // });



  



















        map.addLayer({
          id: "Mortality",
          type: "circle",
          source: "points",
          filter: ["!=", "cluster", true],

          paint: {
            "circle-color": [
              "case",
              mr1,
              colors2[0],
              mr2,
              colors2[1],
              mr3,
              colors2[2],
              mr4,
              colors2[3],
              colors2[4],
            ],
            "circle-opacity": 0.5,
            // 'circle-radius': 18,
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "mort"],

              0.0001,
              12,

              0.2,
              36,
            ],
          },
        });

        map.addLayer({
          id: "clusters",
          type: "symbol",
          source: "points",
          filter: ["!=", "cluster", true],
          layout: {
            "text-field": [
              "number-format",
              ["get", "points"],
              { "min-fraction-digits": 1, "max-fraction-digits": 1 },
            ],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 10,
            visibility: "visible",
          },
          paint: {
            "text-color": [
              "case",
              ["<", ["get", "cases"], 3],
              "black",
              "white",
            ],
          },
        });


// // Create marker
// var marker = new mapboxgl.Marker();
// // // Append marker to map
// marker.addTo(map);


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
      }); // map(load) End

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

      // inspect a cluster on click
      map.on("click", "Cases", function (e) {
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
      // map.addControl(new mapboxgl.NavigationControl());

      // Add navigation to center the map on your geo location
      map.addControl(
        new mapboxgl.GeolocateControl({
          fitBoundsOptions: { maxZoom: 6 },
        })
      );

      //CIRCLES
      map.once("load", function () {

        const popup = new mapboxgl.Popup({
          className: "popup",
        });

        var i = 0;
        let lastId;
        map.on("mousemove", "Cases", function (e) {
          const id = e.features[0].properties.id;

//                   // Create link
// var links = document.createElement('a');
// // Append link to body
// document.body.appendChild(links);

// // Reference eachother:
// links.markers = markers;
// markers.links = links;



          if (id !== lastId) {
            lastId = id;

            map.getCanvas().style.cursor = "pointer";
            // map.getCanvas().style.backgroundColor = 'red';

            var coordinates = e.features[0].geometry.coordinates.slice();
            // var cases = e.features[0].properties.cases;

            // let colorsCases = [
            //   // " #006390",
            //   " #7668b4",
            //   " #ffa500",
            //   // " #ff6a67",
            //   // "#d75ea4",
            // ];

            const { cases, deaths, country, province} =
              e.features[0].properties;


      
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            const colorCase = [];
            const statusCase = [];
            const classText = [];
            if (cases < 50000) {
              colorCase.push("#5d67a1");
              statusCase.push("Mild");
              classText.push("mild");
            }
            if (cases >= 50000 && cases < 100000) {
              colorCase.push("#955196");
              statusCase.push("Limited");
              classText.push("limited");
            }
            if (cases >= 100000 && cases < 400000) {
              colorCase.push("#ffa600");
              statusCase.push("Moderate");
              classText.push("moderate");
            }
            if (cases >= 400000 && cases < 16000000) {
              colorCase.push("#ff6e54");
              statusCase.push("Serious");
              classText.push("serious");
            }
            if (cases >= 16000000) {
              colorCase.push("#dd5182");
              statusCase.push("Extreme");
              classText.push("extreme");
              //   pink
            }

            const colorDeath = [];
            const statusDeath = [];
            const classText2 = [];

            if (deaths < 2500) {
              colorDeath.push("#5d67a1");
              statusDeath.push("Mild");
              classText2.push("mild");
              //   blue
            }
            if (deaths >= 2500 && deaths < 5000) {
              colorDeath.push("#955196");
              statusDeath.push("Limited");
              classText2.push("limited");
            }
            if (deaths >= 5000 && deaths < 20000) {
              colorDeath.push("#cf8c11");
              statusDeath.push("Moderate");
              classText2.push("moderate");
            }
            if (deaths >= 20000 && deaths < 80000) {
              colorDeath.push("#ff6e54");
              statusDeath.push("Serious");
              classText2.push("serious");
            }
            if (deaths >= 80000) {
              colorDeath.push("#dd5182");
              statusDeath.push("Extreme");
              classText2.push("extreme");
              //   pink
            }

            const countryISO =
              lookup.byCountry(country)?.iso2 ||
              lookup.byInternet(country)?.iso2;
            const countryFlag = `https://raw.githubusercontent.com/stefangabos/world_countries/master/data/flags/64x64/${countryISO?.toLowerCase()}.png`;
            const provinceHTML =
              province !== "null" ? `<p>Province: <b>${province}</b></p>` : "";
            const mortalityRate = ((deaths / cases) * 100).toFixed(2);
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="${countryFlag}"></img>`
              : "";
         
            const HTML = ` <p>Country: <b>${country}</b></p>
                  ${provinceHTML}
                  <p>Cases: <b>${numberWithCommas(
                    cases
                  )}</b><span class="${classText}">(${statusCase})</span></p>
                  <p>Deaths: <b>${numberWithCommas(
                    deaths
                  )}</b><span class="${classText2}"}>(${statusDeath})</span></p>
                  <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                  
               
                  `;

            popup
              .setLngLat(coordinates)
              .setHTML(
                '<canvas className="info" id="foo' + country + '"></canvas>' + HTML
              )
              .addTo(map);

            // map.flyTo({ center: e.features[0].geometry.coordinates, zoom: 4 });

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
          }
        });

        map.on("mouseleave", "Cases", function () {
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        // map.doubleClickZoom.enable();
        //IDS


        document
          .getElementById("africa")
          .addEventListener("click", function () {
            map.flyTo({
              zoom: 3,
              center: [3.2, 1.8],
              essential: true,
            });
          });
        document
          .getElementById("europe")
          .addEventListener("click", function () {
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
        document
          .getElementById("oceania")
          .addEventListener("click", function () {
            map.flyTo({
              zoom: 3.7,
              center: [131, -28],
              essential: true,
            });
          });


          // document
          // .getElementById("")
          // .addEventListener("click", function () {
          //   map.flyTo({
          //     zoom: 3.7,
          //     center: [131, -28],
          //     essential: true,
          //   });
          // });

        // const handleFly = () => {
        //   this.map.state.map.flyTo({ center: [-118.4107187, 33.9415889] });
        // };


      //   $('.button').mouseenter(function() {
      //     console.log('button')
      //     $(this).css('background-color', '#415766');
      //     map.setFeatureState({source: 'points', id: parseInt(this.id.button(/\d+/)[0])}, { hover: true});
      // });
      
      // $('.button').mouseleave(function() {
      //     $(this).css('background-color', '');
      //     map.setFeatureState({source: 'points', id: parseInt(this.id.button(/\d+/)[0])}, { hover: false});
      // });

    


        map.on("move", () => {
          setLng(map.getCenter().lng.toFixed(4));
          setLat(map.getCenter().lat.toFixed(4));
          setZoom(map.getZoom().toFixed(2));
        });
        // Clean up on unmount
        return () => map.remove();
      }); //map(once) End
    } //id Data End
  }, [data]);
  //useEffect End


  return (
    <div className="mapContainer">
      <div className="sb">
<div className="heading">
<h1>Our locations</h1>
</div>
<div id="listings" className="listings"></div>
</div>
<div id="map" className="map"></div>
         
      <div className="mapBox" ref={mapboxElRef} zoom={zoom} />
   
   
    </div>
  );
};
//Map End
export default Map;




