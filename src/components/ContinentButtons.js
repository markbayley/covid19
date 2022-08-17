import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";

const ContinentButtons = ({
  toggleAsia,
  toggleEurope,
  toggleOceania,
  toggleNorthAmerica,
  toggleSouthAmerica,
  toggleAfrica,
  toggleGlobal,
}) => {
  return (
    <>
      <div
        style={{
          right: "0px",
          height: "100vh", //auto mobile
          width: "auto",
          position: "absolute",
          background: "#212529",
          zIndex: 1,
          opacity: 0.9,
          display: "flex",
          flexDirection: "column", //row mobile
          justifyContent: "center",
          alignItems: "center",
          // flexWrap: "wrap" //mobile
        }}
      >
            <div id="" className="legend" style={{ color: "grey", marginBottom: "45px" }}>
          <h5
            href="https://inblockdesign.com"
            style={{ marginTop: "0px", marginBottom: "0px" }}
          >
            COVID-19
          </h5>
          <h5
            href="https://inblockdesign.com"
            style={{ marginTop: "0px", marginBottom: "0px" }}
          >
            DATAMAP
          </h5>
        </div>
               <Button
               style={{position: "absolute", top: 80}}
          className=" px-3 py-0 mr-5"
          onClick={toggleGlobal}
          id="global"
          variant="outline-info"
        >
          <h5> <i className="fa fa-search pt-2"></i></h5>
        </Button>
        {/* <Button
               style={{position: "absolute", top: 10, left: 20}}
          className=" px-3 ml-5"
          onClick={toggleGlobal}
          id="global"
          variant="outline-info"
        >
          <h5> <i className="fa fa-star pt-2"></i></h5>
        </Button> */}
        
    
        {/* <div id="" className="" style={{marginTop: '20px', zIndex: '2'}}>
        <h5>Covid-19</h5>
        <h6 >Data Map</h6>
      </div> */}
   
     
        <nav id="menu"></nav>
        {/* <div id="state-legend" className="legend pl-1 pr-2" >
      
        
          <div >
         <span style={{ backgroundColor: "#ff125e", height: "20px", width: "20px"}} ></span>Extreme
          </div>
          <div>
        <span style={{ backgroundColor: "#e72585", height: "17px", width: "17px" }}></span>Serious
          </div>
          <div>
          <span style={{ backgroundColor: "#ca32ad", height: "14px", width: "14px" }}></span>Moderate
          </div>
          <div>
          &nbsp;<span style={{ backgroundColor: "#a13ed5", height: "11px", width: "11px" }}></span>Limited
          </div>
          <div>
            &nbsp;<span style={{ backgroundColor: "#6a5dfc", height: "8px", width: "8px" }}></span>Mild
          </div>
          <div >
            <span style={{ backgroundColor: "orange" }} ></span>Active
          </div>
        </div> */}

        <Row>
          <Col className="box px-0 mx-0">
          <div id="" className="legend" >
            <div className="mb-2 mt-0">Extreme</div>
          <div >
         <span style={{ backgroundColor: "#ff125e", height: "22px", width: "22px"}} ></span>
          </div>
          <div>
        <span style={{ backgroundColor: "#e72585", height: "19px", width: "19px" }}></span>
          </div>
          <div>
          <span style={{ backgroundColor: "#ca32ad", height: "16px", width: "16px" }}></span>
          </div>
          <div>
       <span style={{ backgroundColor: "#a13ed5", height: "13px", width: "13px" }}></span>
          </div>
          <div>
         <span style={{ backgroundColor: "#6a5dfc", height: "11px", width: "11px" }}></span>
          </div>
          {/* <div >
            <span style={{ backgroundColor: "orange" }} ></span>
          </div> */}
              <div className="mb-0 mt-1">Mild</div>
          </div>
          </Col>
  

        </Row>

        {/* <Button
          className="button"
          id="Afghanistan"
          onClick={toggleAsia}
          variant="outline-info"
        >
          <h6>Afghanistan</h6>
        </Button> */}
        <Button
          className="button"
          id="asia"
          onClick={toggleAsia}
          variant="outline-info"
        >
          <h6>Asia</h6>
        </Button>
        <Button
          className="button"
          onClick={toggleEurope}
          id="europe"
          variant="outline-info"
        >
          <h6>Europe</h6>
        </Button>
     
        <Button
          className="button"
          onClick={toggleNorthAmerica}
          id="northamerica"
          variant="outline-info"
        >
          <h6>North America</h6>
        </Button>
        <Button
          className="button"
          onClick={toggleAfrica}
          // size="md"
          id="africa"
          variant="outline-info"
        >
          <h6>Africa</h6>
        </Button>
        <Button
          className="button"
          onClick={toggleSouthAmerica}
          id="southamerica"
          variant="outline-info"
        >
          <h6>South America</h6>
        </Button>

        <Button
          className="button"
          onClick={toggleOceania}
          id="oceania"
          variant="outline-info"
        >
          <h6>Oceania</h6>
        </Button>
        {/* <Button
          className="button"
          onClick={toggleGlobal}
          id="global"
          variant="outline-info"
        >
          <h6>Global</h6>
        </Button> */}
    

        <div id="" className="" style={{ color: "grey", lineHeight: 1 }}>
          {/* <p href="https://inblockdesign.com" >   <i className="fa fa-info-circle"></i> Inblock</p> */}
          <p
            href="https://inblockdesign.com"
            style={{ marginTop: "10px", marginBottom: "0px" }}
            className="pb-0"
          >
            Inblock
          </p>
          <p
            href="https://inblockdesign.com"
            style={{ marginTop: "0px", marginBottom: "0px" }}
            className="pt-0"
          >
            Design <i className="fa fa-info-circle"></i>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default ContinentButtons;



