import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL, GLOBAL_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";



const GlobalMenu = ({ state, toggleGlobal }) => {

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

  //Continent Names
  const names = getContinents("continent")


  //Map Mortality for Countries
  const mortalityRate = continents.map(continent => (((continent.deathsPerOneMillion / continent.casesPerOneMillion).toFixed(4))*100) );

  // Create Strata for Cases
  const lowest = continents.filter(selectedCountry => (selectedCountry.cases < 1000000));
  const lower = continents.filter(selectedCountry => ( selectedCountry.cases >= 1000000 && selectedCountry.cases < 50000000));
  const average = continents.filter(selectedCountry => ( selectedCountry.cases >= 50000000 && selectedCountry.cases < 250000000));
  const higher = continents.filter(selectedCountry => (  selectedCountry.cases >= 250000000 && selectedCountry.cases < 500000000));
  const highest = continents.filter(selectedCountry => (selectedCountry.cases > 500000000));

   // Create Strata for Deaths
   const mild = continents.filter(selectedCountry => (selectedCountry.deaths < 1000000));
   const contained = continents.filter(selectedCountry => ( selectedCountry.deaths >= 1000000 && selectedCountry.deaths < 50000000));
   const moderate = continents.filter(selectedCountry => ( selectedCountry.deaths >= 50000000 && selectedCountry.deaths < 250000000));
   const serious = continents.filter(selectedCountry => (  selectedCountry.deaths >= 250000000 && selectedCountry.deaths < 500000000));
   const extreme = continents.filter(selectedCountry => (selectedCountry.deaths > 500000000));

  //Asign Colors to Strata
  const backgroundcolor = [];
  for (let i = 0; i < mortalityRate.length; i++) {
   if(mortalityRate[i] < 1.0) { backgroundcolor.push("#444e86") }
   if(mortalityRate[i] >= 1.0 && mortalityRate[i] < 2.0) { backgroundcolor.push("#955196") }
   if(mortalityRate[i] >= 2.0 && mortalityRate[i] < 3.0) { backgroundcolor.push("#ffa600" ) }
   if(mortalityRate[i] >= 3.0 && mortalityRate[i] < 6.0) { backgroundcolor.push("#dd5182") }
   if(mortalityRate[i] >= 6.0) { backgroundcolor.push("rgb(212, 23, 83)") }
  }




  const [global, setGlobal] = useState([]);

  useEffect(() => {

    async function fetchGlobal() {
      try {
        const res = await fetch(GLOBAL_URL);
        const global = await res.json();
        setGlobal([global]);
        console.log(global, 'global')
        // for (let i = 0; i < countries.length; i++) {
        //   countryNames.push(String(countries[i].country))
        // }
      } catch (error) {
        console.log(error);
      }
    }
    fetchGlobal();
  }, []);

  const getGlobal = (key) => {
    return global.map((data) => data[key]);
  };


  const population = getGlobal("population");
  const casesMillion = getGlobal("casesPerOneMillion");
  const activeMillion = getGlobal("activePerOneMillion");
  const criticalMillion = getGlobal("criticalPerOneMillion");
  const deathsMillion = getGlobal("deathsPerOneMillion");
  const testsMillion = getGlobal("testsPerOneMillion");

  const tests = getGlobal("tests");


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
                <Col className="px-0">Global</Col>
                <Col className="App-side-close px-0">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={toggleGlobal}
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
                    height={200}
                    width={250}
                    options={{
                      legend: {
                        display: false,
                        position: ''
                      },
                      title: {
                        display: true,
                        text: 'Global Mortality',
                        fontSize: 13
                      },
                    }}
                    data={{
                      labels: names,
                      datasets: [
                        {
                          label: "",
                          data: mortalityRate,
                          backgroundColor: backgroundcolor,
                        }
                      ]
                    }}
                  />
                    <HorizontalBar
                    height={200}
                    width={250}
                    options={{
                      legend: {
                        display: false,
                        position: ''
                      },
                      title: {
                        display: true,
                        text: 'Global Cases',
                        fontSize: 13
                      },
                    }}
                    data={{
                      labels: names,
                      datasets: [
                        {
                          label: "",
                          data: mortalityRate,
                          backgroundColor: backgroundcolor,
                        }
                      ]
                    }}
                  />
                    <HorizontalBar
                    height={200}
                    width={250}
                    options={{
                      legend: {
                        display: false,
                        position: ''
                      },
                      title: {
                        display: true,
                        text: 'Global Deaths',
                        fontSize: 13
                      },
                    }}
                    data={{
                      labels: names,
                      datasets: [
                        {
                          label: "",
                          data: mortalityRate,
                          backgroundColor: backgroundcolor,
                        }
                      ]
                    }}
                  />
                    <HorizontalBar
                    height={200}
                    width={250}
                    options={{
                      legend: {
                        display: false,
                        position: ''
                      },
                      title: {
                        display: true,
                        text: 'Global Active',
                        fontSize: 13
                      },
                    }}
                    data={{
                      labels: names,
                      datasets: [
                        {
                          label: "",
                          data: mortalityRate,
                          backgroundColor: backgroundcolor,
                        }
                      ]
                    }}
                  />
                    <HorizontalBar
                    height={200}
                    width={250}
                    options={{
                      legend: {
                        display: false,
                        position: ''
                      },
                      title: {
                        display: true,
                        text: 'Global Tests',
                        fontSize: 13
                      },
                    }}
                    data={{
                      labels: names,
                      datasets: [
                        {
                          label: "",
                          data: mortalityRate,
                          backgroundColor: backgroundcolor,
                        }
                      ]
                    }}
                  />
                </Col>

                <Col >
                  <Row className="subtitle">
                    <Col className="box" style={{ color: "#ffa600" }}>Pop <h3>{numberWithCommas((population / 1000000000).toFixed(2))}</h3>billion</Col>
                    <Col className="box" style={{ color: "#ff6e54" }}>Cases<h3>{(casesMillion / 1000).toFixed(1)}</h3><div >/1000</div></Col>
                  </Row>
                  <Row className="subtitle">
                    <Col className="box" style={{ color: "#dd5182" }}>Active<h3>{(activeMillion / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                    <Col className="box" style={{ color: "#955196" }}>Critical<h3>{(criticalMillion / 1000).toFixed(2)}</h3><div >/1000</div></Col>

                  </Row>
                  <Row className="subtitle">
                    <Col className="box" style={{ color: "#444e86" }}>Deaths<h3>{(deathsMillion / 1000).toFixed(2)}</h3><div >/1000</div></Col>
                    <Col className="box" style={{ color: "rgb(45, 182, 130)" }}>Tests<h3>{(tests / population).toFixed(2)}</h3><div >/person</div></Col>
                  </Row>

                  <Doughnut
                    width={140}
                    options={{
                      // maintainAspectRatio: true,
                      title: {
                        display: true,
                        text: 'Global Cases',
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
                        text: 'Global Deaths',
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

                  <HorizontalBar
                    width={250}
                    height={250}
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


export default GlobalMenu;


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


