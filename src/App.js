import React, { Component } from "react";
import "./App.css";
import ContinentStats from "./components/ContinentStats";
import Map from './components/Map';
import AsiaMenu from "./components/AsiaMenu";
import EuropeMenu from "./components/EuropeMenu";
import AfricaMenu from "./components/AfricaMenu";
import OceaniaMenu from "./components/OceaniaMenu";
import NorthAmericaMenu from "./components/NorthAmericaMenu";
import SouthAmericaMenu from "./components/SouthAmericaMenu";
import GlobalMenu from "./components/GlobalMenu";


let initialState = {
  visible: true,
  info: false,
  facts: false,
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


  // Set state to default state
  setDefaultState = () => {
    this.setState({
      ...initialState,
    });
  };

  toggleMap = () => {
    this.setState({
      ...initialState,
      visible: !this.state.visible,
    });
  };

  toggleFacts = () => {
    this.setState({
      ...initialState,
      facts: !this.state.facts,
    });
  };

  toggleInfo = () => {
    this.setState({
      ...initialState,
      info: !this.state.info,
    });
  };

  toggleRegion = () => {
    this.setState({
      ...initialState,
      india: !this.state.india,
    });
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
        <Map />
        <ContinentStats
          toggleGlobal={this.toggleGlobal}
          toggleAsia={this.toggleAsia}
          toggleOceania={this.toggleOceania}
          toggleAfrica={this.toggleAfrica}
          toggleEurope={this.toggleEurope}
          toggleNorthAmerica={this.toggleNorthAmerica}
          toggleSouthAmerica={this.toggleSouthAmerica}
        />

        <div className="map">
          <div className="grid">
            <AsiaMenu
              state={this.state.asia}
              toggleAsia={this.toggleAsia}
              name="Asia"
            />
            <EuropeMenu
              state={this.state.europe}
              toggleEurope={this.toggleEurope}
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
        </div>
      </>
    );
  }
}

export default App;
