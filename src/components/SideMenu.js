import React, { Component } from 'react'
import { Animated } from "react-animated-css";
import { Button, Overlay } from "react-bootstrap";
import ContinentStats from './ContinentStats';
import './SideMenu.scss'

  


class SideMenu extends Component {

  
   
    render() {
      
        return (
          <div className={this.props.state ? "visible" : "hidden"}>
            {/* MENU */}

            <div className="menu">
              {/* <a onClick={this.props.toggleInfo} className="iran">
                Iran
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="china">
                China <br /> */}
              {/* {this.props.china} */}
              {/* <ContinentStats/> */}

              {/* </a> */}
              {/* <a onClick={this.props.toggleInfo} className="italy">
                Italy
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="japan">
                Japan
              </a> */}

              {/* <a onClick={this.props.toggleInfo} className="york">
                New York
              </a>
              <a onClick={this.props.toggleInfo} className="uk">
                U.K.
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="russia">
                Russia
              </a> */}

              {/* <a onClick={this.props.toggleInfo} className="congo">
                Congo
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="indi">
                India
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="indo">
                Indonesia
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="brazil">
                Brazil
              </a> */}
              {/* <a onClick={this.props.toggleInfo} className="mexico">
                Mexico
              </a> */}

              <Button
                onClick={this.props.toggleAsia}
                size="md"
                variant="outline-info"
                className="button"
                id="asia"
              >
                <Animated
                  animationIn="fadeInDown"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <i className="fa fa-info-circle"></i> Asia
                </Animated>
              </Button>

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
