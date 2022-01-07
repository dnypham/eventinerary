import React from 'react';

export default class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      time: '',
      address: '',
      phoneNumber: '',
      notes: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({
      location: '',
      time: '',
      address: '',
      phoneNumber: '',
      notes: ''
    });
  }

  render() {
    return (
      <div className='modal flex-c'>
        <div className='location-modal-container border-radius'>
          <div className='location-modal-header-container border-radius-t flex-c'>
            <h3 className='location-modal-header'>NEW LOCATION</h3>
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
                  value={this.state.location}
                  onChange={this.handleChange} />
              </div>
              <div className='flex-space-between'>
                <label htmlFor='time'>Time:</label>
                <select
                  required
                  defaultValue=''
                  name='time'
                  id='time'
                  onChange={this.handleChange}>
                    <option value='' disabled>Select a time</option>
                    <option value='12:00AM'>12:00AM</option>
                    <option value='12:00AM'>12:30AM</option>
                    <option value='1:00AM'>1:00AM</option>
                    <option value='1:00AM'>1:30AM</option>
                    <option value='2:00AM'>2:00AM</option>
                    <option value='2:00AM'>2:30AM</option>
                    <option value='3:00AM'>3:00AM</option>
                    <option value='3:00AM'>3:30AM</option>
                    <option value='4:00AM'>4:00AM</option>
                    <option value='4:00AM'>4:30AM</option>
                    <option value='5:00AM'>5:00AM</option>
                    <option value='5:00AM'>5:30AM</option>
                    <option value='6:00AM'>6:00AM</option>
                    <option value='6:00AM'>6:30AM</option>
                    <option value='7:00AM'>7:00AM</option>
                    <option value='7:00AM'>7:30AM</option>
                    <option value='8:00AM'>8:00AM</option>
                    <option value='8:00AM'>8:30AM</option>
                    <option value='9:00AM'>9:00AM</option>
                    <option value='9:00AM'>9:30AM</option>
                    <option value='10:00AM'>10:00AM</option>
                    <option value='10:00AM'>10:30AM</option>
                    <option value='11:00AM'>11:00AM</option>
                    <option value='11:00AM'>11:30AM</option>
                    <option value='12:00PM'>12:00PM</option>
                    <option value='12:00PM'>12:30PM</option>
                    <option value='1:00PM'>1:00PM</option>
                    <option value='1:00PM'>1:30PM</option>
                    <option value='2:00PM'>2:00PM</option>
                    <option value='2:00PM'>2:30PM</option>
                    <option value='3:00PM'>3:00PM</option>
                    <option value='3:00PM'>3:30PM</option>
                    <option value='4:00PM'>4:00PM</option>
                    <option value='4:00PM'>4:30PM</option>
                    <option value='5:00PM'>5:00PM</option>
                    <option value='5:00PM'>5:30PM</option>
                    <option value='6:00PM'>6:00PM</option>
                    <option value='6:00PM'>6:30PM</option>
                    <option value='7:00PM'>7:00PM</option>
                    <option value='7:00PM'>7:30PM</option>
                    <option value='8:00PM'>8:00PM</option>
                    <option value='8:00PM'>8:30PM</option>
                    <option value='9:00PM'>9:00PM</option>
                    <option value='9:00PM'>9:30PM</option>
                    <option value='10:00PM'>10:00PM</option>
                    <option value='10:00PM'>10:30PM</option>
                    <option value='11:00PM'>11:00PM</option>
                    <option value='11:00PM'>11:30PM</option>
                </select>
              </div>
              <div className='flex-space-between'>
                <label htmlFor='address'>Address:</label>
                <input
                  name='address'
                  type='text'
                  id='address'
                  maxLength='35'
                  value={this.state.address}
                  onChange={this.handleChange} />
              </div>
              <div className='flex-space-between'>
                <label htmlFor='phone-number'>Phone Number:</label>
                <input
                  name='phone-number'
                  type='text'
                  id='phone-number'
                  maxLength='15'
                  value={this.state.phoneNumber}
                  onChange={this.handleChange} />
              </div>
              <div className='flex-space-between'>
                <label htmlFor='notes'>Notes:</label>
                <textarea
                  name='notes'
                  type='text'
                  id='notes'
                  maxLength='140'
                  value={this.state.notes}
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className='location-modal-button-container border-radius-b flex-space-between'>
              <button className='btn location-modal-back-btn' type='button'>BACK</button>
              <button className='btn location-modal-add-btn' type='submit'>ADD LOCATION</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
