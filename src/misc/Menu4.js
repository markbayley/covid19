import React, { Component } from 'react'
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import ContinentStats from './ContinentStats';



 class Menu4 extends Component {
    render() {
        return (
          <div
            className={this.props.state ? "visible" : "hidden"}
            // style={{ border: "3px solid orange" }}
          >
            <Animated
              animationIn="zoomIn"
              animationOut="zoomOut"
              isVisible={true}
              animationInDuration={2000}
            >
              <div className="App-side-india">
                <div className="App-side-menu">
                  <Button
                    onClick={this.props.toggleRegion}
                    size="md"
                    variant="outline-light"
                    className="App-side-close"
                  >
                    <div>x</div>
                  </Button>
                  <div className={!this.props.state ? "hidden" : "visible"}>
                    Data
                  </div>
                
                  {/* <Covid /> */}
                </div>
              </div>
            </Animated>
          </div>
        );
    }
}

export default Menu4
