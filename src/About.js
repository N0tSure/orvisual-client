import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './About.css';

class About extends Component {
  render() {
    return(
      <React.Fragment>
        <Jumbotron>
          <h1>Pay and Spray</h1>
          <p>We specialize on vehicle body paintwork</p>
        </Jumbotron>
        <div id="about" class="container-fluid"></div>
      </React.Fragment>
    );
  }
}

export default About;
