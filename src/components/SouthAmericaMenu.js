import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";
import ContinentStats from "./ContinentStats";
import { numberWithCommas } from "../utils/numberWithCommas";

import { CONTINENT_URL } from "../api/api";

import Covid from "./Covid";
import DataTable from "./DataTable";

const SouthAmericaMenu = ({ state, toggleSouthAmerica }) => {

      const [continents, setContinents] = useState([]);
      useEffect(() => {
        async function fetchContinents() {
          try {
            const result = await fetch(CONTINENT_URL);
            const continents = await result.json();
            setContinents([...continents]);
          } catch (error) {
            console.log(error);
          }
        }
        fetchContinents();
      }, []);
      const getData = (key) => {
        return continents.map((continent) => continent[key]);
      };
      const continentLabels = getData("continent");
      const continentCases = getData("cases");
       const continentDeaths = getData("deaths");
        const continentActive = getData("active");
 
  return (
    <>
      <div className={state ? "visible" : "hidden"}>
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOut"
          isVisible={true}
        >
          <div className="App-side">
            <div className="App-side-menu">
              <Button
                onClick={toggleSouthAmerica}
                size="sm"
                variant="outline-light"
                className="App-side-close"
              >
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <div>x</div>
                </Animated>
              </Button>
              <div className={!state ? "hidden" : "visible"}>
                <div className="App-side-button">
                  <h4>South America</h4>
               
                  <h5>
                    {numberWithCommas(continentCases[3])} Cases
                    <br />
                    {numberWithCommas(continentActive[3])} Active
                    <br />
                    {numberWithCommas(continentDeaths[3])} Deaths
                  </h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
};


export default SouthAmericaMenu;
