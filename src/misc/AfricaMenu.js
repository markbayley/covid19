import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import '../App2.css'


const AfricaMenu = ({ state, toggleAfrica }) => {

  const [continents, setContinents] = useState([]);

  useEffect(() => {
    async function fetchContinents() {
      try {
        const result = await fetch(CONTINENT_URL);

        const continents = await result.json();
        setContinents([...continents]);
        console.log(continents, 'continents')

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
  const continentCountries = countries.filter(country => country.continent === 'Africa')
  // Map Country Names
  const countryNames = continentCountries.map(selectedCountry => selectedCountry.country.substring(0, 12))
  //Map mortality rate for those countries
  const mortalityRate = continentCountries.map(selectedCountry => (((selectedCountry.deathsPerOneMillion / selectedCountry.casesPerOneMillion).toFixed(4)) * 100));
  // Create strata for classifting cases for doughnut charts
  const lowest = continentCountries.filter(selectedCountry => (selectedCountry.cases < 10000));
  const lower = continentCountries.filter(selectedCountry => (selectedCountry.cases >= 10000 && selectedCountry.cases < 500000));
  const average = continentCountries.filter(selectedCountry => (selectedCountry.cases >= 500000 && selectedCountry.cases < 2500000));
  const higher = continentCountries.filter(selectedCountry => (selectedCountry.cases >= 2500000 && selectedCountry.cases < 5000000));
  const highest = continentCountries.filter(selectedCountry => (selectedCountry.cases > 5000000));

  const highnames = continentCountries.map(selectedCountry => (selectedCountry.country));

  // console.log(highnames, 'highnames')
  // console.log(lowest, 'lowest')
  // console.log(average, 'average')


  const backgroundcolor = [];

  for (let i = 0; i < mortalityRate.length; i++) {
    if (mortalityRate[i] < 1.0) { backgroundcolor.push("#444e86") }
    if (mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) { backgroundcolor.push("#955196") }
    if (mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.0) { backgroundcolor.push("#ffa600") }
    if (mortalityRate[i] >= 3.0 && mortalityRate[i] < 6.0) { backgroundcolor.push("#dd5182") }
    if (mortalityRate[i] >= 6.0) { backgroundcolor.push("rgb(212, 23, 83)") }
  }



  const tabItems =

    [
      {
        id: 7,
        title: <div className="title2">Africa</div>,
        // icon: 'tabitem__icon fas fa-network-wired',
        content:
          <>
             <Container>
       <Line
                width={350}
                height={250}
                options={{
                  title: {
                    display: true,
                    text: 'Trends in ',
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
                      data: [33, 53, 45, 41, 44, 8.85],
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






         
              <Row className="subtitle" style={{ marginTop: "5px" }}>
                <Col className="box" style={{ color: "#ffa600" }}>Cases<h3>{(casesMillion[5] / 1000).toFixed(2)}</h3><div>/1000</div></Col>
                <Col className="box" style={{ color: "#ff6e54" }}> Active<h3>{(activeMillion[5] / 1000).toFixed(1)}</h3> <FontAwesomeIcon icon={faCoffee} /><div>/1000</div></Col>
                <Col className="box" style={{ color: "#955196" }}>Deaths<h3>{(deathsMillion[5] / 1000).toFixed(2)}</h3><FontAwesomeIcon icon={faCoffee} /><div>/1000</div></Col>
              </Row>
              <Row className="subtitle">
                <Col className="box" style={{ color: "#dd5182" }}>Critical<h3>{(criticalMillion[5] / 1000).toFixed(2)}</h3><FontAwesomeIcon icon={faCoffee} /><div>/1000</div></Col>
                <Col className="box" style={{ color: "rgb(45, 182, 130)" }}>Tests<h3>{(tests[5] / population[5]).toFixed(2)}</h3><FontAwesomeIcon icon={faCoffee} /><div>/person</div></Col>
                <Col className="box" style={{ color: "#444e8B" }}>Pop<h3>{numberWithCommas((population[5] / 1000000000).toFixed(2))}</h3><FontAwesomeIcon icon={faPeopleGroup} /><div>billion</div></Col>
              </Row>


       

              {/* <Doughnut
          width={200}
          height={100}
          options={{
            // maintainAspectRatio: true,
            title: {
              display: true,
              text: 'Deaths Millions',
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
        /> */}

              <Doughnut
                // width={150}
                height={200}
                options={{
                  // maintainAspectRatio: true,
                  title: {
                    display: true,
                    text: 'Deaths',
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
                  labels: ["Cases", "Active", "Critical", "Deaths"],
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


            </Container>
          </>
      },
      {
        id: 1,
        title: 'Cases',
        // icon: 'tabitem__icon fas fa-child',
        content:
          <HorizontalBar
            height={1000}
            // width={300}
            options={{
              maintainAspectRatio: true,
              legend: {
                display: false,
                position: ''
              },
              title: {
                display: true,
                text: 'Cases / 1000',
                fontSize: 13,
                position: 'top'
              },
            }}
            data={{
              labels: countryNames,
              datasets: [
                {
                  label: "Mortality Rate in Africa",
                  data: mortalityRate,
                  backgroundColor: backgroundcolor,
                }
              ]
            }}
          />

      },
      {
        id: 2,
        title: 'Active',
        // icon: 'tabitem__icon fas fa-child',
        content:
          <HorizontalBar

            height={610}
            width="auto"
            options={{
              legend: {
                display: false,
                position: ''
              },
              // title: {
              //   display: true,
              //   text: 'Mortality in Africa',
              //   fontSize: 13
              // },
            }}
            data={{
              labels: countryNames,
              datasets: [
                {
                  label: "Mortality Rate in Africa",
                  data: mortalityRate,
                  backgroundColor: backgroundcolor,
                }
              ]
            }}
          />

      },

      {
        id: 4,
        title: 'Deaths',
        icon: 'tabitem__icon fa fa-network-wired',
        content: <h6>step 4 content</h6>,
      },

      {
        id: 5,
        title:
          <Button
            onClick={toggleAfrica}
            size="lg"
            className="title2"
            variant="outline-info"
            style={{ marginLeft: "0px", padding: "0px 10px 3px 10px" }}
          >
            <Animated
              animationIn="fadeInDown"
              animationOut="fadeOut"
              isVisible={true}
            >
              <div>x</div>
            </Animated>
          </Button>,
        // icon: 'tabitem__icon fas fa-network-wired',
        content: <h6>step 5 content</h6>,
      },

    ];


  const TabsComponent = () => {
    const [active, setActive] = useState(7);

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
    <div className={state ? "visible" : "hidden"}>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >

        <div className="App-side">
          {/* <div className={!state ? "hidden" : "visible"}> */}


          <TabsComponent />

          {/* <Row className="" style={{position: "fixed", top: 0, background: "#212529", width: "96%", opacity: 1}} >
              <Col>

              </Col>
          </Row> */}





          {/*            
          </div> */}
        </div>
      </Animated>
    </div>
  );
};


export default AfricaMenu;


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







