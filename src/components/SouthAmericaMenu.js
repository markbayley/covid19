import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";
import { Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";
import { Fetch, getContinents } from '../api/Fetch'

const SouthAmericanMenu = ({ state, toggleEurope, region, index, 
  population,
  casesMillion, 
  activeMillion, 
  criticalMillion, 
  deathsMillion, 
  testsMillion,
  tests, countries, 
  populationCountry,
  casesCountry,
  activeCountry,
  criticalCountry,
  deathsCountry,
  testsCountry,
}) => {

    //Filter Countries in Region
    const continentCountries = countries.filter(country => country.continent === region)
    //Map Country Names
    const countryNames = continentCountries.map(selectedCountry => selectedCountry.country.substring(0, 12))
    //Map Mortality for Countries
    const mortalityRate = continentCountries.map(selectedCountry => (((selectedCountry.deathsPerOneMillion / selectedCountry.casesPerOneMillion).toFixed(4)) * 100));

    // Create Strata for Cases
    const lowest = continentCountries.filter(selectedCountry => (selectedCountry.cases < 10000));
    const lower = continentCountries.filter(selectedCountry => (selectedCountry.cases >= 10000 && selectedCountry.cases < 500000));
    const average = continentCountries.filter(selectedCountry => (selectedCountry.cases >= 500000 && selectedCountry.cases < 2500000));
    const higher = continentCountries.filter(selectedCountry => (selectedCountry.cases >= 2500000 && selectedCountry.cases < 5000000));
    const highest = continentCountries.filter(selectedCountry => (selectedCountry.cases > 5000000));

    //Asign Colors to Strata
    const backgroundcolor = [];
    for (let i = 0; i < mortalityRate.length; i++) {
        if (mortalityRate[i] < 1.0) { backgroundcolor.push("#444e86") }
        if (mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) { backgroundcolor.push("#955196") }
        if (mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.0) { backgroundcolor.push("#ffa600") }
        if (mortalityRate[i] >= 3.0 && mortalityRate[i] < 6.0) { backgroundcolor.push("#dd5182") }
        if (mortalityRate[i] >= 6.0) { backgroundcolor.push("rgb(212, 23, 83)") }
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
                <Col className="px-0">{region}</Col>
                <Col className="App-side-close px-0">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={toggleEurope}
                      size="lg"

                      variant="outline-info"
                      style={{ margin: "5px", padding: "0px 10px 3px 10px" }}
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
                          text: 'Mortality Rate',
                          fontSize: 13
                        },

                      }}
                      data={{
                        labels: countryNames,
                        datasets: [
                          {
                            label: "Mortality Rate",
                            data: mortalityRate,
                            backgroundColor: backgroundcolor,
                          }
                        ]
                      }}
                    />
                {/* <HorizontalBar
                          height={800}
                          width={200}
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
                                data: casesCountry,
                                backgroundColor: "#ffa600",
                              },
                              {
                                label: "Active per 1000",
                                data: activeCountry,
                                backgroundColor: "#ff6e54",
                              },
                              {
                                label: "Critical per 1000",
                                data: criticalCountry,
                                backgroundColor: "#dd5182",
                              },
                              {
                                label: "Deaths per 1000",
                                data: deathsCountry,
                                backgroundColor: "#955196",
                              },
                              {
                                label: "CTests per 1000",
                                data: testsCountry,
                                backgroundColor: "#444e86",
                              }
                            ]
                          }}
                        /> */}
                </Col>

                <Col >
                  <Row className="subtitle">
                    <Col className="box" style={{ color: "#ffa600" }}>Pop <h3>{numberWithCommas(((population[index]) / 1000000).toFixed(0))}</h3>million</Col>
                    <Col className="box" style={{ color: "#ff6e54" }}>Cases<h3>{(casesMillion[index] / 1000).toFixed(0)}</h3><div >/1000</div></Col>
                  </Row>
                  <Row className="subtitle">
                    <Col className="box" style={{ color: "#dd5182" }}>Active<h3>{(activeMillion[index] / 1000).toFixed(1)}</h3><div >/1000</div></Col>
                    <Col className="box" style={{ color: "#955196" }}>Critical<h3>{(criticalMillion[index] / 1000).toFixed(2)}</h3><div >/1000</div></Col>

                  </Row>
                  <Row className="subtitle">
                    <Col className="box" style={{ color: "#444e86" }}>Deaths<h3>{(deathsMillion[index] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                    <Col className="box" style={{ color: "rgb(45, 182, 130)" }}>Tests<h3>{(tests[index] / population[index]).toFixed(2)}</h3><div >/person</div></Col>
                  </Row>

                  <Doughnut
                    width={140}
                    options={{
                      // maintainAspectRatio: true,

                      title: {
                        display: true,
                        text: 'Cases in ' + region,
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
                        text: 'Deaths in ' + region,
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
                          text: 'Trends in ' + region,
                          fontSize: 13
                        },
                        legend: {
                          display: false,
                          position: ''
                        }
                      }}
                      data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                        datasets: [
                          {
                            label: "First dataset",
                            data: [33, 53, 85, 41, 44, 65],
                            fill: true,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                          },
                          {
                            label: "Second dataset",
                            data: [33, 25, 35, 51, 54, 76],
                            fill: false,
                            borderColor: "#742774"
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


export default SouthAmericanMenu;





let colorsPie = [
  "#444e86",
  "#955196",
  "#ffa600",
  "#ff6e54",
  "#dd5182",


  "rgb(212, 23, 83)",

  // "#003f5c",
  // "#A7226E",
  // "#EC2049",
  // "#F26B38",
  // "#F7DB4F",
  // "#2F9599",
  // "purple",
]
