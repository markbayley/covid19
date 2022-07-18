import React, { useState, useEffect } from "react";
import ContinentButtons from "./components/ContinentButtons";
import Map2 from './components/Map2';
import AsiaMenu from "./components/AsiaMenu";
import EuropeMenu from "./components/EuropeMenu";
import AfricaMenu from "./components/AfricaMenu";
import OceaniaMenu from "./components/OceaniaMenu";
import NorthAmericaMenu from "./components/NorthAmericaMenu";
import SouthAmericaMenu from "./components/SouthAmericaMenu";
import GlobalMenu from "./components/GlobalMenu";
import "./App.css";

import { CONTINENT_URL, COUNTRY_URL } from "./api/api";

const initialState = {
    asia: false,
    northamerica: false,
    southamerica: false,
    europe: false,
    oceania: false,
    africa: false,
    global: false
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


 
    // const [visible, setVisible] = useState(initialState);

    // shows the element by given key
    // const toggleVisible = (event, key) => {
    //     setState({ ...state, ...{ [key]: ![key] } });
    // };


    const [state, setState] = useState([initialState]);

    const toggleAsia = ({ asia }) => {
        setState({
            ...initialState,
            asia: !asia,
        });
    };
    const toggleOceania = ({ oceania }) => {
        setState({
            ...initialState,
            oceania: !oceania,
        });
    };
    const toggleEurope = ({ europe }) => {
        setState({
            ...initialState,
            europe: !europe,
        });
    };
    const toggleAfrica = ({ africa }) => {
        setState({
            ...initialState,
            africa: !africa,
        });
    };
    const toggleSouthAmerica = ({ southamerica }) => {
        setState({
            ...initialState,
            southamerica: !southamerica,
        });
    };
    const toggleNorthAmerica = ({ northamerica }) => {
        setState({
            ...initialState,
            northamerica: !northamerica,
        });
    };
    const toggleGlobal = ({ global }) => {
        setState({
            ...initialState,
            global: !global,
        });
    };

    console.log(initialState, 'initialState', state, 'state')

    return (
        <>
            <ContinentButtons
                toggleGlobal={toggleGlobal}
                toggleAsia={toggleAsia}
                toggleOceania={toggleOceania}
                toggleAfrica={toggleAfrica}
                toggleEurope={toggleEurope}
                toggleNorthAmerica={toggleNorthAmerica}
                toggleSouthAmerica={toggleSouthAmerica}
            // toggleVisible={toggleVisible}
            />
            <div className="sidebar">
                <AsiaMenu
                    state={state.asia}
                    toggleAsia={toggleAsia}
                    key={state}
                    index={1}
                    region='Asia'
                />
                <EuropeMenu
                    state={state.europe}
                    toggleEurope={toggleEurope}
                    index={3}
                    region='Europe'
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
                />
                <AfricaMenu
                    state={state.africa}
                    toggleAfrica={toggleAfrica}
                />
                <OceaniaMenu
                    state={state.oceania}
                    toggleOceania={toggleOceania}
                />
                <NorthAmericaMenu
                    state={state.northamerica}
                    toggleNorthAmerica={toggleNorthAmerica}
                />
                <SouthAmericaMenu
                    state={state.southamerica}
                    toggleSouthAmerica={toggleSouthAmerica}
                    index={2}
                    region='South America'
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
