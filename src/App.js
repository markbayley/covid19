import React, { Component } from "react";
import "./App.css";
import Background from "./components/Background";
import Overlay from "./components/Overlay";
import Menu1 from "./components/Menu1";
import Menu2 from "./components/Menu2";
import Menu3 from "./components/Menu3";
import Menu4 from "./components/Menu4";
import SideMenu from "./components/SideMenu";
import TextGrid from "./components/TextGrid";
import Loading from "./components/Loading";
import Covid from "./components/Covid";
import ContinentStats from "./components/ContinentStats";







class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      info: false,
      facts: false,
      india: false,
    
    };
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
          {/* <ContinentStats
       
          /> */}
          {/* <Loading /> */}
          <Covid />
          <div className="map">
            <div className="grid">
            
              <Menu1 state={this.state.info} toggleInfo={this.toggleInfo} />

              <Menu2 state={this.state.facts} toggleFacts={this.toggleFacts} />

              <Menu3 state={this.state.visible} toggleMap={this.toggleMap} />

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
