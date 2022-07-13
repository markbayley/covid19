import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";



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


  const africanCountries = countries.filter(country => country.continent === 'Asia')

  const countryNames = africanCountries.map(africanCountry => africanCountry.country.substring(0, 12))

  const casesPerOneMillion = africanCountries.map(africanCountry => africanCountry.casesPerOneMillion / 1000)




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
                  height={890}
                  width={200}
                  options={{
                    legend: {
                      display: false,
                      position: ''
                    }
                  }}
                  data={{
                    labels: countryNames,
                    datasets: [
                      {
                        label: "",
                        data: casesPerOneMillion,
                        backgroundColor: colors,
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
                  <Col className="box" style={{ color: "#444e86" }}>Deaths<h3>{(deathsMillion[1] / 10000).toFixed(2)}%</h3><div >/100</div></Col>
                  <Col className="box" style={{ color: "rgb(45, 182, 130)"}}>Tests<h3>{(tests[1] / population[1]).toFixed(2)}</h3><div >/person</div></Col>
                </Row>

                <Doughnut
                  width={130}
                  options={{
                    // maintainAspectRatio: true,
                    title: {
                      display: true,
                      text: 'Deaths per million',
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
                    labels: ["Population", "Tests", "Cases", "Active", "Critical", "Deaths"],
                    datasets: [
                      {
                        data: deathsMillion,
                        backgroundColor: colorsPie,
                      }
                    ]
                  }}
                />

                <Doughnut
                  width={130}
                  options={{
                    // maintainAspectRatio: true,
                    title: {
                      display: true,
                      text: 'Deaths per million',
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
                    labels: ["Population", "Tests", "Cases", "Active", "Critical", "Deaths"],
                    datasets: [
                      {
                        data: deathsMillion,
                        backgroundColor: colorsPie,
                      }
                    ]
                  }}
                />

                <HorizontalBar
                  width={250}
                  height={100}
                  options={{

                    title: {
                      display: true,
                      text: 'Deaths per age',
                      fontSize: 13
                    },
                    legend: {
                      display: false,
                      position: ''
                    }
                  }}
                  data={{
                    labels: ["Pop", "Tests", "Cases"],
                    datasets: [
                      {
                        label: "",
                        data: [100, 40, 50],
                        backgroundColor: colorsPie,
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

  // "#2F9599",
  // "#2F9599",
  // "#2F9599",
  // "#2F9599",
  // "#2F9599",
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

let colorsPie = [
  "#ffa600",
  "#ff6e54",
  "#dd5182",
  "#955196",
  "#444e86",


  "rgb(212, 23, 83)",



  // "#003f5c",
  // "#A7226E",
  // "#EC2049",
  // "#F26B38",
  // "#F7DB4F",
  // "#2F9599",
  // "purple",
]
