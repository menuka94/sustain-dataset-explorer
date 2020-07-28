import React from 'react';

import {Container, Row, Col} from 'react-bootstrap';
import {MainNavbar} from "./navbar";
import {QueryConstructor} from "./query-constructor";
// import {PowerStationsMap} from "./power-stations-map";
import {HospitalsMap} from "./hospitals-map";
import {PowerStationsMap} from "./power-stations-map";

const Main = () => (
    <>
        <Container fluid>
            <MainNavbar/>
            <Row>
                <Col className="col-lg-3">
                    <QueryConstructor/>
                </Col>
                {/*<Col className="col-lg-9">*/}
                <Col>
                    {/*<HospitalsMap/>*/}
                    <PowerStationsMap/>
                </Col>
            </Row>
        </Container>
    </>
);

export default Main;