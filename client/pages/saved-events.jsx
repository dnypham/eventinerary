import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class SavedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: [],
      eventId: null,
      itinerary: null
    };
    this.handleClick = this.handleClick.bind(this);
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
      <div key={event.eventId} data-id={event.eventId} className="row saved-event" onClick={() => this.handleClick(event.eventId)}>
            <div className="saved-date-container flex-c">
              <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
            </div>
            <div className="saved-venue-container flex-c">
              <h3 className="ft-montseratt">{event.performer}</h3>
            </div>
          </div>
    ));
  }

  handleClick(eventId) {
    fetch(`/api/itineraries/${eventId}`)
      .then(req => req.json())
      .then(data => {
        console.log(data);
        let venue, dateTimeLocal;

        for (let i = 0; i < this.state.events.length; i++) {
          if (this.state.events[i].eventId === eventId) {
            data.dateTimeLocal = convertDateTime(this.state.events[i].datetime_local);
            data.venue = this.state.events[i].venue.name;
          }
        }

        if (data.length > 0) {
          this.setState({
            itinerary: true,
            eventId: eventId,
            selectedEvent: data

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

    fetch(`/api/itineraries/${this.state.eventId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    this.renderItinerary();
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
        <div className="saved-container border-radius">
          <div className="saved-list-container flex-c border-radius-t">
            <h2>{this.state.selectedEvent[0].performer.toUpperCase()}</h2>
          </div>
          <div className="saved-events-container border-radius-b">
            {}
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
    console.log(this.state);
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
