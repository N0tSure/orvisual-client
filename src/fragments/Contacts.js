import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';

class Contacts extends Component {
  render() {
    return(
      <Grid id="contact" fluid className="bg-grey">
        <h2 className="text-center">CONTACT</h2>
        <Row>
          <Col sm={5}>
            <p>
              Contact us and we'll get back to you within 24 hours.
            </p>
            <p>
              <Glyphicon glyph="map-marker" />
              <span> Saint-Petersburg, Russia</span>
            </p>
            <p>
              <Glyphicon glyph="phone" />
              <span> +7 912 3456789</span>
            </p>
            <p>
              <Glyphicon glyph="envelope" />
              <span> foobar@somemail.com</span>
            </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Contacts;
