import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { HorizontalBar, Line, Doughnut } from "react-chartjs-2";
import Badge from "react-bootstrap/Badge";
import DoughnutCases from "./DoughnutCases";
import DoughnutDeaths from "./DoughnutDeaths";
import HorizontalChart from "./HorizontalChart";
import Form from "react-bootstrap/Form";

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
  cases,
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
  // Filter Countries in Region
  const continentCountries = countries
    .sort((a, b) => (a.casesPerOneMillion < b.casesPerOneMillion ? 1 : -1))

    .filter((country) => country.continent === region);
  // Map Country Names && country.population > 1000000
  const countryNames = countries
    .filter(
      (country) => country.continent === region
      //   && country.country.length <= 12
    )

    .map((selectedCountry) => selectedCountry.country);

  // .filter((country) => country.country.length <= 12)
  //   console.log(continentCountries);

  //Max Stats
  const max = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.casesPerOneMillion)
  );
  console.log(continentCountries);
  console.log(max, "MAX");

  const maxName = countries
    .filter(
      (country) =>
        country.continent === region &&
        // country.country.length <= 12 &&
        country.casesPerOneMillion === max
    )
    .map((selectedCountry) => selectedCountry.country);

  const maxActive = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.activePerOneMillion)
  );
  console.log(continentCountries);

  const maxActiveName = countries
    .filter(
      (country) =>
        country.continent === region &&
        // country.country.length <= 12 &&
        country.activePerOneMillion === maxActive
    )
    .map((selectedCountry) => selectedCountry.country);

  const maxTests = Math.max(
    ...continentCountries.map((item) => item.testsPerOneMillion)
  );

  const maxTestsName = continentCountries
    .filter(
      (country) =>
        //   country.country.length <= 12 &&
        country.testsPerOneMillion === maxTests
    )
    .map((selectedCountry) => selectedCountry.country);

  const maxCritical = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.criticalPerOneMillion)
  );
  const maxCriticalName = countries
    .filter(
      (country) =>
        country.continent === region &&
        // country.country.length <= 12 &&
        country.criticalPerOneMillion === maxCritical
    )
    .map((selectedCountry) => selectedCountry.country);

  const maxDeaths = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.deathsPerOneMillion)
  );
  const maxDeathsName = countries
    .filter(
      (country) =>
        country.continent === region &&
        // country.country.length <= 12 &&
        country.deathsPerOneMillion === maxDeaths
    )
    .map((selectedCountry) => selectedCountry.country);

  const maxRecovered = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.recoveredPerOneMillion)
  );
  const maxRecoveredName = countries
    .filter(
      (country) =>
        country.continent === region &&
        // country.country.length <= 12 &&
        country.recoveredPerOneMillion === maxRecovered
    )
    .map((selectedCountry) => selectedCountry.country);

  //   console.log(deathsPerOneMillion, "deathsPerOneMillion");
  const mortalityRate = continentCountries.map((selectedCountry) =>
    (
      (selectedCountry.deathsPerOneMillion /
        selectedCountry.casesPerOneMillion) *
      100
    ).toFixed(2)
  );

  const mortalityMillion = continentCountries.map((selectedCountry) =>
    (
      (selectedCountry.deathsMillion / selectedCountry.casesMillion) *
      100
    ).toFixed(2)
  );

  //Map mortality rate for those countries
  const casesPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.casesPerOneMillion / 1000).toFixed(1)
  );
  const deathsPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.deathsPerOneMillion / 1000).toFixed(2)
  );
  const activePerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.activePerOneMillion / 1000).toFixed(2)
  );
  const criticalPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.criticalPerOneMillion / 1000).toFixed(2)
  );
  const testsPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.testsPerOneMillion / 1000).toFixed(0)
  );
  const recoveredPerOneMillion = continentCountries.map((selectedCountry) =>
    (selectedCountry.recoveredPerOneMillion / 1000).toFixed(0)
  );

  //Color Schemes
  const colorMortality = [];
  for (let i = 0; i < mortalityRate.length; i++) {
    if (mortalityRate[i] < 1.0) {
      colorMortality.push("#444e86");
    }
    if (mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) {
      colorMortality.push("#955196");
    }
    if (mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.5) {
      colorMortality.push("#ffa600");
    }
    if (mortalityRate[i] >= 3.5 && mortalityRate[i] < 6.0) {
      colorMortality.push("#ff6e54");
    }
    if (mortalityRate[i] >= 6.0) {
      colorMortality.push("#dd5182");
    }
  }

  const colorCases = [];
  for (let i = 0; i < casesPerOneMillion.length; i++) {
    if (casesPerOneMillion[i] < 50) {
      colorCases.push("#ffaf1d");
    }
    if (casesPerOneMillion[i] >= 50 && casesPerOneMillion[i] < 100) {
      colorCases.push("#ff9435");
    }
    if (casesPerOneMillion[i] >= 100 && casesPerOneMillion[i] < 150) {
      colorCases.push("#ff7744");
    }
    if (casesPerOneMillion[i] >= 150 && casesPerOneMillion[i] < 350) {
      colorCases.push("#ff534f");
    }
    if (casesPerOneMillion[i] >= 350) {
      colorCases.push("#ff1558");
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
    if (deathsPerOneMillion[i] >= 1.5 && deathsPerOneMillion[i] < 3.5) {
      colorDeaths.push("#ff6e54");
    }
    if (deathsPerOneMillion[i] >= 3.5) {
      colorDeaths.push("#dd5182");
    }
  }

  const colorCase = [];
  for (let i = 0; i < casesMillion.length; i++) {
    if (casesMillion[i] / 1000 < 50) {
      colorCase.push("#5d67a1");
      //   blue
    }
    if (casesMillion[i] / 1000 >= 50 && casesMillion[i] / 1000 < 100) {
      colorCase.push("#955196");
    }
    if (casesMillion[i] / 1000 >= 100 && casesMillion[i] / 1000 < 150) {
      colorCase.push("#cf8c11");
    }
    if (casesMillion[i] / 1000 >= 150 && casesMillion[i] / 1000 < 350) {
      colorCase.push("#ff6e54");
    }
    if (casesMillion[i] / 1000 >= 350) {
      colorCase.push("#dd5182");
      //   pink
    }
  }

  const colorDeath = [];
  for (let i = 0; i < deathsMillion.length; i++) {
    if (deathsMillion[i] / 1000 < 0.5) {
      colorDeath.push("#5d67a1");
    }
    if (deathsMillion[i] / 1000 >= 0.5 && deathsMillion[i] / 1000 < 1.0) {
      colorDeath.push("#955196");
    }
    if (deathsMillion[i] / 1000 >= 1.0 && deathsMillion[i] / 1000 < 1.5) {
      colorDeath.push("#ffa600");
    }
    if (deathsMillion[i] / 1000 >= 1.5 && deathsMillion[i] / 1000 < 3.5) {
      colorDeath.push("#cf8c11");
    }
    if (deathsMillion[i] / 1000 >= 3.5) {
      colorDeath.push("#dd5182");
    }
  }

  const colorActivity = [];
  for (let i = 0; i < casesPerOneMillion.length; i++) {
    if (casesPerOneMillion[i] < 50) {
      colorActivity.push("#00a5f1");
      //   blue
    }
    if (casesPerOneMillion[i] >= 50 && casesPerOneMillion[i] < 100) {
      colorActivity.push("#ad93f9");
    }
    if (casesPerOneMillion[i] >= 100 && casesPerOneMillion[i] < 150) {
      colorActivity.push("#ffa600");
    }
    if (casesPerOneMillion[i] >= 150 && casesPerOneMillion[i] < 350) {
      colorActivity.push("#ff7972");
    }
    if (casesPerOneMillion[i] >= 350) {
      colorActivity.push("#ff76c8");
      //   pink
    }
  }

  const colorActive = [];
  for (let i = 0; i < activeMillion.length; i++) {
    if (activeMillion[i] / 1000 < 5) {
      colorActive.push("#5d67a1");
    }
    if (activeMillion[i] / 1000 >= 5 && activeMillion[i] / 1000 < 10) {
      colorActive.push("#955196");
    }
    if (activeMillion[i] / 1000 >= 10 && activeMillion[i] / 1000 < 15) {
      colorActive.push("#cf8c11");
    }
    if (activeMillion[i] / 1000 >= 15 && activeMillion[i] / 1000 < 35) {
      colorActive.push("#ff6e54");
    }
    if (activeMillion[i] / 1000 >= 35) {
      colorActive.push("#dd5182");
    }
  }

  // const displayData = ({countries}) => {
  //   if (!countries.length)
  //     return (
  //       <tr>
  //         <td>{("noResults")}</td>
  //       </tr>
  //     );
    
  
  //   return countries.map((country, index) => {
  //     return (
  //       <tbody key={country.country} style={{color: "#fff"}}>
     
  //         <tr>
       
  //           <td>
  //             {/* <img
  //               src={country["countryInfo"]["flag"]}
  //               alt=""
  //               width="30px"
  //               height="20px"
  //               className="mr-2 d-none d-sm-inline"
  //             ></img> */}
  //             {country.country}
  //           </td>
  //           <td>{numberWithCommas(country["cases"])}</td>
  //           <td>{numberWithCommas(country["deaths"])}</td>
  //           <td>{numberWithCommas(country["recovered"])}</td>
  //           {/* <td>{numberWithCommas(country["todayCases"])}</td> */}
  //           {/* <td>{numberWithCommas(country["todayDeaths"])}</td> */}
  //         </tr>
  //       </tbody>
  //     );
  //   });
  // };

  const tabItems = [
    {
      id: 1,
      title: "Cases",
      content: (
        <>
          <Row style={{ height: "90vh", border: "" }} className="px-3">
         
            {/* COLUMN ONE */}
            <Col className="subtitle" style={{ maxWidth: "50%" }}>
             
              <Row
                className="box mb-2 pt-4 pb-3 "
                style={{
                  color: "#ccc",
                  //   border: "2px solid",
                  //   borderColor: colorCase[index],
                  //   borderRadius: "5px",
                }}
              >
                <div className="pr-3 pl-0" style={{}}>
             
                  <h1 className="mb-0">
                    {(casesMillion[index] / 1000).toFixed(1)}
                    {casesPerOneMillion[0] / 1000 <=
                    casesPerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: colorCase[index] }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: colorCase[index] }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h1>
                  <h6 style={{ color: colorCase[index] }}>Cases/1k</h6>
                </div>
                <Animated animationIn="fadeInUp" isVisible={true}>
                  <div style={{ color: colorActive[index] }}>Today&nbsp;</div>
                  <strong className="mb-0">
                    +
                    {numberWithCommas(
                      (todayCases[index] / 1000).toFixed(0) + "k"
                    )}
                  </strong>
                </Animated>
                {casesMillion[index] / 1000 <= 50 ? (
                  <Badge
                    variant="success"
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: colorCase[index] }}
                  >
                    MILD
                  </Badge>
                ) : casesMillion[index] / 1000 <= 100 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: colorCase[index] }}
                  >
                    LIMITED
                  </Badge>
                ) : casesMillion[index] / 1000 <= 150 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: colorCase[index] }}
                  >
                    MODERATE
                  </Badge>
                ) : casesMillion[index] / 1000 <= 350 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: colorCase[index] }}
                  >
                    SERIOUS
                  </Badge>
                ) : (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: colorCase[index] }}
                  >
                    EXTREME
                  </Badge>
                )}
              </Row>
              {/* <Row
                style={{
                  color: "#ccc",
                  border: "1px solid",
                  borderColor: "#2a3d3d",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                }}
              >
                <HorizontalBar
                  height={13}
                  width={100}
                  options={{
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

                    responsive: true,
                    maintainAspectRatio: true,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        fontSize: 12,
                      },
                    },
                    layout: {
                      padding: {
                        left: 0,
                        right: 10,
                        top: 0,
                        bottom: 0,
                      },
                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          stacked: true,
                          type: "logarithmic",
                        },
                      ],
                      yAxes: [
                        {
                          display: false,
                        },
                      ],
                    },
                  }}
                  data={{
                    labels: [region],
                    datasets: [
                      {
                        label: "Active",
                        // backgroundColor: "#d61e73",
                        backgroundColor: colorActive[index],
                        borderColor: "#212529",
                        borderWidth: 1,
                        data: [activeMillion[index] / 1000],
                        stack: 0,
                      },

                      {
                        label: "Cases",
                        backgroundColor: colorCase[index],
                        borderColor: "#212529",
                        borderWidth: 1,
                        data: [casesMillion[index] / 1000],
                        stack: 0,
                      },
                      {
                        label: "Tests",
                        backgroundColor: "teal",
                        borderColor: "#212529",
                        borderWidth: 1,
                        data: [testsMillion[index] / 10000],
                        stack: 0,
                      },
                    ],
                  }}
                />
              </Row> */}

              <Row className="subtitle mt-2">
                <Col className="box pb-4 pt-3 px-2 mr-2">
                  <div style={{ color: colorActive[index] }}>Active&nbsp;</div>
                  <strong className="">
                    {(
                      (activeMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>

                <Col className="box pb-4 pt-3 px-2">
                  <div className="" style={{ color: "teal" }}>
                    Positive&nbsp;
                  </div>
                  <strong>
                    {numberWithCommas(
                      (
                        (casesMillion[index] / testsMillion[index]) *
                        100
                      ).toFixed(2) + "%"
                    )}
                  </strong>
                </Col>
              </Row>

              <Row className="subtitle box pt-1 mt-2">
                <Line
                  width={160}
                  height={120}
                  options={{
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                    scales: {
                      yAxes: [
                        {
                          // display: false,
                          // stacked: true,
                          type: "logarithmic",
                          display: false,
                        },
                      ],
                      xAxes: [
                        {
                          // display: false,
                        },
                      ],
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
                    },
                  }}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Active",
                        data: activePerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: colorActive[index],
                      },
                      {
                        label: "Cases",
                        data: casesPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: colorCase[index],
                      },
                      {
                        label: "Tests",
                        data: testsPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: "teal",
                      },
                    ],
                  }}
                />
              </Row>

              <Row className="mt-2">
                <Col className="box px-2 pt-4 pb-3 mr-2">
                  <h4 className="mb-0">
                    {(activeMillion[index] / 1000).toFixed(2)}
                    {activePerOneMillion[0] / 1000 <=
                    activePerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: colorActive[index] }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: colorActive[index] }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h4>
                  <h6 style={{ color: colorActive[index] }}>Active/1k</h6>

                  <h6>
                    {" "}
                    {activeMillion[index] / 1000 <= 5 ? (
                      <Badge
                        variant="success"
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        MILD
                      </Badge>
                    ) : activeMillion[index] / 1000 <= 10 ? (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        LIMITED
                      </Badge>
                    ) : activeMillion[index] / 1000 <= 15 ? (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        MODERATE
                      </Badge>
                    ) : activeMillion[index] / 1000 <= 35 ? (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        SERIOUS
                      </Badge>
                    ) : (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        EXTREME
                      </Badge>
                    )}
                  </h6>
                </Col>
                <Col className="box px-2 pt-4 pb-3">
                  <h4 className="mb-0">
                    {(testsMillion[index] / 1000).toFixed(0)}
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
                  </h4>
                  <h6 style={{ color: "teal" }}>Tests/1k</h6>
                </Col>
              </Row>

              <DoughnutCases
                casesMillion={casesMillion}
                activeMillion={activeMillion}
                index={index}
                colorsPie={colorsPie}
                continentCountries={continentCountries}
              />

              <Row className="box subtitle mt-2 pt-1">
                {casesMillion[index] / 1000 < 50 ? (
                  <h6>&nbsp;Mild</h6>
                ) : casesMillion[index] / 1000 < 100 ? (
                  <h6>&nbsp;Limited</h6>
                ) : casesMillion[index] / 1000 < 150 ? (
                  <h6>&nbsp;Moderate</h6>
                ) : casesMillion[index] / 1000 < 350 ? (
                  <h6>&nbsp;Serious</h6>
                ) : (
                  <h6>&nbsp;Extreme</h6>
                )}

                <h6>&nbsp;cases and </h6>

                {activeMillion[index] / 1000 < 5 ? (
                  <h6>&nbsp;mild </h6>
                ) : activeMillion[index] / 1000 < 10 ? (
                  <h6>&nbsp;limited </h6>
                ) : activeMillion[index] / 1000 < 15 ? (
                  <h6>&nbsp;moderate </h6>
                ) : activeMillion[index] / 1000 < 35 ? (
                  <h6>&nbsp;serious </h6>
                ) : (
                  <h6>&nbsp;extreme </h6>
                )}
                <h6>&nbsp;activity with&nbsp;</h6>

                {testsMillion[index] / 1000 < 100 ? (
                  <h6>very low</h6>
                ) : testsMillion[index] / 1000 < 1000 ? (
                  <h6>limited</h6>
                ) : testsMillion[index] / 1000 < 1500 ? (
                  <h6>moderate</h6>
                ) : testsMillion[index] / 1000 < 3500 ? (
                  <h6>high</h6>
                ) : (
                  <h6>very high</h6>
                )}
                <h6>&nbsp;testing.</h6>
              </Row>

              {/* <Row className="subtitle mt-2 ">
                <Col className="box py-3 px-2 mr-2" >
            
                </Col>
          
                <Col className="box py-3 px-2">
                  <div style={{ color: "teal" }}>Tests&nbsp;</div>
                  <strong className="mb-0">
                    {(tests[index] / population[index]).toFixed(2)}pp
                  </strong>
                </Col>
                </Row> */}
            </Col>

            {/* COLUMN TWO */}
           
            <Col
              className="ml-2 "
              style={{
                height: "100%",
                overflowY: "scroll",
                maxWidth: "50%",
                // marginRight: "5px",
              }}
            >
              {/* <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              >
                <Form.Control type="email" placeholder="Search" />
              </Form.Group> */}

              <HorizontalChart
                countryNames={countryNames}
                activePerOneMillion={activePerOneMillion}
                colorActivity={colorActivity}
                casesPerOneMillion={casesPerOneMillion}
                colorCases={colorCases}
                testsPerOneMillion={testsPerOneMillion}
                casesMillion={casesMillion}
                activeMillion={activeMillion}
                testsMillion={testsMillion}
                index={index}
                region={region}
                colorCase={colorCase}
              />
              <Row className="box subtitle px-4 pb-1 pt-2 mt-2">
                <a id={maxName}>
                  {maxName}&nbsp;
                  {numberWithCommas((max / 1000).toFixed(1))} &nbsp;
                  <h6 style={{ color: colorCase[index] }}>
                    Most Cases/1k &nbsp;
                  </h6>
                </a>
              </Row>
              <Row className="box subtitle px-4 mt-2 pb-1 pt-2">
                {maxActiveName}&nbsp;
                {numberWithCommas((maxActive / 1000).toFixed(1))} &nbsp;
                <h6 style={{ color: colorActive[index] }}>
                  Most Active/1k &nbsp;
                </h6>
              </Row>
              <Row className="box subtitle px-4 mt-2 pb-1 pt-2">
                {maxTestsName}&nbsp;
                {numberWithCommas((maxTests / 1000).toFixed(0))} &nbsp;
                <h6 style={{ color: "teal" }}>Most Tests/1k &nbsp;</h6>
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
          <Row style={{ height: "90vh", border: "" }} className="px-3">
            {/* COLUMN ONE */}
            <Col className="subtitle" style={{ maxWidth: "50%" }}>
              <Row
                className="box mb-2"
                style={{
                  color: "#ccc",
                  //   border: "2px solid",
                  //   borderColor: colorCase[index],
                  //   borderRadius: "5px",
                }}
              >
                <div className=" px-3" style={{}}>
                  <h1 className="mb-0">
                    {/* <CountUp
                  start={(casesMillion[index] / 1000).toFixed(1) - 5}
                  end={(casesMillion[index] / 1000).toFixed(1)}
                  duration={0.2}
                  separator=","
                  decimals={1}
                /> */}
                    {(deathsMillion[index] / 1000).toFixed(2)}
                    {deathsPerOneMillion[0] / 1000 <=
                    deathsPerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: colorDeath[index] }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: colorDeath[index] }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h1>
                  <h6 style={{ color: colorDeath[index] }}>Deaths/1k</h6>
                </div>
              </Row>
              <Row
                style={{
                  color: "#ccc",
                  border: "1px solid",
                  borderColor: "#2a3d3d",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                }}
              >
                <HorizontalBar
                  height={12}
                  width={100}
                  options={{
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

                    responsive: true,
                    maintainAspectRatio: true,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        fontSize: 12,
                      },
                    },
                    layout: {
                      padding: {
                        left: 0,
                        right: 10,
                        top: 0,
                        bottom: 0,
                      },
                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          stacked: true,
                          type: "logarithmic",
                        },
                      ],
                      yAxes: [
                        {
                          display: false,
                        },
                      ],
                    },
                  }}
                  data={{
                    labels: [region],
                    datasets: [
                      {
                        label: "Critical",
                        backgroundColor: "#d61e73",
                        borderColor: "turquoise",
                        borderWidth: 1,
                        data: [criticalMillion[index] / 1000],
                        stack: 0,
                      },

                      {
                        label: "Deaths",
                        backgroundColor: colorDeath[index],
                        borderColor: "turquoise",
                        borderWidth: 1,
                        data: [deathsMillion[index] / 1000],
                        stack: 0,
                      },
                      {
                        label: "Recovered",
                        backgroundColor: "teal",
                        borderColor: "turquoise",
                        borderWidth: 1,
                        data: [recoveredMillion[index] / 10000],
                        stack: 0,
                      },
                    ],
                  }}
                />
              </Row>

              <Row className="mt-2">
                <Col
                  className="box p-1 mr-1"
                  //   style={{ border: "2px solid #e83e8c", borderRadius: "5px" }}
                >
                  <h4 className="mb-0">
                    {(criticalMillion[index] / 1).toFixed(2)}
                    {criticalPerOneMillion[0] / 1 <=
                    criticalPerOneMillion[5] / 1 ? (
                      <i
                        style={{ fontSize: "0.7em", color: "#e83e8c" }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: "#e83e8c" }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h4>
                  <h6 style={{ color: "#e83e8c" }}>Critical</h6>
                </Col>
                <Col
                  className="box p-1"
                  //   style={{ border: "2px solid teal", borderRadius: "5px" }}
                >
                  <h4 className="mb-0">
                    {(recoveredMillion[index] / 1000).toFixed(0)}
                    {recoveredPerOneMillion[0] / 1000 <=
                    recoveredPerOneMillion[5] / 1000 ? (
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
                  </h4>
                  <h6 style={{ color: "teal" }}>Recovered/1k</h6>
                </Col>
              </Row>

              {/* <h6>
                {" "}
                {(activeMillion[index] / 1000).toFixed(2)}Active/1,000
              </h6>{" "}
              <h6>{(testsMillion[index] / 1000).toFixed(2)}Tests/1,000</h6> */}

              <Row className="subtitle box pt-1 mt-2">
                {/* <div
                className="pt-1 pb-1 ml-0"
                style={{ color: "grey", fontSize: "14px" }}
              >
                Cases Trend
              </div> */}
                <Line
                  width={160}
                  height={120}
                  options={{
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                    scales: {
                      yAxes: [
                        {
                          // display: false,
                          // stacked: true,
                          type: "logarithmic",
                          display: false,
                        },
                      ],
                      xAxes: [
                        {
                          // display: false,
                        },
                      ],
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
                    },
                  }}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Critical",
                        data: criticalPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: "#e83e8c",
                      },
                      {
                        label: "Deaths",
                        data: deathsPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: colorDeath[index],
                      },
                      {
                        label: "Recovered",
                        data: recoveredPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: "teal",
                      },
                    ],
                  }}
                />
              </Row>

              <DoughnutDeaths
                deathsMillion={deathsMillion}
                criticalMillion={criticalMillion}
                recoveredMillion={recoveredMillion}
                index={index}
                colorsPie={colorsPie}
                continentCountries={continentCountries}
              />

              <Row className="subtitle mt-2">
                <Col className="box py-4" xs={6}>
                  <span style={{ color: "#d61e73" }}>Critical&nbsp;</span>
                  {(criticalMillion[index] / deathsMillion[index]) * 100 <=
                  2.5 ? (
                    <Badge
                      variant="success"
                      text="dark"
                      className="badge"
                      style={{ zIndex: 1 }}
                    >
                      LOW
                    </Badge>
                  ) : (criticalMillion[index] / deathsMillion[index]) * 100 >=
                    4.5 ? (
                    <Badge
                      variant="danger"
                      text="dark"
                      className="badge"
                      style={{ zIndex: 1 }}
                    >
                      HIGH
                    </Badge>
                  ) : (
                    " "
                  )}
                  <strong className="mb-0">
                    {(
                      (criticalMillion[index] / deathsMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>
                <Col className="box py-4 px-4" xs={6}>
                  <span style={{ color: colorDeath[index] }}>Today&nbsp;</span>
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
                  <strong className="mb-0">
                    +{numberWithCommas((todayDeaths[index] / 1).toFixed(0))}
                  </strong>
                </Col>

                <Col className="box py-4" xs={6}>
                  <span style={{ color: "teal" }}>Recovered &nbsp;</span>
                  <span>
                    {(recovered[index] / cases[index]) * 100 <= 100 ? (
                      <Badge
                        variant="danger"
                        text="dark"
                        className="badge"
                        style={{ zIndex: 1 }}
                      >
                        POOR
                      </Badge>
                    ) : (recovered[index] / cases[index]) * 100 >= 250 ? (
                      <Badge
                        variant="success"
                        text="dark"
                        className="badge"
                        style={{ zIndex: 1 }}
                      >
                        GOOD
                      </Badge>
                    ) : (
                      " "
                    )}
                  </span>
                  <strong className="mb-0">
                    {(recovered[index] / cases[index]).toFixed(2)}pp
                  </strong>
                </Col>
                <Col className="box pt-2" style={{ color: "teal" }} xs={6}>
                  {(recovered[index] / cases[index]).toFixed(0) <= 0.5 ? (
                    <>
                      <h2 className="mb-0">
                        <i
                          className="fa fa-male"
                          style={{ color: "#474747" }}
                        ></i>
                        <i
                          className="fa fa-female"
                          style={{ color: "#474747" }}
                        ></i>
                      </h2>
                      <h2>
                        <i
                          className="fa fa-male"
                          style={{ color: "#474747" }}
                        ></i>
                        <i
                          className="fa fa-female"
                          style={{ color: "#474747" }}
                        ></i>
                      </h2>
                    </>
                  ) : (recovered[index] / cases[index]).toFixed(0) <= 1.5 ? (
                    <>
                      <h2 className="mb-0">
                        <i className="fa fa-male"></i>
                        <i
                          className="fa fa-female"
                          style={{ color: "#474747" }}
                        ></i>
                      </h2>
                      <h2>
                        <i
                          className="fa fa-male"
                          style={{ color: "#474747" }}
                        ></i>
                        <i
                          className="fa fa-female"
                          style={{ color: "#474747" }}
                        ></i>
                      </h2>
                    </>
                  ) : (recovered[index] / cases[index]).toFixed(0) <= 2.5 ? (
                    <>
                      <h2 className="mb-0">
                        <i className="fa fa-male"></i>
                        <i className="fa fa-female"></i>
                      </h2>
                      <h2>
                        <i
                          className="fa fa-male"
                          style={{ color: "#474747" }}
                        ></i>
                        <i
                          className="fa fa-female"
                          style={{ color: "#474747" }}
                        ></i>
                      </h2>
                    </>
                  ) : (recovered[index] / cases[index]).toFixed(0) <= 3.5 ? (
                    <>
                      <h2 className="mb-0">
                        <i className="fa fa-male"></i>
                        <i className="fa fa-female"></i>
                      </h2>
                      <h2>
                        <i className="fa fa-male"></i>
                        <i
                          className="fa fa-female"
                          style={{ color: "#474747" }}
                        ></i>
                      </h2>
                    </>
                  ) : (
                    <>
                      <h2 className="mb-0">
                        <i className="fa fa-male"></i>
                        <i className="fa fa-female"></i>
                      </h2>
                      <h2>
                        <i className="fa fa-male"></i>
                        <i className="fa fa-female"></i>
                      </h2>
                    </>
                  )}
                </Col>
              </Row>

              {/* <div
              className="pt-3 pb-2 ml-4"
              style={{ color: "grey", fontSize: "14px" }}
            >
              Cases Statistics
            </div> */}
            </Col>

            {/* COLUMN TWO */}

            <Col
              className="ml-2 "
              style={{
                height: "97%",
                overflowY: "scroll",

                maxWidth: "50%",
                // marginRight: "5px",
              }}
            >
              <Row className="box subtitle px-4">
                <strong>
                  {maxDeathsName}&nbsp;
                  {numberWithCommas((maxDeaths / 1000).toFixed(2))} &nbsp;
                </strong>
                <h6 style={{ color: colorDeath[index] }}>
                  Most Deaths/1k &nbsp;
                </h6>
              </Row>
              <Row className="box subtitle px-4 mt-2">
                <strong >
                  {maxCriticalName}&nbsp;
                  {numberWithCommas((maxCritical / 1000).toFixed(2))} &nbsp;
                </strong>
                <h6 style={{ color: "#d61e73" }}>Most Critical/1k &nbsp;</h6>
              </Row>
              <Row className="box subtitle px-3 mt-2">
                <strong>
                  {maxRecoveredName}&nbsp;
                  {numberWithCommas((maxRecovered / 1000).toFixed(0))} &nbsp;
                </strong>
                <h6 style={{ color: "teal" }}>Most Recovered/1k &nbsp;</h6>
              </Row>
              <HorizontalChart
                countryNames={countryNames}
                criticalPerOneMillion={criticalPerOneMillion}
                //   colorCritical={colorCritical}
                deathsPerOneMillion={deathsPerOneMillion}
                colorDeaths={colorDeaths}
                recoveredPerOneMillion={recoveredPerOneMillion}
                deathsMillion={deathsMillion}
                criticalMillion={criticalMillion}
                recoveredMillion={recoveredMillion}
                index={index}
                region={region}
                colorCase={colorCase}
                colorActivity={colorActivity}
              />

              {/* <Row
      className={"box mt-2"}
      style={{
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ color: "grey", fontSize: "14px" }} className="pt-2">
        Country Stats / 1k
      </div>

      <HorizontalBar
        height={countryNames.length * 40}
        options={{

          tooltips: {
            yPadding: 10,
            xPadding: 10,
            xAlign: "right",
            cornerRadius: 2,
            backgroundColor: "#212529",

            borderColor: "turquoise",
            borderWidth: 1,
            displayColors: true,
            bodyFontSize: 12,

            labels: {
              usePointStyle: true,
              labelFontColor: "orange",
              pointColor: "red",
            },
          },
          responsive: true,
          maintainAspectRatio: true,
          hover: {
            mode: "index",
            intersect: false,
          },
          legend: {
            display: false,
            position: "bottom",
            labels: {
              usePointStyle: true,
              fontSize: 12,
              fontColor: "#fff",
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 10,
              top: 0,
              bottom: 0,
            },
          },
          scales: {
            xAxes: [
              {
                display: false,
                type: "logarithmic",
              },
            ],
          },
        }}
        data={{
          labels: countryNames,
          datasets: [
      
            {
              label: "Critical",
              data: criticalPerOneMillion,
              backgroundColor: "#d61e73",
              stack: "0",
            },
            {
              label: "Deaths",
              data: deathsPerOneMillion,
              backgroundColor: colorDeaths,
              stack: "0",
            },

            {
              label: "Recovered",
              data: recoveredPerOneMillion,
              backgroundColor: "teal",
              stack: "0",
            },
          ],
       
        }}
      />
    </Row> */}
            </Col>
          </Row>
        </>
      ),
    },

    {
      id: 3,
      title: "Mortality",
      content: (
        <>
          <Row style={{ height: "90vh", border: "" }} className="px-3">
            {/* COLUMN ONE */}
            <Col className="subtitle" style={{ maxWidth: "50%" }}>
              <Row
                className="box mb-2 pt-3 pb-3 "
                style={{
                  color: "#ccc",
                  //   border: "2px solid",
                  //   borderColor: colorCase[index],
                  //   borderRadius: "5px",
                }}
              >
                <div className="pr-3 pl-0" style={{}}>
                  <h1 className="mb-0">
                    {(
                      (deathsMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                    {mortalityRate[0] / 1000 <= mortalityRate[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: "currentcolor" }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: "currentcolor" }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h1>
                  <h6 style={{ color: "currentcolor" }}>Mortality</h6>
                </div>
                <Animated animationIn="fadeInUp" isVisible={true}>
                  <div style={{ color: colorMortality[index] }}>
                    Today&nbsp;
                  </div>
                  <strong className="mb-0">
                    +
                    {numberWithCommas(
                      ((todayDeaths[index] / todayCases[index]) * 1000).toFixed(
                        2
                      ) + "%"
                    )}
                  </strong>
                </Animated>
                {((deathsMillion[index] / casesMillion[index]) * 100).toFixed(
                  2
                ) <= 0.5 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: "#5d67a1" }}
                  >
                    MILD
                  </Badge>
                ) : (
                    (deathsMillion[index] / casesMillion[index]) *
                    100
                  ).toFixed(2) <= 1 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: "#955196" }}
                  >
                    LIMITED
                  </Badge>
                ) : (
                    (deathsMillion[index] / casesMillion[index]) *
                    100
                  ).toFixed(2) <= 1.5 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: "#ffa400" }}
                  >
                    MODERATE
                  </Badge>
                ) : (
                    (deathsMillion[index] / casesMillion[index]) *
                    100
                  ).toFixed(2) <= 2 ? (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: "#ff6e54" }}
                  >
                    SERIOUS
                  </Badge>
                ) : (
                  <Badge
                    text="dark"
                    className="badge"
                    style={{ zIndex: 1, backgroundColor: "#dd5182" }}
                  >
                    EXTREME
                  </Badge>
                )}
              </Row>

              <Row
                style={{
                  color: "#ccc",
                  border: "1px solid",
                  borderColor: "#2a3d3d",
                  borderRadius: "5px",
                  paddingLeft: "10px",
                }}
              >
                <HorizontalBar
                  height={13}
                  width={100}
                  options={{
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

                    responsive: true,
                    maintainAspectRatio: true,
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      display: false,
                      position: "bottom",
                      labels: {
                        usePointStyle: true,
                        fontSize: 12,
                      },
                    },
                    layout: {
                      padding: {
                        left: 0,
                        right: 10,
                        top: 0,
                        bottom: 0,
                      },
                    },
                    scales: {
                      xAxes: [
                        {
                          display: false,
                          stacked: true,
                          type: "logarithmic",
                        },
                      ],
                      yAxes: [
                        {
                          display: false,
                        },
                      ],
                    },
                  }}
                  data={{
                    labels: [region],
                    datasets: [
                      // {
                      //   label: "Active",
                      //   // backgroundColor: "#d61e73",
                      //   backgroundColor: colorActive[index],
                      //   borderColor: "#212529",
                      //   borderWidth: 1,
                      //   data: [activeMillion[index] / 1000],
                      //   stack: 0,
                      // },

                      {
                        label: "Mortality",
                        backgroundColor: colorMortality[index],
                        borderColor: "#212529",
                        borderWidth: 1,
                        data: mortalityRate[index],
                        stack: 0,
                      },
                      // {
                      //   label: "Tests",
                      //   backgroundColor: "teal",
                      //   borderColor: "#212529",
                      //   borderWidth: 1,
                      //   data: [testsMillion[index] / 10000],
                      //   stack: 0,
                      // },
                    ],
                  }}
                />
              </Row>

              <Row className="subtitle mt-2">
                <Col className="box pb-4 pt-3 px-2 mr-2">
                  <div style={{ color: colorActive[index] }}>Active&nbsp;</div>
                  <strong className="">
                    {(
                      (activeMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>

                <Col className="box pb-4 pt-3 px-2">
                  <div className="" style={{ color: "teal" }}>
                    Positive&nbsp;
                  </div>
                  <strong>
                    {numberWithCommas(
                      (
                        (casesMillion[index] / testsMillion[index]) *
                        100
                      ).toFixed(2) + "%"
                    )}
                  </strong>
                </Col>
              </Row>

              <Row className="subtitle box pt-1 mt-2">
                <Line
                  width={160}
                  height={120}
                  options={{
                    legend: {
                      display: false,
                      position: "bottom",
                    },
                    scales: {
                      yAxes: [
                        {
                          // display: false,
                          // stacked: true,
                          type: "logarithmic",
                          display: false,
                        },
                      ],
                      xAxes: [
                        {
                          // display: false,
                        },
                      ],
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
                    },
                  }}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        label: "Active",
                        data: activePerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: colorActive[index],
                      },
                      {
                        label: "Cases",
                        data: casesPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: colorCase[index],
                      },
                      {
                        label: "Tests",
                        data: testsPerOneMillion,
                        fill: true,
                        backgroundColor: "rgba(75,192,192,0.05)",
                        borderColor: "teal",
                      },
                    ],
                  }}
                />
              </Row>

              <Row className="mt-2">
                <Col className="box px-2 pt-4 pb-3 mr-2">
                  <h4 className="mb-0">
                    {(activeMillion[index] / 1000).toFixed(2)}
                    {activePerOneMillion[0] / 1000 <=
                    activePerOneMillion[5] / 1000 ? (
                      <i
                        style={{ fontSize: "0.7em", color: colorActive[index] }}
                        className="fa fa-arrow-up"
                      ></i>
                    ) : (
                      <i
                        style={{ fontSize: "0.7em", color: colorActive[index] }}
                        className="fa fa-arrow-down"
                      ></i>
                    )}
                  </h4>
                  <h6 style={{ color: colorActive[index] }}>Active/1k</h6>

                  <h6>
                    {" "}
                    {activeMillion[index] / 1000 <= 5 ? (
                      <Badge
                        variant="success"
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        MILD
                      </Badge>
                    ) : activeMillion[index] / 1000 <= 10 ? (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        LIMITED
                      </Badge>
                    ) : activeMillion[index] / 1000 <= 15 ? (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        MODERATE
                      </Badge>
                    ) : activeMillion[index] / 1000 <= 35 ? (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        SERIOUS
                      </Badge>
                    ) : (
                      <Badge
                        text="dark"
                        className="badge"
                        style={{
                          zIndex: 1,
                          backgroundColor: colorActive[index],
                        }}
                      >
                        EXTREME
                      </Badge>
                    )}
                  </h6>
                </Col>
                <Col className="box px-2 pt-4 pb-3">
                  <h4 className="mb-0">
                    {(testsMillion[index] / 1000).toFixed(0)}
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
                  </h4>
                  <h6 style={{ color: "teal" }}>Tests/1k</h6>
                </Col>
              </Row>

              <DoughnutCases
                casesMillion={casesMillion}
                activeMillion={activeMillion}
                index={index}
                colorsPie={colorsPie}
                continentCountries={continentCountries}
              />

              <Row className="box subtitle mt-2 pt-1">
                {casesMillion[index] / 1000 < 50 ? (
                  <h6>&nbsp;Mild</h6>
                ) : casesMillion[index] / 1000 < 100 ? (
                  <h6>&nbsp;Limited</h6>
                ) : casesMillion[index] / 1000 < 150 ? (
                  <h6>&nbsp;Moderate</h6>
                ) : casesMillion[index] / 1000 < 350 ? (
                  <h6>&nbsp;Serious</h6>
                ) : (
                  <h6>&nbsp;Extreme</h6>
                )}

                <h6>&nbsp;cases and </h6>

                {activeMillion[index] / 1000 < 5 ? (
                  <h6>&nbsp;mild </h6>
                ) : activeMillion[index] / 1000 < 10 ? (
                  <h6>&nbsp;limited </h6>
                ) : activeMillion[index] / 1000 < 15 ? (
                  <h6>&nbsp;moderate </h6>
                ) : activeMillion[index] / 1000 < 35 ? (
                  <h6>&nbsp;serious </h6>
                ) : (
                  <h6>&nbsp;extreme </h6>
                )}
                <h6>&nbsp;activity with&nbsp;</h6>

                {testsMillion[index] / 1000 < 100 ? (
                  <h6>very low</h6>
                ) : testsMillion[index] / 1000 < 1000 ? (
                  <h6>limited</h6>
                ) : testsMillion[index] / 1000 < 1500 ? (
                  <h6>moderate</h6>
                ) : testsMillion[index] / 1000 < 3500 ? (
                  <h6>high</h6>
                ) : (
                  <h6>very high</h6>
                )}
                <h6>&nbsp;testing.</h6>
              </Row>
            </Col>

            {/* COLUMN TWO */}

            <Col
              className="ml-2 "
              style={{
                height: "100%",
                overflowY: "scroll",
                maxWidth: "50%",
                // marginRight: "5px",
              }}
            >
              <Row className="box subtitle px-4 pb-1 pt-2">
                <a id={maxName}>
                  {maxName}&nbsp;
                  {numberWithCommas((max / 1000).toFixed(1))} &nbsp;
                  <h6 style={{ color: colorCase[index] }}>
                    Most Cases/1k &nbsp;
                  </h6>
                </a>
              </Row>
              <Row className="box subtitle px-4 mt-2 pb-1 pt-2">
                {maxActiveName}&nbsp;
                {numberWithCommas((maxActive / 1000).toFixed(1))} &nbsp;
                <h6 style={{ color: colorActive[index] }}>
                  Most Active/1k &nbsp;
                </h6>
              </Row>
              <Row className="box subtitle px-4 mt-2 pb-1 pt-2">
                {maxTestsName}&nbsp;
                {numberWithCommas((maxTests / 1000).toFixed(0))} &nbsp;
                <h6 style={{ color: "teal" }}>Most Tests/1k &nbsp;</h6>
              </Row>
              <HorizontalChart
                countryNames={countryNames}
                //   activePerOneMillion={activePerOneMillion}
                //   colorActivity={colorActivity}
                //   casesPerOneMillion={casesPerOneMillion}
                //   colorCases={colorCases}
                //   testsPerOneMillion={testsPerOneMillion}
                mortalityRate={mortalityRate}
                //   casesMillion={casesMillion}
                //   activeMillion={activeMillion}
                //   testsMillion={testsMillion}
                index={index}
                region={region}
                //   colorCase={colorCase}
              />
            </Col>
          </Row>
        </>
      ),
    },

    // {
    //   id: 3,
    //   title: "Mortality",
    //   // icon: <a id='check1'></a>,
    //   content: (
    //     <>
    //       <Row style={{ height: "86vh" }}>
    //         <Col className="mr-3 mt-2">
    //           <Row className="box p-2 ml-1 mb-0" style={{ color: "#ccc" }}>
    //             <h1 className="mb-0">
    //               {((deathsMillion[index] / casesMillion[index]) * 100).toFixed(
    //                 2
    //               )}
    //               {mortalityRate[0] / 1000 <= mortalityRate[5] / 1000 ? (
    //                 <i
    //                   style={{ fontSize: "0.7em", color: "green" }}
    //                   className="fa fa-arrow-up"
    //                 ></i>
    //               ) : (
    //                 <i
    //                   style={{ fontSize: "0.7em", color: "red" }}
    //                   className="fa fa-arrow-down"
    //                 ></i>
    //               )}
    //             </h1>

    //             <h5>Deaths / Cases</h5>
    //           </Row>

    //           <Row
    //             className={"box ml-1 mt-3 pb-2"}
    //             style={{
    //               color: "#ccc",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <div
    //               className="pt-5"
    //               style={{
    //                 position: "absolute",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 color: "grey",
    //               }}
    //             >
    //               {deathsMillion[index] / casesMillion[index] < 0.005 ? (
    //                 <h6>Mild</h6>
    //               ) : deathsMillion[index] / casesMillion[index] < 0.001 ? (
    //                 <h6>Contained</h6>
    //               ) : deathsMillion[index] / casesMillion[index] < 0.015 ? (
    //                 <h6>Moderate</h6>
    //               ) : deathsMillion[index] / casesMillion[index] < 0.02 ? (
    //                 <h6>Serious</h6>
    //               ) : (
    //                 <h6>Extreme</h6>
    //               )}
    //             </div>

    //             <div
    //               className="py-2 "
    //               style={{ color: "grey", fontSize: "14px" }}
    //             >
    //               Country Analysis
    //             </div>

    //             {/* <Doughnut
    //               width={170}
    //               options={{
    //                 elements: {
    //                   arc: {
    //                     borderWidth: 0,
    //                   },
    //                 },
    //                 legend: {
    //                   display: false,
    //                   position: "",
    //                 },
    //               }}
    //               data={{
    //                 labels: [
    //                   "Lowest Mortality",
    //                   "Lower Mortality",
    //                   "Average Mortality",
    //                   "Higher Mortality",
    //                   "Highest Mortality",
    //                 ],
    //                 datasets: [
    //                   {
    //                     data: [
    //                       lowest.length,
    //                       lower.length,
    //                       average.length,
    //                       higher.length,
    //                       highest.length,
    //                     ],
    //                     backgroundColor: colorsPie,
    //                   },
    //                 ],
    //               }}
    //             ></Doughnut> */}
    //           </Row>

    //           <Row className="subtitle box pt-1 ml-1 mt-3">
    //             <div
    //               className="pt-1 pb-1 ml-0"
    //               style={{ color: "grey", fontSize: "14px" }}
    //             >
    //               Mortality Trend
    //             </div>
    //             <Line
    //               width={160}
    //               height={110}
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
    //                     label: "Cases / 1000",
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
    //             className="pt-3 pb-3 ml-4"
    //             style={{ color: "grey", fontSize: "14px" }}
    //           >
    //             Mortality Statistics
    //           </div>
    //           <Row
    //             className="subtitle ml-1"
    //             style={{ border: "1px solid #2a3d3d", borderRadius: "5px" }}
    //           >
    //             <Col className="px-2 pt-3 pb-4 mr-1">
    //               Recovery
    //               {(activeMillion[index] / casesMillion[index]) * 100 <= 2.5 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (activeMillion[index] / casesMillion[index]) * 100 >=
    //                 4.5 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <strong className="mb-0">
    //                 {(
    //                   (recoveredMillion[index] / casesMillion[index]) *
    //                   100
    //                 ).toFixed(2)}
    //                 %
    //               </strong>
    //             </Col>
    //             <Col className="px-3 pt-3 pb-1 ml-1">
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
    //                 +{(todayRecovered[index] / 1000).toFixed(0) + "k"}
    //               </strong>
    //             </Col>
    //           </Row>
    //           <Row className="subtitle ml-0">
    //             <Col className="box p-2  mr-1 mt-3">
    //               {/* Deaths
    //               {(deathsMillion[index] / casesMillion[index]) * 100 <= 1.0 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (deathsMillion[index] / casesMillion[index]) * 100 >=
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
    //             <Col className="box px-4 py-3 ml-1 mt-3">
    //               Vac'd
    //               {(tests[index] / population[index]) * 100 <= 100 ? (
    //                 <Badge variant="danger" text="dark" className="badge">
    //                   LOW
    //                 </Badge>
    //               ) : (tests[index] / population[index]) * 100 >= 250 ? (
    //                 <Badge variant="success" text="dark" className="badge">
    //                   HIGH
    //                 </Badge>
    //               ) : (
    //                 " "
    //               )}
    //               <strong className="mb-0">
    //                 {(tests[index] / population[index]).toFixed(2) * 100}%
    //               </strong>
    //             </Col>
    //           </Row>
    //           <Row className=" ml-0"></Row>
    //         </Col>

    //         {/* COLUMN TWO */}
    //         <Col
    //           className=""
    //           style={{
    //             height: "100%",
    //             overflowY: "scroll",
    //           }}
    //         >
    //           <Row
    //             className={"box mr-0 mt-2"}
    //             style={{
    //               color: "#fff",
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //           >
    //             <div
    //               style={{ color: "grey", fontSize: "14px" }}
    //               className="pt-2"
    //             >
    //               Mortality Per Country
    //             </div>

    //             <HorizontalBar
    //               height={countryNames.length * 50}

    //               options={{
    //                 onClick: function (evt, element) {
    //                   if (element.length > 0) {
    //                     console.log(element, element[0]._datasetIndex);
    //                   }
    //                 },
    //                 maintainAspectRatio: true,
    //                 hover: {
    //                   mode: "index",
    //                   intersect: false,
    //                 },
    //                 legend: {
    //                   display: false,
    //                   position: "",
    //                 },
    //                 layout: {
    //                   padding: {
    //                     left: 20,
    //                     right: 0,
    //                     top: 0,
    //                     bottom: 0,
    //                   },
    //                 },
    //               }}
    //               data={{
    //                 labels: countryNames,
    //                 datasets: [
    //                   {
    //                     label: "Mortality/1000",
    //                     data: mortalityRate,
    //                     backgroundColor: backgroundcolor,
    //                   },
    //                 ],
    //               }}
    //             />

    //             {countryNames.length < 15 && (
    //               <>
    //                 <div
    //                   style={{ color: "grey", fontSize: "14px" }}
    //                   className="pt-2 pb-3"
    //                 >
    //                   Recovered Per Country
    //                 </div>
    //                 <div className="pt-2 pb-2"></div>
    //                 <HorizontalBar
    //                   height={countryNames.length * 50}
    //                   options={{
    //                     maintainAspectRatio: true,
    //                     legend: {
    //                       display: false,
    //                       position: "",
    //                     },
    //                     layout: {
    //                       padding: {
    //                         left: 20,
    //                         right: 0,
    //                         top: 0,
    //                         bottom: 0,
    //                       },
    //                     },
    //                   }}
    //                   data={{
    //                     labels: countryNames,
    //                     datasets: [
    //                       {
    //                         label: "Active/1000",
    //                         data: recoveredPerOneMillion,
    //                         backgroundColor: colorActive,
    //                       },
    //                     ],
    //                   }}
    //                 />
    //               </>
    //             )}
    //           </Row>
    //         </Col>
    //       </Row>
    //     </>
    //   ),
    // },

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
    <div className={open ? "visible" : "hidden"}>
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
            {/* <Button id='asia'>click</Button> */}
       
            
                
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

let colorsSpec = ["#0c99a0", " #0095d1", "#6880e6", " #d451bd", "  #ff1d5e"];
