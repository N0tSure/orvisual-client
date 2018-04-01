import React, { Component } from 'react';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import './Contacts.css';

class Contacts extends Component {
  render() {
    return(
      <React.Fragment>
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
        <Footer />
      </React.Fragment>
    );
  }
}

function Footer(props) {
  return(
    <Grid componentClass="footer" fluid className="text-center">
      <a href="#root">
        <Glyphicon glyph="chevron-up" />
      </a>
      <p>
        <span>This page was created, using Twitter Bootstrap theme </span>
        <a href="https://www.w3schools.com/bootstrap/bootstrap_theme_company.asp">Company</a>.
        <span> Thanks to <a href="https://www.w3schools.com">W3Schools</a>.</span>
      </p>
    </Grid>
  );
}

export default Contacts;
