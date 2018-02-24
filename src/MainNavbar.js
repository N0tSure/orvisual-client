import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './MainNavbar.css';

class MainNavbar extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#main">Logo</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#about">
              ABOUT
            </NavItem>
            <NavItem eventKey={2} href="#services">
              SERVICES
            </NavItem>
            <NavItem eventKey={3} href="#pricing">
              PRICING
            </NavItem>
            <NavItem eventKey={4} href="#contact">
              CONTACT
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavbar;
