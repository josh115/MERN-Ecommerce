import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
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

    const { firstname, lastname, email, password } = this.state;

    const newUser = {
      firstname,
      lastname,
      email,
      password
    };
    console.log(newUser);
    this.props.register(newUser);
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
          <div className='form-row'>
            <div className='form-group col-12 col-sm-6'>
              <label htmlFor='firstname'>First Name</label>
              <input
                type='text'
                name='firstname'
                className='form-control'
                placeholder='First name'
                onChange={this.onChange}
              />
            </div>
            <div className='form-group col-12 col-sm-6'>
              <label htmlFor='lastname'>Last Name</label>
              <input
                type='text'
                name='lastname'
                className='form-control'
                placeholder='Last name'
                onChange={this.onChange}
              />
            </div>
          </div>
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
  { register }
)(Register);
