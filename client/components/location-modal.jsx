import React from 'react';

export default class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      time: '',
      address: '',
      phone: '',
      notes: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      itineraryId: this.props.itineraryId,
      location: this.state.location,
      time: this.state.time,
      address: this.state.address,
      phone: this.state.phone,
      notes: this.state.notes
    };

    fetch('/api/locations', {
      method: 'POST',
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

      this.props.closeLocationModal();
      this.props.getLocations();
    });

  }

  closeModal() {
    this.props.closeLocationModal();
  }

  render() {

    if (this.props.locationModalOpen === false) {
      return null;
    }

    return (
      <div className='modal flex-c'>
        <div className='location-modal-container border-radius'>
          <div className='location-modal-header-container border-radius-t flex-c'>
            <h3 className='location-modal-header'>NEW LOCATION</h3>
            <i className="fas fa-times-circle fa-2x close-modal-icon" onClick={this.closeModal}></i>
          </div>
          <form onSubmit={this.handleSubmit}>
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
            <div className='location-modal-button-container border-radius-b flex-c'>
              <button className='btn location-modal-add-btn' type='submit'>ADD LOCATION</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
