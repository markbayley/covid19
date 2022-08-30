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
  toggleSearch
}) => {
  const casesPerContinent = casesMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const deathsPerContinent = deathsMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const activePerContinent = activeMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const criticalPerContinent = criticalMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const testsPerContinent = testsMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  const recoveredPerContinent = recoveredMillion.map((selectedContinent) =>
    (selectedContinent / 1000).toFixed(1)
  );
  // console.log(casesPerContinent, "casesPerContinent");
  //  const globalCases = globaldata.casesPerOneMillion;
  const casesGlobal = (globalCases / 1000).toFixed(1);
  const deathsGlobal = (globalDeaths / 1000).toFixed(3);
  const activeGlobal = (globalActive / 1000).toFixed(2);
  const criticalGlobal = (globalCritical / 1000).toFixed(4);
  const testsGlobal = (globalTests / 1000).toFixed(1);
  const recoveredGlobal = (globalRecovered / 1000).toFixed(1);

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
  // console.log((cases1[6]), 'cases1')
  const cases2 = continents.filter(
    (selectedContinent) =>
      selectedContinent.casesPerOneMillion / 1000 >= 50 &&
      selectedContinent.casesPerOneMillion / 1000 < 100
  );
  // console.log(cases2.countries, 'cases2')
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

  // const ok = function (item, data) {
  //   console.log(data.labels, item);
  //   return (
  //     data.datasets[item.datasetIndex].label +
  //     ": " +
  //     data.labels[item.index] +
  //     ": " +
  //     data.datasets[item.datasetIndex].data[item.index]
  //   );
  // }

  const tabItems = [
    {
      id: 1,
      title: "",
      content: (
        <>
           <Row style={{ height: "95vh", border: "" }} className="pl-2">
            {/* COLUMN ONE */}

            <Col
              className="subtitle"
              style={{ maxWidth: "100%", overflowY: "scroll", height: "100%" }}
            >
              <Row className="mb-2">
                <Col className="pt-3 mr-2">
                  <h1>
                    {" "}
                   {casesGlobal}
                  
                 
                    {casesGlobal[0] / 1000 >= casesGlobal[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em"}}
                        className="fa fa-arrow-up cases"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em" }}
                        className="fa fa-arrow-down cases"
                      ></i>
                    )}{" "}
                    <h6 className="cases">Global Cases/1k</h6>
                    
                  </h1>
         
                </Col>

                <Col className="pt-4">
                <Animated animationIn="fadeInUp" isVisible={true}>
                  <h6 style={{ color: "#fff" }}>Today&nbsp;</h6>
                  <h3 className="mb-0">
                    +
                    {numberWithCommas(
                      (todayGlobalCases /1000).toFixed(1) + 'k'
                    )}
                  </h3>
                </Animated>
           
                </Col>
              </Row>


              <Row className="subtitle mt-2 ">
                {/* <Col className="box " style={{maxWidth: "50%"}}> */}
                {/* <div
                  className="py-1"
                  style={{ color: "grey", fontSize: "14px" }}
                >
                  Cases Trend
                </div> */}
                <LineGraph casesType={casesType} />
                {/* </Col> */}
                {/* <Col className="box ml-2" style={{maxWidth: "50%"}}>
            </Col> 
            */}
              </Row>

              <Row className="mt-4">
                <Col className="px-3 pt-0 mr-2">
                  <h3 className="">
                    {deathsGlobal}
                    {deathsPerOneMillion[0] / 1000 <=
                    deathsPerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: "slategrey" }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: "slategrey" }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h3>
                  <h6 style={{ color: "slategrey" }}>Deaths/1k</h6>
                </Col>
                <Col className=" px-2 pt-0 mr-2">
                  <h3 className="">
                    {activeGlobal}
                    {activePerOneMillion[0] / 1000 <=
                    activePerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: "#ff9400" }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: "#ff9400" }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h3>
                  <h6 style={{ color: "#ff9400" }}>Active/1k</h6>

                  <h6></h6>
                </Col>
                <Col className="px-2 pt-0">
                  <h3 className="">
                    {testsGlobal}
                    {testsPerOneMillion[0] / 1000 <=
                    testsPerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: "teal" }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: "teal" }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h3>
                  <h6 style={{ color: "teal" }}>Tests/1k</h6>
                </Col>
              </Row>


             


              

              <Row className=" my-2 py-3">
               

    

                {/* <Col
                  className="box ml-2 px-0"
                  style={{ color: "#fff", fontSize: "14px", maxWidth: "50%" }}
                > */}
                  <h6 style={{display: "flex", justifyContent:"center",   alignItems: "center", width: "100%"}}
                className=" pt-2 pb-1 ml-2"
              
              >
                {region}
              </h6>
                  <Doughnut
                    // width={200}
                    height={160}
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
                          backgroundColor:  ["#ffb300","#ffa400","#ff9400","#ff8300","#ff7200"],
                          label: "Active",
                          stack: "0",
                        },
                      ],
                      labels: [
                        "Lowest",
                        "Lower",
                        "Average",
                        "Higher",
                        "Highest",
                      ],
                    }}
                    options={{
                      elements: {
                        arc: {
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
                        text: ''    
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
                        <h6 style={{display: "flex", justifyContent:"center",   alignItems: "center", width: "100%"}}
                className=" pt-4 pb-2 ml-2"
              
              >
                Continents Grouped by Severity
              </h6>
                {/* </Col> */}
              </Row>

              <Row className="subtitle pb-4">
                <Col className="px-2 mr-2">
                  <h6 style={{ color: "slategrey" }}>Mortality&nbsp;</h6>
                  <h3 className="">
                    {(
                      (deathsGlobal / casesGlobal) *
                      100
                    ).toFixed(2)}
                    %
                  </h3>
                </Col>
                <Col className="px-2 mr-2">
                  <h6 style={{ color: "#ff9400" }}>Active&nbsp;</h6>
                  <h3 className="">
                    {(
                      (activeGlobal / casesGlobal) *
                      100
                    ).toFixed(2)}
                    %
                  </h3>
                </Col>

                <Col className="px-2">
                  <h6 className="" style={{ color: "teal" }}>
                    Positive&nbsp;
                  </h6>
                  <h3>
                    {numberWithCommas(
                      (
                        (casesGlobal / testsGlobal) *
                        100
                      ).toFixed(2) + "%"
                    )}
                  </h3>
                </Col>
              </Row>

   {/* <BarGraph /> */}
   <Row className="px-3" style={{ display: "flex", justifyContent: "center"}}>
                <h6
                  className=" pb-1"
               
                >
                 Continents Per/1k 
                </h6>

                <HorizontalBar
                  // pointStyle="star"
                  height={190}
                  width={300}
                  options={{
                    legend: {
                      display: true,
                      position: "top",
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
                        backgroundColor: "grey",
                        stack: "0",
                      },
                      {
                        label: "Active",
                        data: activePerContinent,
                        backgroundColor: "orange",
                        stack: "0",
                      },
                      {
                        label: "Cases",
                        data: casesPerContinent,
                        backgroundColor: [colorsPie[4], colorsPie[0], colorsPie[3], colorsPie[1], colorsPie[2], colorsPie[0]],
                        stack: "0",
                      },

                      {
                        label: "Tests",
                        data: testsPerContinent,
                        backgroundColor: "teal",
                        stack: "0",
                      },
                   
                    ],
                  }}
                />
              </Row>
              <Col>
                  {/* <Row className="box mb-2">
            <div
                className="py-2 ml-4"
              >
                Global Statistics
              </div>
              </Row> */}

          
                </Col>

            </Col>
          </Row>
        </>
      ),
    },
    {
      id: 2,
      title: "",
      content: (
        <>
          <Row style={{ height: "100vh" }} className="px-3">
            <Col
              className="subtitle"
              style={{
                height: "100%",
                overflowY: "scroll",
              }}
            >
              <Row className="mb-2">
                <Col className="box pt-2 mr-2">
                  <h1>
                    {" "}
                    <CountUp
                      start={deathsGlobal - 3}
                      end={deathsGlobal - 0}
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

                <Col className="">
                  <Row style={{}} className="box pt-1 ">
                    {" "}
                    <h3 className="">{recoveredGlobal}</h3>&nbsp;
                    <h6 className="pt-2">Recovered/1k</h6>
                  </Row>
                  <Row style={{}} className="box mt-2 pt-1">
                    {" "}
                    <h3>{criticalGlobal}</h3>&nbsp;
                    <h6 className="pt-2">Critical/1k</h6>
                  </Row>
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

                <HorizontalBar
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
                        backgroundColor: "orange",
                        stack: "0",
                      },
                    ],
                  }}
                />
              </Row>

              <Row className="mt-2">
                <Col>
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
                      {((criticalGlobal / casesGlobal) * 100).toFixed(2) <=
                      0.025 ? (
                        <Badge variant="success" text="dark" className="badge">
                          LOW
                        </Badge>
                      ) : (criticalGlobal / casesGlobal) * 100 >= 0.045 ? (
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
                      ) : (criticalMillion[index] / casesMillion[index]) *
                          100 >=
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
                      ) : (criticalMillion[index] / casesMillion[index]) *
                          100 >=
                        0.015 ? (
                        <Badge variant="danger" text="dark" className="badge">
                          HIGH
                        </Badge>
                      ) : (
                        " "
                      )}
                      <strong>
                        {numberWithCommas(
                          ((casesGlobal / testsGlobal) * 100).toFixed(2) + "%"
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

                <Col
                  className="box ml-2 px-0"
                  style={{ color: "#fff", fontSize: "14px", maxWidth: "50%" }}
                >
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
                          backgroundColor: ["#ffb300","#ffa400","#ff9400","#ff8300","#ff7200"],
                          label: "Active",
                          stack: "0",
                        },
                      ],

                      labels: [
                        "Lowest",
                        "Lower",
                        "Average",
                        "Higher",
                        "Highest",
                      ],
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

  ];

  const TabsMenu = () => {

    const [tab, setTab] = useState(1);
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
      <>
        <div className="tabs">
          {tabItems.map(({ id, icon, title }) => (
            <TabItem
              key={id}
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
      </>
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
            <Row className="title my-1"  style={{ boxShadow: "2px 2px 2px 1px  rgb(0 0 0 / 10%)" }}>
              <Col xs="auto" className="pl-3">
                <Animated
                  animationIn="fadeInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                  className=""
                >
                  {" "}
                  {region}&nbsp;
                  <Button
                    style={{}}
                    className="button close  "
                    onClick={toggleSearch}
                    id="global"
                    variant="outline-info"
                  >
                    <h5>
                      {" "}
                      <i className="fa fa-filter"></i>
                    </h5>
                  </Button>
                </Animated>
              </Col>

              <Col className=" pr-2 ">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={handleClose}
                    variant="outline-info"
                    className="close button"
                  >
                    <h5>
                      {" "}
                      <i className="fa fa-close"></i>
                    </h5>
                  </Button>
                </div>
              </Col>
            </Row>

            <TabsMenu
              countries={countries}
              key={index}
              index={index}
              region={region}
              casesMillion={casesMillion}
              activeMillion={activeMillion}
              criticalMillion={criticalMillion}
              deathsMillion={deathsMillion}
              tests={tests}
              tabItems={tabItems}
            />
          </Container>
        </div>
      </Animated>
    </div>
  );
};

export default Menu;

let colorsPie = [
  "#6a5dfc",
  "#a13ed5",
  "#ca32ad",
  "#e72585",
  "#ff125e",
];
