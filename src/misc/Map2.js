// ES6
import React from "react"
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { showDataOnMap } from '../utils/util';
 
// // ES5
// var ReactMapboxGl = require('react-mapbox-gl');
// var Layer = ReactMapboxGl.Layer;
// var Feature = ReactMapboxGl.Feature;
// require('mapbox-gl/dist/mapbox-gl.css');
 
const Map = ReactMapboxGl({
  accessToken:
  "pk.eyJ1IjoidHJib3QiLCJhIjoiY2s3NmFscm1xMTV0MDNmcXFyOWp1dGhieSJ9.tR2IMHDqBPOf_AeGjHOKFA"
});
 
const Map2 = ({casesType, countries, center, zoom}) => {
    return (
        <>
<Map
  style="mapbox://styles/mapbox/streets-v9"
  center={center} zoom={[zoom]}
  containerStyle={{
    height: '100vh',
    width: '100vw'
  }}
>
  {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
  </Layer> */}
  { showDataOnMap(countries, casesType) }
</Map>
</>
    )

}

export default Map2