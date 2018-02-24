import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import './Services.css';

class Services extends Component {
  render() {
    return(
      <Grid id="services" fluid className="text-center bg-grey">
        <h2>SERVICES</h2>
        <h4>What we offer</h4>
        <br />
        <Row>
          <Service glyphType="hourglass" heading="JOB DONE"
            phrase="We doing our job quick" />
          <Service glyphType="education" heading="PROFESSIONALS"
            phrase="We are professionals" />
          <Service glyphType="usd" heading="PRICING"
            phrase="We have frendly pricing" />
        </Row>
        <Row>
          <Service glyphType="tint" heading="MATERIALS"
            phrase="We use only original painting materials" />
          <Service glyphType="certificate" heading="WARRANTY"
            phrase="One month warranty" />
          <Service glyphType="home" heading="FREE TRANSPORT"
            phrase="We give you to home free" />
        </Row>
      </Grid>
    );
  }
}

function Service(props) {
  return(
    <Col sm={4}>
      <Glyphicon glyph={props.glyphType} className="logo-sm" />
      <h4>{props.heading}</h4>
      <p>{props.phrase}</p>
    </Col>
  );
}

export default Services;
