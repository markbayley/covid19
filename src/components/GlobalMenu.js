import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import TabsComponent from "../misc/TabsComponent";
import Badge from "react-bootstrap/Badge";
import CountUp from "react-countup";
import BarGraph from "../misc/BarGraph";
import LineGraph from "./LineGraph";

const Menu = ({
  region,
  index,
  population,
  global,
  state,
  tests,
  countries,
  continents,
  handleClose,
  populationGlobal,
  testsG,
  globalCases,
  globalDeaths,
  globalActive,
  globalCritical,
  globalTests,
  globalRecovered,
  continentNames,
  casesMillion,
  deathsMillion,
  activeMillion,
  criticalMillion,
  recoveredMillion,
  testsMillion,
  todayGlobalCases,
  todayGlobalDeaths,
}) => {
  const casesPerContinent = casesMillion.map((selectedContinent) =>
    (selectedContinent / 1000 ).toFixed(1)
  );
  const deathsPerContinent = deathsMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const activePerContinent = activeMillion.map((selectedContinent) =>
    (selectedContinent / 1000 ).toFixed(1)
  );
  const criticalPerContinent = criticalMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const testsPerContinent = testsMillion.map((selectedContinent) =>
    (selectedContinent / 1000 ).toFixed(1)
  );
  const recoveredPerContinent = recoveredMillion.map((selectedContinent) =>
  (selectedContinent / 1000 ).toFixed(1)
);
  console.log(casesPerContinent, "casesPerContinent");
  //  const globalCases = globaldata.casesPerOneMillion;
  const casesGlobal = (globalCases / 1000).toFixed(1);
  const deathsGlobal = (globalDeaths / 1000).toFixed(3);
  const activeGlobal = (globalActive / 1000).toFixed(2);
  const criticalGlobal = (globalCritical / 1000).toFixed(4);
  const testsGlobal = (globalTests / 1000).toFixed(1);
  const recoveredGlobal = (globalRecovered /1000).toFixed(1);

  // Filter Countries in Region
  const continentCountries = countries.filter(
    (country) => country.continent === region
  );
  // Map Country Names && country.population > 1000000
  const countryNames = countries
    .filter(
      (country) => country.continent === region && country.population > 100000
    )
    .map((selectedCountry) => selectedCountry.country.substring(0, 12));
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
  // Create strata for classifting cases for doughnut charts
  const cases1 = continents.filter(
    (selectedContinent) => selectedContinent.casesPerOneMillion / 1000 < 50
  );
  const cases2 = continents.filter(
    (selectedContinent) =>
      selectedContinent.casesPerOneMillion / 1000 >= 50 &&
      selectedContinent.casesPerOneMillion / 1000 < 100
  );
  const cases3 = continents.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 100 &&
      selectedCountry.casesPerOneMillion / 1000 < 150
  );
  const cases4 = continents.filter(
    (selectedCountry) =>
      selectedCountry.casesPerOneMillion / 1000 >= 150 &&
      selectedCountry.casesPerOneMillion / 1000 < 350
  );
  const cases5 = continents.filter(
    (selectedCountry) => selectedCountry.casesPerOneMillion / 1000 > 350
  );

  // Create Strata for Deaths
  const deaths1 = continents.filter(
    (selectedCountry) => selectedCountry.deathsPerOneMillion / 1000 < 0.5
  );
  const deaths2 = continents.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 0.5 &&
      selectedCountry.deathsPerOneMillion / 1000 < 1
  );
  const deaths3 = continents.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 1 &&
      selectedCountry.deathsPerOneMillion / 1000 < 1.5
  );
  const deaths4 = continents.filter(
    (selectedCountry) =>
      selectedCountry.deathsPerOneMillion / 1000 >= 1.5 &&
      selectedCountry.deathsPerOneMillion / 1000 < 2.5
  );
  const deaths5 = continents.filter(
    (selectedCountry) => selectedCountry.deathsPerOneMillion / 1000 > 2.5
  );



  // Create Strata for Active
  const active1 = continents.filter(
    (selectedCountry) => selectedCountry.activePerOneMillion / 1000 < 5
  );
  const active2 = continents.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 5 &&
      selectedCountry.activePerOneMillion / 1000 < 10
  );
  const active3 = continents.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 10 &&
      selectedCountry.activePerOneMillion / 1000 < 15
  );
  const active4 = continents.filter(
    (selectedCountry) =>
      selectedCountry.activePerOneMillion / 1000 >= 15 &&
      selectedCountry.activePerOneMillion / 1000 < 25
  );
  const active5 = continents.filter(
    (selectedCountry) => selectedCountry.activePerOneMillion / 1000 > 25
  );

  const colorCases = [];
  for (let i = 0; i < casesPerContinent.length; i++) {
    if (casesPerContinent[i] < 50) {
      colorCases.push("#444e86");
    }
    if (casesPerContinent[i] >= 50 && casesPerContinent[i] < 100) {
      colorCases.push("#955196");
    }
    if (casesPerContinent[i] >= 100 && casesPerContinent[i] < 150) {
      colorCases.push("#ffa600");
    }
    if (casesPerContinent[i] >= 150 && casesPerContinent[i] < 300) {
      colorCases.push("#ff6e54");
    }
    if (casesPerContinent[i] >= 300) {
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
    if (activePerOneMillion[i] < 3) {
      colorActive.push("#444e86");
    }
    if (activePerOneMillion[i] >= 3 && activePerOneMillion[i] < 5) {
      colorActive.push("#955196");
    }
    if (activePerOneMillion[i] >= 5 && activePerOneMillion[i] < 8) {
      colorActive.push("#ffa600");
    }
    if (activePerOneMillion[i] >= 8 && activePerOneMillion[i] < 15) {
      colorActive.push("#ff6e54");
    }
    if (activePerOneMillion[i] >= 15) {
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

  const [casesType, setCasesType] = useState("cases");

  const tabItems = [
    {
      id: 1,
      title: "Cases",
      content: (
        <>
        <Row style={{ height: "90vh"}} className="px-3">
          <Col className="subtitle" 
          style={{
                height: "100%",
                overflowY: "scroll",
             
                }}>


           
        <Row className="mb-2">
          <Col className="box pt-2 mr-2">
            <h1 >
              {" "}
              <CountUp
                start={casesGlobal - 3}
                end={casesGlobal}
                duration={0.3}
                separator=","
                decimals={1}
              />
               {casesGlobal[0] / 1000 >= casesGlobal[5] / 1000 ? (
                      <i
                      style={{ fontSize: "0.7em", color: "#bb2124" }}
                      className="fa fa-arrow-up"
                    ></i>
                  ) : (
                    <i
                    style={{ fontSize: "0.7em", color: "#22bb33" }}
                    className="fa fa-arrow-down"
                  ></i>
                  )}{" "}
                     <h5 className="">Cases/1k</h5>
            </h1>
            </Col>
         
           
            
     
            <Col  className="" >
           <Row style={{  }} className="box pt-1 "> <h3 className="">{testsGlobal}</h3>&nbsp;<h6 className="pt-2">Tests/1k</h6></Row>
           <Row style={{  }} className="box mt-2 pt-1"> <h3>{activeGlobal}</h3>&nbsp;<h6 className="pt-2">Active/1k</h6></Row>
           </Col>
             
           </Row>
          
        

          {/* <BarGraph /> */}
          <Row className="box px-3">
            <div
              className="pt-1 pb-1"
              style={{ color: "grey", fontSize: "14px" }}
            >
              Cases Per Continent
            </div>

            <Bar
              // pointStyle="star"
              height={150}
              width={300}
              options={{
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                  },
                },

             
                  tooltips: {
                    yPadding: 10,
                    xPadding: 10,
                    xAlign: "left",
                    cornerRadius: 2,
                    backgroundColor: "#212529",
                    borderColor: "turquoise",
                    borderWidth: 1,
                    displayColors: true,
                    bodyFontSize: 12,
                    labels: {
                      usePointStyle: true,
                    },
                  },

                //   scales:{
                //     xAxes:[{
                //        ticks:{
                //        display: false
                //       }
                //     }]
                // },

                scales: {

                  xAxes: [
                    {
                      // ticks: {
                      //   min: 0,
                      //   max: 3,
                      //   stepWidth: 2,
                      //   stepSize: 2,
                      // },
                      ticks: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      // type: "logarithmic",
                      ticks: {
                        // min: 0,
                        // max: 3,
                        // stepWidth: 100,
                        stepSize: 1000,
                      },
                    },
                  ],
                },
              }}
              data={{
                labels: continentNames,
                datasets: [
               
                  {
                    label: "Cases",
                    data: casesPerContinent,
                    backgroundColor: colorCases,
                    stack: "0",
                  },
                
                  {
                    label: "Tests",
                    data: testsPerContinent,
                    backgroundColor: 'teal',
                    stack: "0",
                  },
                  {
                    label: "Active",
                    data: activePerContinent,
                    backgroundColor: 'orange',
                    stack: "0",
                  },
                ],
              }}
            />
          </Row>

          <Row className="mt-2">
            <Col >
            {/* <Row className="box mb-2">
            <div
                className="py-2 ml-4"
              >
                Global Statistics
              </div>
              </Row> */}
   
              <Row className="subtitle">
                <Col className="box py-4 mr-2">
                  Active
                  {((activeGlobal / casesGlobal) * 100).toFixed(2) <= 2.5 ? (
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
                  <strong>
                    {((activeGlobal / casesGlobal) * 100).toFixed(2)}%
                  </strong>
                </Col>
                <Col className="box py-4">
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
                  <strong>
                    +
                    {numberWithCommas(
                      (todayGlobalCases / 1000).toFixed(0) + "k"
                    )}
                  </strong>
                </Col>
              </Row>

              <Row className="subtitle mt-2">
                <Col className="box py-4 mr-2">
                Positive
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
                  <strong >
                    {numberWithCommas(
                      (casesGlobal / testsGlobal * 100).toFixed(2) + "%"
                    )}
                  </strong>
                  {/* <Doughnut
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
                            testsG,
                          casesGlobal,
                          ],
                          backgroundColor: colorCases,
                        },
                      ],
                    }}
                  ></Doughnut> */}
                </Col>
                <Col className="box py-4">
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
                  <strong className="">
                    {(testsG / populationGlobal).toFixed(2)}pp
                    {/* <i className="fa fa-male"></i> */}
                  </strong>
                </Col>
              </Row>
            </Col>

            <Col   className="box ml-2 px-0" style={{ color: "#fff", fontSize: "14px", maxWidth: "50%" }}>
              {/* <div
                className="pt-2 pb-4 ml-2"
              
              >
                Continent Analysis
              </div> */}
              <Doughnut
              // width={200}
              height={250}
          data={{
            datasets: [
              {
                data: [
                  cases1.length,
                  cases2.length,
                  cases3.length,
                  cases4.length,
                  cases5.length,
                ],
                backgroundColor: colorsPie,
                label: "Cases",
                stack: "0",
              },
              {
                data: [
                  active1.length,
                  active2.length,
                  active3.length,
                  active4.length,
                  active5.length,
                ],
                backgroundColor: colorsPie,
                label: "Active",
                stack: "0",
              },
            ],

            labels: ["Lowest", "Lower", "Average", "Higher", "Highest"],
          }}
          options={{
            elements: {
              arc: {
                // borderWidth: 0.5,
                // borderColor: "turquoise",
                borderColor: "#212529",
                borderWidth: 1,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: false,
              position: "",
            },
            title: {
              display: false,
              text: "",
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
            tooltips: {
              backgroundColor: "#212529",
              borderColor: "turquoise",
              borderWidth: 1,
              cornerRadius: 2,
              displayColors: true,
              bodyFontSize: 12,
              labels: {
                usePointStyle: true,
              },
              callbacks: {
                label: function (item, data) {
                  console.log(data.labels, item);
                  return (
                    data.datasets[item.datasetIndex].label +
                    ": " +
                    data.labels[item.index] +
                    ": " +
                    data.datasets[item.datasetIndex].data[item.index]
                  );
                },
              },
            },
          }}
        ></Doughnut>
            </Col>
          </Row>

          <Row className="subtitle box mt-2 px-0">
            {/* <Col className="box " style={{maxWidth: "50%"}}> */}
            <div
              className="py-1"
              style={{ color: "grey", fontSize: "14px" }}
            >
              Cases Trend
            </div>
            <LineGraph casesType={casesType} />
            {/* </Col> */}
            {/* <Col className="box ml-2" style={{maxWidth: "50%"}}>
            </Col> */}
  
          </Row>


          </Col>
          </Row>
        </>
      ),
    },
    {
      id: 2,
      title: "Deaths",
      content: (
        <>
        <Row style={{ height: "90vh"}} className="px-3">
          <Col className="subtitle" 
          style={{
                height: "100%",
                overflowY: "scroll",
             
                }}>


           
        <Row className="mb-2">
          <Col className="box pt-2 mr-2">
            <h1 >
              {" "}
              <CountUp
                start={deathsGlobal - 3}
                end={deathsGlobal}
                duration={0.3}
                separator=","
                decimals={1}
              />
               {deathsGlobal[0] / 1000 >= deathsGlobal[5] / 1000 ? (
                      <i
                      style={{ fontSize: "0.7em", color: "#bb2124" }}
                      className="fa fa-arrow-up"
                    ></i>
                  ) : (
                    <i
                    style={{ fontSize: "0.7em", color: "#22bb33" }}
                    className="fa fa-arrow-down"
                  ></i>
                  )}{" "}
                     <h5 className="">Deaths/1k</h5>
            </h1>
            </Col>
         
           
            
     
            <Col  className="" >
           <Row style={{  }} className="box pt-1 "> <h3 className="">{recoveredGlobal}</h3>&nbsp;<h6 className="pt-2">Recovered/1k</h6></Row>
           <Row style={{  }} className="box mt-2 pt-1"> <h3>{criticalGlobal}</h3>&nbsp;<h6 className="pt-2">Critical/1k</h6></Row>
           </Col>
             
           </Row>
          
        

          {/* <BarGraph /> */}
          <Row className="box px-3">
            <div
              className="pt-1 pb-1"
              style={{ color: "grey", fontSize: "14px" }}
            >
              Deaths Per Continent
            </div>

            <Bar
              // pointStyle="star"
              height={150}
              width={300}
              options={{
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                  },
                },

             
                  tooltips: {
                    yPadding: 10,
                    xPadding: 10,
                    xAlign: "left",
                    cornerRadius: 2,
                    backgroundColor: "#212529",
                    borderColor: "turquoise",
                    borderWidth: 1,
                    displayColors: true,
                    bodyFontSize: 12,
                    labels: {
                      usePointStyle: true,
                    },
                  },

                //   scales:{
                //     xAxes:[{
                //        ticks:{
                //        display: false
                //       }
                //     }]
                // },

                scales: {

                  xAxes: [
                    {
                      // ticks: {
                      //   min: 0,
                      //   max: 3,
                      //   stepWidth: 2,
                      //   stepSize: 2,
                      // },
                      ticks: {
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      // type: "logarithmic",
                      ticks: {
                        // min: 0,
                        // max: 3,
                        // stepWidth: 100,
                        stepSize: 1000,
                      },
                    },
                  ],
                },
              }}
              data={{
                labels: continentNames,
                datasets: [
               
                  {
                    label: "Deaths",
                    data: deathsPerContinent,
                    backgroundColor: colorCases,
                    stack: "0",
                  },
                
                  // {
                  //   label: "Tests",
                  //   data: recoveredPerContinent,
                  //   backgroundColor: 'teal',
                  //   stack: "0",
                  // },
                  {
                    label: "Critical",
                    data: criticalPerContinent,
                    backgroundColor: 'orange',
                    stack: "0",
                  },
                ],
              }}
            />
          </Row>

          <Row className="mt-2">
            <Col >
            {/* <Row className="box mb-2">
            <div
                className="py-2 ml-4"
              >
                Global Statistics
              </div>
              </Row> */}
   
              <Row className="subtitle">
                <Col className="box py-4 mr-2">
                  Critical
                  {((criticalGlobal / casesGlobal) * 100).toFixed(2) <= .025 ? (
                    <Badge variant="success" text="dark" className="badge">
                      LOW
                    </Badge>
                  ) : (criticalGlobal / casesGlobal) * 100 >=
                    .045 ? (
                    <Badge variant="danger" text="dark" className="badge">
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong>
                    {((criticalGlobal / casesGlobal) * 100).toFixed(2)}%
                  </strong>
                </Col>
                <Col className="box py-4">
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
                  <strong>
                    +
                    {numberWithCommas(
                      (todayGlobalDeaths / 1000).toFixed(0) + "k"
                    )}
                  </strong>
                </Col>
              </Row>

              <Row className="subtitle mt-2">
                <Col className="box py-4 mr-2">
                Positive
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
                  <strong >
                    {numberWithCommas(
                      (casesGlobal / testsGlobal * 100).toFixed(2) + "%"
                    )}
                  </strong>
                  {/* <Doughnut
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
                            testsG,
                          casesGlobal,
                          ],
                          backgroundColor: colorCases,
                        },
                      ],
                    }}
                  ></Doughnut> */}
                </Col>
                <Col className="box py-4">
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
                  <strong className="">
                    {(testsG / populationGlobal).toFixed(2)}pp
                    {/* <i className="fa fa-male"></i> */}
                  </strong>
                </Col>
              </Row>
            </Col>

            <Col   className="box ml-2 px-0" style={{ color: "#fff", fontSize: "14px", maxWidth: "50%" }}>
              {/* <div
                className="pt-2 pb-4 ml-2"
              
              >
                Continent Analysis
              </div> */}
              <Doughnut
              // width={200}
              height={250}
          data={{
            datasets: [
              {
                data: [
                  deaths1.length,
                  deaths2.length,
                  deaths3.length,
                  deaths4.length,
                  deaths5.length,
                ],
                backgroundColor: colorsPie,
                label: "Deaths",
                stack: "0",
              },
              {
                data: [
                  active1.length,
                  active2.length,
                  active3.length,
                  active4.length,
                  active5.length,
                ],
                backgroundColor: colorsPie,
                label: "Active",
                stack: "0",
              },
            ],

            labels: ["Lowest", "Lower", "Average", "Higher", "Highest"],
          }}
          options={{
            elements: {
              arc: {
                // borderWidth: 0.5,
                // borderColor: "turquoise",
                borderColor: "#212529",
                borderWidth: 1,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
              display: false,
              position: "",
            },
            title: {
              display: false,
              text: "",
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
            tooltips: {
              backgroundColor: "#212529",
              borderColor: "turquoise",
              borderWidth: 1,
              cornerRadius: 2,
              displayColors: true,
              bodyFontSize: 12,
              labels: {
                usePointStyle: true,
              },
              callbacks: {
                label: function (item, data) {
                  console.log(data.labels, item);
                  return (
                    data.datasets[item.datasetIndex].label +
                    ": " +
                    data.labels[item.index] +
                    ": " +
                    data.datasets[item.datasetIndex].data[item.index]
                  );
                },
              },
            },
          }}
        ></Doughnut>
            </Col>
          </Row>

          <Row className="subtitle box mt-2 px-0">
            {/* <Col className="box " style={{maxWidth: "50%"}}> */}
            <div
              className="py-1"
              style={{ color: "grey", fontSize: "14px" }}
            >
              Cases Trend
            </div>
            <LineGraph casesType={casesType} />
            {/* </Col> */}
            {/* <Col className="box ml-2" style={{maxWidth: "50%"}}>
            </Col> */}
  
          </Row>


          </Col>
          </Row>
        </>
      ),
    },
    // {
    //   id: 2,
    //   title: "Deaths",
    //   content: (
    //     <>
    //       <Row
    //         className={"box m-1 py-1"}
    //         style={{
    //           color: "#fff",
    //           display: "flex",
    //           alignItems: "center",
    //           flexDirection: "column",
    //           justifyContent: "center",
    //         }}
    //       >
    //         <h1>
    //           {" "}
    //           <CountUp
    //             start={deathsGlobal - 1}
    //             end={deathsGlobal}
    //             duration={0.3}
    //             separator=","
    //             decimals={2}
    //           />
    //              {deathsGlobal[0] / 1000 <= deathsGlobal[5] / 1000 ? (
    //                   <i
    //                   style={{ fontSize: "0.7em", color: "#bb2124" }}
    //                   className="fa fa-arrow-up"
    //                 ></i>
    //               ) : (
    //                 <i
    //                 style={{ fontSize: "0.7em", color: "#22bb33" }}
    //                 className="fa fa-arrow-down"
    //               ></i>
    //               )}
    //         </h1>
    //         <h5 className=""> Deaths / 1000 </h5>
    //       </Row>

    //       <Row className="box p-2 mt-2 mx-2">
    //         <div
    //           className="pt-1 pb-1"
    //           style={{ color: "grey", fontSize: "14px" }}
    //         >
    //           Global Deaths
    //         </div>
    //         <Bar
    //           pointStyle="star"
    //           height={150}
    //           width={300}
    //           options={{
    //             legend: {
    //               display: false,
    //               position: "bottom",
    //               labels: {
    //                 usePointStyle: true,
    //               },
    //             },
    //             elements: {
    //               point: {
    //                 radius: 25,
    //                 hoverRadius: 35,
    //                 pointStyle: "rectRounded",
    //               },
    //             },
    //             scales: {
    //               xAxes: [
    //                 {
    //                   stacked: true,
    //                 },
    //               ],
    //               yAxes: [
    //                 {
    //                   stacked: true,
    //                   radius: 25,
    //                 },
    //               ],
    //             },
    //           }}
    //           data={{
    //             labels: continentNames,
    //             datasets: [
    //               {
    //                 label: "Deaths/1000",
    //                 data: deathsPerContinent,
    //                 backgroundColor: colorCases,
    //                 stack: "0",
    //               },
    //               // {
    //               //   label: "Deaths/1000",
    //               //   data: deathsPerContinent,
    //               //   backgroundColor: colorsPie,
    //               //   stack: "0",
    //               // },
    //               // {
    //               //   label: "Active/1000",
    //               //   data: activePerContinent,
    //               //   backgroundColor: colorsPie,
    //               //   stack: "0",
    //               // },
    //             ],
    //           }}
    //         />
    //       </Row>

    //       <Row>
    //         <Col>
    //           <div
    //             className="pt-3 pb-3 ml-4"
    //             style={{ color: "grey", fontSize: "14px" }}
    //           >
    //             Death Statistics
    //           </div>
    //           <Row className="subtitle ml-1">
    //             <Col className="box px-2 py-3 mr-1">
    //               Critical
    //               {((criticalGlobal / casesGlobal) * 100).toFixed(2) <= 2.5 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (criticalMillion[index] / casesMillion[index]) * 100 >=
    //                 4.5 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <strong className="mb-0">
    //                 {globalCritical*1000}
    //               </strong>
    //             </Col>
    //             <Col className="box px-3 pt-3 pb-4  ml-1">
    //               Today
    //               {(criticalMillion[index] / casesMillion[index]) * 100 <=
    //               0.005 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (criticalMillion[index] / casesMillion[index]) * 100 >=
    //                 0.015 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <strong className="mb-0">
    //                 +{numberWithCommas(todayGlobalDeaths)}
    //               </strong>
    //             </Col>
    //           </Row>

    //           <Row className="subtitle ml-0">
    //             <Col className="box p-2  mr-1 mt-3">
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
    //                       data: [
    //                         tests[index] / population[index],
    //                         1 - tests[index] / population[index],
    //                       ],
    //                       backgroundColor: colorCases,
    //                     },
    //                   ],
    //                 }}
    //               ></Doughnut>
    //             </Col>
    //             <Col className="box px-3 py-3 ml-1 mt-3">
    //               Tests{" "}
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
    //               <strong className="mb-0">{" "}
    //                 {(testsG / populationGlobal).toFixed(2)} pp
    //                 {/* <i className="fa fa-male"></i> */}
    //               </strong>
    //             </Col>
    //           </Row>
    //         </Col>

    //         <Col>
    //           <div
    //             className="pt-3 pb-3 ml-4"
    //             style={{ color: "grey", fontSize: "14px" }}
    //           >
    //             Deaths Analysis
    //           </div>
    //           <Doughnut
    //             width={300}
    //             height={300}
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
    //                     deaths1.length,
    //                     deaths2.length,
    //                     deaths3.length,
    //                     deaths4.length,
    //                     deaths5.length,
    //                   ],
    //                   backgroundColor: colorsPie,
                 
    //                 },
    //               ],
    //             }}
    //           ></Doughnut>
    //         </Col>
    //       </Row>
    //       <Row className="subtitle box ml-0 mr-2 mt-3">
    //         <div
    //           className="pt-1 pb-1 ml-0"
    //           style={{ color: "grey", fontSize: "14px" }}
    //         >
    //           Deaths Trend
    //         </div>
    //         <Line
    //           width={160}
    //           height={60}
    //           options={{
    //             legend: {
    //               display: false,
    //               position: "bottom",
    //             },
    //           }}
    //           data={{
    //             labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    //             datasets: [
    //               {
    //                 label: "Deaths / 1000",
    //                 data: deathsMillion,
    //                 fill: true,
    //                 backgroundColor: "rgba(75,192,192,0.2)",
    //                 borderColor: "rgba(75,192,192,1)",
    //               },
    //             ],
    //           }}
    //         />
           
    //       </Row>
    //     </>
    //   ),
    // },

    // {
    //   id: 3,
    //   title: "Active",
    //   icon: "tabitem__icon fa fa-network-wired",
    //   content: (
    //     <>
    //       <Row>
    //         <Col className="pr-0">
    //           <HorizontalBar
    //             height={830}
    //             width={200}
    //             options={{
    //               legend: {
    //                 display: false,
    //                 position: "",
    //               },
    //               // title: {
    //               //   display: true,
    //               //   text: 'Mortality in ' + region,
    //               //   fontSize: 13,

    //               // },
    //             }}
    //             data={{
    //               labels: countryNames,
    //               datasets: [
    //                 {
    //                   label: "Cases/1000",
    //                   data: activePerOneMillion,
    //                   backgroundColor: colorActive,
    //                 },
    //               ],
    //             }}
    //           />
    //         </Col>
    //         <Col className="px-0">
    //           {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
    //           {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

    //           <Row className="box p-2 m-1 " style={{ color: "teal" }}>
    //             <h1>
    //               {activeGlobal}{" "}
    //               <FontAwesomeIcon color="green" icon={faArrowDown} />
    //             </h1>

    //             <h5>/1000 Active</h5>
    //           </Row>

    //           {/* </Row> */}
    //           <Row className="subtitle px-3 pt-2">
    //             <Line
    //               width={160}
    //               height={100}
    //               options={{
    //                 // title: {
    //                 //     display: true,
    //                 //     text: 'Trends in ' + region,
    //                 //     fontSize: 13,
    //                 //     postion: 'bottom'
    //                 // },
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
    //                     data: activePerOneMillion,
    //                     fill: true,
    //                     backgroundColor: "rgba(75,192,192,0.2)",
    //                     borderColor: "rgba(75,192,192,1)",
    //                   },
    //                   // {
    //                   //   label: "Second dataset",
    //                   //   data: [33, 25, 35, 51, 54, 76],
    //                   //   fill: false,
    //                   //   borderColor: "#742774"
    //                   // }
    //                 ],
    //               }}
    //             />
    //           </Row>
    //           <div style={{ color: "grey", fontSize: "14px" }}>Statistics</div>
    //           <Row className="subtitle m-1 pt-1">
    //             <Col className="box" style={{ color: "teal" }}>
    //               Active
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>
    //                 {(
    //                   (casesMillion[index] / activeMillion[index]) *
    //                   100
    //                 ).toFixed(0)}
    //                 %
    //               </h3>
    //               <div>/active</div>
    //             </Col>
    //             <Col className="box" style={{ color: "teal" }}>
    //               Critical
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>
    //                 {(
    //                   (criticalMillion[index] / activeMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/active</div>
    //             </Col>
    //           </Row>

    //           <Row className="subtitle m-1">
    //             <Col className="box" style={{ color: "teal" }}>
    //               {" "}
    //               Deaths
    //               <div className="icon">
    //                 <FontAwesomeIcon color="green" icon={faArrowUp} />
    //               </div>{" "}
    //               <h3>
    //                 {(
    //                   (deathsMillion[index] / activeMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/active</div>
    //             </Col>
    //             <Col className="box" style={{ color: "teal" }}>
    //               {" "}
    //               Tests{" "}
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>{(tests[index] / population[index]).toFixed(2)}</h3>
    //               <div>/person</div>
    //             </Col>
    //           </Row>
    //           <div className="py-2" style={{ color: "grey", fontSize: "14px" }}>
    //             Countries in {region}
    //           </div>
    //           <Doughnut
    //             width={170}
    //             options={{
    //               // maintainAspectRatio: true,
    //               // title: {
    //               //     display: true,
    //               //     text: 'Countries in ' + region,
    //               //     fontSize: 13
    //               // },
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
    //                 "Lowest Active",
    //                 "Lower Active",
    //                 "Average Active",
    //                 "Higher Active",
    //                 "Highest Active",
    //               ],
    //               datasets: [
    //                 {
    //                   data: [
    //                     active1.length,
    //                     active2.length,
    //                     active3.length,
    //                     active4.length,
    //                     active5.length,
    //                   ],
    //                   backgroundColor: colorsPie,
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
    //   id: 4,
    //   title: "Critical",
    //   icon: "tabitem__icon fa fa-network-wired",
    //   content: (
    //     <>
    //       <Row>
    //         <Col className="pr-0">
    //           <HorizontalBar
    //             height={830}
    //             width={200}
    //             options={{
    //               legend: {
    //                 display: false,
    //                 position: "",
    //               },
    //               // title: {
    //               //   display: true,
    //               //   text: 'Mortality in ' + region,
    //               //   fontSize: 13,

    //               // },
    //             }}
    //             data={{
    //               labels: countryNames,
    //               datasets: [
    //                 {
    //                   label: "Cases/1000",
    //                   data: casesPerOneMillion,
    //                   backgroundColor: colorCases,
    //                 },
    //               ],
    //             }}
    //           />
    //         </Col>
    //         <Col className="px-0">
    //           {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
    //           {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

    //           <Row className="box p-2 m-1 " style={{ color: "teal" }}>
    //             <h1>
    //               {(criticalGlobal / 1).toFixed(1)}{" "}
    //               <FontAwesomeIcon color="green" icon={faArrowUp} />
    //             </h1>

    //             <h5>/1000 Critical</h5>
    //           </Row>

    //           {/* </Row> */}
    //           <Row className="subtitle px-3 pt-2">
    //             <Line
    //               width={160}
    //               height={100}
    //               options={{
    //                 // title: {
    //                 //     display: true,
    //                 //     text: 'Trends in ' + region,
    //                 //     fontSize: 13,
    //                 //     postion: 'bottom'
    //                 // },
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
    //                     data: casesPerOneMillion,
    //                     fill: true,
    //                     backgroundColor: "rgba(75,192,192,0.2)",
    //                     borderColor: "rgba(75,192,192,1)",
    //                   },
    //                   // {
    //                   //   label: "Second dataset",
    //                   //   data: [33, 25, 35, 51, 54, 76],
    //                   //   fill: false,
    //                   //   borderColor: "#742774"
    //                   // }
    //                 ],
    //               }}
    //             />
    //           </Row>
    //           <div
    //             style={{ color: "grey", fontSize: "14px", paddingTop: "10px" }}
    //           >
    //             Statistics
    //           </div>
    //           <Row className="subtitle m-1 pt-1">
    //             <Col className="box" style={{ color: "teal" }}>
    //               Active
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>
    //                 {(
    //                   (activeMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/cases</div>
    //             </Col>
    //             <Col className="box" style={{ color: "teal" }}>
    //               Critical
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>
    //                 {(
    //                   (criticalMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/cases</div>
    //             </Col>
    //           </Row>

    //           <Row className="subtitle m-1">
    //             <Col className="box" style={{ color: "teal" }}>
    //               {" "}
    //               Deaths
    //               <div className="icon">
    //                 <FontAwesomeIcon color="green" icon={faArrowUp} />
    //               </div>{" "}
    //               <h3>
    //                 {(
    //                   (deathsMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/cases</div>
    //             </Col>
    //             <Col className="box" style={{ color: "teal" }}>
    //               {" "}
    //               Tests{" "}
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>{(tests[index] / population[index]).toFixed(2)}</h3>
    //               <div>/person</div>
    //             </Col>
    //           </Row>
    //           <div className="py-3" style={{ color: "grey", fontSize: "14px" }}>
    //             Countries in {region}
    //           </div>
    //           <Doughnut
    //             width={170}
    //             options={{
    //               // maintainAspectRatio: true,
    //               // title: {
    //               //     display: true,
    //               //     text: 'Countries in ' + region,
    //               //     fontSize: 13
    //               // },
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
    //                 "Lowest Cases",
    //                 "Lower Cases",
    //                 "Average Cases",
    //                 "Higher Cases",
    //                 "Highest Cases",
    //               ],
    //               datasets: [
    //                 {
    //                   data: [
    //                     lowest.length,
    //                     lower.length,
    //                     average.length,
    //                     higher.length,
    //                     highest.length,
    //                   ],
    //                   backgroundColor: colorsPie,
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
    //   id: 5,
    //   title: "Tests",
    //   icon: "tabitem__icon fa fa-network-wired",
    //   content: (
    //     <>
    //       <Row>
    //         <Col className="pr-0">
    //           <HorizontalBar
    //             height={830}
    //             width={200}
    //             options={{
    //               legend: {
    //                 display: false,
    //                 position: "",
    //               },
    //               // title: {
    //               //   display: true,
    //               //   text: 'Mortality in ' + region,
    //               //   fontSize: 13,

    //               // },
    //             }}
    //             data={{
    //               labels: countryNames,
    //               datasets: [
    //                 {
    //                   label: "Cases/1000",
    //                   data: casesPerOneMillion,
    //                   backgroundColor: colorCases,
    //                 },
    //               ],
    //             }}
    //           />
    //         </Col>
    //         <Col className="px-0">
    //           {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
    //           {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

    //           <Row className="box p-2 m-1 " style={{ color: "teal" }}>
    //             <h1>
    //               {(testsGlobal / 1).toFixed(1)}{" "}
    //               <FontAwesomeIcon color="green" icon={faArrowUp} />
    //             </h1>

    //             <h5>/1000 Tests</h5>
    //           </Row>

    //           {/* </Row> */}
    //           <Row className="subtitle px-3 pt-2"></Row>
    //           <div
    //             style={{ color: "grey", fontSize: "14px", paddingTop: "10px" }}
    //           >
    //             Statistics
    //           </div>
    //           <Row className="subtitle m-1 pt-1">
    //             <Col className="box" style={{ color: "teal" }}>
    //               Active
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>
    //                 {(
    //                   (activeMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/cases</div>
    //             </Col>
    //             <Col className="box" style={{ color: "teal" }}>
    //               Critical
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>
    //                 {(
    //                   (criticalMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/cases</div>
    //             </Col>
    //           </Row>

    //           <Row className="subtitle m-1">
    //             <Col className="box" style={{ color: "teal" }}>
    //               {" "}
    //               Deaths
    //               <div className="icon">
    //                 <FontAwesomeIcon color="green" icon={faArrowUp} />
    //               </div>{" "}
    //               <h3>
    //                 {(
    //                   (deathsMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </h3>
    //               <div>/cases</div>
    //             </Col>
    //             <Col className="box" style={{ color: "teal" }}>
    //               {" "}
    //               Tests{" "}
    //               <div className="icon">
    //                 <FontAwesomeIcon
    //                   color="rgb(212, 23, 83)"
    //                   icon={faArrowDown}
    //                 />
    //               </div>
    //               <h3>{(tests[index] / population[index]).toFixed(2)}</h3>
    //               <div>/person</div>
    //             </Col>
    //           </Row>
    //           <div className="py-3" style={{ color: "grey", fontSize: "14px" }}>
    //             Countries in {region}
    //           </div>
    //           <Doughnut
    //             width={170}
    //             options={{
    //               // maintainAspectRatio: true,
    //               // title: {
    //               //     display: true,
    //               //     text: 'Countries in ' + region,
    //               //     fontSize: 13
    //               // },
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
    //                 "Lowest Cases",
    //                 "Lower Cases",
    //                 "Average Cases",
    //                 "Higher Cases",
    //                 "Highest Cases",
    //               ],
    //               datasets: [
    //                 {
    //                   data: [
    //                     lowest.length,
    //                     lower.length,
    //                     average.length,
    //                     higher.length,
    //                     highest.length,
    //                   ],
    //                   backgroundColor: colorsPie,
    //                 },
    //               ],
    //             }}
    //           />
    //         </Col>
    //       </Row>
    //     </>
    //   ),
    // },
  ];

  const TabsMenu = () => {
    // function usePrevious(value) {
    //   const ref = useRef();
    //   useEffect(() => {
    //     ref.current = value; //assign the value of ref to the argument
    //   }, [value]); //this code will run when the value of 'value' changes
    //   return ref.current; //in the end, return the current ref value.
    // }

    const [tab, setTab] = useState(1);
    // const prevCount = usePrevious(active);

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
      <Row className="pl-3 pr-1">
        <div className="tabs">
          {tabItems.map(({ id, icon, title }) => (
            <TabItem
              key={title}
              icon={icon}
              title={title}
              onItemClicked={() => setTab(id)}
              isActive={tab === id}
            />
          ))}
        </div>
        <div className="content">
          {tabItems.map(({ id, content }) => {
            return tab === id ? content : "";
          })}
        </div>
      </Row>
    );
  };

  return (
    <div className={state ? "visible" : "hidden"}>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >
        <div className="side">
          <Container>
            {/* <div className={!open ? "hidden" : "visible"}> */}
            <Row className="title">
              <Col xs={9} className="my-2 pl-3">
                <Animated
                  animationIn="fadeInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  {" "}
                  {region}
                </Animated>
              </Col>

              <Col className="my-2 pr-2">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              tabItems={tabItems}
            />
            {/* </div> */}
          </Container>
        </div>
      </Animated>
    </div>
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
