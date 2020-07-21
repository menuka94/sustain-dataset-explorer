import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {MainNavbar} from "./navbar";
import {QueryConstructor} from "./query-constructor";

const Main = () => (
    <Container className="p-1">
        <MainNavbar/>
        <Jumbotron>
            <QueryConstructor/>
        </Jumbotron>
    </Container>
);

export default Main;