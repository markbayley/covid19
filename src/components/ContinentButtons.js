import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ContinentButtons = ({ toggleAsia, toggleEurope, toggleOceania, toggleNorthAmerica, toggleSouthAmerica, toggleAfrica, toggleGlobal }) => {

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
        <div id="" className="legend" style={{ color: "grey" }}>
          <h5 href="https://inblockdesign.com" style={{ marginTop: "0px", marginBottom: "0px" }}>COVID-19</h5>
          <h5 href="https://inblockdesign.com" style={{ marginTop: "0px", marginBottom: "0px" }}>DATAMAP</h5>
        </div>
        {/* <div id="" className="" style={{marginTop: '20px', zIndex: '2'}}>
        <h5>Covid-19</h5>
        <h6 >Data Map</h6>
      </div> */}
       
        <nav id="menu"></nav>
        <div id="state-legend" className="legend">
          {/* <h6 style={{color: "grey"}}>KEY</h6> */}
          <div><span style={{ backgroundColor: "#dd5182" }}></span>Highest</div>
          <div><span style={{ backgroundColor: "#ff6e54" }}></span>Higher</div>
          <div><span style={{ backgroundColor: "#ffa600" }}></span>Average</div>
          <div><span style={{ backgroundColor: "#955196" }}></span>Lower</div>
          <div><span style={{ backgroundColor: "#444e86" }}></span>Lowest</div>
        </div>
     
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
          <h6>
            Oceania
          </h6>
        </Button>
        <Button
          className="button"
          onClick={toggleGlobal}
          id="global"
          variant="outline-info"
        >
          <h6>
            Global
          </h6>
        </Button>
      
        <div id="" className="" style={{ color: "grey", lineHeight: 1 }}>
          {/* <p href="https://inblockdesign.com" >   <i className="fa fa-info-circle"></i> Inblock</p> */}
          <p href="https://inblockdesign.com" style={{ marginTop: "10px", marginBottom: "0px" }} className="pb-0">Inblock</p>
          <p href="https://inblockdesign.com" style={{ marginTop: "0px", marginBottom: "0px" }} className="pt-0">Design <i className="fa fa-info-circle"></i> </p>
        </div>
      </div>
    </>
  );
};

export default ContinentButtons;

