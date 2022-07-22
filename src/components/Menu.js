import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCircleUp, faCircleDown } from '@fortawesome/free-solid-svg-icons';
import TabsComponent from '../misc/TabsComponent'
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

const Menu = ({ region, index, population, casesMillion, open,
    activeMillion, criticalMillion, deathsMillion, tests, countries, handleClose,
}) => {

    // Filter Countries in Region
    const continentCountries = countries.filter(country => country.continent === region)
    // Map Country Names && country.population > 1000000
    const countryNames = countries.filter(country => country.continent === region).map(selectedCountry => selectedCountry.country)
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

    // Create Strata for Active
    const active1 = continentCountries.filter(selectedCountry => (selectedCountry.activePerOneMillion / 1000 < 5));
    const active2 = continentCountries.filter(selectedCountry => (selectedCountry.activePerOneMillion / 1000 >= 5 && selectedCountry.activePerOneMillion / 1000 < 10));
    const active3 = continentCountries.filter(selectedCountry => (selectedCountry.activePerOneMillion / 1000 >= 10 && selectedCountry.activePerOneMillion / 1000 < 15));
    const active4 = continentCountries.filter(selectedCountry => (selectedCountry.activePerOneMillion / 1000 >= 15 && selectedCountry.activePerOneMillion / 1000 < 25));
    const active5 = continentCountries.filter(selectedCountry => (selectedCountry.activePerOneMillion / 1000 > 25));

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

    const colorActive = [];
    for (let i = 0; i < activePerOneMillion.length; i++) {
        if (activePerOneMillion[i] < .5) { colorActive.push("#444e86") }
        if (activePerOneMillion[i] >= .5 && activePerOneMillion[i] < 1) { colorActive.push("#955196") }
        if (activePerOneMillion[i] >= 1 && activePerOneMillion[i] < 1.5) { colorActive.push("#ffa600") }
        if (activePerOneMillion[i] >= 1.5 && activePerOneMillion[i] < 2.5) { colorActive.push("#ff6e54") }
        if (activePerOneMillion[i] >= 2.5) { colorActive.push("#dd5182") }
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
            // icon: <a id='menu'></a>,
            content:
                <>
                    <Row className={'box py-2 m-1'} style={{ color: "#fff" }}>


                        <h1>{(casesMillion[index] / 1000).toFixed(1)} </h1>
                        <h5 >
                            Cases / 1,000
                            {/* {casesMillion[index] / 1000 <= 100 ?
                                <Badge variant="success" text="dark" className="badge" style={{ position: "fixed", right: "40px", top: "20px" }}>
                                    LOW
                                </Badge> :
                                casesMillion[index] / 1000 >= 250 ?
                                    <Badge variant="danger" text="dark" className="badge" style={{ position: "fixed", left: "40px", top: "40px" }}>
                                        HIGH
                                    </Badge> : " "
                            } */}
                        </h5>

                    </Row>
                    <Row >
                        <Col className="pl-0 mt-1 ml-4">
                            <div style={{ color: "grey", fontSize: "14px" }} className="pt-2">Per Country</div>
                            <HorizontalBar

                                height={countryNames.length * 50}
                                // width={200}
                                options={{
                                    // maintainAspectRatio: true,
                                    legend: {
                                        display: false,
                                        position: ''
                                    },
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

                        </Col>
                        <Col className="px-0 mt-1 mr-3">
                            {/* <Row className={'box p-2 m-1'} style={{color: "#fff"}}>
                          
                              



                            <h1>{(casesMillion[index] / 1000).toFixed(1)}  <FontAwesomeIcon color="green" icon={faArrowUp} /></h1>
                            <h5 >/1000 Cases</h5>
                        </Row> */}
                            <div style={{ color: "grey", fontSize: "14px", paddingTop: "7px" }}>Trend</div>

                            <Row className="subtitle pt-1" >

                                <Line
                                    width={160}
                                    height={100}
                                    options={{
                                        legend: {
                                            display: false,
                                            position: 'bottom',

                                        },
                                        // title: {
                                        //     display: true,
                                        //     text: 'Mortality in ' + region,
                                        //     fontSize: 13,

                                        // },
                                    }}
                                    data={{
                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                                        datasets: [
                                            {
                                                label: "Cases / 1000",
                                                data: casesPerOneMillion,
                                                fill: true,
                                                backgroundColor: "rgba(75,192,192,0.2)",
                                                borderColor: "rgba(75,192,192,1)"
                                            },
                                        ]
                                    }}
                                />
                                <div style={{ position: "absolute", right: "47px", top: "6px" }}>
                                    {casesPerOneMillion[0] > casesPerOneMillion[6] ?
                                        <FontAwesomeIcon icon={faCircleDown} color='rgb(212, 23, 83)' /> :
                                        <FontAwesomeIcon icon={faCircleUp} text="light" color='green' />

                                    }
                                </div>
                            </Row>
                            <div style={{ color: "grey", fontSize: "14px", paddingTop: "10px", paddingBottom: "5px" }}>Statistics</div>
                            <Row className="subtitle pt-2" >
                                <Col className="box p-2 mr-1" >
                                    Active
                                    {activeMillion[index] / casesMillion[index] * 100 <= 2.5 ?
                                        <Badge variant="success" text="dark" className="badge">LOW</Badge> :
                                        activeMillion[index] / casesMillion[index] * 100 >= 4.5 ?
                                            <Badge variant="danger" text="dark" className="badge"  >HIGH</Badge> : " "

                                    }
                                    <h3 className="mb-0">{(activeMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3>
                                    <div>of cases</div>
                                </Col>
                                <Col className="box p-2 ml-1">
                                    Critical
                                    {criticalMillion[index] / casesMillion[index] * 100 <= 0.005 ?
                                        <Badge variant="success" text="dark" className="badge">LOW</Badge> :
                                        criticalMillion[index] / casesMillion[index] * 100 >= 0.015 ?
                                            <Badge variant="danger" text="dark" className="badge"  >HIGH</Badge> : " "
                                    }
                                    {/* <FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /> */}
                                    <h3 className="mb-0">{(criticalMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3>
                                    <div>of cases</div>
                                </Col>
                            </Row>
                            <Row className="subtitle " >
                                <Col className="box p-2 mr-1 mt-3" >
                                    Deaths
                                    {deathsMillion[index] / casesMillion[index] * 100 <= 1.0 ?
                                        <Badge variant="success" text="dark" className="badge">LOW</Badge> :
                                        deathsMillion[index] / casesMillion[index] * 100 >= 2.0 ?
                                            <Badge variant="danger" text="dark" className="badge"  >HIGH</Badge> : " "
                                    }
                                    {/* <FontAwesomeIcon color="green" icon={faArrowUp} /> */}
                                    <h3 className="mb-0">{(deathsMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3>
                                    <div>of cases</div></Col>
                                <Col className="box p-2 ml-1 mt-3" >
                                    Tested
                                    {tests[index] / population[index] * 100 <= 100 ?
                                        <Badge variant="danger" text="dark" className="badge">POOR</Badge> :
                                        tests[index] / population[index] * 100 >= 250 ?
                                            <Badge variant="success" text="dark" className="badge">GOOD</Badge> : " "
                                    }
                                    {/* <FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /> */}
                                    <h3 className="mb-0">{(tests[index] / population[index]).toFixed(2) * 100}%</h3>
                                    <div >of people</div></Col>
                            </Row>
                            <div className="py-3 mr-3" style={{ color: "grey", fontSize: "14px" }}>Analysis</div>
                            <Row className="mr-1">

                                <Doughnut
                                    width={180}
                                    options={{
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
                                >

                                </Doughnut>
                            </Row>
                        </Col>
                    </Row>
                </>
        },
        {
            id: 2,
            title: 'Deaths',
            // icon: <a id='check1'></a>,
            content:
                <>
                    <Row>
                        <Col className="pr-0">
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
                                    //   fontSize: 13,

                                    // },
                                }}
                                data={{
                                    labels: countryNames,
                                    datasets: [
                                        {
                                            label: "Cases/1000",
                                            data: deathsPerOneMillion,
                                            backgroundColor: colorDeaths,
                                        }
                                    ]
                                }}
                            />
                        </Col>
                        <Col className="px-0">

                            {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
                            {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

                            <Row className="box p-2 m-1 " style={{ color: "teal" }}>

                                <h1>{(deathsMillion[index] / 1000).toFixed(2)}  <FontAwesomeIcon color="green" icon={faArrowUp} /></h1>

                                <h5 >/1000 Deaths</h5>
                            </Row>

                            {/* </Row> */}
                            <Row className="subtitle px-3 pt-2">
                                <Line
                                    width={160}
                                    height={100}
                                    options={{
                                        // title: {
                                        //     display: true,
                                        //     text: 'Trends in ' + region,
                                        //     fontSize: 13,
                                        //     postion: 'bottom'
                                        // },
                                        legend: {
                                            display: false,
                                            position: 'bottom'
                                        }
                                    }}
                                    data={{
                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                                        datasets: [
                                            {
                                                label: "First dataset",
                                                data: deathsPerOneMillion,
                                                fill: true,
                                                backgroundColor: "rgba(75,192,192,0.2)",
                                                borderColor: "rgba(75,192,192,1)"
                                            },
                                            // {
                                            //   label: "Second dataset",
                                            //   data: [33, 25, 35, 51, 54, 76],
                                            //   fill: false,
                                            //   borderColor: "#742774"
                                            // }
                                        ]
                                    }}
                                />
                            </Row>
                            <div style={{ color: "grey", fontSize: "14px" }}>Statistics</div>
                            <Row className="subtitle m-1 pt-1" >

                                <Col className="box" style={{ color: "#4BC0C0" }}>Active<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(activeMillion[index] / deathsMillion[index] * 100).toFixed(0)}%</h3><div>/deaths</div></Col>
                                <Col className="box" style={{ color: "teal" }}>Critical<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(criticalMillion[index] / deathsMillion[index] * 100).toFixed(2)}%</h3><div>/deaths</div></Col>

                            </Row>

                            <Row className="subtitle m-1" >
                                <Col className="box" style={{ color: "teal" }}> Deaths<div className="icon"><FontAwesomeIcon color="green" icon={faArrowUp} /></div> <h3>{(deathsMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div >/cases</div></Col>
                                <Col className="box" style={{ color: "teal" }}> Tests <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(tests[index] / population[index]).toFixed(2)}</h3><div >/person</div></Col>
                            </Row>
                            <div className="py-2" style={{ color: "grey", fontSize: "14px" }}>Countries in {region}</div>
                            <Doughnut
                                width={170}
                                options={{
                                    // maintainAspectRatio: true,
                                    // title: {
                                    //     display: true,
                                    //     text: 'Countries in ' + region,
                                    //     fontSize: 13
                                    // },
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
                                    labels: ["Lowest Deaths", "Lower Deaths", "Average Deaths", "Higher Deaths", "Highest Deaths"],
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
                </>
        },

        {
            id: 3,
            title: 'Active',
            // icon: <a id='check1'></a>,
            content:
                <>
                    <Row>
                        <Col className="pr-0">
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
                                    //   fontSize: 13,

                                    // },
                                }}
                                data={{
                                    labels: countryNames,
                                    datasets: [
                                        {
                                            label: "Cases/1000",
                                            data: activePerOneMillion,
                                            backgroundColor: colorActive,
                                        }
                                    ]
                                }}
                            />
                        </Col>
                        <Col className="px-0">

                            {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
                            {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

                            <Row className="box p-2 m-1 " style={{ color: "teal" }}>

                                <h1>{(activeMillion[index] / 1000).toFixed(2)}  <FontAwesomeIcon color="green" icon={faArrowDown} /></h1>

                                <h5 >/1000 Active</h5>
                            </Row>

                            {/* </Row> */}
                            <Row className="subtitle px-3 pt-2">
                                <Line
                                    width={160}
                                    height={100}
                                    options={{
                                        // title: {
                                        //     display: true,
                                        //     text: 'Trends in ' + region,
                                        //     fontSize: 13,
                                        //     postion: 'bottom'
                                        // },
                                        legend: {
                                            display: false,
                                            position: 'bottom'
                                        }
                                    }}
                                    data={{
                                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                                        datasets: [
                                            {
                                                label: "First dataset",
                                                data: activePerOneMillion,
                                                fill: true,
                                                backgroundColor: "rgba(75,192,192,0.2)",
                                                borderColor: "rgba(75,192,192,1)"
                                            },
                                            // {
                                            //   label: "Second dataset",
                                            //   data: [33, 25, 35, 51, 54, 76],
                                            //   fill: false,
                                            //   borderColor: "#742774"
                                            // }
                                        ]
                                    }}
                                />
                            </Row>
                            <div style={{ color: "grey", fontSize: "14px" }}>Statistics</div>
                            <Row className="subtitle m-1 pt-1" >

                                <Col className="box" style={{ color: "teal" }}>Active<FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /><h3 className="mb-0">{(casesMillion[index] / activeMillion[index] * 100).toFixed(0)}%</h3><div>/active</div></Col>
                                <Col className="box" style={{ color: "teal" }}>Critical<FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /><h3 className="mb-0">{(criticalMillion[index] / activeMillion[index] * 100).toFixed(2)}%</h3><div>/active</div></Col>

                            </Row>

                            <Row className="subtitle m-1" >
                                <Col className="box" style={{ color: "teal" }}> Deaths<FontAwesomeIcon color="green" icon={faArrowUp} /><h3 className="mb-0">{(deathsMillion[index] / activeMillion[index] * 100).toFixed(2)}%</h3 ><div className="mt-0">/active</div></Col>
                                <Col className="box" style={{ color: "teal" }}> Tests <FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /><h3 className="mb-0">{(tests[index] / population[index]).toFixed(2)}</h3><div >/person</div></Col>
                            </Row>
                            <div className="py-2" style={{ color: "grey", fontSize: "14px" }}>Countries in {region}</div>
                            <Doughnut
                                width={170}
                                options={{
                                    // maintainAspectRatio: true,
                                    // title: {
                                    //     display: true,
                                    //     text: 'Countries in ' + region,
                                    //     fontSize: 13
                                    // },
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
                                    labels: ["Lowest Active", "Lower Active", "Average Active", "Higher Active", "Highest Active"],
                                    datasets: [
                                        {
                                            data: [active1.length, active2.length, active3.length, active4.length, active5.length],
                                            backgroundColor: colorsPie,
                                        }
                                    ]
                                }}
                            />




                        </Col>
                    </Row>
                </>
        },
        {
            id: 4,
            title: 'Critical',
            // icon: <a id='check1'></a>,
            content: <>
                <Row>
                    <Col className="pr-0">
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
                                //   fontSize: 13,

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
                    </Col>
                    <Col className="px-0">

                        {/* <Row className="subtitle pt-1" style={{ margin: "2px 2px" }} > */}
                        {/* <Col className="box" style={{ color: "teal" }}> Pop. <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{numberWithCommas((population[index] / 1000000000).toFixed(2))}</h3>billion</Col> */}

                        <Row className="box p-2 m-1 " style={{ color: "teal" }}>

                            <h1>{(casesMillion[index] / 1000).toFixed(1)}  <FontAwesomeIcon color="green" icon={faArrowUp} /></h1>

                            <h5 >/1000 Critical</h5>
                        </Row>

                        {/* </Row> */}
                        <Row className="subtitle px-3 pt-2">
                            <Line
                                width={160}
                                height={100}
                                options={{
                                    // title: {
                                    //     display: true,
                                    //     text: 'Trends in ' + region,
                                    //     fontSize: 13,
                                    //     postion: 'bottom'
                                    // },
                                    legend: {
                                        display: false,
                                        position: 'bottom'
                                    }
                                }}
                                data={{
                                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                                    datasets: [
                                        {
                                            label: "First dataset",
                                            data: casesPerOneMillion,
                                            fill: true,
                                            backgroundColor: "rgba(75,192,192,0.2)",
                                            borderColor: "rgba(75,192,192,1)"
                                        },
                                        // {
                                        //   label: "Second dataset",
                                        //   data: [33, 25, 35, 51, 54, 76],
                                        //   fill: false,
                                        //   borderColor: "#742774"
                                        // }
                                    ]
                                }}
                            />
                        </Row>
                        <div style={{ color: "grey", fontSize: "14px", paddingTop: "10px" }}>Statistics</div>
                        <Row className="subtitle m-1 pt-1" >

                            <Col className="box" style={{ color: "teal" }}>Active<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(activeMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div>/cases</div></Col>
                            <Col className="box" style={{ color: "teal" }}>Critical<div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(criticalMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div>/cases</div></Col>

                        </Row>

                        <Row className="subtitle m-1" >
                            <Col className="box" style={{ color: "teal" }}> Deaths<div className="icon"><FontAwesomeIcon color="green" icon={faArrowUp} /></div> <h3>{(deathsMillion[index] / casesMillion[index] * 100).toFixed(2)}%</h3><div >/cases</div></Col>
                            <Col className="box" style={{ color: "teal" }}> Tests <div className="icon"><FontAwesomeIcon color="rgb(212, 23, 83)" icon={faArrowDown} /></div><h3>{(tests[index] / population[index]).toFixed(2)}</h3><div >/person</div></Col>
                        </Row>
                        <div className="py-3" style={{ color: "grey", fontSize: "14px" }}>Countries in {region}</div>
                        <Doughnut
                            width={170}
                            options={{
                                // maintainAspectRatio: true,
                                // title: {
                                //     display: true,
                                //     text: 'Countries in ' + region,
                                //     fontSize: 13
                                // },
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

                    </Col>
                </Row>
            </>
        },
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
                <p  style={{display: "flex"}} className="tabitem__title">{title}{icon} </p>
            </div>
        )
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
                                <Row className="title" >
                                    <Col xs={10} className="px-0 pt-2">{region}</Col>
                                    <Col className="px-0">
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

                                <TabsComponent

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
            {/* )
    } */}
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
]
