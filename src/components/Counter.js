import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <Button variant="outline-info" onClick={this.increment}>
        {this.state.count}
      </Button>
    );
  }
}

export default Counter;
