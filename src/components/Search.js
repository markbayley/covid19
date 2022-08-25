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

const Search = ({
  region,
  state,
  handleClose,
}) => {


  return (
    <div className={state ? "visible" : "hidden"}>
      <Animated
        animationIn="fadeInLeft"
        animationOut="fadeOut"
        isVisible={true}
      >
        <div className="side" >
          <Container>
            <Row className="title my-1" >
              <Col xs="auto" className="pl-2">
                <Animated
                  animationIn="fadeInLeft"
                  animationOut="fadeOut"
                  isVisible={true}
                  className=""
                >
                  {" "}
                  {region}&nbsp;
           
                </Animated>
              </Col>

              <Col className="ml-2 pr-1 mt-1">
                <div  style={{ display: "flex", justifyContent: "end"}}>
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

            {/* </div> */}
            <div className="map-overlay">
              <div className="title mt-3 mb-3 ml-3">Search</div>
              <div id="geocoder" className="geocoder"></div>

              <div className="title mt-4 mb-2 ml-3">Filter</div>
              <div id="menu" className="pl-2"></div>
              <fieldset className="mb-2"  style={{  boxShadow: "2px 2px 2px 1px  rgb(0 0 0 / 10%)"}}>
                <input
                  id="feature-filter"
                  type="text"
                  placeholder="Filter Locations..."
                  className="mb-2" 
                />
              </fieldset>

              <div id="feature-listing" className="listing"></div>
              {/* <div id="listings" className="listings"></div> */}
            </div>
          </Container>
        </div>
      </Animated>
    </div>
  );
};

export default Search;

