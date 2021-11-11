import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default function Results(props) {

  function getFontSize() {
    let fontSize = '';

    if (props.performer.name.length > 41) {
      fontSize = 'font-size-4';
    } else if (props.performer.name.length > 32) {
      fontSize = 'font-size-3';
    } else if (props.performer.name.length > 26) {
      fontSize = 'font-size-2';
    } else if (props.performer.name.length > 12) {
      fontSize = 'font-size-1';
    }

    return fontSize;
  }

  function renderEvents() {

    if (props.results.length !== 0) {
      return props.results.map((event, index) => (
        <div key={event.id} className="row test">
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

  return (
    <div className="events-container">
      <div className="events-flex">
        <div className="search-results-container">
          <div className="row">
            <img className="search-results-image" src={props.performer.image}></img>
            <div className="search-results-header-text-container">
              <h1 className={`search-results-header-text ${getFontSize()}`}>{props.performer.name.toUpperCase()}</h1>
            </div>
          </div>
          <div className="rendered-events-container">
          {renderEvents()}
          </div>
        </div>
      </div>
    </div>
  );
}
