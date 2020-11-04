import React, { Component } from "react";
import "./App.css";
import ContinentStats from "./components/ContinentStats";
import GlobalStats from "./components/GlobalStats";
import CountryStats from "./components/CountryStats";

import ContinentMenus from "./components/ContinentMenus";

import Map from './components/Map';

// import DataTable from "./containers/DataTable/DataTable";
// import BarGraph from "./containers/BarGraph/BarGraph";
// import Maps from "./containers/Maps/Maps";
// import ScatterGraph from "./containers/ScatterGraph/ScatterGraph";
// import Layout from "./components/Layout/Layout";
// import Overview from "./components/Overview/Overview";


  let initialState = {
    visible: true,
    updated: 0,
    asia: false,
    northamerica: false,
    southamerica: false,
    europe: false,
    oceania: false,
    africa: false,
    global: false,
  };

class CoronaApp extends Component {
  state = {
    ...initialState,
  };

  toggleAsia = () => {
    this.setState({
      ...initialState,
      asia: !this.state.asia,
    });
  };

  toggleOceania = () => {
    this.setState({
      ...initialState,
      oceania: !this.state.oceania,
    });
  };

  toggleEurope = () => {
    this.setState({
      ...initialState,
      europe: !this.state.europe,
    });
  };

  toggleAfrica = () => {
    this.setState({
      ...initialState,
      africa: !this.state.africa,
    });
  };

  toggleSouthAmerica = () => {
    this.setState({
      ...initialState,
      southamerica: !this.state.southamerica,
    });
  };

  toggleNorthAmerica = () => {
    this.setState({
      ...initialState,
      northamerica: !this.state.northamerica,
    });
  };

  toggleGlobal = () => {
    this.setState({
      ...initialState,
      global: !this.state.global,
    });
  };

  changeUpdate = (date) => this.setState({ updated: date });

  render() {
    return (
      // <Layout updated={this.state.updated}>
      <main className="container">
        {/* <GlobalStats updated={this.changeUpdate}></GlobalStats> */}
        {/* <ContinentStats updated={this.changeUpdate}></ContinentStats> */}
        {/* <CountryStats updated={this.changeUpdate}></CountryStats> */}

        <ContinentMenus
          updated={this.changeUpdate}
          toggleGlobal={this.toggleGlobal}
          toggleAsia={this.toggleAsia}
          toggleOceania={this.toggleOceania}
          toggleAfrica={this.toggleAfrica}
          toggleEurope={this.toggleEurope}
          toggleNorthAmerica={this.toggleNorthAmerica}
          toggleSouthAmerica={this.toggleSouthAmerica}
          global={this.toggleGlobal}
          state={this.state}
        >
          {" "}
        </ContinentMenus>

        {/* <Overview></Overview>
          <DataTable></DataTable>
          <BarGraph></BarGraph>
         
          <ScatterGraph></ScatterGraph> */}
      </main>
      // </Layout>
    );
  }
}

export default CoronaApp;
