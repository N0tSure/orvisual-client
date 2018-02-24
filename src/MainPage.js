import React, { Component } from 'react';
import MainNavbar from './MainNavbar';
import About from './About';

class MainPage extends Component {
  render() {
    return(
      <React.Fragment>
        <MainNavbar />
        <About />
      </React.Fragment>
    );
  }
}

export default MainPage;
