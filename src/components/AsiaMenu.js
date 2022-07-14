import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";



const AsiaMenu = ({ state, toggleAsia }) => {

  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const continentNames = [];
    const deathsPerOneMillion = [];
    const casesPerOneMillion = [];
    const population = [];
    const activePerOneMillion = [];

    async function fetchContinents() {
      try {
        const result = await fetch(CONTINENT_URL);

        const continents = await result.json();
        setContinents([...continents]);
        console.log(continents, 'continents')

        // for (let i = 0; i < continents.length; i++) {
        //   continentNames.push(String(continents[i].continent))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   deathsPerOneMillion.push(String(continents[i].deathsPerOneMillion))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   casesPerOneMillion.push(String(continents[i].casesPerOneMillion))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   population.push(String(continents[i].population))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   activePerOneMillion.push(String(continents[i].activePerOneMillion))
        // }



        // setContinentNames(continentsArray)
        // console.log(continentNames, 'continentNames')
        // console.log(deathsPerOneMillion, 'deathsPerOneMillion')

        // setCountryNames(countryNames)
        // console.log(countryNames, 'countryNames')
        // const africanCountryNames = countries.filter(country.continent === "Africa");
        // console.log(africanCountryNames, 'acn')

      } catch (error) {
        console.log(error);
      }
    }
    fetchContinents();
  }, []);

  const getContinents = (key) => {
    return continents.map((continent) => continent[key]);
  };

  const population = getContinents("population");
 
  const casesMillion = getContinents("casesPerOneMillion");
 
  const activeMillion = getContinents("activePerOneMillion");

  const criticalMillion = getContinents("criticalPerOneMillion");

  const deathsMillion = getContinents("deathsPerOneMillion");

  const testsMillion = getContinents("testsPerOneMillion");
 
  const tests = getContinents("tests");

  const cases = getContinents("cases");

  const deaths = getContinents("deaths");

  const mortality = deaths / cases;




  const [countries, setCountries] = useState([]);

  useEffect(() => {

    const countries = []
    const countryNames = [];

    async function fetchCountries() {
      try {
        const res = await fetch(COUNTRY_URL);

        const countries = await res.json();
        setCountries([...countries]);
        console.log(countries, 'countries')

        for (let i = 0; i < countries.length; i++) {
          countryNames.push(String(countries[i].country))
        }

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
  const countryCases = getData("cases");
  const countryDeaths = getData("deaths");
  const countryActive = getData("active");
  // const casesMillion = getData("casesPerOneMillion");
  // const activeMillion = getData("activePerOneMillion");



  

 

// Filter Countries in Region
  const continentCountries = countries.filter(country => country.continent === 'Asia')
// Map Country Names
  const countryNames = continentCountries.map(selectedCountry => selectedCountry.country.substring(0, 12))
//Map mortality rate for those countries
  const mortalityRate = continentCountries.map(selectedCountry => (((selectedCountry.deathsPerOneMillion / selectedCountry.casesPerOneMillion).toFixed(4))*100) );
// Create strata for classifting cases for doughnut charts
  const lowest = continentCountries.filter(selectedCountry => (selectedCountry.cases < 100000));
  const lower = continentCountries.filter(selectedCountry => ( selectedCountry.cases >= 100000 && selectedCountry.cases < 1000000));
  const average = continentCountries.filter(selectedCountry => ( selectedCountry.cases >= 1000000 && selectedCountry.cases < 2500000));
  const higher = continentCountries.filter(selectedCountry => (  selectedCountry.cases >= 2500000 && selectedCountry.cases < 5000000));
  const highest = continentCountries.filter(selectedCountry => (selectedCountry.cases > 5000000));

  const highnames = continentCountries.map(selectedCountry => (selectedCountry.country));

  console.log(highnames, 'highnames')
  console.log(lowest, 'lowest')
  console.log(average, 'average')


  const backgroundcolor = [];

   for (let i = 0; i < mortalityRate.length; i++) {
    if(mortalityRate[i] < 1.0) { backgroundcolor.push("#444e86") }
    if(mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) { backgroundcolor.push("#955196") }
    if(mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.0) { backgroundcolor.push("#ffa600" ) }
    if(mortalityRate[i] >= 3.0 && mortalityRate[i] < 6.0) { backgroundcolor.push("#dd5182") }
    if(mortalityRate[i] >= 6.0) { backgroundcolor.push("rgb(212, 23, 83)") }
   }


  return (
    <div className={state ? "visible" : "hidden"}>
    <Animated
      animationIn="fadeInLeft"
      animationOut="fadeOut"
      isVisible={true}
    >
      <div className="App-side">
        <div className={!state ? "hidden" : "visible"}>
          <Container>
            <Row className="title" >
              <Col className="px-0">Asia</Col>
              <Col className="App-side-close px-0">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={toggleAsia}
                    size="sm"
                   
                    variant="outline-info"
                    style={{ margin: "5px", padding: "0px 10px 3px 10px"}}
                  >
                    <Animated
                      animationIn="fadeInDown"
                      animationOut="fadeOut"
                      isVisible={true}
                    >
                      <div>x</div>
                    </Animated>
                  </Button>
                  </div>
                  </Col>
            </Row>

            <Row >
              <Col className="pr-0">
                <HorizontalBar
                  height={830}
                  width={200}
                  options={{
                    legend: {
                      display: false,
                      position: ''
                    },
                    title: {
                      display: true,
                      text: 'Mortality in Asia',
                      fontSize: 13
                    },
                    
                  }}
                  data={{
                    labels: countryNames,
                    datasets: [
                      {
                        label: "Mortality Rate",
                        data: mortalityRate ,
                        backgroundColor: backgroundcolor,
                      }
                    ]
                  }}
                />
              </Col>

              <Col >
                <Row className="subtitle">
                  <Col className="box" style={{ color: "#ffa600" }}>Pop <h3>{numberWithCommas((population[1] / 1000000000).toFixed(2))}</h3>billion</Col>
                  <Col className="box" style={{ color: "#ff6e54" }}>Cases<h3>{(casesMillion[1] / 1000).toFixed(1)}</h3><div >/1000</div></Col>
                </Row>
                <Row className="subtitle">
                  <Col className="box" style={{ color: "#dd5182" }}>Active<h3>{(activeMillion[1] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                  <Col className="box" style={{ color: "#955196" }}>Critical<h3>{(criticalMillion[1] / 1000).toFixed(2)}</h3><div >/1000</div></Col>

                </Row>
                <Row className="subtitle">
                  <Col className="box" style={{ color: "#444e86" }}>Deaths<h3>{(deathsMillion[1] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                  <Col className="box" style={{ color: "rgb(45, 182, 130)"}}>Tests<h3>{(tests[1] / population[1]).toFixed(2)}</h3><div >/person</div></Col>
                </Row>

                <Doughnut
                  width={140}
                  options={{
                    // maintainAspectRatio: true,
            
                    title: {
                      display: true,
                      text: 'Cases in Asia',
                      fontSize: 13
                    },
                    elements: {
                      arc: {
                        borderWidth: 0
                      }
                    },
                    legend: {
                      display: false,
                      position: ''
                    },
                  }}
                  data={{
                    labels: ["Lowest Cases", "Lower Cases", "Average Cases", "Higher Cases", "Highest Cases"],
                    datasets: [
                      {
                        data: [lowest.length, lower.length, average.length, higher.length, highest.length],
                        backgroundColor: colorsPie,
                      }
                    ]
                  }}
                />

                <Doughnut
                  width={140}
                  options={{
                    // maintainAspectRatio: true,
                    title: {
                      display: true,
                      text: 'Deaths in Asia',
                      fontSize: 13
                    },
                    elements: {
                      arc: {
                        borderWidth: 0
                      }
                    },
                    legend: {
                      display: false,
                      position: ''
                    }
                  }}
                  data={{
                    labels: ["Lowest", "Lower", "Average", "Higher", "Highest"],
                    datasets: [
                      {
                        data: deathsMillion,
                        backgroundColor: colorsPie,
                      }
                    ]
                  }}
                />

                <Line
                  width={250}
                  height={270}
                  options={{

                    title: {
                      display: true,
                      text: 'Trends in Asia',
                      fontSize: 13
                    },
                    legend: {
                      display: false,
                      position: ''
                    }
                  }}
                  data={{
                    labels: ["Jan", "Apr", "Jul", "Oct"],
                    datasets: [
                      {
                        label: "",
                        data: [100, 40, 50, 5],
                        backgroundColor: "#444e86",
                      }
                    ]
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Animated>
  </div>
  );
};


export default AsiaMenu;


let colors = [
  "rgb(212, 23, 83)"



];

let colorsPie = [
  "#444e86",
  "#955196",
  "#ffa600",
  "#dd5182",
  "rgb(212, 23, 83)",
  "#ff6e54",
  
  // "#003f5c",
  // "#A7226E",
  // "#EC2049",
  // "#F26B38",
  // "#F7DB4F",
  // "#2F9599",
  // "purple",
]
