import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import lookup from "country-code-lookup";
import "./Map2.scss";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { numberWithCommas } from "../utils/numberWithCommas";

mapboxgl.accessToken =
  "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA";

function Map2() {
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
            deaths: point.stats.deaths
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

      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/mapbox/dark-v10",
        center: [99, 20], // Asia - intial geo location
        zoom: 3 // initial zoom
      });






      

     //DOUGHNUT START     
      // filters for classifying earthquakes into five categories based on magnitude
      const cases1 = ['<', ['get', 'cases'], 10000];
      const cases2 = ['all', ['>=', ['get', 'cases'], 2], ['<', ['get', 'cases'], 100000]];
      const cases3 = ['all', ['>=', ['get', 'cases'], 3], ['<', ['get', 'cases'], 250000]];
      const cases4 = ['all', ['>=', ['get', 'cases'], 4], ['<', ['get', 'cases'], 500000]];
      const cases5 = ['>=', ['get', 'cases'], 1000000];
  
      // colors to use for the categories
      const colors = [
        "#ffa600",
        "#ff6e54",
        "#dd5182",
        "#955196",
        "#444e86",
        "rgb(45, 182, 130)",
        "rgb(212, 23, 83)",
  
      ];
  
      map.on('load', () => {
        // add a clustered GeoJSON source for a sample set of earthquakes
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
            'cases1': ['+', ['case', cases1, 1, 0]],
            'cases2': ['+', ['case', cases2, 1, 0]],
            'cases3': ['+', ['case', cases3, 1, 0]],
            'cases4': ['+', ['case', cases4, 1, 0]],
            'cases5': ['+', ['case', cases5, 1, 0]]
          },
    
        });


  
        // circle and symbol layers for rendering individual earthquakes (unclustered points)
        map.addLayer({
          'id': 'circles',
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
            'circle-radius': 12
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
        map.addLayer({
          'id': 'circles',
          'type': 'symbol',
          'source': 'points',
          'filter': ['!=', 'cluster', true],
          'layout': {
            'text-field': [
              'number-format',
              ['get', 'cases'],
              { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
            ],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 10
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
          props.cases1,
          props.cases2,
          props.cases3,
          props.cases4,
          props.cases5
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
        <svg class="zoom" width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">`;
  
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
        <text  dominant-baseline="central" transform="translate(${r}, ${r})" fill="grey">
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
        map.getSource('points').getClusterExpansionZoom(clusterId, function (err, zoom) {
          if (err)
            return;
  
          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        });
      });
     // DOUGHNUT END
  




      // Add navigation controls to the top right of the canvas
    //   map.addControl(new mapboxgl.NavigationControl());

    //   // Add navigation to center the map on your geo location
    //   map.addControl(
    //     new mapboxgl.GeolocateControl({
    //       fitBoundsOptions: { maxZoom: 6 }
    //     })
    //   );



      //CIRCLES
      map.once("load", function () {
        // Add our SOURCE
       

        // Add our layer
        // map.addLayer({
        //   id: "circles",
        //   source: "points", // this should be the id of source
        //   type: "circle",
        //   paint: {
        //     "circle-opacity": 0.75,
        //     "circle-stroke-width": [
        //       "interpolate",
        //       ["linear"],
        //       ["get", "cases"],
        //       1,
        //       1,
        //       max,
        //       1.75
        //     ],
            // "circle-radius": [
            //   "interpolate",
            //   ["linear"],
            //   ["get", "cases"],
            //   1,
            //   min,
            //   1000,
            //   8,
            //   average / 4,
            //   10,
            //   average / 2,
            //   14,
            //   average,
            //   18,
            //   max,
            //   50
            // ],
            // "circle-color": [
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
            //   ]
        //   }
        // });


      

       
    






        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        let lastId;

        map.on("mousemove", "circles", (e) => {
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

            const HTML = `<p>Country: <b>${country}</b></p>
                ${provinceHTML}
                <p>Cases: <b>${numberWithCommas(cases)}</b></p>
                <p>Deaths: <b>${numberWithCommas(deaths)}</b></p>
                <p>Mortality Rate: <b>${mortalityRate}%</b></p>
                ${countryFlagHTML}`;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.on("mouseleave", "circles", function () {
          lastId = undefined;
          map.getCanvas().style.cursor = "";
          popup.remove();
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
        



      });
    }
  }, [data]);




 

  


  return (
    <div className="App">
      <div className="mapContainer" >
       
        {/* Mapbox Container */}
        <div className="mapBox" ref={mapboxElRef}  />
      </div>
    </div>
  );
}

export default Map2;