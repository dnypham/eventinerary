import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class SavedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: [],
      eventId: null,
      itinerary: null,
      itineraryId: null,
      locations: []
    };
    this.checkItinerary = this.checkItinerary.bind(this);
    this.createItinerary = this.createItinerary.bind(this);
  }

  componentDidMount() {

    fetch('/api/events')
      .then(request => request.json())
      .then(events => {
        const seatgeekEventFetches = events.map(event => {
          return fetch('https://api.seatgeek.com/2/events/' + event.seatgeekEventId + '?client_id=' + process.env.SEATGEEK_API_KEY)
            .then(response => response.json())
            .then(data => {
              data.performer = event.performer;
              data.eventId = event.eventId;
              return data;
            });
        });
        Promise
          .all(seatgeekEventFetches)
          .then(events => this.setState({
            events: events
          }));
      });
  }

  renderSavedEvents() {

    if (this.state.events.length === 0) {
      return (
        <div className="saved-no-itinerary-container flex-c">
          <h1 className="saved-no-itinerary-txt">NO EVENTS SAVED</h1>
        </div>
      );
    }

    return this.state.events.map((event, index) => (
      <div key={event.eventId} data-id={event.eventId} className="row saved-event">
        <div className="saved-date-container flex-c">
          <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
        </div>
        <div className="saved-venue-container flex-c" onClick={() => this.checkItinerary(event.eventId)}>
          <h3 className="ft-montseratt">{event.performer}</h3>
          {this.renderIcon(event.eventId)}
        </div>
      </div>
    ));
  }

  renderIcon(eventId) {
    if (eventId === this.state.eventId) {
      return (
          <i className="far fa-check-circle fa-2x selected-event-icon"></i>
      );
    }
  }

  checkItinerary(eventId) {
    fetch(`/api/itineraries/${eventId}`)
      .then(req => req.json())
      .then(data => {
        for (let i = 0; i < this.state.events.length; i++) {
          if (this.state.events[i].eventId === eventId) {
            data.dateTimeLocal = convertDateTime(this.state.events[i].datetime_local);
            data.venue = this.state.events[i].venue.name;
            data.address = this.state.events[i].venue.address + ' ' + this.state.events[i].venue.extended_address;
            data.performer = this.state.events[i].performer;
          }
        }

        if (data[0]) {
          this.setState({
            itinerary: true,
            eventId: eventId,
            selectedEvent: data
          });

          fetch(`/api/locations/${data[0].itineraryId}`)
            .then(req => req.json())
            .then(locations => {
              this.setState({ locations: locations });
            });
        } else {
          this.setState({
            itinerary: false,
            eventId: eventId,
            selectedEvent: data
          });
        }

      });
  }

  createItinerary() {
    const data = {
      eventId: this.state.eventId,
      location: this.state.selectedEvent.performer,
      time: this.state.selectedEvent.dateTimeLocal.time,
      address: this.state.selectedEvent.address
    };

    fetch('/api/itineraries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    this.checkItinerary(this.state.eventId);
    this.renderItinerary();
  }

  renderItineraryLocations() {
    if (this.state.locations.length !== 0) {
      return this.state.locations.map((location, index) => (
        <div key={location.locationId} data-id={location.locationId} className="flex-c itinerary-location">
          <div className="itinerary-location-time-container flex-c">
            <h3>{location.time}</h3>
          </div>
          <div className="itinerary-location-name-container flex-c">
            <h3>{location.location}</h3>
          </div>
        </div>
      ));
    }
  }

  renderItinerary() {

    if (this.state.events.length === 0) {
      return (
        <div className="saved-no-itinerary-container flex-c">
          <h1 className="saved-no-itinerary-txt">SAVE EVENTS TO CREATE ITINERARIES</h1>
        </div>
      );
    }

    if (this.state.itinerary === false) {
      return (
        <div className="saved-no-itinerary-container flex-c">
          <h1 className="saved-no-itinerary-txt">ITINERARY NOT FOUND</h1>
          <button className="btn create-itinerary-btn" onClick={this.createItinerary}>Create Itinerary</button>
        </div>
      );
    } else if (this.state.itinerary === true) {
      return (
        <div className="saved-itinerary-container border-radius">
          <div className="saved-itinerary-header-container row border-radius-t">
            <img className="saved-itinerary-img bdr-radius-t-l-20px" src={this.state.selectedEvent[0].performerImage}></img>
            <div className="saved-itinerary-performer-container flex-c">
              <h2 className={'saved-itinerary-performer-txt'}>{this.state.selectedEvent[0].performer.toUpperCase()}</h2>
              <h2 className={'saved-itinerary-venue-txt'}>{this.state.selectedEvent.venue}</h2>
            </div>
          </div>
          <div className="saved-itinerary-locations-container">
            {this.renderItineraryLocations()}
          </div>
          <div className="saved-itinerary-footer-container border-radius-b flex-space-between align-items-c">
            <i className="fas fa-edit fa-2x itinerary-icons"></i>
            <h2 className="saved-itinerary-footer-txt">{this.state.selectedEvent.dateTimeLocal.date.toUpperCase()}</h2>
            <i className="fas fa-share fa-2x itinerary-icons"></i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="saved-no-itinerary-container flex-c">
          <h1 className="saved-no-itinerary-txt">SELECT EVENT TO VIEW ITINERARY</h1>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="saved-layout-container flex-c">
        <div className="saved-layout align-items-c flex-space-between">
          <div className="saved-container border-radius">
            <div className="saved-list-container flex-c border-radius-t">
              <h2>SAVED EVENTS</h2>
            </div>
            <div className="saved-events-container border-radius-b">
              {this.renderSavedEvents()}
            </div>
          </div>
          <div className="itinerary-container border-radius">
            {this.renderItinerary()}
          </div>
        </div>
      </div>
    );
  }
}
