import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import { numberWithCommas } from "../utils/numberWithCommas";

import { CONTINENT_URL } from "../api/api";

const ContinentStats = ({toggleInfo}) => {


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

  
 

      
  const icon =  <i className="fa fa-male fa-4x"></i>;




  return (
    <>
      <a
        className="asia"
        onClick={toggleInfo}
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6> {continentLabels[1]}</h6>
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        <div>{icon}</div>
        <div></div>

        <h6>{round(getData("cases")[1] / 1000000) + "m"}</h6>
      </a>

      <a className="southamerica" onClick={toggleInfo}>
        <h6> {continentLabels[2]}</h6>
        {<i style={{ color: "grey" }} className="fa fa-male fa-4x"></i>}
        {<i style={{ color: "grey" }} className="fa fa-male fa-4x"></i>}
        {<i style={{ color: "grey" }} className="fa fa-male fa-4x"></i>}
        {<i style={{ color: "grey" }} className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i style={{ color: "orangered" }} className="fa fa-male fa-4x"></i>}
        <h6>{round(getData("cases")[2] / 1000000) + "m"}</h6>
      </a>

      <a className="europe" onClick={toggleInfo}>
        <h6> {continentLabels[3]}</h6>
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}

        <h6>{round(getData("cases")[3] / 1000000) + "m"}</h6>
      </a>

      <a className="africa" onClick={toggleInfo}>
        <h6> {continentLabels[4]}</h6>
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        <h6>{round(getData("cases")[4] / 1000000) + "m"}</h6>
      </a>

      <a className="oceania" onClick={toggleInfo}>
        <h6> {continentLabels[5]}</h6>
        {<i className="fa fa-male fa-4x"></i>}
        <h6>{round(getData("cases")[5] / 1000000) + "m"}</h6>
      </a>

      <a className="northamerica" onClick={toggleInfo}>
        <h6> {continentLabels[0]}</h6>
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        <h6>{round(getData("cases")[0] / 1000000) + "m"}</h6>
      </a>
      {/* <PieChart
        labels={continentLabels}
        colors={colors}
        data={getData("cases")}
        options={options}
      ></PieChart> */}
      {/* <div>
        <div
          style={{
            width: "55%",
            position: "absolute",
            left: "49.5%",
            top: "13.5%",
            opacity: "0.67",
          }}
        >
         
          <PieChart
            labels={continentLabels}
            colors={colors}
            data={getData("cases")}
            options={options}
          ></PieChart>
        </div>
      </div> */}
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

