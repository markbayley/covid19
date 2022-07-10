import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import ContinentStats from "./ContinentStats";
import { Pie, Doughnut, Bar, HorizontalBar } from "react-chartjs-2";

class NorthAmericaMenu extends Component {
  render() {
    return (
      <>

        <div className={this.props.state ? "visible" : "hidden"}>
          <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOut"
            isVisible={true}
          >

            <div className="App-side">
              <div className="App-side-menu">
                <Container style={{ border: "1px solid #fff" }}>
                  <Row style={{ border: "1px solid #fff" }}>
                    <Col>    
                    <HorizontalBar

                      height={490}


                      options={{ maintainAspectRatio: true }}
                      data={{
                        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                        datasets: [
                          {
                            label: "Cases per Million",
                            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                            backgroundColor: colors,
                          }
                        ]
                      }}

                    /></Col>
                    <Col>    <Doughnut
                      height={300}
                      options={{
                        maintainAspectRatio: true,
                        title: {
                          display: false,
                          text: '',
                          fontSize: 10
                        },
                        legend: {
                          display: false,
                          position: ''
                        }
                      }}
                      data={{
                        labels: "",
                        datasets: [
                          {
                            label: "continents",
                            data: [30, 80, 20, 60],
                            backgroundColor: colors,
                          }
                        ]
                      }}
                    />  </Col>
                  </Row>
                  <Row style={{ border: "1px solid #fff" }}>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                </Container>
                <Button
                  onClick={this.props.toggleNorthAmerica}
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
                    <h4>North America</h4>

                    {/* <Covid /> */}
                    {/* <DataTable /> */}
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

export default NorthAmericaMenu;




let colors = [

  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",
  "rgb(212, 23, 83)",


];

