import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state) {
      if (isAuthenticated) {
        this.props.history.push('/');
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const loginDetails = {
      email,
      password
    };
    this.props.login(loginDetails);
  };
  render() {
    return (
      <div className='container login'>
        {this.state.msg ? (
          <div className='alert alert-danger' role='alert'>
            {this.state.msg}
          </div>
        ) : null}
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              className='form-control'
              placeholder='Email'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='form-control'
              placeholder='Password'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group row justify-content-center mt-4'>
            <div className='col-12'>
              <button type='submit' className='btn btn-primary btn-block'>
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
