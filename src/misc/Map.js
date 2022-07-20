import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import { COUNTRY_URL } from "../api/api";
import { numberWithCommas } from "../utils/numberWithCommas";


mapboxgl.accessToken =
  "pk.eyJ1IjoibWFya3liMTUyIiwiYSI6ImNrZzJraGl1NTAwcjkyeXFyMHljNjExcmoifQ.RxhYWJnYveNc1LjK6wB9sQ";

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(20);
  const [zoom, setZoom] = useState(1.7);

  const [countries, setCountries] = useState([]);
 
  useEffect(() => {
    const locations = [];
    async function fetchCountries() {
      try {
        const result = await fetch(COUNTRY_URL);
        const countries = await result.json();
        setCountries([...countries]);
     

       

        for (let i = 0; i < countries.length; i++) {
          locations.push(String(countries[i].countryInfo[3, 4]))
        }
     
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
            <img src=${flag} alt="" width="90px" height="50px"></img><br />
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
          el.style.radius = "40px";


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




    // console.log(locations, 'locations')

    // // filters for classifying earthquakes into five categories based on magnitude
    // const mag1 = ['<', ['get', 'mag'], 2];
    // const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
    // const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
    // const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
    // const mag5 = ['>=', ['get', 'mag'], 5];

    // // colors to use for the categories
    // const colors = [
    //   "#ffa600",
    //   "#ff6e54",
    //   "#dd5182",
    //   "#955196",
    //   "#444e86",
    //   "rgb(45, 182, 130)",
    //   "rgb(212, 23, 83)",

    // ];

    // map.on('load', () => {
    //   // add a clustered GeoJSON source for a sample set of earthquakes
    //   map.addSource('earthquakes', {
    //     'type': 'geojson',
    //     'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    //     'cluster': true,
    //     'clusterRadius': 80,
    //     'clusterProperties': {
    //       // keep separate counts for each magnitude category in a cluster
    //       'mag1': ['+', ['case', mag1, 1, 0]],
    //       'mag2': ['+', ['case', mag2, 1, 0]],
    //       'mag3': ['+', ['case', mag3, 1, 0]],
    //       'mag4': ['+', ['case', mag4, 1, 0]],
    //       'mag5': ['+', ['case', mag5, 1, 0]]
    //     }
    //   });
    //   // circle and symbol layers for rendering individual earthquakes (unclustered points)
    //   map.addLayer({
    //     'id': 'earthquake_circle',
    //     'type': 'circle',
    //     'source': 'earthquakes',
    //     'filter': ['!=', 'cluster', true],
    //     'paint': {
    //       'circle-color': [
    //         'case',
    //         mag1,
    //         colors[0],
    //         mag2,
    //         colors[1],
    //         mag3,
    //         colors[2],
    //         mag4,
    //         colors[3],
    //         colors[4]
    //       ],
    //       'circle-opacity': 0.6,
    //       'circle-radius': 12
    //     }
    //   });
    //   map.addLayer({
    //     'id': 'earthquake_label',
    //     'type': 'symbol',
    //     'source': 'earthquakes',
    //     'filter': ['!=', 'cluster', true],
    //     'layout': {
    //       'text-field': [
    //         'number-format',
    //         ['get', 'mag'],
    //         { 'min-fraction-digits': 1, 'max-fraction-digits': 1 }
    //       ],
    //       'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    //       'text-size': 10
    //     },
    //     'paint': {
    //       'text-color': [
    //         'case',
    //         ['<', ['get', 'mag'], 3],
    //         'black',
    //         'white'
    //       ]
    //     }
    //   });

    //   // objects for caching and keeping track of HTML marker objects (for performance)
    //   const markers = {};
    //   let markersOnScreen = {};

    //   function updateMarkers() {
    //     const newMarkers = {};
    //     const features = map.querySourceFeatures('earthquakes');

    //     // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
    //     // and add it to the map if it's not there already
    //     for (const feature of features) {
    //       const coords = feature.geometry.coordinates;
    //       const props = feature.properties;
    //       if (!props.cluster) continue;
    //       const id = props.cluster_id;

    //       let marker = markers[id];
    //       if (!marker) {
    //         const el = createDonutChart(props);
    //         marker = markers[id] = new mapboxgl.Marker({
    //           element: el
    //         }).setLngLat(coords);
    //       }
    //       newMarkers[id] = marker;

    //       if (!markersOnScreen[id]) marker.addTo(map);
    //     }
    //     // for every marker we've added previously, remove those that are no longer visible
    //     for (const id in markersOnScreen) {
    //       if (!newMarkers[id]) markersOnScreen[id].remove();
    //     }
    //     markersOnScreen = newMarkers;
    //   }

    //   // after the GeoJSON data is loaded, update markers on the screen on every frame
    //   map.on('render', () => {
    //     if (!map.isSourceLoaded('earthquakes')) return;
    //     updateMarkers();
    //   });
    // });

    // // code for creating an SVG donut chart from feature properties
    // function createDonutChart(props) {
    //   const offsets = [];
    //   const counts = [
    //     props.mag1,
    //     props.mag2,
    //     props.mag3,
    //     props.mag4,
    //     props.mag5
    //   ];
    //   let total = 0;
    //   for (const count of counts) {
    //     offsets.push(total);
    //     total += count;
    //   }
    //   const fontSize =
    //     total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    //   const r =
    //     total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    //   const r0 = Math.round(r * 0.6);
    //   const w = r * 2;

    //   let html = `<div>
    //   <svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">`;

    //   for (let i = 0; i < counts.length; i++) {
    //     html += donutSegment(
    //       offsets[i] / total,
    //       (offsets[i] + counts[i]) / total,
    //       r,
    //       r0,
    //       colors[i]
    //     );
    //   }
    //   html += `<circle cx="${r}" cy="${r}" r="${r0}" fill="#212529" />
    //   <text dominant-baseline="central" transform="translate(${r}, ${r})" fill="grey">
    //   ${total.toLocaleString()}
    //   </text>
    //   </svg>
    //   </div>`;

    //   const el = document.createElement('div');
    //   el.innerHTML = html;
    //   return el.firstChild;
    // }

    // function donutSegment(start, end, r, r0, color) {
    //   if (end - start === 1) end -= 0.00001;
    //   const a0 = 2 * Math.PI * (start - 0.25);
    //   const a1 = 2 * Math.PI * (end - 0.25);
    //   const x0 = Math.cos(a0),
    //     y0 = Math.sin(a0);
    //   const x1 = Math.cos(a1),
    //     y1 = Math.sin(a1);
    //   const largeArc = end - start > 0.5 ? 1 : 0;

    //   // draw an SVG path
    //   return `<path d="M ${r + r0 * x0} ${r + r0 * y0} L ${r + r * x0} ${r + r * y0
    //     } A ${r} ${r} 0 ${largeArc} 1 ${r + r * x1} ${r + r * y1} L ${r + r0 * x1
    //     } ${r + r0 * y1} A ${r0} ${r0} 0 ${largeArc} 0 ${r + r0 * x0} ${r + r0 * y0
    //     }" fill="${color}" />`;
    // }

    // // inspect a cluster on click
    // map.on('click', 'clusters', function (e) {
    //   var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
    //   var clusterId = features[0].properties.cluster_id;
    //   map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
    //     if (err)
    //       return;

    //     map.easeTo({
    //       center: features[0].geometry.coordinates,
    //       zoom: zoom
    //     });
    //   });
    // });





    // map.doubleClickZoom.enable();

    // document.getElementById("africa").addEventListener("click", function () {
    //   map.flyTo({
    //     zoom: 3,
    //     center: [3.2, 1.8],
    //     essential: true,
    //   });
    // });

    // document.getElementById("europe").addEventListener("click", function () {
    //   map.flyTo({
    //     zoom: 4,
    //     center: [6, 47],
    //     essential: true,
    //   });
    // });

    // document
    //   .getElementById("northamerica")
    //   .addEventListener("click", function () {
    //     map.flyTo({
    //       zoom: 3,
    //       center: [-120, 45],
    //       essential: true,
    //     });
    //   });

    // document
    //   .getElementById("southamerica")
    //   .addEventListener("click", function () {
    //     map.flyTo({
    //       zoom: 3.5,
    //       center: [-74, -4],
    //       essential: true,
    //     });
    //   });

    // document.getElementById("asia").addEventListener("click", function () {
    //   map.flyTo({
    //     zoom: 3.1,
    //     center: [100, 17],
    //     essential: true,
    //   });
    // });

    // document.getElementById("oceania").addEventListener("click", function () {
    //   map.flyTo({
    //     zoom: 3.7,
    //     center: [131, -28],
    //     essential: true,
    //   });
    // });

    // document.getElementById("global").addEventListener("click", function () {
    //   map.flyTo({
    //     zoom: 1.7,
    //     center: [0, 20],
    //     essential: true,
    //   });
    // });



    // Add navigation control (the +/- zoom buttons)
    // map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




  return (
    <div>

      <div className="sidebarStyle">
        {/* <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div> */}
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
