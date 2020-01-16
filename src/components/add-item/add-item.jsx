import React, {Component} from 'react';

import './add-item.css'


export default class AddItem extends Component {

  state = {
    label: '',
    disabled: true,
  };

  changeDisabledButton = () => {
    this.setState(({disabled, label}) => {
      return {
        disabled: label.trim().length === 0
      };
    });
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
    this.changeDisabledButton();
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({label: ''});
    this.changeDisabledButton();
  };

  render() {
    return (
      <form className='item-add-form d-flex'
            onSubmit={this.onSubmit}>
        <input type="text"
               className='form-control'
               onChange={this.onLabelChange}
               placeholder='What needs to be done'
               value={this.state.label}/>
        <button className='btn btn-outline-secondary w-50' disabled={this.state.disabled}>Add item</button>
      </form>
    );
  }
}
