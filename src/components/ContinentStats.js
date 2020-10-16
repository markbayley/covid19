import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";

import { CONTINENT_URL } from "../api/api";

// import Continent from "./Continent";


const ContinentStats = () => {
  const mode = localStorage.getItem("mode");
  const options = {
    gridColor: mode === "light-mode" ? "aqua" : "aqua",
    fontColor: mode === "light-mode" ? "aqua" : "aqua",
  };

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
  const continentLabels = getData("continent".replace("/", " "));

  const colors = [
    "#e76f51",
    "#f4a261",
    "#e9c46a",
    "#2a9d8f",
    "#CD5C5C",
    "#264653",
  ];
  return (
    <>
       <div>
        <div style={{ width: "55%", position: "absolute", left: "49.5%", top: "13.5%", opacity: "0.67" }}>
          {/* <h5>{"casesByContinent"}</h5> */}
          <PieChart
            labels={continentLabels}
            colors={colors}
            data={getData("cases")}
            options={options}
          ></PieChart>
        </div>
      </div>
      {/* <div>
        <div style={{ width: "100%" }}>
          <Continent
            labels={continentLabels}
            colors={colors}
            data={getData("cases")}
          ></Continent>
        </div>
      </div> */}
    </>
  );
};

export default ContinentStats;

