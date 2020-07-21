import React from "react";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

export const MainNavbar = () => {
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">SUSTAIN Dataset Explorer</Navbar.Brand>
        {/*<Nav className="mr-auto">*/}
        {/*    <Nav.Link href="#home">Home</Nav.Link>*/}
        {/*    <Nav.Link href="#features">Features</Nav.Link>*/}
        {/*    <Nav.Link href="#pricing">Pricing</Nav.Link>*/}
        {/*</Nav>*/}
        {/*<Form inline>*/}
        {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>*/}
        {/*    <Button variant="outline-info">Search</Button>*/}
        {/*</Form>*/}
    </Navbar>
}