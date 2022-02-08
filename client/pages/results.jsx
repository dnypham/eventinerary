import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getFontSize = this.getFontSize.bind(this);
  }

  handleClick(eventId) {
    this.props.getEventInfo(eventId);
  }

  getFontSize() {
    let fontSize = '';

    if (this.props.performer.name.length > 41) {
      fontSize = 'ft-size-4';
    } else if (this.props.performer.name.length > 32) {
      fontSize = 'ft-size-3';
    } else if (this.props.performer.name.length > 26) {
      fontSize = 'ft-size-2';
    } else if (this.props.performer.name.length > 9) {
      fontSize = 'ft-size-1';
    } else {
      fontSize = 'ft-size-default';
    }

    return fontSize;
  }

  renderEvents() {

    if (this.props.results.length !== 0) {
      return this.props.results.map((event, index) => (
        <div key={event.id} data-id={event.id} className="row results-event" onClick={() => this.handleClick(event.id)}>
          <div className="results-event-date-container flex-c">
            <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
          </div>
          <div className="results-event-venue-container flex-s">
            <h3>{`${event.venue.name} | `}<span className="results-event-location">{`${event.venue.display_location}`}</span></h3>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="results-no-events-container flex-c">
          <h1 className="results-no-events-txt">NO UPCOMING EVENTS</h1>
        </div>
      );
    }

  }

  render() {
    return (
      <div className="results-layout-container flex-c">
        <div className="flex-c">
          <div className="results-container pos-rel">
            <div className="row">
              <img className="results-img bdr-radius-t-l-20px" src={this.props.performer.image}></img>
              <div className="results-performer-container flex-c">
                <h1 className={`results-performer-txt ${this.getFontSize()}`}>{this.props.performer.name.toUpperCase()}</h1>
              </div>
            </div>
            <div className="results-events-container">
              {this.renderEvents()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
