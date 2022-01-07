import React from 'react';

export default class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className='modal flex-c'>
        <div className='location-modal-container border-radius'>
          <div className='location-modal-header-container border-radius-t flex-c'>
            <h3 className='location-modal-header'>NEW LOCATION</h3>
          </div>
          <div className='location-modal-form-container'>

          </div>
          <div className='location-modal-button-container border-radius-b flex-space-between'>
            <button className='btn location-modal-back-btn'>BACK</button>
            <button className='btn location-modal-add-btn'>ADD LOCATION</button>
          </div>
        </div>
      </div>
    );
  }
}
