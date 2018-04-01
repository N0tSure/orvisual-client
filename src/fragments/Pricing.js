import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Pricing.css';

class Pricing extends Component {
  render() {
    return(
      <Grid id="pricing" fluid className="text-center">
        <h2>Pricing</h2>
        <h4>Choose kind of works you need</h4>
        <Row>
          <Col sm={6}>
            <Panel>
              <Panel.Heading>
                <h1>Painting of one element</h1>
              </Panel.Heading>
              <Panel.Body>
                <p>
                  If you have small defect of vehicle paintwork, for example,
                  scratches, chipping, etc of one vehicle body element, we can
                  repair paintwork of this element only.
                </p>
              </Panel.Body>
              <Panel.Footer>
                <h3>$20</h3>
                <h4>per element</h4>
                <Link className="btn btn-default btn-lg" to="/order">Sign up</Link>
              </Panel.Footer>
            </Panel>
          </Col>
          <Col sm={6}>
            <Panel>
              <Panel.Heading>
                <h1>Complex paintwork repair</h1>
              </Panel.Heading>
              <Panel.Body>
                <p>
                  When vehicle has high mileage, may shown massive defects of
                  paintwork, like loss of gloss, sanding, or corrosion spots
                  in this case need complex paintwork repair.
                </p>
              </Panel.Body>
              <Panel.Footer>
                <h3>$500</h3>
                <h4>in basic case</h4>
                <Link className="btn btn-default btn-lg" to="/order">Sign up</Link>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Pricing;
