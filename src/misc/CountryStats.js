import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { COUNTRY_URL } from "../api/api";
import { numberWithCommas } from "../utils/numberWithCommas";



const CountryStats = ({toggleInfo}) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function fetchCountries() {
      try {
        const result = await fetch(COUNTRY_URL);
        const countries = await result.json();
        setCountries([...countries]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCountries();
  }, []);
  const getData = (key) => {
    return countries.map((country) => country[key]);
  };
  const countryLabels = getData("country");

  const colors = [
    "#e76f51",
    "#f4a261",
    "#e9c46a",
    "#2a9d8f",
    "#CD5C5C",
    "#264653",
  ];

  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  return (
    <>
      <a className="congo" onClick={toggleInfo}>
        <h6>{countryLabels[45]}</h6>
        <h6>{round(getData("cases")[45] / 1000) + "k"}</h6>
      </a>

      {/* <Button>
        {countryLabels[10]}
        <br />
        {round(getData("cases")[10] / 1000) + "k"}
      </Button> */}

      <a className="italy" onClick={toggleInfo}>
        <h6>{countryLabels[100]}</h6>
        <h6>{round(getData("cases")[100] / 1000) + "k"}</h6>
      </a>

      <a className="china" onClick={toggleInfo}>
        <h6>{countryLabels[42]}</h6>
        <h6>{round(getData("cases")[42] / 1000) + "k"}</h6>
      </a>

      <a className="japan" onClick={toggleInfo}>
        <h6>{countryLabels[102]}</h6>
        <h6>{round(getData("cases")[102] / 1000) + "k"}</h6>
      </a>

      <a className="iran" onClick={toggleInfo}>
        <h6>{countryLabels[95]}</h6>
        <h6>{round(getData("cases")[95] / 1000) + "k"}</h6>
      </a>

      <a className="brazil" onClick={toggleInfo}>
        <h6>{countryLabels[26]}</h6>
        <h6>{round(getData("cases")[26] / 1000) + "k"}</h6>
      </a>

      <a className="mexico" onClick={toggleInfo}>
        <h6>{countryLabels[130]}</h6>
        <h6>{round(getData("cases")[130] / 1000) + "k"}</h6>
      </a>

      <a className="russia" onClick={toggleInfo}>
        <h6>{countryLabels[160]}</h6>
        <h6>{round(getData("cases")[160] / 1000) + "k"}</h6>
      </a>

      <a className="indi" onClick={toggleInfo}>
        <h6>{countryLabels[93]}</h6>
        <h6>{round(getData("cases")[93] / 1000) + "k"}</h6>
      </a>

      <a className="indo" onClick={toggleInfo}>
        <h6>{countryLabels[94]}</h6>
        <h6>{round(getData("cases")[94] / 1000) + "k"}</h6>
      </a>

      <a className="york" onClick={toggleInfo}>
        <h6>{countryLabels[205]}</h6>
        <h6>{round(getData("cases")[205] / 1000) + "k"}</h6>
      </a>

      <a className="uk" onClick={toggleInfo}>
        <h6>{countryLabels[204]}</h6>
        <h6>{round(getData("cases")[204] / 1000) + "k"}</h6>
      </a>

   

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

export default CountryStats;
