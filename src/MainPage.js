import React, { Component } from 'react';
import MainNavbar from './MainNavbar';
import About from './About';
import Services from './Services';
import Pricing from './Pricing';

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
