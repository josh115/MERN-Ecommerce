import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar bg='dark' variant='dark'>
        <LinkContainer to='/' exact>
          <Navbar.Brand>Shop Name</Navbar.Brand>
        </LinkContainer>
        <Nav className='mr-auto' />
        <Nav>
          <Nav.Link href='/basket'>
            <img src='./images/basket.svg' alt='' />
          </Nav.Link>
          <Nav.Link href='/search'>
            <img src='./images/search.svg' alt='' />
          </Nav.Link>
          <Nav.Item>
            <Dropdown alignRight>
              <Dropdown.Toggle id='nav-dropdown'>
                <img src='./images/user.svg' alt='' />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <LinkContainer to='/login' exact>
                  <Dropdown.Item>
                    <span>Login</span>
                  </Dropdown.Item>
                </LinkContainer>
                <LinkContainer to='/register' exact>
                  <Dropdown.Item>
                    <span>Register</span>
                  </Dropdown.Item>
                </LinkContainer>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout },
  null
)(AppNavbar);
