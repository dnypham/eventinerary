import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class SavedEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('/api/events')
      .then(request => request.json())
      .then(events => {
        const seatgeekEventFetches = events.map(event => {
          return fetch('https://api.seatgeek.com/2/events/' + event.seatgeekEventId + '?client_id=OTEzNzY5NnwxNjM1Nzk3ODUzLjE2OTAyNTI')
            .then(response => response.json())
            .then(data => {
              data.performer = event.performer;
              return data;
            });
        });
        Promise
          .all(seatgeekEventFetches)
          .then(events => this.setState({ events: events }));
      });
  }

  renderSavedEvents() {
    return this.state.events.map((event, index) => (

          <div key={event.id} data-id={event.id} className="row rendered-event">
            <div className="saved-events-date-container">
              <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
            </div>
            <div className="saved-events-venue-container">
              <h3>{event.performer}</h3>
            </div>
          </div>

    ));
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="saved-events-layout-container">
        <div className="saved-events-layout-flex">
          <div className="saved-events-container">
            <div className="saved-events-list-container">
              <h2>SAVED EVENTS</h2>
            </div>
            <div className="rendered-saved-events-container">
              {this.renderSavedEvents()}
            </div>
          </div>
          <div className="itinerary-container">

          </div>
        </div>
      </div>
    );
  }
}
