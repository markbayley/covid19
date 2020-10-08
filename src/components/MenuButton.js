import React, { Component } from 'react'
import { Animated } from 'react-animated-css';
import { Button } from 'react-bootstrap';

class MenuButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          visible: true,
        };
    }
    

  render() {
    return (
      <div className={this.state.visible ? "visible" : "hidden"}>
        <Button
          onClick={() => {
            this.setState({ visible: !this.state.visible });
          }}
          size="lg"
          variant="outline-dark"
          className="button"
        >
          <Animated
            animationIn="fadeInDown"
            animationOut="fadeOut"
            isVisible={true}
          >
            React
          </Animated>
        </Button>
      </div>
    );
  }
}

export default MenuButton
