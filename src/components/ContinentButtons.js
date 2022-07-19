import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ContinentButtons = ({toggleAsia, toggleEurope, toggleOceania, toggleNorthAmerica, toggleSouthAmerica, toggleAfrica, toggleGlobal}) => {
 
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
        variant="outline-info"
      >
        <h6>Asia</h6>
      </Button>
      <Button
        className="europe button"
        onClick={toggleEurope}
        id="europe"
        variant="outline-info"
      >
        <h6>Europe</h6>
      </Button>
      <Button
        className="northamerica button"
        onClick={toggleNorthAmerica}
        id="northamerica"
        variant="outline-info"
      >
        <h6>North America</h6>
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
        id="southamerica"
        variant="outline-info"
      >
        <h6>South America</h6>
      </Button>
      <Button
        className="oceania button"
        onClick={toggleOceania}
        id="oceania"
        variant="outline-info"
      >
        <h6>
          Oceania
        </h6>
      </Button>
      <Button
        className="global button"
        onClick={toggleGlobal}
        id="global"
        variant="outline-info"
      >
        <h6>
        {/* <i className="fa fa-info-circle"></i> */}
          Global
        </h6>
      </Button>
    </div>
  );
};

export default ContinentButtons;

