import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import "./App.css";
import Counter from "./components/Counter";
import FormValidation from "./components/FormValidation";
import MyForm from "./components/MyForm";
import { Animated } from "react-animated-css";
import { ReactComponent as Info } from "./info5.png";
import MenuButton from "./components/MenuButton";

class App extends Component {
  state = {
    visible: true,
    info: false,
    facts: false,
    india: false,
  };

  render() {
    return (
      <>
        <section>
          <a className="china" href="#"></a>
          <a className="italy" href="#"></a>
          <a className="japan" href="#"></a>
          <a className="iran" href="#">IRAN</a>

          <a
            class="mexico"
            href="#"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            {/* <i class="fa fa-male"></i>
            <i class="fa fa-male"></i> */}
          </a>
          <a
            class="brazil"
            href="#"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
          >
            {/* <i class="fa fa-male"></i> */}
            {/* <i class="fa fa-male"></i> */}
          </a>
          <a class="congo">Congo</a>
          <a class="indo" href="#">
            IN
          </a>
          <a class="indi" href="#"></a>

          <a class="york" href="#">
            york
          </a>
          <a class="uk" href="#">
            uk
          </a>

          <a class="russia" href="#">
            russia
          </a>

          <div className="set">
            <div>
              <img src="/virus.png" width="110px" />
            </div>
            <div>
              <img src="/virus.png" width="90px" />
            </div>
            <div>
              <img src="/virus.png" width="700px" />
            </div>
            <div>
              <img src="/virus.png" width="70px" />
            </div>
            <div>
              <img src="/virus.png" width="100px" />
            </div>
            <div>
              <img src="/virus.png" width="80px" />
            </div>
          </div>
          <div className="set2">
            <div>
              <img src="/trail.png" width="10px" />
            </div>
            <div>
              <img src="/trail.png" width="9px" />
            </div>
            <div>
              <img src="/trail.png" width="7px" />
            </div>
            <div>
              <img src="/trail.png" width="7px" />
            </div>
            <div>
              <img src="/trail.png" width="6px" />
            </div>
            <div>
              <img src="/trail.png" width="6px" />
            </div>
            <div>
              <img src="/trail.png" width="10px" />
            </div>
            <div>
              <img src="/trail.png" width="9px" />
            </div>
            <div>
              <img src="/trail.png" width="7px" />
            </div>
            <div>
              <img src="/trail.png" width="10px" />
            </div>
            <div>
              <img src="/trail.png" width="4px" />
            </div>
            <div>
              <img src="/trail.png" width="1px" />
            </div>
            <div>
              <img src="/trail.png" width="10px" />
            </div>
            <div>
              <img src="/trail.png" width="9px" />
            </div>
            <div>
              <img src="/trail.png" width="2px" />
            </div>
            <div>
              <img src="/trail.png" width="7px" />
            </div>
            <div>
              <img src="/trail.png" width="5px" />
            </div>
            <div>
              <img src="/trail.png" width="6px" />
            </div>
          </div>
          <div className="App">
            {/* <div className="hi"> Infographic</div> */}

            <Animated
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible={true}
            >
              <div className="App-header">
                <Animated
                  animationIn="fadeInUp"
                  animationOut="fadeOut"
                  isVisible={true}
                ></Animated>

                {/* SIDEBAR */}
                <div className={this.state.visible ? "hidden" : "visible"}>
                  <Animated
                    animationIn="fadeInRight"
                    animationOut="fadeOut"
                    isVisible={true}
                  >
                    <div className="App-side">
                      <div className="App-side-menu">
                        <Button
                          onClick={() => {
                            this.setState({ visible: !this.state.visible });
                          }}
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
                        <div
                          className={this.state.visible ? "hidden" : "visible"}
                        >
                          <div className="App-side-button">
                            <h4>Map </h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur. Excepteur
                              sint occaecat cupidatat non proident, sunt in
                              culpa qui officia deserunt mollit anim id est
                              laborum.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Animated>
                </div>

                {/* SIDEBAR - INFO */}
                <div className={this.state.info ? "visible" : "hidden"}>
                  <Animated
                    animationIn="fadeInRight"
                    animationOut="fadeOut"
                    isVisible={true}
                  >
                    <div className="App-side">
                      <div className="App-side-menu">
                        <Button
                          onClick={() => {
                            this.setState({ info: !this.state.info });
                          }}
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
                        <div
                          className={!this.state.info ? "hidden" : "visible"}
                        >
                          <div className="App-side-button">
                            <h4>Info </h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Animated>
                </div>
              </div>

              {/* SIDEBAR - FACTS */}
              <div className={this.state.facts ? "visible" : "hidden"}>
                <Animated
                  animationIn="fadeInRight"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <div className="App-side-india">
                    <div className="App-side-menu">
                      <Button
                        onClick={() => {
                          this.setState({ facts: !this.state.facts });
                        }}
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
                      <div className={!this.state.facts ? "hidden" : "visible"}>
                        <div className="App-side-button">
                          <h4>Facts </h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                        </div>
                        <div className="region">
                          <Button
                            onClick={() => {
                              this.setState({ facts: !this.state.facts });
                            }}
                            size="lg"
                            variant="outline-light"
                            className="region-button"
                          >
                            <Animated
                              animationIn="fadeInDown"
                              animationOut="fadeOut"
                              isVisible={true}
                            ></Animated>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Animated>
              </div>

              {/* INDIA */}
              <div className={this.state.india ? "visible" : "hidden"}>
                <Animated
                  animationIn="fadeInt"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <div className="App-side-india">
                    <div className="App-side-menu">
                      <Button
                        onClick={() => {
                          this.setState({ india: !this.state.india });
                        }}
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
                      <div className={!this.state.india ? "hidden" : "visible"}>
                        <div className="App-side-button">
                          <h4>India </h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Animated>
              </div>

              {/* MAP */}
              <div className="map">
                <div id="world">
                  <button
                    className="mapbutton"
                    style={{
                      padding: "10rem 10rem 0rem 5rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <img src="/africa.png" alt="africa" width="300px"/> */}
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "0rem 0rem 10rem 15rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <img src="/africa.png" alt="africa" width="300px"/> */}
                    {/* Europe is poorly positioned to deal with the outbreak and
                    its winter months pose greater risks of an acceleration in
                    case numbers. */}
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "10rem 0rem 0rem 5rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <img src="/africa.png" alt="africa" width="300px"/> */}
                    Europe is experiencing a second wave of the virus, particularly in Spain and the United Kingdom.
                    <Animated
                      animationIn="zoomIn"
                      animationOut="zoomOut"
                      animationInDuration={20000}
                      animationOutDuration={30000}
                      isVisible={true}
                    >
                      <img src="/africa1.svg" alt="africa" width="5px" />
                    </Animated>
                  </button>

                  <button
                    className="mapbutton"
                    style={{
                      padding: "0rem 10rem 0rem 5rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <img src="/africa.png" alt="africa" width="300px"/> */}
                    {/* Latin America is poorly positioned to deal with the outbreak
                    and its winter months pose greater risks of an acceleration
                    in case numbers. */}
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "16rem 15rem 0rem 0rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <img src="/africa.png" alt="africa" width="300px"/> */}
                    {/* North America is poorly positioned to deal with the outbreak
                    and its winter months pose greater risks of an acceleration
                    in case numbers. */}
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "10rem 2rem 0rem 2rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <div className="text"> */}
                    North America is poorly positioned to deal with the outbreak
                    and its winter months pose greater risks of an acceleration
                    in case numbers.
                    {/* </div> */}
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "2rem 0rem 0rem 6rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {" "}
                    The virus spread to New York through transatlantic passenger flights and has killed over 200,000 Americans.
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "8rem 0rem 0rem 5rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {" "}
                    North America is poorly positioned to deal with the outbreak
                    and its winter months pose.
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "2rem 0rem 7rem 5rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                      // flexDirection: "column",
                      //   display: "flex",
                      // alignItems: "center"
                    }}
                  >
                    {" "}
                    North America is poorly positioned to deal with the outbreak
                    and its winter months.
                    <br />
                    {/* <button className="link indonesia"></button> */}
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "2rem 2rem 0rem 4rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  >
                    {" "}
                    The coronavirus emerged from Wuhan in January 2020, from a local fish market.
                  </button>

                  <button
                    className="mapbutton"
                    style={{
                      padding: "16rem 15rem 0rem 0rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  ></button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "16rem 15rem 0rem 0rem",
                      textAlign: "left",
                      // outline: "none 0",
                      // border: "1px solid black",
                    }}
                  ></button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "3rem 7rem 0rem 0rem",
                      textAlign: "left",
                      // border: "1px solid black",
                      // outline: "none 0",
                    }}
                  >
                   African nations face limited testing capabilities and are just beginning to be impacted by the virus.
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "2rem 0rem 10rem 5rem",
                      textAlign: "left",
                      // border: "1px solid black",
                      // outline: "none 0",
                    }}
                  >
                    {" "}
                   India and Indonesia are at high risk due to densely packed populations with limited health care systems.
                  </button>
                  <button
                    className="mapbutton"
                    style={{
                      padding: "10rem 5rem 0rem 2rem",
                      textAlign: "left",
                      // border: "1px solid black",
                      // outline: "none 0",
                    }}
                  >
                    {" "}
                    Australia and New Zealand have some of the lowest rates of infection in the developed world due to strict border controls.
                  </button>
                </div>

