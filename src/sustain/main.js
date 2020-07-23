import React from 'react';

import {Container} from 'react-bootstrap';
import {MainNavbar} from "./navbar";
import {QueryConstructor} from "./query-constructor";
import {LeafletMap} from "../leaflet-map";

const Main = () => (
    <div>
        <Container className="p-1">
            <MainNavbar/>
            <QueryConstructor/>
            <LeafletMap/>
        </Container>
    </div>
);

export default Main;