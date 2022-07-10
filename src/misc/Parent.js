import React, { Component } from 'react'
import Child from './Child';

export class Parent extends Component {
   constructor(props) {
      super(props);

      this.state = {
          count: 0
      }
   }

   Increment = () => {
       this.setState ({
           count: this.state.count + 1
       })
   }
    render() {
        return (
          <div>
            <Child name="Alex" state={this.state.count} Increment={this.Increment}/>
          </div>
        );
    }
}

export default Parent
