import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default function Results(props) {

  function getFontSize() {
    let fontSize = '';

    if (props.results[0].performers[0].name.length > 41) {
      fontSize = 'font-size-4';
    } else if (props.results[0].performers[0].name.length > 32) {
      fontSize = 'font-size-3';
    } else if (props.results[0].performers[0].name.length > 26) {
      fontSize = 'font-size-2';
    } else if (props.results[0].performers[0].name.length > 12) {
      fontSize = 'font-size-1';
    }

    return fontSize;
  }

  function renderEvents() {

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

  }

  return (
    <div className="search-events-container">
      <div className="search-events-flex">
        <div className="search-results-container">
          <div className="row">
            <img className="search-results-image" src={props.results[0].performers[0].image}></img>
            <div className="search-results-header-text-container">
              <h1 className={`search-results-header-text ${getFontSize()}`}>{props.results[0].performers[0].name.toUpperCase()}</h1>
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
