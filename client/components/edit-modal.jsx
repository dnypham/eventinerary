import React from 'react';

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      time: '',
      address: '',
      phone: '',
      notes: '',
      deleteConfirmation: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteLocationConfirm = this.deleteLocationConfirm.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  }

  componentDidMount() {

    let address, phone, notes;

    if (!this.props.selectedLocation.address) {
      address = '';
    } else {
      address = this.props.selectedLocation.address;
    }

    if (!this.props.selectedLocation.phone) {
      phone = '';
    } else {
      phone = this.props.selectedLocation.phone;
    }

    if (!this.props.selectedLocation.notes) {
      notes = '';
    } else {
      notes = this.props.selectedLocation.notes;
    }

    this.setState({
      location: this.props.selectedLocation.location,
      time: this.props.selectedLocation.time,
      address: address,
      phone: phone,
      notes: notes
    });
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      locationId: this.props.selectedLocation.locationId,
      location: this.state.location,
      time: this.state.time,
      address: this.state.address,
      phone: this.state.phone,
      notes: this.state.notes
    };

    fetch('/api/locations', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      this.setState({
        location: '',
        time: '',
        address: '',
        phone: '',
        notes: ''
      });

      this.props.closeEditModal();
      this.props.getLocations();
    });

  }

  closeModal() {
    this.props.getLocations();
    this.props.closeEditModal();
  }

  checkLocation() {
    if (this.state.location === this.props.selectedEvent.performer) {
      return (
        <div className='location-modal-form-container'>
          <div className='flex-space-between'>
            <label htmlFor='location'>Location:</label>
            <input
              readOnly
              name='location'
              type='text'
              id='location'
              maxLength='30'
              value={this.state.location}
              onChange={this.handleChange} />
          </div>
          <div className='flex-space-between'>
            <label htmlFor='time'>Time:</label>
            <input
              readOnly
              type='time'
              name='time'
              id='time'
              value={this.state.time}
              onChange={this.handleChange}>
            </input>
          </div>
          <div className='flex-space-between'>
            <label htmlFor='address'>Address:</label>
            <input
              readOnly
              name='address'
              type='text'
              id='address'
              maxLength='60'
              placeholder='Optional'
              value={this.state.address}
              onChange={this.handleChange} />
          </div>
          <div className='flex-space-between'>
            <label htmlFor='phone'>Phone Number:</label>
            <input
              name='phone'
              type='tel'
              id='phone'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='Optional'
              value={this.state.phone}
              onChange={this.handleChange} />
          </div>
          <div className='flex-space-between'>
            <label htmlFor='notes'>Notes:</label>
            <textarea
              name='notes'
              type='text'
              id='notes'
              maxLength='140'
              placeholder='Optional'
              value={this.state.notes}
              onChange={this.handleChange} />
          </div>
        </div>
      );
    } else {
      return (
        <div className='location-modal-form-container'>
          <div className='flex-space-between'>
            <label htmlFor='location'>Location:</label>
            <input
              required
              name='location'
              type='text'
              id='location'
              maxLength='30'
              value={this.state.location}
              onChange={this.handleChange} />
          </div>
          <div className='flex-space-between'>
            <label htmlFor='time'>Time:</label>
            <input
              required
              type='time'
              name='time'
              id='time'
              value={this.state.time}
              onChange={this.handleChange}>
            </input>
          </div>
          <div className='flex-space-between'>
            <label htmlFor='address'>Address:</label>
            <input
              name='address'
              type='text'
              id='address'
              maxLength='60'
              placeholder='Optional'
              value={this.state.address}
              onChange={this.handleChange} />
          </div>
          <div className='flex-space-between'>
            <label htmlFor='phone'>Phone Number:</label>
            <input
              name='phone'
              type='tel'
              id='phone'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='Optional'
              value={this.state.phone}
              onChange={this.handleChange} />
          </div>
          <div className='flex-space-between'>
            <label htmlFor='notes'>Notes:</label>
            <textarea
              name='notes'
              type='text'
              id='notes'
              maxLength='140'
              placeholder='Optional'
              value={this.state.notes}
              onChange={this.handleChange} />
          </div>
        </div>
      );
    }
  }

  deleteLocation() {

    const data = {
      locationId: this.props.selectedLocation.locationId
    };

    fetch('/api/locations/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        this.setState({
          deleteConfirmation: false
        });
        this.props.closeEditModal();
        this.props.getLocations();
      });

  }

  deleteLocationConfirm() {

    if (this.state.deleteConfirmation) {
      return (
        <div className='delete-confirmation-container border-radius'>
          <div className='delete-confirmation-text-container'>
            <h4 className='delete-confirmation-text'>Delete location?</h4>
          </div>
          <div className='delete-confirmation-buttons-container flex-space-between border-radius-b'>
            <button className='btn delete-confirmation-cancel-btn' type='button' onClick={() => this.setState({ deleteConfirmation: false })}>CANCEL</button>
            <button className='btn delete-confirmation-delete-btn' type='button' onClick={this.deleteLocation}>DELETE</button>
          </div>
        </div>
      );
    }
  }

  render() {

    if (this.props.editModalOpen === false) {
      return null;
    }

    return (
      <div className='modal flex-c'>
        <div className='location-modal-container border-radius'>
          {this.deleteLocationConfirm()}
          <div className='location-modal-header-container border-radius-t flex-c'>
            <h3 className='location-modal-header'>EDIT LOCATION</h3>
            <i className="fas fa-times-circle fa-2x close-modal-icon" onClick={this.closeModal}></i>
          </div>
          <form onSubmit={this.handleSubmit}>
            {this.checkLocation()}
            <div className='edit-modal-button-container border-radius-b flex-space-between'>
              <button className='btn location-modal-delete-btn' type='button' onClick={() => this.setState({ deleteConfirmation: true })}>DELETE LOCATION</button>
              <button className='btn location-modal-add-btn' type='submit'>SAVE CHANGES</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
