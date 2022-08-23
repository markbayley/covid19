import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { HorizontalBar, Line, Doughnut } from "react-chartjs-2";
import Badge from "react-bootstrap/Badge";
import DoughnutCases from "./DoughnutCases";
import DoughnutDeaths from "./DoughnutDeaths";
import HorizontalChart from "./HorizontalChart";

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
  toggleGlobal,
}) => {
  console.log(testsMillion, "testsMillion");
  // Filter Countries in Region
  const continentCountries = countries

    .filter((country) => country.continent === region);
  // Map Country Names && country.population > 1000000

  const countryNames = continentCountries

    .map((selectedCountry) => selectedCountry.country);

  const [continentCountrys, setSampleData] = useState(continentCountries);
  const [sorted, setSorted] = useState(false);

  //Max Stats
  const max = Math.max(
    ...continentCountries
      //   .filter((country) => country.country.length <= 12)
      .map((item) => item.casesPerOneMillion)
  );

  // console.log(max, "MAX");

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
  // console.log(continentCountries);

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
  // console.log(deathsPerOneMillion, 'deathsPerOneMillion')
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
      colorMortality.push("#5748ff");
    }
    if (mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) {
      colorMortality.push("#a13ed5");
    }
    if (mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.5) {
      colorMortality.push("#ca32ad");
    }
    if (mortalityRate[i] >= 3.5 && mortalityRate[i] < 6.0) {
      colorMortality.push("#e72585");
    }
    if (mortalityRate[i] >= 6.0) {
      colorMortality.push("#ff125e");
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
      colorCase.push("#6a5dfc");
      //   blue
    }
    if (casesMillion[i] / 1000 >= 50 && casesMillion[i] / 1000 < 100) {
      colorCase.push("#a13ed5");
    }
    if (casesMillion[i] / 1000 >= 100 && casesMillion[i] / 1000 < 150) {
      colorCase.push("#ca32ad");
    }
    if (casesMillion[i] / 1000 >= 150 && casesMillion[i] / 1000 < 350) {
      colorCase.push("#e72585");
    }
    if (casesMillion[i] / 1000 >= 350) {
      colorCase.push("#ff125e");
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

  const tabItems = [
    {
      id: 1,
      title: "",
      icon: "",
      content: (
        <>
          <Row style={{ height: "95vh", border: "" }} className="pl-2 pr-2">
            {/* COLUMN ONE */}

            <Col
              className="subtitle"
              style={{ maxWidth: "100%", overflowY: "scroll", height: "100%" }}
            >
              <Row
                className="box-left mb-2 pt-4 pb-4 "
                style={{
                  color: "#ccc",
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
                  <h6 style={{ color: colorCase[index] }}>Total Cases/1k</h6>
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
                </div>
                <Animated animationIn="fadeInUp" isVisible={true}>
                  <div style={{ color: "#fff" }}>Today&nbsp;</div>
                  <strong className="mb-0">
                    +
                    {numberWithCommas(
                      (todayCases[index] / 1000).toFixed(1) + "k"
                    )}
                  </strong>
                </Animated>
              </Row>

              <Row className="subtitle mt-2">
                <Col className="box pb-4 pt-3 px-2 mr-2">
                  <div style={{ color: "slategrey" }}>Mortality&nbsp;</div>
                  <strong className="">
                    {(
                      (deathsMillion[index] / casesMillion[index]) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>
                </Col>
                <Col className="box pb-4 pt-3 px-2 mr-2">
                  <div style={{ color: "#ff9400" }}>Active&nbsp;</div>
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
                        borderColor: "#ff8300",
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
                    {(deathsMillion[index] / 1000).toFixed(2)}
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
                  </h4>
                  <h6 style={{ color: "slategrey" }}>Deaths/1k</h6>
                </Col>
                <Col className="box px-2 pt-4 pb-3 mr-2">
                  <h4 className="mb-0">
                    {(activeMillion[index] / 1000).toFixed(2)}
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
                  </h4>
                  <h6 style={{ color: "#ff9400" }}>Active/1k</h6>

                  <h6>
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

              <Row
                className={"box mt-2 pb-1"}
                style={{
                  color: "#ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DoughnutCases
                  casesMillion={casesMillion}
                  activeMillion={activeMillion}
                  index={index}
                  colorsPie={colorsPie}
                  continentCountries={continentCountries}
                  region={region}
                />

                <Row className="subtitle mt-2 pt-1 px-2">

                  {activeMillion[index] / 1000 < 5 ? (
                    <h6>&nbsp;Mild </h6>
                  ) : activeMillion[index] / 1000 < 10 ? (
                    <h6>&nbsp;Limited </h6>
                  ) : activeMillion[index] / 1000 < 15 ? (
                    <h6>&nbsp;Moderate </h6>
                  ) : activeMillion[index] / 1000 < 35 ? (
                    <h6>&nbsp;Serious </h6>
                  ) : (
                    <h6>&nbsp;Extreme </h6>
                  )}
                  <h6>&nbsp;active cases with&nbsp;</h6>

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
              </Row>

              <Row>
                {/* COLUMN TWO */}

                <Col
                  className="mt-2"
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <HorizontalChart
                    countryNames={countryNames}
                    activePerOneMillion={activePerOneMillion}
                    colorActivity={colorActivity}
                    casesPerOneMillion={casesPerOneMillion}
                    // colorCases={colorCases}
                    testsPerOneMillion={testsPerOneMillion}
                    casesMillion={casesMillion}
                    activeMillion={activeMillion}
                    testsMillion={testsMillion}
                    index={index}
                    region={region}
                    colorCase={colorCase}
                    continentCountries={continentCountries}
                    continentCountrys={continentCountrys}
                    sorted={sorted}
                  />
                </Col>
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
    <div className={open ? "visible" : "hidden"}>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >
        <div className="side">
          <Container>
            <Row className="title my-1">
              <Col xs="auto" className="pl-2">
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
                    onClick={toggleGlobal}
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


