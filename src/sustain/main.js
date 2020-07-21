import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {MainNavbar} from "./navbar";

const Main = () => (
    <Container className="p-1">
        <MainNavbar/>
        <Jumbotron>
        </Jumbotron>
    </Container>
);

export default Main;