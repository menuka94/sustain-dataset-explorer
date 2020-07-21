import React from 'react';

import {Container} from 'react-bootstrap';
import {MainNavbar} from "./navbar";
import {QueryConstructor} from "./query-constructor";

const Main = () => (
    <Container className="p-1">
        <MainNavbar/>
        <QueryConstructor/>
    </Container>
);

export default Main;