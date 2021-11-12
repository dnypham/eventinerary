import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="event-info-layout-container">
        <div className="event-info-layout-flex">
          <div className="event-info-container">
            <div className="row">
              <img className="event-info-image" src={this.props.performer.image}></img>
              <div className="event-info-header-text-container">
                <h1 className={'event-info-header-text'}>{this.props.performer.name.toUpperCase()}</h1>
              </div>
            </div>
            <div className="event-info-map-container">
              <div className="flx-center">
                <div className="map-outline">
                  <iframe src={`https://maps.google.com/maps?q=${this.props.eventInfo.venue.location.lat},${this.props.eventInfo.venue.location.lon}&z=15&output=embed`} width="100%" height="100%"></iframe>
                </div>
              </div>
            </div>
            <div className="event-info-text-container">
              <h2 className="event-card-title">{this.props.eventInfo.title}</h2>
              <div className="event-card-info-flex-space-between">
                <div className="event-info-line-space">
                  <h2 className="event-card-venue-name">{this.props.eventInfo.venue.name}</h2>
                  <h2 className="event-card-info-address">{`${this.props.eventInfo.venue.address}, ${this.props.eventInfo.venue.extended_address}`}</h2>
                </div>
                <div className="event-info-line-space">
                  <h2 className="event-card-info-date">{convertDateTime(this.props.eventInfo.datetime_local).date}</h2>
                  <h2 className="event-card-info-time">{convertDateTime(this.props.eventInfo.datetime_local).time}</h2>
                </div>
              </div>
            </div>
            <div className="event-info-btn-container">
              <button className="tickets-btn">TICKETS</button>
              <button className="save-event-btn">SAVE EVENT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
