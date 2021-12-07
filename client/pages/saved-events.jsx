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
          return fetch('https://api.seatgeek.com/2/events/' + event.seatgeekEventId + '?client_id=' + process.env.SEATGEEK_API_KEY)
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
            <div className="saved-date-container flex-c">
              <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
            </div>
            <div className="saved-venue-container flex-c">
              <h3 className="ft-montseratt">{event.performer}</h3>
            </div>
          </div>

    ));
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="saved-layout-container flex-c">
        <div className="saved-layout align-items-c flex-space-between">
          <div className="saved-container border-radius">
            <div className="saved-list-container flex-c border-radius-t">
              <h2>SAVED EVENTS</h2>
            </div>
            <div className="rendered-events-container border-radius-b">
              {this.renderSavedEvents()}
            </div>
          </div>
          <div className="itinerary-container border-radius">

          </div>
        </div>
      </div>
    );
  }
}
