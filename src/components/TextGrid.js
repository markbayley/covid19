import React, { Component } from "react";
import Asia from "./Asia";

import './TextGrid.scss'

class TextGrid extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       asia: 1000,
    }
  }
  
  render() {
    const asia = this.state.asia;
    return (
      <>
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
          Asia is poorly positioned to deal with the outbreak and its winter
          months pose greater.
          {/* <Animated
                      animationIn="zoomIn"
                      animationOut="zoomOut"
                      animationInDuration={20000}
                      animationOutDuration={30000}
                      isVisible={true}
                    >
                      <img src="/africa1.svg" alt="africa" width="5px" />
                    </Animated> */}
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
          North America is poorly positioned to deal with the outbreak and its
          winter months pose greater risks of an acceleration in case numbers.
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
          North America is poorly positioned to deal with the outbreak and its
          winter months pose greater risks.
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
          North America is poorly positioned to deal with the outbreak and its
          winter months pose.
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
          {/* <Asia asia={this.state.asia} />
          {asia}

          <br /> */}
          Asia is poorly positioned to deal with the outbreak and its winter
          months.
          <div class="svg-wrapper">
            <svg height="2" width="320" xmlns="http://www.w3.org/2000/svg">
              <rect class="shape" height="90" width="320" />
            </svg>

            <div class="text"> </div>
          </div>
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
          North America is poorly positioned to deal with the outbreak and its
          winter months pose greater risks .
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
          onClick={this.props.toggleRegion}
          className="mapbutton"
          style={{
            padding: "3rem 7rem 0rem 0rem",
            textAlign: "left",
            // border: "1px solid black",
            // outline: "none 0",
          }}
        >
          India is poorly positioned to deal with the outbreak and its winter
          months pose.
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
          North America is poorly positioned to deal with the outbreak and its
          winter months pose.
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
          North America is poorly positioned to deal with the outbreak and its
          winter months pose.
        </button>
      </>
    );
  }
}

export default TextGrid;
