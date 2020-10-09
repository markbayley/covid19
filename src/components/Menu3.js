import React, { Component } from 'react'
import { Animated } from 'react-animated-css';
import { Button } from 'react-bootstrap';

class Menu3 extends Component {
  render() {
    return (
      <div className={this.props.state? "hidden" : "visible"}>
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOut"
          isVisible={true}
        >
          <div className="App-side">
            <div className="App-side-menu">
              <Button
                onClick={this.props.toggleMap}
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
              <div className={this.props.state ? "hidden" : "visible"}>
                <div className="App-side-button">
                  <h4>Map </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    );
  }
}

export default Menu3
