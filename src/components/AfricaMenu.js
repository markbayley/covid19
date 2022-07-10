import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";

const AfricaMenu = ({ state, toggleAfrica }) => {
  const [casesAfrica, setCasesAfrica] = useState([]);
  const [cases, setCases] = useState([]);
  const [list, setContinentNames] = useState([]);

  const [countries, setCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  // const [continents, setContinents] = useState([]);
  useEffect(() => {
    // const continentsArray = [];
    const countries = []
    const countryNames = [];
    async function fetchCountries() {
      try {
        // const result = await fetch(CONTINENT_URL);
        const res = await fetch(COUNTRY_URL);

        // const continents = await result.json();
        // setContinents([...continents]);
        // console.log(continents, 'continents')

        const countries = await res.json();
        setCountries([...countries]);
        console.log(countries, 'countries')

        // for (let i = 0; i < continents.length; i++) {
        //   continentsArray.push(String(continents[i].continent))
        // }
        for (let i = 0; i < countries.length; i++) {
          countryNames.push(String(countries[i].country))
        }


        // setContinentNames(continentsArray)
        // console.log(continentsArray, 'continentsArray')
        // setCountryNames(countryNames)
        // console.log(countryNames, 'countryNames')
        // const africanCountryNames = countries.filter(country.continent === "Africa");
        // console.log(africanCountryNames, 'acn')

      } catch (error) {
        console.log(error);
      }
    }
    // fetchContinents();
    fetchCountries();
  }, []);
  // const getData = (key) => {
  //   return continents.map((continent) => continent[key]);
  // };

  const getData = (key) => {
    return countries.map((country) => country[key]);
  };

  const countryLabels = getData("country");
  const countryCases = getData("cases");
  const countryDeaths = getData("deaths");
  const countryActive = getData("active");
  const casesMillion = getData("casesPerOneMillion");
  const activeMillion = getData("activePerOneMillion");
  const deathsMillion = getData("deathsPerOneMillion");


  const africanCountries = countries.filter(country => country.continent === 'Africa')

  const africanCountryNames = africanCountries.map(africanCountry => africanCountry.country.substring(0, 10))

  const africanCases = africanCountries.map(africanCountry => africanCountry.casesPerOneMillion)

  console.log(africanCountryNames, 'africanCountryNames')

  console.log(africanCountries, 'affricanCountries')

  console.log(countryLabels, 'countryLabels')

  console.log(africanCases, 'africanCases')


  // const continentCountries = getData("countries");
  // console.log(continentCountries, 'continentCountries')


  return (
    <>
      <div className={state ? "visible" : "hidden"}>
        <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <div className="App-side">
            <div className="App-side-menu">

              <div className={!state ? "hidden" : "visible"}>
                <div className="App-side-button">
                  {/* <h4 style={{ color: "cyan" }}>Africa
                  </h4> */}



                  <HorizontalBar

                    height={490}

                    options={{ maintainAspectRatio: true }}
                    data={{
                      labels: africanCountryNames,
                      datasets: [
                        {
                          label: "Cases per Million",
                          data: africanCases,
                          backgroundColor: colors,
                        }
                      ]
                    }}

                  />
                  {/* <p>
                    Hover over the chart to view more details.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
};


export default AfricaMenu;


let colors = [

  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",


];

