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
      fontSize = 'ft-size-4';
    } else if (this.props.performer.name.length > 32) {
      fontSize = 'ft-size-3';
    } else if (this.props.performer.name.length > 26) {
      fontSize = 'ft-size-2';
    } else if (this.props.performer.name.length > 12) {
      fontSize = 'ft-size-1';
    }

    return fontSize;
  }

  renderEvents() {

    if (this.props.results.length !== 0) {
      return this.props.results.map((event, index) => (
        <div key={event.id} data-id={event.id} className="row rendered-event" onClick={() => this.handleClick(event.id)}>
          <div className="se-date-ctr flex-c">
            <h3>{convertDateTime(event.datetime_local).date.toUpperCase()}</h3>
          </div>
          <div className="se-venue-ctr flex-s">
            <h3>{`${event.venue.name} | `}<span className="se-location">{`${event.venue.display_location}`}</span></h3>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="no-events-ctr flex-c">
          <h1 className="no-events-txt">NO UPCOMING EVENTS</h1>
        </div>
      );
    }

  }

  render() {
    return (
      <div className="events-ctr flex-c">
        <div className="flex-c">
          <div className="sr-ctr pos-rel">
            <div className="row">
              <img className="sr-img bdr-radius-t-l-20px" src={this.props.performer.image}></img>
              <div className="sr-hdr-txt-ctr">
                <h1 className={`sr-hdr-txt ${this.getFontSize()}`}>{this.props.performer.name.toUpperCase()}</h1>
              </div>
            </div>
            <div className="rendered-events-ctr bdr-radius-b-l-20px">
            {this.renderEvents()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
