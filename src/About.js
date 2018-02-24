import React, { Component } from 'react';
import { Jumbotron, Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import './About.css';

class About extends Component {
  render() {
    return(
      <React.Fragment>
        <Jumbotron>
          <h1>Pay and Spray</h1>
          <p>We specialize on vehicle body paintwork</p>
        </Jumbotron>
        <Grid fluid id="about">
          <Row>
            <Col sm={8}>
              <h2>About our company</h2>
              <h4>
                <strong>Pay and Spray</strong> small, young and promising
                company, which was created by two enthusiasts
               </h4>
              <p>
                In our vehicle painting workshop, we have separate preparatory
                chamber, which we use to prepare vehicle body to painting.
                When vehicle's body was prepared to paint, we deliver it to
                spray booth, there we spray vehicle's body. After it was
                painted, it will delivered to separate paint drying chamber.
                There dust free air flow, heated to 60{'\u2103'}, dries paint. When
                paint dried up, vecile get back to preparatory chamber for
                polishing and finish works.
              </p>
            </Col>
            <Col sm={4}>
              <Glyphicon glyph="ok" className="logo"/>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default About;