                <div className={this.state.visible ? "visible" : "hidden"}>
                  {/* MENU */}
                  <div className="menu">
                    <Button
                      onClick={() => {
                        this.setState({ info: !this.state.info });
                      }}
                      size="md"
                      variant="outline-info"
                      className="button"
                    >
                      <Animated
                        animationIn="fadeInDown"
                        animationOut="fadeOut"
                        isVisible={true}
                      >
                        <i class="fa fa-info-circle"></i> Info
                      </Animated>
                    </Button>
                    {/* <Button variant="outline">
                      <img src="/africa.png" width="80px" />
                    </Button> */}

                    <Button
                      onClick={() => {
                        this.setState({ facts: !this.state.facts });
                      }}
                      size="md"
                      variant="outline-info"
                      className="button"
                    >
                      <Animated
                        animationIn="fadeInDown"
                        animationOut="fadeOut"
                        isVisible={true}
                      >
                        <i class="fa fa-search"></i> Facts
                      </Animated>
                    </Button>

                    <Button
                      onClick={() => {
                        this.setState({ visible: !this.state.visible });
                      }}
                      size="md"
                      variant="outline-info"
                      className="button"
                    >
                      <Animated
                        animationIn="fadeInDown"
                        animationOut="fadeOut"
                        isVisible={true}
                      >
                        <i class="fa fa-globe"></i> Map
                      </Animated>
                    </Button>
                  </div>
                </div>

                {/* <button
                  onClick={() => {
                    this.setState({ india: !this.state.india });
                  }}
                  className="link india"
                ></button> */}
                {/* <button className="link indonesia"></button> */}
              </div>
            </Animated>
          </div>
        </section>
      </>
    );
  }
}

export default App;
