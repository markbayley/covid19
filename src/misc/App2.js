import React, { useEffect, useState } from "react";
// import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
// import InfoBox from './InfoBox';
import Map2 from './Map2';
// import Table from './Table';
import './App.css';
import { PrintStat, sortData } from "../utils/util";
// import LineGraph from './LineGraph';
// import 'leaflet/dist/leaflet.css'; 
import ContinentButtons from "../components/ContinentButtons";

import { Form } from 'react-bootstrap';

function App2() {
 
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([90, 20]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country, // United States, United Kingdom
            value: country.countryInfo.iso2 //USA, UK 
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);

      setMapCenter([ data.countryInfo.long, data.countryInfo.lat]);
      setMapZoom(5);
    })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <Form.Control as="select" className="app__dropdown" style={{zIndex: 10}} onChange={onCountryChange} value={country}>
        
              <option value="Worldwide">Worldwide</option>
              { countries.map((country) => (
                <option value={country.value}>{country.name}</option>
              )) }
      
          </Form.Control>
        </div>

        <ContinentButtons />
        
        {/* <div className="app__status">
          <InfoBox
            isRed
            active={casesType==="cases"}
            onClick = {(e) => setCasesType("cases")} 
            title="Coronavirus Cases" 
            cases={PrintStat(countryInfo.todayCases)} 
            total={PrintStat(countryInfo.cases)} 
          />
          
          <InfoBox 
            active={casesType==="recovered"}
            onClick = {(e) => setCasesType("recovered")}
            title="Recovered" 
            cases={PrintStat(countryInfo.todayRecovered)} 
            total={PrintStat(countryInfo.recovered)} 
          />

          <InfoBox 
            isRed
            active={casesType==="deaths"}
            onClick = {(e) => setCasesType("deaths")}
            title="Deaths" 
            cases={PrintStat(countryInfo.todayDeaths)} 
            total={PrintStat(countryInfo.deaths)} 
          />

        </div> */}

        <Map2
          casesType = {casesType}
          countries = {mapCountries}
          center = {mapCenter}
          zoom = {mapZoom}
        />
      </div>

      {/* <Card className="app__right">
        <CardContent>
          <h3>Total Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card> */}
      
    </div>
  );
}

export default App2;