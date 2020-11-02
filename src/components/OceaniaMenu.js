import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";
import ContinentStats from "./ContinentStats";

import Covid from "./Covid";
import DataTable from "./DataTable";

class OceaniaMenu extends Component {
  render() {
    return (
      <>
        <div className={this.props.state ? "visible" : "hidden"}>
          <Animated
            animationIn="fadeInRight"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div className="App-side">
              <div className="App-side-menu">
                <Button
                  onClick={this.props.toggleOceania}
                  size="sm"
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
                    <h4>Oceania</h4>

                    {/* <Covid /> */}
                    {/* <DataTable /> */}
                    <p>
                      <Button
                        className="oceania button"
                        id="asia"
                        onClick={this.toggleOceania}
                        size="md"
                        variant="outline-info"
                        // className={getData("cases")[1] / 1000000 <= 10 ? "asia" : "asia2"}
                      >
                        {/* <h6>
                          <i className="fa fa-info-circle"></i>{" "}
                     
                        </h6> */}

                        {/* {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}
        {<i className="fa fa-male fa-4x"></i>}  */}

                        {/* <div>{icon}</div>
        <div></div> */}
                      </Button>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        </div>
      </>
    );
  }
}

export default OceaniaMenu;
