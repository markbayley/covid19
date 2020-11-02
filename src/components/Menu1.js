import React, { Component } from 'react'
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";
import ContinentStats from './ContinentStats';

import Covid from './Covid';
import DataTable from './DataTable';


class Menu1 extends Component {
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
                      onClick={this.props.toggleInfo}
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
                        <h4>Info </h4>
                      {/* <Covid /> */}
                     <DataTable />
      

                      
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

export default Menu1
