import React, { Component } from 'react'
import { Animated } from "react-animated-css";
import { Button } from "react-bootstrap";
import './SideMenu.scss'

class SideMenu extends Component {
    render() {
        return (
          <div className={this.props.state ? "visible" : "hidden"}>
            {/* MENU */}
            <div className="menu">
              <Button
                onClick={this.props.toggleInfo}
                size="md"
                variant="outline-info"
                className="button"
              >
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <i className="fa fa-info-circle"></i> Info
                </Animated>
              </Button>

              <Button
                onClick={this.props.toggleFacts}
                size="md"
                variant="outline-info"
                className="button"
              >
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <i className="fa fa-search"></i> Facts
                </Animated>
              </Button>

              <Button
                onClick={this.props.toggleMap}
                size="md"
                variant="outline-info"
                className="button"
              >
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <i className="fa fa-globe"></i> Map
                </Animated>
              </Button>

              <Button
                onClick={this.props.toggleRegion}
                size="md"
                variant="outline-info"
                className="button"
              >
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <i className="fa fa-globe"></i> India
                </Animated>
              </Button>
            </div>
          </div>
        );
    }
}

export default SideMenu
