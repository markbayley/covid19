import React, { Component, useEffect, useState } from "react";
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


let initialState = {
  asia: false,
  northamerica: false,
  southamerica: false,
  europe: false,
  oceania: false,
  africa: false,
  global: false
};

class App extends Component {

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


  render() {
    return (
      <>
        <ContinentButtons
          toggleGlobal={this.toggleGlobal}
          toggleAsia={this.toggleAsia}
          toggleOceania={this.toggleOceania}
          toggleAfrica={this.toggleAfrica}
          toggleEurope={this.toggleEurope} 
          toggleNorthAmerica={this.toggleNorthAmerica}
          toggleSouthAmerica={this.toggleSouthAmerica}
        />

          <div className="sidebar">
            <AsiaMenu
              state={this.state.asia}
              toggleAsia={this.toggleAsia}
              index={1}
              name='Asia'
            />
            <EuropeMenu
              state={this.state.europe}
              toggleEurope={this.toggleEurope}
              index={3}
              region='Europe'
            />
            <AfricaMenu
              state={this.state.africa}
              toggleAfrica={this.toggleAfrica}
            />
            <OceaniaMenu
              state={this.state.oceania}
              toggleOceania={this.toggleOceania}
            />
            <NorthAmericaMenu
              state={this.state.northamerica}
              toggleNorthAmerica={this.toggleNorthAmerica}
            />
            <SouthAmericaMenu
              state={this.state.southamerica}
              toggleSouthAmerica={this.toggleSouthAmerica}
            />
            <GlobalMenu
              state={this.state.global}
              toggleGlobal={this.toggleGlobal}
            />
          </div>
   
        <Map2 />
      </>
    );
  }
}

export default App;
