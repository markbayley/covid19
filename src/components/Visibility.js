import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Counter from './Counter';
import MyForm from './MyForm';

export class Visibility extends Component {
     state = {
    visible: true,
  };

    
    render() {
        const buttonText = this.state.visible ? "Hide" : "Show";
        return (
          <div>
            <Button
              variant="outline-info"
              onClick={() => {
                this.setState({ visible: !this.state.visible });
              }}
            >
              {buttonText}
            </Button>
            <div className={this.state.visible ? "visible" : "hidden"}>
              <Counter />
            </div>

            <div className={this.state.visible ? "hidden" : "visible"}>
              <MyForm />
            </div>
          </div>
        );
    }
}

export default Visibility
