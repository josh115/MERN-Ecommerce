import React, { Component, Fragment } from 'react';
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
    const { isAuthenticated, user } = this.props.auth;

    const authDropdownMenu = (
      <Fragment>
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
      </Fragment>
    );

    const authNavItems = (
      <Fragment>
        <LinkContainer to='/stock' exact>
          <Nav.Link>Edit Stock</Nav.Link>
        </LinkContainer>
      </Fragment>
    );
    const guestDropdownMenu = (
      <Fragment>
        <LinkContainer to='/account' exact>
          <Dropdown.Item>
            <span>Account</span>
          </Dropdown.Item>
        </LinkContainer>
        <LinkContainer to='/orders' exact>
          <Dropdown.Item>
            <span>Order History</span>
          </Dropdown.Item>
        </LinkContainer>
        <Dropdown.Item>
          <span onClick={this.props.logout}>Logout</span>
        </Dropdown.Item>
      </Fragment>
    );

    return (
      <Navbar bg='dark' variant='dark'>
        <LinkContainer to='/' exact>
          <Navbar.Brand>Shop Name</Navbar.Brand>
        </LinkContainer>
        <Nav className='mr-auto'>{isAuthenticated ? authNavItems : null}</Nav>
        <Nav>
          <Nav.Link href='/basket'>
            <img src='./images/basket.svg' alt='' />
          </Nav.Link>
          <Nav.Link href='/search'>
            <img src='./images/search.svg' alt='' />
          </Nav.Link>
          <Nav.Item>
            {isAuthenticated ? (
              <span className='navbar-text ml-1' id='welcome-msg'>
                <strong>{user.firstname}</strong>
              </span>
            ) : (
              ''
            )}
          </Nav.Item>
          <Nav.Item>
            <Dropdown alignRight>
              <Dropdown.Toggle id='account-dropdown'>
                <img src='./images/user.svg' alt='' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {isAuthenticated ? guestDropdownMenu : authDropdownMenu}
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
