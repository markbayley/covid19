import React, { useState, useEffect } from "react";
import ContinentButtons from "./components/ContinentButtons";
import Map2 from './components/Map2';

import GlobalMenu from "./components/GlobalMenu";
import Menu2 from "./components/Menu2";
import './App2.css'
import "./App.css";


import { CONTINENT_URL, COUNTRY_URL } from "./api/api";

const initialState = {
    // asia: false,
    // northamerica: false,
    // southamerica: false,
    // europe: false,
    // oceania: false,
    // africa: false,
    global: false,
    open: false,
    region: "",
    index: "",
};

const App = () => {

    //Fetch Continents Data
    const [continents, setContinents] = useState([]);
    useEffect(() => {
        async function fetchContinents() {
            try {
                const result = await fetch(CONTINENT_URL);
                const continents = await result.json();
                setContinents([...continents]);
                // console.log(continents, 'continents')
            } catch (error) {
                console.log(error);
            }
        }
        fetchContinents();
    }, []);
    //Map Continents Data
    const getContinents = (key) => {
        return continents.map((continent) => continent[key]);
    };

    const population = getContinents("population");
    const casesMillion = getContinents("casesPerOneMillion");
    const activeMillion = getContinents("activePerOneMillion");
    const criticalMillion = getContinents("criticalPerOneMillion");
    const deathsMillion = getContinents("deathsPerOneMillion");
    const testsMillion = getContinents("testsPerOneMillion");

    const cases = getContinents("cases");
    const active = getContinents("active");
    const critical = getContinents("critical");
    const deaths = getContinents("deaths");
    const tests = getContinents("tests");

    const mortality = deaths / cases;

    //Fetch Countries Data
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const countryNames = [];
        async function fetchCountries() {
            try {
                const res = await fetch(COUNTRY_URL);
                const countries = await res.json();
                setCountries([...countries]);
                // console.log(countries, 'countries')
                for (let i = 0; i < countries.length; i++) {
                    countryNames.push(String(countries[i].country))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCountries();
    }, []);
    //Map Continents Data
    const getCountries = (key) => {
        return countries.map((country) => country[key]);
    };

    const populationCountry = getCountries("population");
    const casesCountry = getCountries("casesPerOneMillion");
    const activeCountry = getCountries("activePerOneMillion");
    const criticalCountry = getCountries("criticalPerOneMillion");
    const deathsCountry = getCountries("deathsPerOneMillion");
    const testsCountry = getCountries("testsPerOneMillion");

   

 
 


    const [state, setState] = useState([initialState]);

    const toggle = ({region, index}) => {
        setState({
            ...initialState,
            open: true, 
            region: region, 
            index: index,
        });
    };

    const toggleAsia = () => {
        setState({
            ...initialState,
            open: true, 
            region: 'Asia', 
            index: 1,
        });
    };
    const toggleOceania = () => {
        setState({
            ...initialState,
            open: true, 
            region:'Australia-Oceania', 
            index: 4,
        });
    };
    const toggleEurope = () => {
        setState({
            ...initialState,
            open: true, 
            region:'Europe', 
            index: 3,
        });
    };
    const toggleAfrica = () => {
        setState({
            ...initialState,
            open: true, 
            region:'Africa', 
            index: 5,
        });
    };
    const toggleSouthAmerica = () => {
        setState({
            ...initialState,
            open: true, 
            region:'South America', 
            index: 2,
        });
    };
    const toggleNorthAmerica = () => {
        setState({
            ...initialState,
            open: true, 
            region:'North America', 
            index: 0,
        });
    };
    const toggleGlobal = () => {
        setState({
            ...initialState,
            open: true,
            region: 'Global',
            index: 6
        });
    };

    function handleClose() {
        setState(!state);
    }

    console.log(initialState, 'initialState', state, 'state')

    return (
        <>
            <ContinentButtons
               toggleAsia={toggleAsia}
               toggleEurope={toggleEurope}
               toggle={toggle}
               toggleGlobal={toggleGlobal}
               toggleAfrica={toggleAfrica}
               toggleSouthAmerica={toggleSouthAmerica}
               toggleNorthAmerica={toggleNorthAmerica}
               toggleOceania={toggleOceania}
            
            />
            <div className="sidebar">
                <Menu2
                    handleClose={handleClose}
                    index={state.index}
                    open={state.open}
                    region={state.region}
                    countries={countries}
                    continents={continents}
                    population={population}
                    casesMillion={casesMillion}
                    activeMillion={activeMillion}
                    criticalMillion={criticalMillion}
                    deathsMillion={deathsMillion}
                    testsMillion={testsMillion}
                    tests={tests}
                    populationCountry={populationCountry}
                    casesCountry={casesCountry}
                    activeCountry={activeCountry}
                    criticalCountry={criticalCountry}
                    deathsCountry={deathsCountry}
                    testsCountry={testsCountry}
                 
                />
      
                <GlobalMenu
                    state={state.global}
                    toggleGlobal={toggleGlobal}
                />
            </div>
            <Map2 />
        </>
    );
}

export default App;
