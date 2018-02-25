import React, { Component } from 'react';
import MainNavbar from './fragments/MainNavbar';
import About from './fragments/About';
import Services from './fragments/Services';
import Pricing from './fragments/Pricing';

class MainPage extends Component {
  render() {
    return(
      <React.Fragment>
        <MainNavbar />
        <About />
        <Services />
        <Pricing />
      </React.Fragment>
    );
  }
}

export default MainPage;
