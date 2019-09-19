import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { getCart } from '../actions/cartActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class Checkout extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.auth !== this.props.auth &&
      !this.props.auth.isLoading &&
      this.props.auth.user !== null
    ) {
      this.props.getCart(this.props.auth.user._id);
    } else {
    }
  }
  render() {
    const { cartItems } = this.props.cart;
    return (
      <div className='conatiner'>
        <Container className='mt-5'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(({ _id, item, quantity }) => (
                <tr key={_id}>
                  <td>{item.name}</td>
                  <td>&pound;{item.price.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>&pound;{(quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>&pound;{this.props.cart.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCart },
  null
)(Checkout);
