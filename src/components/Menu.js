import React from "react";
import { numberWithCommas } from "../utils/numberWithCommas";
const Menu = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">{props.labels[0]}</h3>
          <p className="card-text">{props.data[0]}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">{props.labels[1]}</h3>
          <p className="card-text">{props.data[1]}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">{props.labels[2]}</h3>
          <p className="card-text">{props.data[2]}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">{props.labels[3]}</h3>
          <p className="card-text">{props.data[3]}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">{props.labels[4]}</h3>
          <p className="card-text">{numberWithCommas(props.data[4])}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">{props.labels[5]}</h3>
          <p className="card-text">{props.data[5]}</p>
        </div>
      </div>
    </>
  );
};

export default Menu;
