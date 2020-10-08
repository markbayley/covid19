  
import React from "react";
import { Button, Dropdown, Form, FormControl, InputGroup } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

class MyForm extends React.Component {
  state = {
    name: "ben",
    favoritePet: "Zack",
    rememberMe: false,
    title: "Miss.",
  };

  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
        <>
      <Form onSubmit={this.handleSubmit}>
        <FormControl
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <FormControl
          name="favoritePet"
          value={this.state.favoritePet}
          onChange={this.handleChange}
        />
        <Form
          name="rememberMe"
          type="checkbox"
          checked={this.state.rememberMe}
          onChange={this.handleChange}
        />
        <Dropdown>
          <DropdownToggle
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          >
            <DropdownMenu>
              <DropdownItem>Mr.</DropdownItem>
              <DropdownItem>Miss.</DropdownItem>
              <DropdownItem>Ms.</DropdownItem>
              <DropdownItem>Mrs.</DropdownItem>
            </DropdownMenu>
          </DropdownToggle>
        </Dropdown>
        <Button type="submit">submit</Button>
      </Form>
      
      <Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
</Form>
</>
    );
  }
}

export default MyForm;
