import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";
import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";






const SouthAmericaMenu = ({ state, toggleSouthAmerica }) => {

  

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

  const africanCountries = countries.filter(country => country.continent === 'South America')
  const countryNames = africanCountries.map(africanCountry => africanCountry.country.substring(0, 12))

  const casesPerOneMillion = africanCountries.map(africanCountry => africanCountry.casesPerOneMillion / 1000)
  const activePerOneMillion = africanCountries.map(africanCountry => africanCountry.activePerOneMillion / 1000)
  const criticalPerOneMillion = africanCountries.map(africanCountry => africanCountry.criticalPerOneMillion / 1000)
  const deathsPerOneMillion = africanCountries.map(africanCountry => africanCountry.deathsPerOneMillion / 1000)
  const testsPerOneMillion = africanCountries.map(africanCountry => africanCountry.testsPerOneMillion / 1000)


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
                  <Container>
                    <Row className="title">South America</Row>
                    <Row>
                      <Col >
                        <HorizontalBar
                          height={1400}
                          // width={100}
                          options={{
                            maintainAspectRatio: true,
                            legend: {
                              display: true,
                              position: 'bottom'
                            }
                          }}
                          data={{
                            labels: countryNames,
                            datasets: [
                              {
                                label: "Cases per 1000",
                                data: casesPerOneMillion,
                                backgroundColor: "#ffa600",
                              },
                              {
                                label: "Active per 1000",
                                data: activePerOneMillion,
                                backgroundColor: "#ff6e54",
                              },
                              {
                                label: "Critical per 1000",
                                data: criticalPerOneMillion,
                                backgroundColor: "#dd5182",
                              },
                              {
                                label: "Deaths per 1000",
                                data: deathsPerOneMillion,
                                backgroundColor: "#955196",
                              },
                              {
                                label: "CTests per 1000",
                                data: testsPerOneMillion,
                                backgroundColor: "#444e86",
                              }
                            ]
                          }}
                        />
                   


                      </Col>
                      <Col >
                        <Row className="subtitle">
                        
                          <Col className="box" style={{ color: "#ffa600" }}>Pop <h3>{numberWithCommas((population[2] / 1000000).toFixed(0))}</h3>million</Col>
                          <Col className="box" style={{ color: "#ff6e54" }}>Cases<h3>{(casesMillion[2] / 1000).toFixed(0)}</h3><div >/1000</div></Col>
                        </Row>
                        <Row className="subtitle">
                          <Col className="box" style={{ color: "#dd5182" }}>Active<h3>{(activeMillion[2] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                          <Col className="box" style={{ color: "#955196" }}>Critical<h3>{(criticalMillion[2] / 1000).toFixed(2)}</h3><div >/1000</div></Col>

                        </Row>
                        <Row className="subtitle">
                          <Col className="box" style={{ color: "#444e86" }}>Deaths<h3>{(deathsMillion[2] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                          <Col className="box" style={{ color: "rgb(212, 23, 83)" }}>Tests<h3>{(tests[2] / population[2]).toFixed(2)}</h3><div >/person</div></Col>
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

                        {/* <HorizontalBar
                          width={250}
                          height={200}
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
                        /> */}
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
};


export default SouthAmericaMenu;


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

