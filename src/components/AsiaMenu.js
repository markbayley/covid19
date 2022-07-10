import React, { Component, useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";

import { numberWithCommas } from "../utils/numberWithCommas";
import { CONTINENT_URL, COUNTRY_URL } from "../api/api";

import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";



const EuropeMenu = ({ state, toggleEurope }) => {
  const [casesAsia, setCasesAsia] = useState([]);
  const [cases, setCases] = useState([]);
  const [list, setContinentNames] = useState([]);

  const [countries, setCountries] = useState([]);
  // const [countryNames, setCountryNames] = useState([]);
  // const [continents, setContinents] = useState([]);
  useEffect(() => {
    // const continentsArray = [];
    const countries = []
    const countryNames = [];
    async function fetchCountries() {
      try {
        // const result = await fetch(CONTINENT_URL);
        const res = await fetch(COUNTRY_URL);

        // const continents = await result.json();
        // setContinents([...continents]);
        // console.log(continents, 'continents')

        const countries = await res.json();
        setCountries([...countries]);
        console.log(countries, 'countries')

        // for (let i = 0; i < continents.length; i++) {
        //   continentsArray.push(String(continents[i].continent))
        // }
        for (let i = 0; i < countries.length; i++) {
          countryNames.push(String(countries[i].country))
        }


        // setContinentNames(continentsArray)
        // console.log(continentsArray, 'continentsArray')
        // setCountryNames(countryNames)
        // console.log(countryNames, 'countryNames')
        // const africanCountryNames = countries.filter(country.continent === "Africa");
        // console.log(africanCountryNames, 'acn')

      } catch (error) {
        console.log(error);
      }
    }
    // fetchContinents();
    fetchCountries();
  }, []);
  // const getData = (key) => {
  //   return continents.map((continent) => continent[key]);
  // };

  const getData = (key) => {
    return countries.map((country) => country[key]);
  };

  const countryLabels = getData("country");
  const countryCases = getData("cases");
  const countryDeaths = getData("deaths");
  const countryActive = getData("active");
  const casesMillion = getData("casesPerOneMillion");
  const activeMillion = getData("activePerOneMillion");
  const deathsMillion = getData("deathsPerOneMillion");


  const africanCountries = countries.filter(country => country.continent === 'Asia')

  const countryNames = africanCountries.map(africanCountry => africanCountry.country.substring(0, 12))

  const casesPerOneMillion = africanCountries.map(africanCountry => africanCountry.casesPerOneMillion)

  const casesPerOneHundred = (casesPerOneMillion/10000);

  console.log(countryNames, 'africanCountryNames')

  console.log(africanCountries, 'affricanCountries')

  console.log(countryLabels, 'countryLabels')

  console.log(casesPerOneMillion, 'africanCases/100000000')


  // const continentCountries = getData("countries");
  // console.log(continentCountries, 'continentCountries')


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
                    <Row>
                      <Col >
                        <HorizontalBar
                          height={750}
                          width={200}
                          // options={{ maintainAspectRatio: false }}
                          data={{
                            labels: countryNames,
                            datasets: [
                              {
                                label: "CASES / MILLION",
                                data: casesPerOneMillion,
                                backgroundColor: colors,
                              }
                            ]
                          }}
                        />
                      </Col>

                      <Col >
                 
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
                                data: [30, 80, 20, 60, 50],
                                backgroundColor: colorsPie,
                              }
                            ]
                          }}
                        />      
                      
                          <Bar 
                            width={100}
                            height={85}
                            options={{
                              // maintainAspectRatio: true,
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
                          />

                          <Bar 
                            width={100}
                            height={85}
                            options={{
                              // maintainAspectRatio: true,
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
                          />
                       

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
                            /> 
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
  "#A7226E",
  "#EC2049",
  "#F26B38",
  "#F7DB4F",
  "#2F9599",
  "purple",
]
