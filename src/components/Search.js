import React, { useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Col, Row, Container } from "react-bootstrap";
import { numberWithCommas } from "../utils/numberWithCommas";
import { Doughnut, Bar, HorizontalBar, Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import TabsComponent from "../misc/TabsComponent";
import Badge from "react-bootstrap/Badge";
import CountUp from "react-countup";
import BarGraph from "../misc/BarGraph";
import LineGraph from "./LineGraph";

const Search = ({ region, state, handleClose }) => {
  return (
    <div className={state ? "visible" : "hidden"}>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >
        <div className="side">
          <Container>
            <Row className="title my-1">
              <Col xs="auto" className="pl-3">
                <Animated
                  animationIn="fadeInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                  className="pl-1 pb-2"
                >
                  {" "}
                  Search&nbsp;
                </Animated>
              </Col>

              <Col className=" pr-2 ">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    onClick={handleClose}
                    variant="outline-info"
                    className="close button"
                  >
                    <h5>
                      {" "}
                      <i className="fa fa-close"></i>
                    </h5>
                  </Button>
                </div>
              </Col>
            </Row>
            <Row className="map-overlay" style={{ height: "94vh", border: "" }}>
              <Col style={{ overflowY: "scroll", height: "100%" }}>
                <div id="geocoder" className="geocoder"></div>

                <div className="title mt-4 mb-2 ">Filter</div>
                <div id="menu" className=""></div>

                <div id="toggle" className=""></div>

                <fieldset className="mb-2">
                  <input
                    id="feature-filter"
                    type="text"
                    placeholder="Filter Locations..."
                    className="mb-2"
                  />
                </fieldset>

                <div id="feature-listing" className="listing"></div>
              </Col>
            </Row>
          </Container>
        </div>
      </Animated>
    </div>
  );
};

export default Search;
