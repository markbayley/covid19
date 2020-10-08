import React, {Component} from 'react'
import { Button } from "react-bootstrap"

class Child extends Component {
    render() {
    return (
      <div >
        <h4>{this.props.name}</h4> <h3>{this.props.state}</h3>
        <br />
        <Button variant="outline-secondary" onClick={this.props.Increment}> Increment</Button>
      </div>
    );
}
}

export default Child
