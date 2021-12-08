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
      <div className="home-event-card-container pos-rel border-radius" data-id={event.id} key={event.id}>
        <div className="home-event-image-container">
          <img className="border-radius-t"src={event.performers[0].image}></img>
        </div>
        <div className="home-event-info-container">
          <div className="flex-space-between">
            <h6 className="home-event-time-date">{`${convertDateTime(event.datetime_local).date}`}</h6>
            <h6 className="home-event-time-date">{`${convertDateTime(event.datetime_local).time}`}</h6>
          </div>
          <h6 className="home-event-title">{event.performers[0].name}</h6>
          <h6 className="home-event-venue ft-montseratt">{event.venue.name}</h6>
          <h6 className="home-event-location pos-abs">{event.venue.display_location}</h6>
        </div>
      </div>
    ));
  }

  renderSportingEvents() {
    const sportingEvents = this.state.events.filter(event => event.taxonomies[0].name === 'sports');

    return sportingEvents.map((event, index) => (
      <div className="home-event-card-container pos-rel border-radius" data-id={event.id} key={event.id}>
        <div className="home-event-image-ctr">
          <img className="border-radius-t" src={event.performers[0].image}></img>
        </div>
        <div className="home-event-info-container">
          <div className="flex-space-between">
            <h6 className="home-event-time-date">{`${convertDateTime(event.datetime_local).date}`}</h6>
            <h6 className="home-event-time-date">{`${convertDateTime(event.datetime_local).time}`}</h6>
          </div>
          <h6 className="home-event-title">{event.performers[0].name}</h6>
          <h6 className="home-event-venue">{event.venue.name}</h6>
          <h6 className="home-event-location pos-abs">{event.venue.display_location}</h6>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <>
        <div className="home-layout-container flex-c">
          <div className="column-full">
            <div className="flex-c">
              <div className="home-container bdr-radius">
                <div className="row justify-c">
                  <h1 className="home-header">{`CONCERTS NEAR ${this.state.location.toUpperCase()}`}</h1>
                </div>
                <div className="row">
                  <div className="home-events-layout-container">
                    {this.renderConcerts()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-layout-container margin-t flex-c">
          <div className="column-full">
            <div className="flex-c">
              <div className="home-container bdr-radius">
                <div className="row justify-c">
                  <h1 className="home-header">{`SPORTING EVENTS NEAR ${this.state.location.toUpperCase()}`}</h1>
                </div>
                <div className="row">
                  <div className="home-events-layout-container">
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
