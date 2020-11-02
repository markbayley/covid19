import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import { numberWithCommas } from "../utils/numberWithCommas";

import { CONTINENT_URL } from "../api/api";
import { Button } from "react-bootstrap";
import AsiaMenu from "./AsiaMenu";
import EuropeMenu from "./EuropeMenu";
import AfricaMenu from "./AfricaMenu";
import OceaniaMenu from "./OceaniaMenu";
import NorthAmericaMenu from "./NorthAmericaMenu";
import SouthAmericaMenu from "./SouthAmericaMenu";

const SideBarMenus = ({
  toggleAsia,
  toggleEurope,
  toggleOceania,
  toggleNorthAmerica,
  toggleSouthAmerica,
  toggleAfrica,
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
  const continentCases = getData("cases");
  console.log("CC", continentCases);

  const colors = [
    "#e76f51",
    "#f4a261",
    "#e9c46a",
    "#2a9d8f",
    "#CD5C5C",
    "#264653",
  ];

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 2);
    return Math.round(value * multiplier) / multiplier;
  };

  return (
    <div>
      <AsiaMenu
        state={this.state.asia}
        toggleAsia={this.toggleAsia}
        name="Asia"
      />
      <EuropeMenu state={this.state.europe} toggleEurope={this.toggleEurope} />
      <AfricaMenu state={this.state.africa} toggleAfrica={this.toggleAfrica} />
      <OceaniaMenu
        state={this.state.oceania}
        toggleOceania={this.toggleOceania}
      />
      <NorthAmericaMenu
        state={this.state.northamerica}
        toggleNorthAmerica={this.toggleNorthAmerica}
      />
      <SouthAmericaMenu
        state={this.state.southamerica}
        toggleSouthAmerica={this.toggleSouthAmerica}
      />
    </div>
  );
};

export default SideBarMenus;
