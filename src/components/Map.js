import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";
import "./Map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA";

const Map2 = ({ countries}) => {
  const mapboxElRef = useRef(null); // DOM element to render map
  
  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((data) =>
        data.map((point, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude
            ]
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths,
      

          }
        }))
      );

  const { data } = useSWR("https://disease.sh/v3/covid-19/jhucsse", fetcher);

  
 
  // Initialize our map
  useEffect(() => {
    if (data) {
      const average =
        data.reduce((total, next) => total + next.properties.cases, 0) /
        data.length;
      const min = Math.min(...data.map((item) => item.properties.cases));
      const max = Math.max(...data.map((item) => item.properties.cases));

      const averageD =
        data.reduce((total, next) => total + next.properties.deaths, 0) /
        data.length;
      const minD = Math.min(...data.map((item) => item.properties.deaths));
      const maxD = Math.max(...data.map((item) => item.properties.deaths));

      console.log(average, min, max, 'stats')
      console.log(averageD, minD, maxD, 'statsD')

      const amr = averageD / average;
      const minmr = minD / min;
      const maxmr = maxD / max;
      console.log(amr, minmr, maxmr, 'amr')

    
      // const countryname = data.map((item) => item.properties.country);
      // console.log(countryname, 'countryname')
    



      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [99, 20], // Asia - intial geo location
        zoom: 3 // initial zoom
      });


 


//DOUGHNUT      
      // filters for classifying earthquakes into five categories based on magnitude
      const cases1 = ['<', ['get', 'cases'], 10000];
      const cases2 = ['all', ['>=', ['get', 'cases'], 10000], ['<', ['get', 'cases'], 100000]];
      const cases3 = ['all', ['>=', ['get', 'cases'], 100000], ['<', ['get', 'cases'], 250000]];
      const cases4 = ['all', ['>=', ['get', 'cases'], 250000], ['<', ['get', 'cases'], 500000]];
      const cases5 = ['>=', ['get', 'cases'], 1000000];

      // filters for classifying earthquakes into five categories based on magnitude
      const deaths1 = ['<', ['get', 'deaths'], 100];
      const deaths2 = ['all', ['>=', ['get', 'deaths'], 100], ['<', ['get', 'deaths'], 1000]];
      const deaths3 = ['all', ['>=', ['get', 'deaths'], 1000], ['<', ['get', 'deaths'], 5000]];
      const deaths4 = ['all', ['>=', ['get', 'deaths'], 5000], ['<', ['get', 'deaths'], 20000]];
      const deaths5 = ['>=', ['get', 'deaths'], 20000];

      const mr1 = deaths1 / cases1;
      const mr2 = deaths2 / cases2;
      const mr3 = deaths3 / cases3;
      const mr4 = deaths4 / cases4;
      const mr5 = deaths5 / cases5;

      // colors to use for the categories
      const colors = [
        "#444e86",
        "#955196",
        "#ffa600",
        "#ff6e54",
        "#dd5182",
        "rgb(212, 23, 83)",
        "rgb(45, 182, 130)",
      ];

      const colors2 = [
        "#444e86",
        "#955196",
        "#ffa600",
        "#ff6e54",
        "#dd5182",
        "rgb(212, 23, 83)",
        "rgb(45, 182, 130)",
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
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
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
          context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          // context.fillStyle = 'rgba(255, 100, 100, 0.1)';
          // context.strokeStyle = 'grey';
          // context.lineWidth = 2 + 4 * (1 - t);
          // context.fill();
          // context.stroke();

          // Update this image's data with data from the canvas.
          this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;

          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          map.triggerRepaint();

          // Return `true` to let the map know that the image was updated.
          return true;
        }
      };

