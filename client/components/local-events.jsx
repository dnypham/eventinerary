import React from 'react';
import convertDateTime from '../lib/convertDateTime';

export default class LocalEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      meta: [],
      location: ''
    };
  }

  componentDidMount() {
    fetch('https://api.techniknews.net/ipgeo/')
      .then(request => request.json())
      .then(data => {
        this.setState({ ip: data });
        this.setState({ location: data.city + ', ' + data.regionName });
        fetch('https://api.seatgeek.com/2/events/?per_page=50&geoip=' + data.ip + '&client_id=' + process.env.SEATGEEK_API_KEY)
          .then(request => request.json())
          .then(data => {
            this.setState({
              events: data.events,
              meta: data.meta
            });
          });
      });
  }

  renderConcerts() {
    const concerts = this.state.events.filter(event => event.taxonomies[0].name === 'concert');

    return concerts.map((event, index) => (
      <div className="event-card-ctr pos-rel bdr-radius-20px" data-id={event.id} key={event.id}>
        <div className="event-image-ctr">
          <img className="bdr-radius-t-l-20px bdr-radius-t-r-20px"src={event.performers[0].image}></img>
        </div>
        <div className="le-info-ctr">
          <div className="flex-space-between">
            <h6 className="le-time-date">{`${convertDateTime(event.datetime_local).date}`}</h6>
            <h6 className="le-time-date">{`${convertDateTime(event.datetime_local).time}`}</h6>
          </div>
          <h6 className="le-title">{event.performers[0].name}</h6>
          <h6 className="le-venue">{event.venue.name}</h6>
          <h6 className="le-location pos-abs">{event.venue.display_location}</h6>
        </div>
      </div>
    ));
  }

  renderSportingEvents() {
    const sportingEvents = this.state.events.filter(event => event.taxonomies[0].name === 'sports');

    return sportingEvents.map((event, index) => (
      <div className="event-card-ctr pos-rel bdr-radius-20px" data-id={event.id} key={event.id}>
        <div className="event-image-ctr">
          <img className="bdr-radius-t-l-20px bdr-radius-t-r-20px" src={event.performers[0].image}></img>
        </div>
        <div className="le-info-ctr">
          <div className="flex-space-between">
            <h6 className="le-time-date">{`${convertDateTime(event.datetime_local).date}`}</h6>
            <h6 className="le-time-date">{`${convertDateTime(event.datetime_local).time}`}</h6>
          </div>
          <h6 className="le-title">{event.performers[0].name}</h6>
          <h6 className="le-venue">{event.venue.name}</h6>
          <h6 className="le-location pos-abs">{event.venue.display_location}</h6>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <>
        <div className="le-lyt-ctr flex-c">
          <div className="column-full">
            <div className="flex-c">
              <div className="le-ctr bdr-radius-20px">
                <div className="row">
                  <h1 className="le-hdr">{`CONCERTS NEAR ${this.state.location.toUpperCase()}`}</h1>
                </div>
                <div className="row">
                  <div className="le-card-ctr">
                    {this.renderConcerts()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="le-lyt-ctr margin-t">
          <div className="column-full">
            <div className="flex-c">
              <div className="le-ctr">
                <div className="row">
                  <h1 className="le-hdr">{`SPORTING EVENTS NEAR ${this.state.location.toUpperCase()}`}</h1>
                </div>
                <div className="row">
                  <div className="le-card-ctr">
                    {this.renderSportingEvents()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
