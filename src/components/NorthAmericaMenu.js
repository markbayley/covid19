import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const NorthAmericaMenu = ({ state, toggleAsia, region, index, population, casesMillion,
  activeMillion, criticalMillion, deathsMillion, tests, countries
}) => {

  // Filter Countries in Region
  const continentCountries = countries.filter(country => country.continent === region)
  // Map Country Names
  const countryNames = continentCountries.map(selectedCountry => selectedCountry.country.substring(0, 12))
  //Map mortality rate for those countries
  const casesPerOneMillion = continentCountries.map(selectedCountry => (((selectedCountry.casesPerOneMillion) / 1000).toFixed(1)));
  const deathsPerOneMillion = continentCountries.map(selectedCountry => (((selectedCountry.deathsPerOneMillion) / 1000).toFixed(2)));
  const mortalityRate = continentCountries.map(selectedCountry => (((selectedCountry.deathsPerOneMillion / selectedCountry.casesPerOneMillion)) * 100).toFixed(2));
  const activePerOneMillion = continentCountries.map(selectedCountry => (((selectedCountry.activePerOneMillion) / 1000).toFixed(2)));
  const criticalPerOneMillion = continentCountries.map(selectedCountry => (((selectedCountry.criticalPerOneMillion) / 1000).toFixed(2)));
  const testsPerOneMillion = continentCountries.map(selectedCountry => (((selectedCountry.testsPerOneMillion) / 1000).toFixed(2)));
  // Create strata for classifting cases for doughnut charts
  const lowest = continentCountries.filter(selectedCountry => (selectedCountry.casesPerOneMillion / 1000 < 50));
  const lower = continentCountries.filter(selectedCountry => (selectedCountry.casesPerOneMillion / 1000 >= 50 && selectedCountry.casesPerOneMillion / 1000 < 100));
  const average = continentCountries.filter(selectedCountry => (selectedCountry.casesPerOneMillion / 1000 >= 100 && selectedCountry.casesPerOneMillion / 1000 < 150));
  const higher = continentCountries.filter(selectedCountry => (selectedCountry.casesPerOneMillion / 1000 >= 150 && selectedCountry.casesPerOneMillion / 1000 < 350));
  const highest = continentCountries.filter(selectedCountry => (selectedCountry.casesPerOneMillion / 1000 > 350));

  // Create Strata for Deaths
  const mild = continentCountries.filter(selectedCountry => (selectedCountry.deathsPerOneMillion / 1000 < .5));
  const contained = continentCountries.filter(selectedCountry => (selectedCountry.deathsPerOneMillion / 1000 >= .5 && selectedCountry.deathsPerOneMillion / 1000 < 1));
  const moderate = continentCountries.filter(selectedCountry => (selectedCountry.deathsPerOneMillion / 1000 >= 1 && selectedCountry.deathsPerOneMillion / 1000 < 1.5));
  const serious = continentCountries.filter(selectedCountry => (selectedCountry.deathsPerOneMillion / 1000 >= 1.5 && selectedCountry.deathsPerOneMillion / 1000 < 2.5));
  const extreme = continentCountries.filter(selectedCountry => (selectedCountry.deathsPerOneMillion / 1000 > 2.5));

  const colorCases = [];
  for (let i = 0; i < casesPerOneMillion.length; i++) {
    if (casesPerOneMillion[i] < 50) { colorCases.push("#444e86") }
    if (casesPerOneMillion[i] >= 50 && casesPerOneMillion[i] < 100) { colorCases.push("#955196") }
    if (casesPerOneMillion[i] >= 100 && casesPerOneMillion[i] < 150) { colorCases.push("#ffa600") }
    if (casesPerOneMillion[i] >= 150 && casesPerOneMillion[i] < 350) { colorCases.push("#ff6e54") }
    if (casesPerOneMillion[i] >= 350) { colorCases.push("#dd5182") }
  }

  const colorDeaths = [];
  for (let i = 0; i < deathsPerOneMillion.length; i++) {
    if (deathsPerOneMillion[i] < .5) { colorDeaths.push("#444e86") }
    if (deathsPerOneMillion[i] >= .5 && deathsPerOneMillion[i] < 1) { colorDeaths.push("#955196") }
    if (deathsPerOneMillion[i] >= 1 && deathsPerOneMillion[i] < 1.5) { colorDeaths.push("#ffa600") }
    if (deathsPerOneMillion[i] >= 1.5 && deathsPerOneMillion[i] < 2.5) { colorDeaths.push("#ff6e54") }
    if (deathsPerOneMillion[i] >= 2.5) { colorDeaths.push("#dd5182") }
  }

  const backgroundcolor = [];
  for (let i = 0; i < mortalityRate.length; i++) {
    if (mortalityRate[i] < 1.0) { backgroundcolor.push("#444e86") }
    if (mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) { backgroundcolor.push("#955196") }
    if (mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.5) { backgroundcolor.push("#ffa600") }
    if (mortalityRate[i] >= 3.5 && mortalityRate[i] < 6.0) { backgroundcolor.push("#ff6e54") }
    if (mortalityRate[i] >= 6.0) { backgroundcolor.push("#dd5182") }
  }

  const tabItems = [
    {
      id: 1,
      title: 'Cases',
      // icon: 'tabitem__icon fas fa-child',
      content:
        <HorizontalBar 
          height={830}
          width={200}
          options={{
            legend: {
              display: false,
              position: ''
            },
            // title: {
            //   display: true,
            //   text: 'Mortality in ' + region,
            //   fontSize: 13
            // },
          }}
          data={{
            labels: countryNames,
            datasets: [
              {
                label: "Cases/1000",
                data: casesPerOneMillion,
                backgroundColor: colorCases,
              }
            ]
          }}
        />
    },
    {
      id: 2,
      title: 'Deaths',
      // icon: 'tabitem__icon fas fa-child',
      content:
        <HorizontalBar
          height={870}
          width={200}
          options={{
            legend: {
              display: false,
              position: ''
            },
            // title: {
            //   display: true,
            //   text: 'Deaths in ' + region,
            //   fontSize: 13
            // },
          }}
          data={{
            labels: countryNames,
            datasets: [
              {
                label: "Deaths/1000",
                data: deathsPerOneMillion,
                backgroundColor: colorDeaths,
              }
            ]
          }}
        />
    },
    {
      id: 3,
      title: 'Mortality',
      icon: 'tabitem__icon fa fa-network-wired',
      content: <HorizontalBar
        height={870}
        width={200}
        options={{
          legend: {
            display: false,
            position: ''
          },
          // title: {
          //   display: true,
          //   text: 'Deaths in ' + region,
          //   fontSize: 13
          // },
        }}
        data={{
          labels: countryNames,
          datasets: [
            {
              label: "Mortality %",
              data: mortalityRate,
              backgroundColor: backgroundcolor,
            }
          ]
        }}
      />,
    },
    {
      id: 4,
      title: 'Active',
      icon: 'tabitem__icon fa fa-network-wired',
      content: <HorizontalBar
        height={870}
        width={200}
        options={{
          legend: {
            display: false,
            position: ''
          },
          // title: {
          //   display: true,
          //   text: 'Deaths in ' + region,
          //   fontSize: 13
          // },
        }}
        data={{
          labels: countryNames,
          datasets: [
            {
              label: "Active/1000",
              data: activePerOneMillion,
              backgroundColor: backgroundcolor,
            }
          ]
        }}
      />,
    },
    {
      id: 5,
      title: 'Critical',
      icon: 'tabitem__icon fa fa-network-wired',
      content: <HorizontalBar
        height={870}
        width={200}
        options={{
          legend: {
            display: false,
            position: ''
          },
          // title: {
          //   display: true,
          //   text: 'Deaths in ' + region,
          //   fontSize: 13
          // },
        }}
        data={{
          labels: countryNames,
          datasets: [
            {
              label: "Critical/1000",
              data: criticalPerOneMillion,
              backgroundColor: backgroundcolor,
            }
          ]
        }}
      />,
    },
    {
      id: 6,
      title: 'Tests',
      icon: 'tabitem__icon fa fa-network-wired',
      content: <HorizontalBar
        height={870}
        width={200}
        options={{
          legend: {
            display: false,
            position: ''
          },
          // title: {
          //   display: true,
          //   text: 'Deaths in ' + region,
          //   fontSize: 13
          // },
        }}
        data={{
          labels: countryNames,
          datasets: [
            {
              label: "Tests/1000",
              data: testsPerOneMillion,
              backgroundColor: backgroundcolor,
            }
          ]
        }}
      />,
    },
  ];


  const TabsComponent = () => {
    const [active, setActive] = useState(1);

    return (
      <div className="wrapper">
        <div className="tabs">
          {tabItems.map(({ id, icon, title }) => <TabItemComponent
            key={title}
            icon={icon}
            title={title}
            onItemClicked={() => setActive(id)}
            isActive={active === id}
          />
          )}
        </div>
        <div className="content">
          {tabItems.map(({ id, content }) => {
            return active === id ? content : ''
          })}
        </div>
      </div>
    )
  }

  const TabItemComponent = ({
    icon = '',
    title = '',
    onItemClicked = () => console.error('You passed no action to the component'),
    isActive = false,
  }) => {
    return (
      <div className={isActive ? 'tabitem' : 'tabitem tabitem--inactive'} onClick={onItemClicked}>
        <i className={icon}></i>
        <p className="tabitem__title">{title}</p>
      </div>
    )
  };


  return (
    <>
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
                        onClick={toggleAsia}
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
                    <TabsComponent />
                  </Col>
                  <Col style={{ marginTop: "30px" }}>
                    <Row className="subtitle" >
                      <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col>
                      <Col className="box" style={{ color: "teal" }}> Cases <div className="icon"><FontAwesomeIcon color="green" icon={faArrowUp} /></div><h3>{(casesMillion[index] / 1000).toFixed(1)}</h3><div >/1000</div></Col>
                    </Row>
                    <Row className="subtitle">
                      <Col className="box" style={{ color: "teal" }}> Active<div className="icon"><FontAwesomeIcon color="green" icon={faArrowUp} /></div><h3>{(activeMillion[index] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                      <Col className="box" style={{ color: "teal" }}> Critical<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(criticalMillion[index] / 1000).toFixed(2)}</h3><div >/1000</div></Col>

                    </Row>
                    <Row className="subtitle">
                      <Col className="box" style={{ color: "teal" }}> Deaths<div className="icon"><FontAwesomeIcon color="green" icon={faArrowUp} /></div> <h3>{(deathsMillion[index] / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                      <Col className="box" style={{ color: "teal" }}> Tests <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(tests[index] / population[index]).toFixed(2)}</h3><div >/person</div></Col>
                    </Row>
                    <Doughnut
                      width={130}
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
                      width={130}
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
                        labels: ["Mild", "Contained", "Moderate", "Serious", "Extreme"],
                        datasets: [
                          {
                            data: [mild.length, contained.length, moderate.length, serious.length, extreme.length],
                            backgroundColor: colorsPie,
                          }
                        ]
                      }}
                    />
                  </Col>
                </Row>
                <Row className="box" style={{ color: "teal", margin: "15px -5px" }}>
                  <Line
                    // width={250}
                    height={230}
                    options={{
                      title: {
                        display: true,
                        text: 'Trends in ' + region,
                        fontSize: 13
                      },
                      legend: {
                        display: true,
                        position: 'bottom'
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
                </Row>
              </Container>
            </div>
          </div>
        </Animated>
      </div>
      {/* )
    } */}
    </>
  );
};


export default NorthAmericaMenu;


let colorsPie = [
  "#444e86",
  "#955196",
  "#ffa600",
  "#ff6e54",
  "#dd5182",
  "rgb(212, 23, 83)",
  "rgb(45, 182, 130)",
]


