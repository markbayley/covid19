import React, { useState, useEffect } from "react";
import ContinentButtons from "./components/ContinentButtons";
import Map from './components/Map';
import GlobalMenu from "./components/GlobalMenu";
import Menu from "./components/Menu";
import './App.css'


import { CONTINENT_URL, COUNTRY_URL, GLOBAL_URL } from "./api/api";

const initialState = {
    global: false,
    open: false,
    region: "",
    index: "",
};

const App = () => {


    //Fetch Continents Data
    const [globaldata, setGlobal] = useState([]);
    useEffect(() => {
        async function fetchContinents() {
            try {
                const result = await fetch(GLOBAL_URL);
                const globaldata = await result.json();
                setGlobal([globaldata]);
                console.log(globaldata, 'globalDATA')
            } catch (error) {
                console.log(error);
            }
        }
        fetchContinents();
    }, []);

    // //Map Continents Data
    // const getGlobal = (key) => {
    //     return globaldata.map((data) => data[key]);
    // };

    // const globalCases = getGlobal("casesPerOneMillion");
    // console.log(globalCases, 'globalCases')


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

    const [state, setState] = useState([initialState]);

    const toggle = ({ region, index }) => {
        setState({
            ...initialState,
            open: true,
            region: region,
            index: index,
            global: false
        });
    };

    const toggleAsia = () => {
        setState({
            ...initialState,
            open: true,
            region: 'Asia',
            index: 1,
            global: false
        });
    };
    const toggleOceania = () => {
        setState({
            ...initialState,
            open: true,
            region: 'Australia-Oceania',
            index: 4,
            global: false
        });
    };
    const toggleEurope = () => {
        setState({
            ...initialState,
            open: true,
            region: 'Europe',
            index: 3,
            global: false
        });
    };
    const toggleAfrica = () => {
        setState({
            ...initialState,
            open: true,
            region: 'Africa',
            index: 5,
            global: false
        });
    };
    const toggleSouthAmerica = () => {
        setState({
            ...initialState,
            open: true,
            region: 'South America',
            index: 2,
            global: false
        });
    };
    const toggleNorthAmerica = () => {
        setState({
            ...initialState,
            open: true,
            region: 'North America',
            index: 0,
            global: false
        });
    };
    const toggleGlobal = () => {
        setState({
            ...initialState,
           global: true,
           region: 'Global',
           index: 6,
          
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
                <Menu
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
                    // globalCases={globalCases}
                />

                <GlobalMenu
                    state={state.global}
                    toggleGlobal={toggleGlobal}
                    handleClose={handleClose}
                    index={state.index}
                    global={state.global}
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
                    // globalCases={globalCases}
                />
            </div>
            <Map />
        </>
    );
}

export default App;
