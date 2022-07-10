import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ContinentStats from '../components/ContinentStats'
import './Overlay.scss'


 class Overlay extends Component {
    render() {
        return (
          <>
            <svg className="atom" viewBox="0 0 100 100">
              <defs>
                <filter id="blur" x="-10" y="-10" width="120" height="120">
                  <feGaussianBlur in="SourceGraphic" stdDeviation=".4" />
                </filter>
                <filter id="blur2" x="-10" y="-10" width="120" height="120">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
              </defs>

              <g className="lines">
                <path className="" ></path>
              </g>
              <g className="electronTails" filter="url(#blur)">
                <path
                  className="tail tail3"
                  d="M 125,95 115,85 95,75  73.13,66.32 70.63,66.24 67.49,65.67 63.83,64.62 59.74,63.13 55.36,61.23 50.82,59 46.25,56.5 41.8,53.79 37.59,50.97 33.76,48.13 30.43,45.33 27.69,42.68 25.63,40.26 24.3,38.13 23.76,36.36 24.02,35 "
                ></path>
              </g>
              <g className="electrons">
                <path
                  className="electron electron3"
                  d="M 125,95 115,85 95,75   73.13,66.32 70.63,66.24 67.49,65.67 63.83,64.62 59.74,63.13 55.36,61.23 50.82,59 46.25,56.5 41.8,53.79 37.59,50.97 33.76,48.13 30.43,45.33 27.69,42.68 25.63,40.26 24.3,38.13 23.76,36.36 24.02,35 "
                ></path>
              </g>
            </svg>

            <svg className="atom2" viewBox="0 0 100 100">
              <defs>
                <filter id="blur" x="-10" y="-10" width="120" height="120">
                  <feGaussianBlur in="SourceGraphic" stdDeviation=".4" />
                </filter>
                <filter id="blur2" x="-10" y="-10" width="120" height="120">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
              </defs>

              <g className="lines">
                <path className="" ></path>
              </g>
              <g className="electronTails" filter="url(#blur)">
                <path
                  className="tail tail3"
                  d="M -10,100 -60,120 -100,90 -95,75 -80,52 -75,49 -70,46.5 -65,44 -60,42    -55,41 -50,40 -45,39.5 -40,39 -35,39 -30,40  -25,41 -20,44     -10,50  0,60 30,65 85,70  "
                ></path>
              </g>
              <g className="electrons">
                <path
                  className="electron electron3"
                  d="M -10,100 -60,120 -100,90 -95,75 -80,52 -75,49 -70,46.5 -65,44 -60,42    -55,41 -50,40 -45,39.5 -40,39 -35,39 -30,40  -25,41 -20,44     -10,50  0,60 30,65 85,70  "
                ></path>
              </g>
            </svg>

            {/* <ContinentStats /> */}
            {/* <a className="china" href="#"></a>
            <a className="italy" href="#"></a>
            <a className="japan" href="#"></a> */}
         

            <a
              className="mexico"
              href="#"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {/* <i class="fa fa-male"></i>
            <i class="fa fa-male"></i> */}
            </a>
            <a
              className="brazil"
              href="#"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {/* <i class="fa fa-male"></i> */}
              {/* <i class="fa fa-male"></i> */}
            </a>
            <a className="congo"> </a>
            <a className="indo" href="#"></a>
            <a className="indi" href="#"></a>

            {/* <a className="york" href="#"></a>
            <a className="uk" href="#"></a>

            <a className="russia" href="#"></a> */}
          </>
        );
    }
}

export default Overlay
