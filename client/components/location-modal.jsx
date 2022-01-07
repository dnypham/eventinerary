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
        </div>
      </div>
    );
  }
}
