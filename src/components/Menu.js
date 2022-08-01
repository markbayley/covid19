import React, { useState, useRef, MouseEvent, useEffect } from "react";
import { InteractionItem } from "chart.js";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Doughnut, Bar, HorizontalBar, Line, Polar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faCircleUp,
  faCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import TabsComponent from "../misc/TabsComponent";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import CountUp from "react-countup";
import { getElementAtEvent } from "react-chartjs-2";
import usePrevious from "./../utils/usePrevious,js";

const Menu = ({
  countries,
  region,
  index,
  open,
  casesMillion,
  activeMillion,
  criticalMillion,
  deathsMillion,
  testsMillion,
  recoveredMillion,
  tests,
  deaths,
  critical,
  active,
  recovered,
  population,
  todayCases,
  todayDeaths,
  todayRecovered,
  handleClose,
}) => {
  //    let active = (activeMillion[index] /1000).toFixed(2);
  // Filter Countries in Region
  const continentCountries = countries.filter(
    (country) => country.continent === region
  );
  // Map Country Names && country.population > 1000000
  const countryNames = countries
    .filter(
      (country) => country.continent === region && country.country.length <= 12
    )
    .map((selectedCountry) => selectedCountry.country);
  //Map mortality rate for those countries
  const casesPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.casesPerOneMillion / 1000).toFixed(1)
  );
  const deathsPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.deathsPerOneMillion / 1000).toFixed(2)
  );
  const mortalityRate = continentCountries.map((selectedCountry) =>
    (
      (selectedCountry.deathsPerOneMillion /
        selectedCountry.casesPerOneMillion) *
      100
    ).toFixed(2)
  );
  const activePerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.activePerOneMillion / 1000).toFixed(2)
  );
  const criticalPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.criticalPerOneMillion / 1000).toFixed(2)
  );
  const testsPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.testsPerOneMillion / 1000).toFixed(2)
  );
  const recoveredPerOneMillion = continentCountries.map((selectedCountry) =>
  (selectedCountry.recoveredPerOneMillion / 1000).toFixed(2)
);
  // Create strata for classifting cases for doughnut charts
  const lowest = continentCountries.filter(
    (selectedCountry) => selectedCountry.casesPerOneMillion / 1000 < 50
  );
  const lower = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 50 &&
      selectedCountry.casesPerOneMillion / 1000 < 100
  );
  const average = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 100 &&
      selectedCountry.casesPerOneMillion / 1000 < 150
  );
  const higher = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 150 &&
      selectedCountry.casesPerOneMillion / 1000 < 350
  );
  const highest = continentCountries.filter(
    (selectedCountry) => selectedCountry.casesPerOneMillion / 1000 > 350
  );

  // Create Strata for Deaths
  const mild = continentCountries.filter(
    (selectedCountry) => selectedCountry.deathsPerOneMillion / 1000 < 0.5
  );
  const contained = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 0.5 &&
      selectedCountry.deathsPerOneMillion / 1000 < 1
  );
  const moderate = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 1 &&
      selectedCountry.deathsPerOneMillion / 1000 < 1.5
  );
  const serious = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 1.5 &&
      selectedCountry.deathsPerOneMillion / 1000 < 2.5
  );
  const extreme = continentCountries.filter(
    (selectedCountry) => selectedCountry.deathsPerOneMillion / 1000 > 2.5
  );

  // Create Strata for Active
  const active1 = continentCountries.filter(
    (selectedCountry) => selectedCountry.activePerOneMillion / 1000 < 5
  );
  const active2 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 5 &&
      selectedCountry.activePerOneMillion / 1000 < 10
  );
  const active3 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 10 &&
      selectedCountry.activePerOneMillion / 1000 < 15
  );
  const active4 = continentCountries.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 15 &&
      selectedCountry.activePerOneMillion / 1000 < 25
  );
  const active5 = continentCountries.filter(
    (selectedCountry) => selectedCountry.activePerOneMillion / 1000 > 25
  );

  const colorCases = [];
  for (let i = 0; i < casesPerOneMillion.length; i++) {
    if (casesPerOneMillion[i] < 50) {
      colorCases.push("#444e86");
    }
    if (casesPerOneMillion[i] >= 50 && casesPerOneMillion[i] < 100) {
      colorCases.push("#955196");
    }
    if (casesPerOneMillion[i] >= 100 && casesPerOneMillion[i] < 150) {
      colorCases.push("#ffa600");
    }
    if (casesPerOneMillion[i] >= 150 && casesPerOneMillion[i] < 350) {
      colorCases.push("#ff6e54");
    }
    if (casesPerOneMillion[i] >= 350) {
      colorCases.push("#dd5182");
    }
  }

  const colorDeaths = [];
  for (let i = 0; i < deathsPerOneMillion.length; i++) {
    if (deathsPerOneMillion[i] < 0.5) {
      colorDeaths.push("#444e86");
    }
    if (deathsPerOneMillion[i] >= 0.5 && deathsPerOneMillion[i] < 1) {
      colorDeaths.push("#955196");
    }
    if (deathsPerOneMillion[i] >= 1 && deathsPerOneMillion[i] < 1.5) {
      colorDeaths.push("#ffa600");
    }
    if (deathsPerOneMillion[i] >= 1.5 && deathsPerOneMillion[i] < 2.5) {
      colorDeaths.push("#ff6e54");
    }
    if (deathsPerOneMillion[i] >= 2.5) {
      colorDeaths.push("#dd5182");
    }
  }

  const colorActive = [];
  for (let i = 0; i < activePerOneMillion.length; i++) {
    if (activePerOneMillion[i] < 5) {
      colorActive.push("#444e86");
    }
    if (activePerOneMillion[i] >= 5 && activePerOneMillion[i] < 10) {
      colorActive.push("#955196");
    }
    if (activePerOneMillion[i] >= 10 && activePerOneMillion[i] < 15) {
      colorActive.push("#ffa600");
    }
    if (activePerOneMillion[i] >= 15 && activePerOneMillion[i] < 25) {
      colorActive.push("#ff6e54");
    }
    if (activePerOneMillion[i] >= 25) {
      colorActive.push("#dd5182");
    }
  }

  const backgroundcolor = [];
  for (let i = 0; i < mortalityRate.length; i++) {
    if (mortalityRate[i] < 1.0) {
      backgroundcolor.push("#444e86");
    }
    if (mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) {
      backgroundcolor.push("#955196");
    }
    if (mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.5) {
      backgroundcolor.push("#ffa600");
    }
    if (mortalityRate[i] >= 3.5 && mortalityRate[i] < 6.0) {
      backgroundcolor.push("#ff6e54");
    }
    if (mortalityRate[i] >= 6.0) {
      backgroundcolor.push("#dd5182");
    }
  }

  const chartRef = useRef(null);

  console.log(mortalityRate[index], 'mrindex')

  const tabItems = [
    {
      id: 1,
      title: "Cases",
      content: (
        <>
          <Row style={{ height: "86vh" }}>
            <Col className="mr-3 mt-2">
              <Row className="box px-4 py-2 ml-1 mb-0" style={{ color: "#ccc" }}>
                <h1 className="mb-0">
                  {/* <CountUp
                    start={(casesMillion[index] / 1000).toFixed(1) - 5}
                    end={(casesMillion[index] / 1000).toFixed(1)}
                    duration={0.2}
                    separator=","
                    decimals={1}
                  /> */}
                  {(casesMillion[index] / 1000).toFixed(1)}
                  {casesPerOneMillion[0] / 1000 <=
                  casesPerOneMillion[5] / 1000 ? (
                    <i style={{fontSize: "0.7em", color: "green"}} className="fa fa-arrow-up"></i>
                  ) : (
                    <i style={{fontSize: "0.7em", color: "red"}} className="fa fa-arrow-down"></i>
                  )}
                </h1>

                <h5>Cases / 1000</h5>
              </Row>

              <Row
                className={"box ml-1 mt-3 pb-2"}
                style={{
                  color: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="pt-5"
                  style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#ccc",
                  }}
                >
                  {casesMillion[index] / 1000 < 25 ? (
                    <h6>Mild</h6>
                  ) : casesMillion[index] / 1000 < 100 ? (
                    <h6>Limited</h6>
                  ) : casesMillion[index] / 1000 < 200 ? (
                    <h6>Moderate</h6>
                  ) : casesMillion[index] / 1000 < 300 ? (
                    <h6>Serious</h6>
                  ) : (
                    <h6>Extreme</h6>
                  )}
                </div>

                <div
                  className="py-2 "
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Country Analysis
                </div>

                <Doughnut
                  width={170}
                  options={{
                    elements: {
                      arc: {
                        borderWidth: 0,
                      },
                    },
                    legend: {
                      display: false,
                      position: "",
                    },
                  }}
                  data={{
                    labels: [
                      "Lowest Cases",
                      "Lower Cases",
                      "Average Cases",
                      "Higher Cases",
                      "Highest Cases",
                    ],
                    datasets: [
                      {
                        data: [
                          lowest.length,
                          lower.length,
                          average.length,
                          higher.length,
                          highest.length,
                        ],
                        backgroundColor: colorsPie,
                      },
                    ],
                  }}
                ></Doughnut>
              </Row>

              <Row className="subtitle box pt-1 ml-1 mt-3">
                <div
                  className="pt-1 pb-1 ml-0"
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Cases Trend
                </div>
                <Line
                  width={160}
                  height={110}
                  options={{
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  }}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Cases / 1000",
                        data: casesPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                      },
                    ],
                  }}
                />
              </Row>

              <div
                className="pt-3 pb-3 ml-4"
                style={{ color: "grey", fontSize: "14px" }}
              >
                Cases Statistics
              </div>
              <Row className="subtitle ml-1">
                <Col className="box px-2 py-3 mr-1">
                  Active
                  {(activeMillion[index] / casesMillion[index]) * 100 <= 2.5 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (activeMillion[index] / casesMillion[index]) * 100 >=
                    4.5 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {(
                      (activeMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>
                <Col className="box px-3 pt-3 pb-4  ml-1">
        
                 Today
                  {(criticalMillion[index] / casesMillion[index]) * 100 <=
                  0.005 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (criticalMillion[index] / casesMillion[index]) * 100 >=
                    0.015 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">+
                    {
                      (numberWithCommas((todayCases[index]/1000).toFixed(0) + 'k'))
                    } 
                  </strong>
                </Col>
              </Row>
              <Row className="subtitle ml-0">
                <Col className="box p-2  mr-1 mt-3">
                  {/* Deaths
                  {(deathsMillion[index] / casesMillion[index]) * 100 <= 1.0 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (deathsMillion[index] / casesMillion[index]) * 100 >=
                    2.0 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <div className="mb-0">
                    {(
                      (deathsMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </div> */}
                  <Doughnut
                    width={170}
                    options={{
                      elements: {
                        arc: {
                          borderWidth: 0,
                        },
                      },
                      legend: {
                        display: false,
                        position: "",
                      },
                    }}
                    data={{
                      labels: ["Tested", "Untested"],
                      datasets: [
                        {
                          data: [
                            tests[index] / population[index],
                            1 - tests[index] / population[index],
                          ],
                          backgroundColor: colorCases,
                        },
                      ],
                    }}
                  ></Doughnut>
                </Col>
                <Col className="box px-2 py-3 ml-1 mt-3">
                  Tests
                  {(tests[index] / population[index]) * 100 <= 100 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      POOR
                    </Badge>
                  ) : (tests[index] / population[index]) * 100 >= 250 ? (
                    <Badge variant="success" text="dark" className="badge">
                      GOOD
                    </Badge>
                  ) : (
                    " "
                  )}
                  <div className="mb-0">
                    {(tests[index] / population[index]).toFixed(2)} p/<i className="fa fa-male"></i>
                  </div>
                </Col>
              </Row>
              <Row className=" ml-0"></Row>
            </Col>

            <Col
              className=""
              style={{
                height: "100%",
                overflowY: "scroll",
              }}
            >
              <Row
                className={"box mr-0 mt-2"}
                style={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ color: "grey", fontSize: "14px" }}
                  className="pt-2"
                >
                  Cases Per Country
                </div>

                <HorizontalBar
                  height={countryNames.length * 50}
                  ref={chartRef}
                  options={{
                    onClick: function (evt, element) {
                      if (element.length > 0) {
                        console.log(element, element[0]._datasetIndex);
                      }
                    },
                    maintainAspectRatio: true,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      display: false,
                      position: "",
                    },
                    layout: {
                      padding: {
                        left: 20,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                    },
                  }}
                  data={{
                    labels: countryNames,
                    datasets: [
                      {
                        label: "Cases/1000",
                        data: casesPerOneMillion,
                        backgroundColor: colorCases,
                      },
                    ],
                  }}
                />

                {countryNames.length < 15 && (
                  <>
                    <div
                      style={{ color: "grey", fontSize: "14px" }}
                      className="pt-2 pb-3"
                    >
                      Active Cases
                    </div>
                    <div className="pt-2 pb-2"></div>
                    <HorizontalBar
                      height={countryNames.length * 50}
                      options={{
                        maintainAspectRatio: true,
                        legend: {
                          display: false,
                          position: "",
                        },
                        layout: {
                          padding: {
                            left: 20,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          },
                        },
                      }}
                      data={{
                        labels: countryNames,
                        datasets: [
                          {
                            label: "Active/1000",
                            data: activePerOneMillion,
                            backgroundColor: colorActive,
                          },
                        ],
                      }}
                    />
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </>
      ),
    },
    {
      id: 2,
      title: "Deaths",
      // icon: <a id='check1'></a>,
      content: (
        <>
          <Row style={{ height: "86vh" }}>
            <Col className="mr-3 mt-2">
              <Row className="box p-2 ml-1 mb-0" style={{ color: "#ccc" }}>
                <h1 className="mb-0">
                  {(deathsMillion[index] / 1000).toFixed(2)}{" "}
                  <FontAwesomeIcon color="green" size="sm" icon={faArrowDown} />
                </h1>

                <h5>Deaths / 1000</h5>
              </Row>

              <Row
                className={"box ml-1 mt-3 pb-2"}
                style={{
                  color: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="py-2 "
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Country Analysis
                </div>

                <Doughnut
                  width={170}
                  options={{
                    elements: {
                      arc: {
                        borderWidth: 0,
                      },
                    },
                    legend: {
                      display: false,
                      position: "",
                    },
                  }}
                  data={{
                    labels: [
                      "Lowest Deaths",
                      "Lower Deaths",
                      "Average Deaths",
                      "Higher Deaths",
                      "Highest Deaths",
                    ],
                    datasets: [
                      {
                        data: [
                          mild.length,
                          contained.length,
                          moderate.length,
                          serious.length,
                          extreme.length,
                        ],
                        backgroundColor: colorsPie,
                      },
                    ],
                  }}
                ></Doughnut>
              </Row>

              <Row className="subtitle box pt-1 ml-1 mt-3">
                <div
                  className="pt-1 pb-1 ml-0"
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Deaths Trend
                </div>
                <Line
                  width={160}
                  height={100}
                  options={{
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  }}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Cases / 1000",
                        data: deathsPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                      },
                    ],
                  }}
                />
              </Row>

              <div
                className="pt-3 pb-3 ml-4"
                style={{ color: "grey", fontSize: "14px" }}
              >
                Death Statistics
              </div>
              <Row className="subtitle ml-1">
                <Col className="box p-2 py-4 mr-1">
                  Critical
                  {(criticalMillion[index] / deathsMillion[index]) * 100 <=
                  2.5 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (activeMillion[index] / deathsMillion[index]) * 100 >=
                    4.5 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {(
                      (criticalMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>
                <Col className="box px-4 py-4 ml-1">
                  Today
                  {(criticalMillion[index] / deathsMillion[index]) * 100 <=
                  0.005 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (criticalMillion[index] / deathsMillion[index]) * 100 >=
                    0.015 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                       <strong className="mb-0">+
                    {
                      (numberWithCommas((todayDeaths[index])))
                    } 
                  </strong>
                  {/* <div className="mb-0">
                    {(
                      (criticalMillion[index] / deathsMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </div> */}
                </Col>
              </Row>
              <Row className="subtitle ml-0">
                <Col className="box p-2 py-4 mr-1 mt-3">
                  p/Case
                  {(deathsMillion[index] / casesMillion[index]) * 100 <= 1.0 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (deathsMillion[index] / casesMillion[index]) * 100 >=
                    2.0 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {(
                      (deathsMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>
                <Col className="box p-3 py-4 ml-1 mt-3">
                  p/Pop
                  {(tests[index] / population[index]) * 100 <= 100 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      POOR
                    </Badge>
                  ) : (tests[index] / population[index]) * 100 >= 250 ? (
                    <Badge variant="success" text="dark" className="badge">
                      GOOD
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {((deaths[index] / population[index]) * 100).toFixed(2)}%
                  </strong>
                </Col>
              </Row>
              <Row className=" ml-0"></Row>
            </Col>

            <Col
              className=""
              style={{
                height: "100%",
                overflowY: "scroll",
              }}
            >
              <Row
                className={"box mr-0 mt-2"}
                style={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ color: "grey", fontSize: "14px" }}
                  className="pt-2"
                >
                  Deaths Per Country
                </div>

                <HorizontalBar
                  height={countryNames.length * 50}
                  ref={chartRef}
                  options={{
                    onClick: function (evt, element) {
                      if (element.length > 0) {
                        console.log(element, element[0]._datasetIndex);
                      }
                    },
                    maintainAspectRatio: true,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      display: false,
                      position: "",
                    },
                    layout: {
                      padding: {
                        left: 20,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                    },
                  }}
                  data={{
                    labels: countryNames,
                    datasets: [
                      {
                        label: "Deaths/1000",
                        data: deathsPerOneMillion,
                        backgroundColor: colorDeaths,
                      },
                    ],
                  }}
                />

                {countryNames.length < 15 && (
                  <>
                    <div
                      style={{ color: "grey", fontSize: "14px" }}
                      className="pt-2 pb-3"
                    >
                      Critical Cases
                    </div>
                    <div className="pt-2 pb-2"></div>
                    <HorizontalBar
                      height={countryNames.length * 50}
                      options={{
                        maintainAspectRatio: true,
                        legend: {
                          display: false,
                          position: "",
                        },
                        layout: {
                          padding: {
                            left: 20,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          },
                        },
                      }}
                      data={{
                        labels: countryNames,
                        datasets: [
                          {
                            label: "Critical/1000",
                            data: criticalPerOneMillion,
                            backgroundColor: colorActive,
                          },
                        ],
                      }}
                    />
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </>
      ),
    },

    {
      id: 3,
      title: "Mortality",
      // icon: <a id='check1'></a>,
      content: (
        <>
          <Row style={{ height: "86vh" }}>
            <Col className="mr-3 mt-2">
              <Row className="box p-2 ml-1 mb-0" style={{ color: "#ccc" }}>
                <h1 className="mb-0">
                  {((deathsMillion[index] / casesMillion[index]) * 100).toFixed(
                    2
                  )}{" "}
                  {mortalityRate[0] / 1000 <= mortalityRate[5] / 1000 ? (
                    <FontAwesomeIcon color="red" size="sm" icon={faArrowUp} />
                  ) : (
                    <FontAwesomeIcon
                      color="green"
                      size="sm"
                      icon={faArrowDown}
                    />
                  )}
                </h1>

                <h5>Deaths / Cases</h5>
              </Row>

              <Row
                className={"box ml-1 mt-3 pb-2"}
                style={{
                  color: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="pt-5"
                  style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#ccc",
                  }}
                >
                  {deathsMillion[index]/casesMillion[index] < 0.005 ? (
                    <h6>Mild</h6>
                  ) : deathsMillion[index]/casesMillion[index] < 0.001 ? (
                    <h6>Contained</h6>
                  ) : deathsMillion[index]/casesMillion[index]  < 0.015 ? (
                    <h6>Moderate</h6>
                  ) : deathsMillion[index]/casesMillion[index]  < 0.02 ? (
                    <h6>Serious</h6>
                  ) : (
                    <h6>Extreme</h6>
                  ) }
                </div>

                <div
                  className="py-2 "
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Country Analysis
                </div>

                <Doughnut
                  width={170}
                  options={{
                    elements: {
                      arc: {
                        borderWidth: 0,
                      },
                    },
                    legend: {
                      display: false,
                      position: "",
                    },
                  }}
                  data={{
                    labels: [
                      "Lowest Mortality",
                      "Lower Mortality",
                      "Average Mortality",
                      "Higher Mortality",
                      "Highest Mortality",
                    ],
                    datasets: [
                      {
                        data: [
                          lowest.length,
                          lower.length,
                          average.length,
                          higher.length,
                          highest.length,
                        ],
                        backgroundColor: colorsPie,
                      },
                    ],
                  }}
                ></Doughnut>
              </Row>

              <Row className="subtitle box pt-1 ml-1 mt-3">
                <div
                  className="pt-1 pb-1 ml-0"
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Mortality Trend
                </div>
                <Line
                  width={160}
                  height={110}
                  options={{
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                  }}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Cases / 1000",
                        data: mortalityRate,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.2)",
                        borderColor: "rgba(75,192,192,1)",
                      },
                    ],
                  }}
                />
              </Row>

              <div
                className="pt-3 pb-3 ml-4"
                style={{ color: "grey", fontSize: "14px" }}
              >
                Mortality Statistics
              </div>
              <Row className="subtitle ml-1" style={{border: "1px solid #2a3d3d", borderRadius: "5px"}}>
                <Col className="px-2 pt-3 pb-4 mr-1">
                  Recovery
                  {(activeMillion[index] / casesMillion[index]) * 100 <= 2.5 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (activeMillion[index] / casesMillion[index]) * 100 >=
                    4.5 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {(
                      (recoveredMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>
                <Col className="px-3 pt-3 pb-1 ml-1">
      
                  Today
                  {(criticalMillion[index] / casesMillion[index]) * 100 <=
                  0.005 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (criticalMillion[index] / casesMillion[index]) * 100 >=
                    0.015 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">+
                 
                  {((todayRecovered[index]) / 1000).toFixed(0) + 'k'} 
                
                  </strong>
                </Col>
              </Row>
              <Row className="subtitle ml-0">
                <Col className="box p-2  mr-1 mt-3">
                  {/* Deaths
                  {(deathsMillion[index] / casesMillion[index]) * 100 <= 1.0 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (deathsMillion[index] / casesMillion[index]) * 100 >=
                    2.0 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <div className="mb-0">
                    {(
                      (deathsMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </div> */}
                  <Doughnut
                    width={170}
                    options={{
                      elements: {
                        arc: {
                          borderWidth: 0,
                        },
                      },
                      legend: {
                        display: false,
                        position: "",
                      },
                    }}
                    data={{
                      labels: ["Tested", "Untested"],
                      datasets: [
                        {
                          data: [
                            tests[index] / population[index],
                            1 - tests[index] / population[index],
                          ],
                          backgroundColor: colorCases,
                        },
                      ],
                    }}
                  ></Doughnut>
                </Col>
                <Col className="box px-4 py-3 ml-1 mt-3">
                  Vac'd
                  {(tests[index] / population[index]) * 100 <= 100 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (tests[index] / population[index]) * 100 >= 250 ? (
                    <Badge variant="success" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {(tests[index] / population[index]).toFixed(2) * 100}%
                  </strong>
                </Col>
              </Row>
              <Row className=" ml-0"></Row>
            </Col>

            <Col
              className=""
              style={{
                height: "100%",
                overflowY: "scroll",
              }}
            >
              <Row
                className={"box mr-0 mt-2"}
                style={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ color: "grey", fontSize: "14px" }}
                  className="pt-2"
                >
                  Mortality Per Country
                </div>

                <HorizontalBar
                  height={countryNames.length * 50}
                  ref={chartRef}
                  options={{
                    onClick: function (evt, element) {
                      if (element.length > 0) {
                        console.log(element, element[0]._datasetIndex);
                      }
                    },
                    maintainAspectRatio: true,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      display: false,
                      position: "",
                    },
                    layout: {
                      padding: {
                        left: 20,
                        right: 0,
                        top: 0,
                        bottom: 0,
                      },
                    },
                  }}
                  data={{
                    labels: countryNames,
                    datasets: [
                      {
                        label: "Mortality/1000",
                        data: mortalityRate,
                        backgroundColor: backgroundcolor,
                      },
                    ],
                  }}
                />

                {countryNames.length < 15 && (
                  <>
                    <div
                      style={{ color: "grey", fontSize: "14px" }}
                      className="pt-2 pb-3"
                    >
                      Recovered Per Country
                    </div>
                    <div className="pt-2 pb-2"></div>
                    <HorizontalBar
                      height={countryNames.length * 50}
                      options={{
                        maintainAspectRatio: true,
                        legend: {
                          display: false,
                          position: "",
                        },
                        layout: {
                          padding: {
                            left: 20,
                            right: 0,
                            top: 0,
                            bottom: 0,
                          },
                        },
                      }}
                      data={{
                        labels: countryNames,
                        datasets: [
                          {
                            label: "Active/1000",
                            data: recoveredPerOneMillion,
                            backgroundColor: colorActive,
                          },
                        ],
                      }}
                    />
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </>
      ),
    },

    // {
    //   id: 4,
    //   title: "Mortality",
    //   content: (
    //     <>
    //       <Row style={{ height: "88vh" }}>
    //         <Col className="px-0 ml-3">
    //           <Row className="box p-2 my-2 mr-2 ml-1" style={{ color: "#ddd" }}>
    //             <h1>{mortalityRate[index]}%</h1>

    //             <h6>Case Mortality</h6>
    //           </Row>

    //           <Row className="subtitle px-3 pt-2">
    //             <Line
    //               width={160}
    //               height={100}
    //               options={{
    //                 legend: {
    //                   display: false,
    //                   position: "bottom",
    //                 },
    //               }}
    //               data={{
    //                 labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //                 datasets: [
    //                   {
    //                     label: "First dataset",
    //                     data: mortalityRate,
    //                     fill: true,
    //                     backgroundColor: "rgba(75,192,192,0.2)",
    //                     borderColor: "rgba(75,192,192,1)",
    //                   },
    //                 ],
    //               }}
    //             />
    //           </Row>
    //           <div
    //             className="py-3 ml-4"
    //             style={{ color: "grey", fontSize: "14px" }}
    //           >
    //             Statistics
    //           </div>
    //           <Row className="subtitle ml-0 mr-2">
    //             <Col className="box p-2 py-4 mr-1">
    //               Active
    //               {(activeMillion[index] / deathsMillion[index]) * 100 <=
    //               2.5 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (activeMillion[index] / deathsMillion[index]) * 100 >=
    //                 4.5 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <div className="mb-0">
    //                 {(
    //                   (activeMillion[index] / deathsMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </div>
    //             </Col>
    //             <Col className="box p-2 py-4 ml-1">
    //               Critical
    //               {(criticalMillion[index] / deathsMillion[index]) * 100 <=
    //               0.005 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (criticalMillion[index] / deathsMillion[index]) * 100 >=
    //                 0.015 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <div className="mb-0">
    //                 {(
    //                   (criticalMillion[index] / deathsMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </div>
    //             </Col>
    //           </Row>
    //           <Row className="subtitle ml-0 mr-2">
    //             <Col className="box p-2 py-4 mr-1 mt-3">
    //               Deaths
    //               {(deathsMillion[index] / deathsMillion[index]) * 100 <=
    //               1.0 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (deathsMillion[index] / deathsMillion[index]) * 100 >=
    //                 2.0 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <div className="mb-0">
    //                 {(
    //                   (deathsMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </div>
    //             </Col>
    //             <Col className="box p-2 py-0 ml-1 mt-3">
    //               {/* Tested
    //               {(tests[index] / population[index]) * 100 <= 100 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   POOR
    //                 </Badge>
    //               ) : (tests[index] / population[index]) * 100 >= 250 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   GOOD
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <div className="mb-0">
    //                 {(tests[index] / population[index]).toFixed(1) * 100}%
    //               </div> */}
    //               <Doughnut
    //                 width={170}
    //                 options={{
    //                   elements: {
    //                     arc: {
    //                       borderWidth: 0,
    //                     },
    //                   },
    //                   legend: {
    //                     display: false,
    //                     position: "",
    //                   },
    //                 }}
    //                 data={{
    //                   labels: ["Tested", "Untested"],
    //                   datasets: [
    //                     {
    //                       data: [testsMillion[index], 1000000],
    //                       backgroundColor: colorsPie,
    //                     },
    //                   ],
    //                 }}
    //               ></Doughnut>
    //             </Col>
    //           </Row>
    //           <div className="py-3" style={{ color: "grey", fontSize: "14px" }}>
    //             Mortality Analysis
    //           </div>
    //           <Doughnut
    //             width={170}
    //             options={{
    //               elements: {
    //                 arc: {
    //                   borderWidth: 0,
    //                 },
    //               },
    //               legend: {
    //                 display: false,
    //                 position: "",
    //               },
    //             }}
    //             data={{
    //               labels: [
    //                 "Lowest Deaths",
    //                 "Lower Deaths",
    //                 "Average Deaths",
    //                 "Higher Deaths",
    //                 "Highest Deaths",
    //               ],
    //               datasets: [
    //                 {
    //                   data: [
    //                     mild.length,
    //                     contained.length,
    //                     moderate.length,
    //                     serious.length,
    //                     extreme.length,
    //                   ],
    //                   backgroundColor: colorsPie,
    //                 },
    //               ],
    //             }}
    //           />
    //           <div className="py-3"></div>
    //         </Col>

    //         <Col
    //           className="box  mb-5 mt-2 pr-3"
    //           style={{ height: "100%", overflowY: "scroll" }}
    //         >
    //           <div style={{ color: "grey", fontSize: "14px" }} className="pt-0">
    //             Mortality Per Country
    //           </div>
    //           <HorizontalBar
    //             height={countryNames.length * 40}
    //             options={{
    //               legend: {
    //                 display: false,
    //                 position: "",
    //               },
    //             }}
    //             data={{
    //               labels: countryNames,
    //               datasets: [
    //                 {
    //                   label: "Mortality/1000",
    //                   data: mortalityRate,
    //                   backgroundColor: backgroundcolor,
    //                 },
    //               ],
    //             }}
    //           />
    //         </Col>
    //       </Row>
    //     </>
    //   ),
    // },

    // {
    //     id: 5,
    //     title: 'Tests',
    //     icon: 'tabitem__icon fa fa-network-wired',
    //     content: <>
    //         <Row>
    //             <Col className="pr-0">
    //                 <HorizontalBar
    //                     height={830}
    //                     width={200}
    //                     options={{
    //                         legend: {
    //                             display: false,
    //                             position: ''
    //                         },
    //                         // title: {
    //                         //   display: true,
    //                         //   text: 'Mortality in ' + region,
    //                         //   fontSize: 13,

    //                         // },
    //                     }}
    //                     data={{
    //                         labels: countryNames,
    //                         datasets: [
    //                             {
    //                                 label: "Cases/1000",
    //                                 data: casesPerOneMillion,
    //                                 backgroundColor: colorCases,
    //                             }
    //                         ]
    //                     }}
    //                 />
    //             </Col>
    //             <Col className="px-0">

    //                 {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
    //                 {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

    //                 <Row className="box p-2 m-1 " style={{ color: "teal" }}>

    //                     <h1>{(casesMillion[index] / 1000).toFixed(1)}  <FontAwesomeIcon color="green" icon={faArrowUp} /></h1>

    //                     <h5 >/1000 Tests</h5>
    //                 </Row>

    //                 {/* </Row> */}
    //                 <Row className="subtitle px-3 pt-2">
    //                     <Line
    //                         width={160}
    //                         height={100}
    //                         options={{
    //                             // title: {
    //                             //     display: true,
    //                             //     text: 'Trends in ' + region,
    //                             //     fontSize: 13,
    //                             //     postion: 'bottom'
    //                             // },
    //                             legend: {
    //                                 display: false,
    //                                 position: 'bottom'
    //                             }
    //                         }}
    //                         data={{
    //                             labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //                             datasets: [
    //                                 {
    //                                     label: "First dataset",
    //                                     data: casesPerOneMillion,
    //                                     fill: true,
    //                                     backgroundColor: "rgba(75,192,192,0.2)",
    //                                     borderColor: "rgba(75,192,192,1)"
    //                                 },
    //                                 // {
    //                                 //   label: "Second dataset",
    //                                 //   data: [33, 25, 35, 51, 54, 76],
    //                                 //   fill: false,
    //                                 //   borderColor: "#742774"
    //                                 // }
    //                             ]
    //                         }}
    //                     />
    //                 </Row>
    //                 <div style={{ color: "grey", fontSize: "14px", paddingTop: "10px" }}>Statistics</div>
    //                 <Row className="subtitle m-1 pt-1" >

    //                     <Col className="box" style={{ color: "teal" }}>Active<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(activeMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div>/cases</div></Col>
    //                     <Col className="box" style={{ color: "teal" }}>Critical<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(criticalMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div>/cases</div></Col>

    //                 </Row>

    //                 <Row className="subtitle m-1" >
    //                     <Col className="box" style={{ color: "teal" }}> Deaths<div className="icon"><FontAwesomeIcon color="green" icon={faArrowUp} /></div> <h3>{(deathsMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div >/cases</div></Col>
    //                     <Col className="box" style={{ color: "teal" }}> Tests <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(tests[index] / population[index]).toFixed(2)}</h3><div >/person</div></Col>
    //                 </Row>
    //                 <div className="py-3" style={{ color: "grey", fontSize: "14px" }}>Countries in {region}</div>
    //                 <Doughnut
    //                     width={170}
    //                     options={{
    //                         // maintainAspectRatio: true,
    //                         // title: {
    //                         //     display: true,
    //                         //     text: 'Countries in ' + region,
    //                         //     fontSize: 13
    //                         // },
    //                         elements: {
    //                             arc: {
    //                                 borderWidth: 0
    //                             }
    //                         },
    //                         legend: {
    //                             display: false,
    //                             position: ''
    //                         },
    //                     }}
    //                     data={{
    //                         labels: ["Lowest Cases", "Lower Cases", "Average Cases", "Higher Cases", "Highest Cases"],
    //                         datasets: [
    //                             {
    //                                 data: [lowest.length, lower.length, average.length, higher.length, highest.length],
    //                                 backgroundColor: colorsPie,
    //                             }
    //                         ]
    //                     }}
    //                 />
    //             </Col>
    //         </Row>
    //     </>
    //     ,
    // },
  ];



  const TabsMenu = () => {

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value; //assign the value of ref to the argument
        },[value]); //this code will run when the value of 'value' changes
        return ref.current; //in the end, return the current ref value.
      }

    
    const [active, setActive] = useState(1);
    const prevCount = usePrevious(active)

    const TabItem = ({
      icon = "",
      title = "",

      onItemClicked = () =>
        console.error("You passed no action to the component"),
      isActive = false,
    }) => {
      return (
        <div
          className={isActive ? "tabitem" : "tabitem tabitem--inactive"}
          onClick={onItemClicked}
        >
          <p style={{ display: "flex" }} className="tabitem__title">
            {title}
            {icon}{" "}
          </p>
        </div>
      );
    };

    return (
      <div className="wrapper">
        <div className="tabs">
          {tabItems.map(({ id, icon, title }) => (
            <TabItem
              key={title}
              icon={icon}
              title={title}
              onItemClicked={() => setActive(id)}
              isActive={active === id}
            />
          ))}
        </div>
        <div className="content">
          {tabItems.map(({ id, content }) => {
            return active === id ? content : "";
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={open ? "visible" : "hidden"}>
        <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <div className="side">
            <div className={!open ? "hidden" : "visible"}>
              <Container>
       
                <Row className="title">
      
                  <Col xs={9} className="px-0 pt-2">
                   <Animated
          animationIn="fadeInLeft"
          animationOut="fadeOut"
          isVisible={true}
       
        >   {region}</Animated>  
                  </Col>
                
                  <Col className="px-0">
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        // onClick={toggleAsia}
                        onClick={handleClose}
                        // size="lg"
                        variant="outline-info"
                        // style={{ margin: "10px", padding: "0px 10px 3px 10px" }}
                        className="close button"
                      >
                        <h6>x</h6>
                      </Button>
                    </div>
                  </Col>
                </Row>
              
                <TabsMenu
                  countries={countries}
                  index={index}
                  region={region}
                  casesMillion={casesMillion}
                  activeMillion={activeMillion}
                  criticalMillion={criticalMillion}
                  deathsMillion={deathsMillion}
                  tests={tests}
                />
              </Container>
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
};

export default Menu;

let colorsPie = [
  "#444e86",
  "#955196",
  "#ffa600",
  "#ff6e54",
  "#dd5182",
  "rgb(212, 23, 83)",
  "rgb(45, 182, 130)",
];
