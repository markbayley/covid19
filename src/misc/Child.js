import React, {Component} from 'react'
import { Button } from "react-bootstrap"

const Child = ({name, state, Increment}) => {
   
    return (
      <div >
        <h4>{name}</h4> <h3>{state}</h3>
        <br />
        <Button variant="outline-secondary" onClick={Increment}> Increment</Button>
      </div>
    );
}


export default Child
