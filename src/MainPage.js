import React, { Component } from 'react';
import MainNavbar from './MainNavbar';
import About from './About';
import Services from './Services';

class MainPage extends Component {
  render() {
    return(
      <React.Fragment>
        <MainNavbar />
        <About />
        <Services />
      </React.Fragment>
    );
  }
}

export default MainPage;
