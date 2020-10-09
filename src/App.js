import React, { Component } from "react";
import "./App.css";
import FormValidation from "./components/FormValidation";
import Background from "./components/Background";
import Overlay from "./components/Overlay";
import Menu1 from "./components/Menu1";
import Menu2 from "./components/Menu2";
import Menu3 from "./components/Menu3";
import Menu4 from "./components/Menu4";
import SideMenu from "./components/SideMenu";
import TextGrid from "./components/TextGrid";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      info: false,
      facts: false,
      india: false,
      items: [],
      isLoaded: true,
    };
  }

  componentDidMount() {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          isLoaded: true,
          items: res.colors,
        });
      });
  }

  toggleMap = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  toggleFacts = () => {
    this.setState({
      facts: !this.state.facts,
    });
  };

  toggleInfo = () => {
    this.setState({
      info: !this.state.info,
    });
  };

  toggleRegion = () => {
    this.setState({
      india: !this.state.india,
    });
  };

  render() {
   
    return (
      <>
        <section>
          <Background />
          <Overlay />
          <div className="map">
            <div className="grid">
              {/*  INFO */}
              <Menu1 state={this.state.info} toggleInfo={this.toggleInfo} />

              {/* FACTS */}
              <Menu2 state={this.state.facts} toggleFacts={this.toggleFacts} />

              {/* MAP */}
              <Menu3 state={this.state.visible} toggleMap={this.toggleMap} />

              {/* INDIA */}
              <Menu4
                className="link india"
                state={this.state.india}
                toggleRegion={this.toggleRegion}
              />

              <TextGrid />
            </div>

            <SideMenu
              state={this.state.visible}
              toggleMap={this.toggleMap}
              toggleInfo={this.toggleInfo}
              toggleFacts={this.toggleFacts}
              toggleRegion={this.toggleRegion}
            />
          </div>
        </section>
      </>
    );
  }
}

export default App;