//LAYERS
      map.on('load', () => {
        // add a clustered GeoJSON source for a sample set of earthquakes
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

        map.addSource('dot-point', {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': data
          }
        });
        map.addLayer({
          'id': 'layer-with-pulsing-dot',
          'type': 'symbol',
          'source': 'dot-point',
          'layout': {
            'icon-image': 'pulsing-dot'
          }
        });

        map.addSource('points', {
          'type': 'geojson',
          'data': {
            type: "FeatureCollection",
            features: data
          },
          'cluster': true,
          'clusterRadius': 50,
          'clusterProperties': {
            // keep separate counts for each magnitude category in a cluster
            'deaths1': ['+', ['case', deaths1, 1, 0]],
            'deaths2': ['+', ['case', deaths2, 1, 0]],
            'deaths3': ['+', ['case', deaths3, 1, 0]],
            'deaths4': ['+', ['case', deaths4, 1, 0]],
            'deaths5': ['+', ['case', deaths5, 1, 0]],
            'cases1': ['+', ['case', cases1, 1, 0]],
            'cases2': ['+', ['case', cases2, 1, 0]],
            'cases3': ['+', ['case', cases3, 1, 0]],
            'cases4': ['+', ['case', cases4, 1, 0]],
            'cases5': ['+', ['case', cases5, 1, 0]],
         
          },

        });

        // circle and symbol layers for rendering individual earthquakes (unclustered points)
        map.addLayer({
          'id': 'Deaths',
          'type': 'circle',
          'source': 'points',

          'filter': ['!=', 'cluster', true],
          'paint': {
            'circle-color': [
              'case',
              deaths1,
              colors2[0],
              deaths2,
              colors2[1],
              deaths3,
              colors2[2],
              deaths4,
              colors2[3],
              colors2[4]
            ],
            'circle-opacity': 0.9,
            'circle-radius': 6,
            // "circle-radius": [
            //     "interpolate",
            //     ["linear"],
            //     ["get", "cases"],
            //     1,
            //     min,
            //     1000,
            //     8,
            //     average / 4,
            //     10,
            //     average / 2,
            //     14,
            //     average,
            //     18,
            //     max,
            //     50
            //   ],
          }
        });
              // circle and symbol layers for rendering individual earthquakes (unclustered points)
              map.addLayer({
                'id': 'Cases',
                'type': 'circle',
                'source': 'points',
                'filter': ['!=', 'cluster', true],
                'paint': {
                  'circle-color': [
                    'case',
                    cases1,
                    colors[0],
                    cases2,
                    colors[1],
                    cases3,
                    colors[2],
                    cases4,
                    colors[3],
                    colors[4]
                  ],
                  'circle-opacity': 0.6,
                  'circle-radius': 12,
                }
              });

        map.addLayer({
          'id': 'clusters',
          'type': 'symbol',
          'source': 'points',
          'filter': ['!=', 'cluster', true],
          'layout': {
            'text-field': [
              'number-format',
              ['get', 'points'],
              { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
            ],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 10,
            'visibility': 'visible'
          },
          'paint': {
            'text-color': [
              'case',
              ['<', ['get', 'cases'], 3],
              'black',
              'white'
            ],
            // 'circle-color': [
            //     "interpolate",
            //     ["linear"],
            //     ["get", "cases"],
            //     min,
            //     "#ffffb2",
            //     max / 32,
            //     "#fed976",
            //     max / 16,
            //     "#feb24c",
            //     max / 8,
            //     "#fd8d3c",
            //     max / 4,
            //     "#fc4e2a",
            //     max / 2,
            //     "#e31a1c",
            //     max,
            //     "#b10026"
            //   ],
            //   "circle-opacity": 0.75,
            //       "circle-stroke-width": [
            //         "interpolate",
            //         ["linear"],
            //         ["get", "cases"],
            //         1,
            //         1,
            //         max,
            //         1.75
            //       ],
          }
        });

        map.addLayer({
          'id': 'clusters2',
          'type': 'symbol',
          'source': 'points',
          'filter': ['!=', 'cluster', true],
          'layout': {
            'text-field': [
              'number-format',
              ['get', 'points'],
              { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
            ],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 10,
            'visibility': 'visible'
          },
          'paint': {
            'text-color': [
              'case',
              ['<', ['get', 'deaths'], 3],
              'black',
              'white'
            ],

          }
        });

        // objects for caching and keeping track of HTML marker objects (for performance)
        const markers = {};
        let markersOnScreen = {};

        function updateMarkers() {
          const newMarkers = {};
          const features = map.querySourceFeatures('points');

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
                element: el
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
        map.on('render', () => {
          if (!map.isSourceLoaded('points')) return;
          updateMarkers();
        });
      });

      // code for creating an SVG donut chart from feature properties
      function createDonutChart(props) {
        const offsets = [];
        const counts = [
          props.deaths1,
          props.deaths2,
          props.deaths3,
          props.deaths4,
          props.deaths5
        ];
        let total = 0;
        for (const count of counts) {
          offsets.push(total);
          total += count;
        }
        const fontSize =
          total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
        const r =
          total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
        const r0 = Math.round(r * 0.6);
        const w = r * 2;

        let html = `<div>
        <svg "class="zoom" width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px ; display: "block"; >`;

        for (let i = 0; i < counts.length; i++) {
          html += donutSegment(
            offsets[i] / total,
            (offsets[i] + counts[i]) / total,
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

        const el = document.createElement('div');
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
        return `<path  d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${r + r * y0
          } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${r + r0 * x1
          } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0
          }" fill="${color}" />`;
      }

      // inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        var clusterId = features[0].properties.cluster_id;
        console.log('hi')
        map.getSource('points').getClusterExpansionZoom(clusterId, function (err, zoom) {
          if (err)
            return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
          // console.log(clusterId, 'clusterID', features, 'features', features[0].properties.cluster_id)
        });
      });
    
//TOGGLE
      // After the last frame rendered before the map enters an "idle" state.
      map.on('idle', () => {
        // If these two layers were not added to the map, abort
        if (!map.getLayer('Cases') || !map.getLayer('Deaths')) {
          return;
        }

        // Enumerate ids of the layers.
        const toggleableLayerIds = ['Cases', 'Deaths'];
  
        // Set up the corresponding toggle button for each layer.
        for (const id of toggleableLayerIds) {
          // Skip layers that already have a button set up.
          if (document.getElementById(id)) {
            continue;
          }

          // Create a link.
          const link = document.createElement('a');
          link.id = id;
          link.href = '#';
          link.textContent = id;
          link.className = 'active';

          // Show or hide layer when the toggle is clicked.
          link.onclick = function (e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
              clickedLayer,
              'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
              map.setLayoutProperty(clickedLayer, 'visibility', 'none');
              this.className = '';
            } else {
              this.className = 'active';
              map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'visible'
              );
            }
          };
          const layers = document.getElementById('menu');
          layers.appendChild(link);
        }
      });

      //Add navigation controls to the top right of the canvas
      // map.addControl(new mapboxgl.NavigationControl());

      // Add navigation to center the map on your geo location
      map.addControl(
        new mapboxgl.GeolocateControl({
          fitBoundsOptions: { maxZoom: 6 }
        })
      );

      console.log(countries, 'countries')
      const populationCountry = countries.map(country => [country.population, country.country]);
      console.log(populationCountry, 'pC')
    

      //CIRCLES
      map.once("load", function () {

//POPUP
        const popup2 = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        let lastId2;

        map.on("click", "clusters", (e) => {
          // const id = e.features[0].properties.id;
          // Change the pointer type on mouseenter
          map.getCanvas().style.cursor = "pointer";
          const coordinates = e.geometry.coordinates.slice();
          popup2.setLngLat([0, 20]).addTo(map);
        });

        map.on("mouseleave", "clusters", function () {
          lastId2 = undefined;
          map.getCanvas().style.cursor = "";
          popup2.remove();
        });


        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        let lastId;

        map.on("mousemove", "Cases" && "Deaths", (e) => {
          const id = e.features[0].properties.id;

          if (id !== lastId) {
            lastId = id;
            const {
              cases,
              deaths,
              country,
              province
            } = e.features[0].properties;

            // Change the pointer type on mouseenter
            map.getCanvas().style.cursor = "pointer";

            const coordinates = e.features[0].geometry.coordinates.slice();
           
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
            

            const HTML = `  ${countryFlagHTML}<p>Country: <b>${country}</b></p>
                ${provinceHTML}
                <p>Cases: <b>${numberWithCommas(cases)}</b></p>
                <p>Deaths: <b>${numberWithCommas(deaths)}</b></p>
                <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                <p>Population: <b>${""}</b></p>
                `;
  // 
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.on("mouseleave", "Cases" && "Deaths", function () {
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
        });

        // map.doubleClickZoom.enable();
//IDS
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
      });
    }
  }, [data]);


  return (
    <div className="App">
      <div className="mapContainer" >
        {/* Mapbox Container */}
        <div className="mapBox" ref={mapboxElRef} />
      </div>

    </div>
  );
}

export default Map2;