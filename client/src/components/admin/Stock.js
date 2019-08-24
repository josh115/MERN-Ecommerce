import React, { Component } from 'react';
import { Dropdown, Container, Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getItems } from '../../actions/itemActions';
import { addItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';

class Stock extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    modal: false,
    name: '',
    price: '',
    category: '',
    subcategory: '',
    selectedFile: null
  };

  componentDidMount() {
    this.props.getItems();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileSelect = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onSubmit = e => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('name', this.state.name);
    formdata.append('price', this.state.price);
    formdata.append('category', this.state.category);
    formdata.append('subcategory', this.state.subcategory);
    formdata.append(
      'image',
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    this.props.addItem(formdata);

    this.toggle();
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <Button variant='primary' onClick={this.toggle}>
          Add Item
        </Button>
        <Container className='mt-5'>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Category</th>
                <th scope='col'>Sub Category</th>
              </tr>
            </thead>
            <tbody>
              {items.map(
                ({ _id, name, price, category, SubCategory, image }) => (
                  <tr key={_id}>
                    <th scope='row'>{_id}</th>
                    <td>{name}</td>
                    <td>&pound;{price['$numberDecimal']}</td>
                    <td>{category}</td>
                    <td>{SubCategory}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Container>
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Header>Add New Item</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label htmlFor='itemname'>Item Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  id='itemname'
                  placeholder='Item Name'
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='price'>Price</Form.Label>
                <Form.Control
                  type='text'
                  name='price'
                  id='price'
                  placeholder='Price'
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='image'>Image</Form.Label>
                <div className='input-group'>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='image'
                      className='custom-file-input'
                      id='inputGroupFile01'
                      aria-describedby='inputGroupFileAddon01'
                      onChange={this.onFileSelect}
                    />
                    <label
                      className='custom-file-label'
                      htmlFor='inputGroupFile01'
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='category'>Category</Form.Label>
                <Form.Control
                  type='text'
                  name='category'
                  id='category'
                  placeholder='Category'
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='subcategory'>Sub Category</Form.Label>
                <Form.Control
                  type='text'
                  name='subcategory'
                  id='subcategory'
                  placeholder='Sub Category'
                  onChange={this.onChange}
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
                <Button variant='primary' type='submit' block>
                  Add Item
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}

Stock.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, addItem }
)(Stock);
