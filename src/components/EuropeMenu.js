import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";



const EuropeMenu = ({ state, toggleEurope }) => {

  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const continentNames = [];
    const deathsPerOneMillion = [];
    const casesPerOneMillion = [];
    const population = [];
    const activePerOneMillion = [];

    async function fetchContinents() {
      try {
        const result = await fetch(CONTINENT_URL);

        const continents = await result.json();
        setContinents([...continents]);
        console.log(continents, 'continents')

        // for (let i = 0; i < continents.length; i++) {
        //   continentNames.push(String(continents[i].continent))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   deathsPerOneMillion.push(String(continents[i].deathsPerOneMillion))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   casesPerOneMillion.push(String(continents[i].casesPerOneMillion))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   population.push(String(continents[i].population))
        // }

        // for (let i = 0; i < continents.length; i++) {
        //   activePerOneMillion.push(String(continents[i].activePerOneMillion))
        // }

      
    
        // setContinentNames(continentsArray)
        // console.log(continentNames, 'continentNames')
        // console.log(deathsPerOneMillion, 'deathsPerOneMillion')
     
        // setCountryNames(countryNames)
        // console.log(countryNames, 'countryNames')
        // const africanCountryNames = countries.filter(country.continent === "Africa");
        // console.log(africanCountryNames, 'acn')

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

    const countries = []
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




  const coords = getData("countryInfo");



  const countryCases = getData("cases");
  const countryDeaths = getData("deaths");
  const countryActive = getData("active");
  // const casesMillion = getData("casesPerOneMillion");
  // const activeMillion = getData("activePerOneMillion");


  const africanCountries = countries.filter(country => country.continent === 'Europe')

  const countryNames = africanCountries.map(africanCountry => africanCountry.country.substring(0, 12))

  const casesPerOneMillion = africanCountries.map(africanCountry => africanCountry.casesPerOneMillion/1000)



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
                  <Row className="title" >Europe </Row>
                    <Row>
                      <Col >
                        <HorizontalBar
                          height={900}
                          width={200}
                          options={{  legend: {
                            display: false,
                            position: ''
                          } }}
                          data={{
                            labels: countryNames,
                            datasets: [
                              {
                                label: "",
                                data: casesPerOneMillion,
                                backgroundColor: colors,
                              }
                            ]
                          }}
                        />
                      </Col>

                      <Col >
                
                        <Row className="subtitle"> 
                          <Col className="box" style={{color: "#ffa600"}}>Pop <h3>{numberWithCommas((population[3]/1000000).toFixed(0))}</h3>million</Col>
                          <Col className="box" style={{color: "#ff6e54"}}>Cases<h3>{(casesMillion[3]/1000).toFixed(0)}</h3><div >/1000</div></Col>
                        </Row>
                        <Row className="subtitle"> 
                          <Col className="box" style={{color: "#dd5182"}}>Active<h3>{(activeMillion[3]/1000).toFixed(1)}</h3><div >/1000</div></Col>
                          <Col className="box" style={{color: "#955196"}}>Critical<h3>{(criticalMillion[3]/1000).toFixed(2)}</h3><div >/1000</div></Col>
                       
                        </Row>
                        <Row className="subtitle"> 
                          <Col className="box" style={{color: "#444e86"}}>Deaths<h3>{(deathsMillion[3]/1000).toFixed(2)}</h3><div >/1000</div></Col>
                          <Col className="box" style={{color: "rgb(212, 23, 83)"}}>Tests<h3>{(tests[3]/population[3]).toFixed(2)}</h3><div >/person</div></Col>
                        </Row>
                        <Doughnut

                          width={120}
                          options={{
                            // maintainAspectRatio: true,
                            title: {
                              display: true,
                              text: '% population tested',
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
                            labels: [ "Population", "Tests"],
                            datasets: [
                              {
                                data: [ population[3], tests[3] ],
                               
                                backgroundColor: colorsDoughnut,
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
                            labels: ["Pop", "Tests", "Cases", "Active", "Critical"],
                            datasets: [
                              {
                                label: "",
                                data: [30, 40, 50, 60, 34, 30],
                                backgroundColor: colorsPie,
                              }
                            ]
                          }}
                        />

                        {/* <Bar 
                            width={100}
                            height={85}
                            options={{
                      
                              title: {
                                display: true,
                                text: 'Deaths Age',
                                fontSize: 10
                              },
                              legend: {
                                display: false,
                                position: ''
                              }
                            }}
                            data={{
                              labels: [30, 80, 20, 60, 3, 10, 30],
                              datasets: [
                                {
                                  label: "continents",
                                  data: [30, 80, 20, 60, 3, 10, 15],
                                  backgroundColor: "#2F9599",
                                }
                              ]
                            }}
                          /> */}

{/* 
                        <Doughnut
                          width={150}
                          options={{
                            // maintainAspectRatio: true,
                            title: {
                              display: true,
                              text: 'Asia',
                              fontSize: 10
                            },
                            legend: {
                              display: false,
                              position: ''
                            }
                          }}
                          data={{
                            labels: list,
                            datasets: [
                              {
                                label: "continents",
                                data: [30, 80, 20, 60, 20],
                                backgroundColor: colorsPie,
                              }
                            ]
                          }}
                        /> */}
                      </Col>

                    </Row>


                  </Container>
                  {/* <h4 style={{ color: "cyan" }}>Africa
                  </h4> */}





                  {/* 
                    */}


                  {/* <p>
                    Hover over the chart to view more details.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    </>
  );
};


export default EuropeMenu;


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



]

let colorsDoughnut = [

  "#ffa600",
"rgb(212, 23, 83)",


// "#003f5c",
  // "#A7226E",
  // "#EC2049",
  // "#F26B38",
  // "#F7DB4F",
  // "#2F9599",
  // "purple",
]
