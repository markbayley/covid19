import React, { Component } from 'react'
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";

 class Menu4 extends Component {
    render() {
        return (
          <div className={this.props.state ? "visible" : "hidden"} style={{border: "3px solid orange"}}>
            <Animated
              animationIn="fadeInt"
              animationOut="fadeOut"
              isVisible={true}
            >
              <div className="App-side-india">
                <div className="App-side-menu">
                  <Button
                    onClick={this.props.toggleRegion}
                    size="md"
                    variant="outline-light"
                    className="App-side-close"
                  >
                    <Animated
                      animationIn="fadeInDown"
                      animationOut="fadeOut"
                      isVisible={true}
                    >
                      <div>x</div>
                    </Animated>
                  </Button>
                  <div className={!this.props.state ? "hidden" : "visible"}>
                    <div className="App-side-button">
                      <h4>India </h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Animated>
          </div>
        );
    }
}

export default Menu4
