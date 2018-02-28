import React, { Component } from 'react';
import HomeNavbar from './fragments/HomeNavbar';
import About from './fragments/About';
import Services from './fragments/Services';
import Pricing from './fragments/Pricing';
import Contacts from './fragments/Contacts';

class Home extends Component {
  render() {
    return(
      <React.Fragment>
        <HomeNavbar />
        <About />
        <Services />
        <Pricing />
        <Contacts />
      </React.Fragment>
    );
  }
}

export default Home;
