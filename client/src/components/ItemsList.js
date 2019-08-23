import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

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

  onQuantityChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { items } = this.props.item;
    return (
      <div className='container item-list'>
        <div className='row'>
          {items.map(({ _id, name, image, price }) => (
            <div
              className='col-lg-3 col-md-4 col-sm-6 item-container'
              key={_id}
            >
              <div className='row flex-row flex-sm-column'>
                <div className='item-inner'>
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
                  <div className='d-flex justify-content-center mt-3'>
                    <span>
                      <strong>{name}</strong>
                    </span>
                  </div>
                  <div className='d-flex justify-content-center mt-3'>
                    <span>&pound;{price['$numberDecimal']}</span>
                  </div>
                  <div className='input-group mb-3 justify-content-around mt-3'>
                    <form>
                      <div className='form-group'>
                        <input
                          type='number'
                          name='quantity'
                          className='add-item-btn'
                          onChange={this.onQuantityChange}
                          autoComplete='off'
                          value={this.state.quantity}
                          min='1'
                          max='99'
                        />
                        <button type='button' className='btn btn-primary'>
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
