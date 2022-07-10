import React, { useState, useEffect } from "react";
import { CONTINENT_URL } from "../api/api";
import { Button } from "react-bootstrap";

const ContinentStats = ({toggleAsia, toggleEurope, toggleOceania, toggleNorthAmerica, toggleSouthAmerica, toggleAfrica, toggleGlobal}) => {


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
  // console.log('CC', continentCases);

  const cases = continentCases;

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
    <div
      style={{
        right: "110px",
        height: "100vh",
        position: "absolute",
      }}
    >
  
      <Button
        className="asia button"
        id="asia"
        onClick={toggleAsia}
        // size="md"
        variant="outline-info"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>Asia</h6>
        {/* {continentCases[1]} */}
      </Button>

      <Button
        className="europe button"
        onClick={toggleEurope}
        // size="sm"
        id="europe"
        variant="outline-info"
      >
        <h6>Europe</h6>
        {/* {continentCases[3]} */}
      </Button>

      <Button
        className="northamerica button"
        onClick={toggleNorthAmerica}
        // size="md"
        id="northamerica"
        variant="outline-info"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>North America</h6>
        {/* {continentCases[0]} */}
      </Button>

      <Button
        className="africa button"
        onClick={toggleAfrica}
        // size="md"
        id="africa"
        variant="outline-info"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>Africa</h6>
        {/* {continentCases[0]} */}
      </Button>
     

      <Button
        className="southamerica button"
        onClick={toggleSouthAmerica}
        // size="md"
        id="southamerica"
        variant="outline-info"
        // color="info"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>South America</h6>
        {/* {continentCases[0]} */}
      </Button>

      <Button
        className="oceania button"
        onClick={toggleOceania}
        // size="md"
        id="oceania"
        // variant="outline-info"
        variant="outline-info"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>
          {/* <i className="fa fa-info-circle"></i> */}
          Oceania
        </h6>
        {/* {continentCases[0]} */}
      </Button>

      <Button
        className="global button"
        onClick={toggleGlobal}
        // size="md"
        id="global"
        // variant="outline-info"
        variant="outline-info"
        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
      >
        <h6>
          {/* <i className="fa fa-info-circle"></i> */}
          Global
        </h6>
        {/* {continentCases[0]} */}
      </Button>

      {/* <SouthAmericaMenu
        labels={continentLabels}
        // colors={colors}
        data={getData("cases")}
      ></SouthAmericaMenu> */}

      {/* <a className="europe" id="europe" onClick={toggleInfo}>
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
      </a> */}
      {/* <a className="southamerica" id="southamerica" onClick={toggleInfo}>
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
      </a> */}

      {/* <a className="africa" id="africa" onClick={toggleInfo}>
        <h6> {continentLabels[4]}</h6>
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        <h6>{round(getData("cases")[4] / 1000000) + "m"}</h6>
      </a>
      <a className="oceania" id="oceania" onClick={toggleInfo}>
        <h6> Oceania</h6>
        {<i className="fa fa-male fa-4x"></i>}
        <h6>{round(getData("cases")[5] / 1000000) + "m"}</h6>
      </a> */}
      {/* <a className="northamerica" id="northamerica" onClick={toggleInfo}>
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
      </a> */}
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
    </div>
 
  );
};

export default ContinentStats;

