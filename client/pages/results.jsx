import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(eventId) {
    this.props.getEventInfo(eventId);
  }

  getFontSize() {
    let fontSize = '';

    if (this.props.performer.name.length > 41) {
      fontSize = 'font-size-4';
    } else if (this.props.performer.name.length > 32) {
      fontSize = 'font-size-3';
    } else if (this.props.performer.name.length > 26) {
      fontSize = 'font-size-2';
    } else if (this.props.performer.name.length > 12) {
      fontSize = 'font-size-1';
    }

    return fontSize;
  }

  renderEvents() {

    if (this.props.results.length !== 0) {
      return this.props.results.map((event, index) => (
        <div key={event.id} data-id={event.id} className="row rendered-event" onClick={() => this.handleClick(event.id)}>
          <div className="search-events-date-container">
            <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
          </div>
          <div className="search-events-venue-container">
            <h3>{`${event.venue.name} | `}<span className="search-events-location">{`${event.venue.display_location}`}</span></h3>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="no-events-container">
          <h1 className="no-events-text">NO UPCOMING EVENTS</h1>
        </div>
      );
    }

  }

  render() {
    return (
      <div className="events-container">
        <div className="events-flex">
          <div className="search-results-container">
            <div className="row">
              <img className="search-results-image" src={this.props.performer.image}></img>
              <div className="search-results-header-text-container">
                <h1 className={`search-results-header-text ${this.getFontSize()}`}>{this.props.performer.name.toUpperCase()}</h1>
              </div>
            </div>
            <div className="rendered-events-container">
            {this.renderEvents()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
