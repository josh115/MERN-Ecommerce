import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import SideBar from './SideBar';
class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };

    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  componentDidMount() {
    this.props.getItems();
  }

  onQuantityChange(val) {
    return val;
  }

  render() {
    const { items } = this.props.item;
    return (
      <div className='d-flex flex-row justify-content-center'>
        <div className='item-list'>
          <Row>
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
                    <div className='d-flex justify-content-sm-center mt-3'>
                      <span>
                        <strong>{name}</strong>
                      </span>
                    </div>
                    <div className='d-flex justify-content-sm-center mt-3 mb-3'>
                      <span>&pound;{price['$numberDecimal']}</span>
                    </div>
                    <Form className='mr-3 mx-sm-3'>
                      <Form.Control name='id' hidden='password' value={_id} />
                      <Row>
                        <Col>
                          <Form.Control
                            className='pr-1 cartitembtn mb-3'
                            type='number'
                            name='quantity'
                            onChange={() => {
                              this.onQuantityChange(this.state.quantity);
                            }}
                            defaultValue={this.state.quantity}
                            autoComplete='off'
                            min='1'
                            max='99'
                          />
                        </Col>
                        <Col>
                          <Button variant='primary' className='mb-3' block>
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
        <SideBar />
      </div>
    );
  }
}

ItemsList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems }
)(ItemsList);
