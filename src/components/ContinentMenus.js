import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Animated } from "react-animated-css";

import { CONTINENT_URL } from "../api/api";
import { Button } from "react-bootstrap";

import SouthAmericaMenu from "./SouthAmericaMenu";
import Menu from "./Menu";
import "./SideMenu.scss";

const ContinentMenus = ({ 
  props,
  state,
  toggleAsia,
  toggleEurope,
  toggleOceania,
  toggleNorthAmerica,
  toggleSouthAmerica,
  toggleAfrica,
  toggleGlobal,
}) => {
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
 



  return (
    <div className={state ? "visible" : "hidden"}>
      <Menu
        labels={continentLabels}
        data={getData("cases")}
        // state={props.state}
        toggleGlobal={toggleGlobal}
        name="Global"
      ></Menu>

      <Button
        className="asia button"
        id="asia"
        onClick={toggleGlobal}
        size="md"
        variant="dark"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>{continentLabels[1]}</h6>
        {getData("cases")[1]}
      </Button>
    </div>
  );
};

export default ContinentMenus;
