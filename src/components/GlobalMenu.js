import React, { useEffect, useState } from "react";
import { GLOBAL_URL } from "../api/api";
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";
import ContinentStats from "./ContinentStats";
import { numberWithCommas } from "../utils/numberWithCommas";


import Covid from "./Covid";
import DataTable from "./DataTable";

const GlobalMenu = ({props, state, toggleGlobal }) => {
        const [globalStats, setGlobalStats] = useState({});

        useEffect(() => {
          async function fetchGlobalSummary() {
            try {
              const result = await fetch(GLOBAL_URL);
              const globalStats = await result.json();
              setGlobalStats({ ...globalStats });
              props.updated(globalStats["updated"]);
            } catch (error) {
              console.log(error);
            }
          }
          fetchGlobalSummary();
        }, []);

        const icon = <i className="fa fa-male fa-4x"></i>;

    return (
      <>
        <div className={state ? "visible" : "hidden"}>
          <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div className="App-side">
              <div className="App-side-menu">
                <Button
                  onClick={toggleGlobal}
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
                <div className={!state ? "hidden" : "visible"}>
                  <div className="App-side-button">
                    <h4>Global</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h5>
                      {" "}
                      {
                        <i className="fa fa-male" style={{ color: "#fff" }}></i>
                      }{" "}
                      {numberWithCommas(globalStats.cases)} Cases
                    </h5>
                    <h5>
                      {
                        <i
                          className="fa fa-male"
                          style={{ color: "orange" }}
                        ></i>
                      }{" "}
                      {numberWithCommas(globalStats.active)} Active
                    </h5>
                    <h5>
                      {<i className="fa fa-male" style={{ color: "red" }}></i>}{" "}
                      {numberWithCommas(globalStats.deaths)} Deaths{" "}
                    </h5>{" "}
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p>
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }

                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "orange" }}
                        ></i>
                      }
                      {
                        <i
                          className="fa fa-male fa-2x"
                          style={{ color: "red" }}
                        ></i>
                      }
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      <br />
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}

                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      <br />
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                      {<i className="fa fa-male fa-2x"></i>}
                    </p>
                    {/* <Covid /> */}
                    {/* <DataTable /> */}
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        </div>
      </>
    );
  }


export default GlobalMenu;
