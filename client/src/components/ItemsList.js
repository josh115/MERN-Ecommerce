import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart, getCart } from '../actions/cartActions';
import PropTypes from 'prop-types';
import { Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      id: null,
      userid: null
    };

    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.auth !== this.props.auth &&
      !this.props.auth.isLoading &&
      this.props.auth.user !== null
    ) {
      this.props.getCart(this.props.auth.user._id);
    } else {
    }
  }

  onQuantityChange(e) {
    this.setState({ quantity: e.target.value });
  }

  onAddToCart = e => {
    e.preventDefault();
    if (this.props.isAuthenticated) {
      const item = e.currentTarget.id;
      const quantity = this.state.quantity;
      const user = this.props.auth.user._id;
      this.props.addToCart(item, user, quantity);
    } else {
      this.props.history.push('/login');
    }
  };

  changeQuantity = e => {
    const itemid = e.target.parentNode.parentNode.parentNode.getAttribute(
      'data-id'
    );
    const user = this.props.auth.user._id;
    if (e.target.id === 'addicon') {
      this.props.addToCart(itemid, user, 1);
    } else {
      this.props.addToCart(itemid, user, -1);
    }
  };

  render() {
    const { items } = this.props.item;
    const { isAuthenticated, user } = this.props.auth;
    const { cartItems } = this.props.cart;

    const userCart = (
      <Fragment>
        {cartItems.map(({ _id, item, quantity }) => (
          <ListGroup.Item className='p-2' key={_id} data-id={item._id}>
            <div className='d-flex position-relative'>
              <div className='d-flex align-self-center flex-column'>
                <img
                  src='./images/plus-square.svg'
                  id='addicon'
                  alt=''
                  className='quanity-icon'
                  onClick={this.changeQuantity}
                />
                <span className='text-center'>{quantity}</span>
                <img
                  src='./images/minus-square.svg'
                  id='minusicon'
                  alt=''
                  className='quanity-icon'
                  onClick={this.changeQuantity}
                />
              </div>
              <div className='align-self-center pl-0 pr-1'>
                <img
                  className='item-img-cart'
                  src={`/images/stock/${item.image}`}
                  alt=''
                />
              </div>
              <div className='align-self-center p-0'>
                <span>{item.name}</span>
              </div>
              <div className='mini-price'>
                <span>
                  <strong>&pound;{item.price}</strong>
                </span>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </Fragment>
    );
    return (
      <div className='d-flex flex-row justify-content-center'>
        <div className='item-list'>
          <Row className='m-0'>
            {items.map(({ _id, name, image, price }) => (
              <div
                className='col-lg-3 col-md-4 col-sm-6 item-container'
                key={_id}
              >
                <div className='item-inner d-flex d-sm-block'>
                  <div className='d-flex justify-content-center mt-2'>
                    <img
                      className='item-img'
                      src={
                        image
                          ? `/images/stock/${image}`
                          : '/images/stock/missing.png'
                      }
                      alt=''
                    />
                  </div>
                  <div className='w-100'>
                    <div className='d-flex justify-content-sm-center mt-3 px-2 itemname'>
                      <span>
                        <strong>{name}</strong>
                      </span>
                    </div>
                    <div className='d-flex justify-content-sm-center mt-3 mb-3'>
                      <span>&pound;{price}</span>
                    </div>
                    <Form
                      onSubmit={this.onAddToCart}
                      className='mr-3 mx-sm-3'
                      id={_id}
                    >
                      <Row>
                        <Col>
                          <Form.Control
                            className='pr-1 cartitembtn mb-3'
                            type='number'
                            name='quantity'
                            onChange={this.onQuantityChange}
                            defaultValue={this.state.quantity}
                            autoComplete='off'
                            min='1'
                            max='99'
                          />
                        </Col>
                        <Col>
                          <Button
                            type='submit'
                            variant='primary'
                            className='mb-3'
                            block
                          >
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            ))}
          </Row>
        </div>
        <div className='d-none d-md-flex'>
          <ListGroup className='sidebar'>
            <ListGroup.Item className='p-3'>
              <div className='row mb-3'>
                <div className='col-4'>
                  <span>Total</span>
                </div>
                <div className='col-4'>
                  <span>
                    <strong>
                      &pound;
                      {isAuthenticated
                        ? this.props.cart.total.toFixed(2)
                        : '0.00'}
                    </strong>
                  </span>
                </div>
                <div className='col-4'>
                  <img src='./images/cart-total.svg' alt='' />
                </div>
              </div>
              <LinkContainer to='/checkout' exact>
                <Button block>Checkout</Button>
              </LinkContainer>
            </ListGroup.Item>
            {isAuthenticated ? userCart : null}
          </ListGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  item: state.item,
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getItems, addToCart, getCart },
  null
)(ItemsList);
