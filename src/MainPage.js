import React, { Component } from 'react';
import MainNavbar from './fragments/MainNavbar';
import About from './fragments/About';
import Services from './fragments/Services';
import Pricing from './fragments/Pricing';
import Contacts from './fragments/Contacts';

class MainPage extends Component {
  render() {
    return(
      <React.Fragment>
        <MainNavbar />
        <About />
        <Services />
        <Pricing />
        <Contacts />
      </React.Fragment>
    );
  }
}

export default MainPage;
