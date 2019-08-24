import React, { Component } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';

class SideBar extends Component {
  render() {
    return (
      <div className='d-none d-md-flex'>
        <ListGroup className='sidebar'>
          <ListGroup.Item className='p-3'>
            <div className='row mb-3'>
              <div className='col-4'>
                <span>Total</span>
              </div>
              <div className='col-4'>
                <span>
                  <strong>&pound;3.00</strong>
                </span>
              </div>
              <div className='col-4'>
                <img src='./images/cart-total.svg' alt='' />
              </div>
            </div>
            <Button block>Checkout</Button>
          </ListGroup.Item>
          <ListGroup.Item className='p-2'>
            <div className='d-flex position-relative'>
              <div className='d-flex align-self-center flex-column'>
                <img
                  src='./images/plus-square.svg'
                  alt=''
                  className='quanity-icon'
                />
                <span className='text-center'>1</span>
                <img
                  src='./images/minus-square.svg'
                  alt=''
                  className='quanity-icon'
                />
              </div>
              <div className='align-self-center pl-0 pr-1'>
                <img
                  className='item-img-cart'
                  src='/images/stock/sprite.jpeg'
                  alt=''
                />
              </div>
              <div className='align-self-center p-0'>
                <span>Sprite</span>
              </div>
              <div className='mini-price'>
                <span>
                  <strong>&pound;1.29</strong>
                </span>
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default SideBar;
