import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };

    this.saveEvent = this.saveEvent.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    const seatgeekEventId = this.props.eventInfo.id;

    fetch(`/api/events/${seatgeekEventId}`)
      .then(req => req.json())
      .then(id => {
        if (seatgeekEventId === id) {
          this.setState({ saved: true });
        }
      });

    this.renderButton();
  }

  saveEvent() {

    if (!this.state.saved) {
      const event = {
        seatgeekEventId: this.props.eventInfo.id,
        performer: this.props.performer.name,
        performerImage: this.props.performer.image,
        date: this.props.eventInfo.datetime_local.slice(0, 10)
      };

      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      this.setState({ saved: true });
    }

  }

  renderButton() {

    return (
      <button className={`${this.state.saved ? 'save-event-btn-2' : 'save-event-btn'} event-info-btn ft-atf-franklin-gothic`} onClick={this.saveEvent}>{this.state.saved ? 'SAVED' : 'SAVE EVENT'}</button>
    );
  }

  render() {
    return (
      <div className="event-info-layout-container flex-c">
        <div className="flex-c">
          <div className="event-info-container pos-rel border-radius">
            <div className="row">
              <img className="event-info-img" src={this.props.performer.image}></img>
              <div className="event-info-performer-container flex-c">
                <h1 className="event-info-performer">{this.props.performer.name.toUpperCase()}</h1>
              </div>
            </div>
            <div className="event-info-map-container flex-c">
              <div className="flex-c">
                <div className="map-outline">
                  <iframe src={`https://maps.google.com/maps?q=${this.props.eventInfo.venue.location.lat},${this.props.eventInfo.venue.location.lon}&z=15&output=embed`} width="100%" height="100%"></iframe>
                </div>
              </div>
            </div>
            <div className="event-info-txt-layout-container">
              <h2 className="event-title">{this.props.eventInfo.title}</h2>
              <div className="flex-space-between">
                <div className="event-info-txt-container">
                  <h2 className="ft-18px">{this.props.eventInfo.venue.name}</h2>
                  <h2 className="ft-16px txt-gray">{`${this.props.eventInfo.venue.address}, ${this.props.eventInfo.venue.extended_address}`}</h2>
                  <h2 className="ft-18px">{convertDateTime(this.props.eventInfo.datetime_local).date}</h2>
                  <h2 className="ft-16px txt-gray">{convertDateTime(this.props.eventInfo.datetime_local).time}</h2>
                </div>
              </div>
            </div>
            <div className="event-info-btn-layout-container border-radius-b flex-space-between align-items-c">
              <button className="btn tickets-btn event-info-btn ft-atf-franklin-gothic">TICKETS</button>
              {this.renderButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
