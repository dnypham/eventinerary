import React from 'react';

export default class LocalEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      meta: [],
      location: '',
      ip: []
    };
  }

  componentDidMount() {
    fetch('https://api.techniknews.net/ipgeo/')
      .then(request => request.json())
      .then(data => {
        this.setState({ ip: data });
        this.setState({ location: data.city + ', ' + data.regionName });
        fetch('http://api.seatgeek.com/2/events/?per_page=20&geoip=' + data.ip + '&client_id=OTEzNzY5NnwxNjM1Nzk3ODUzLjE2OTAyNTI')
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
      <div className="event-card-container" data-id={event.id} key={event.id}>
        <div className="event-image-container">
          <img src={event.performers[0].image}></img>
        </div>
        <h6 className="local-event-title">{event.title}</h6>
      </div>
    ));
  }

  renderSportingEvents() {
    const sportingEvents = this.state.events.filter(event => event.taxonomies[0].name === 'sports');

    return sportingEvents.map((event, index) => (
      <div className="event-card-container" data-id={event.id} key={event.id}>
        <div className="event-image-container">
          <img src={event.performers[0].image}></img>
        </div>
        <h6 className="local-event-title">{event.title}</h6>
      </div>
    ));
  }

  render() {
    console.log(this.state.ip);
    console.log(this.state.events);
    console.log(this.state.meta);
    return (
      <>
        <div className="local-events-container">
          <div className="column-full">
            <div className="local-events-flex">
              <div className="local-events">
                <div className="row">
                  <h1 className="local-events-header">{`CONCERTS NEAR ${this.state.location.toUpperCase()}`}</h1>
                </div>
                <div className="row">
                  <div className="local-events-card-container">
                    {this.renderConcerts()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="local-events-container margin-top">
          <div className="column-full">
            <div className="local-events-flex">
              <div className="local-events">
                <div className="row">
                  <h1 className="local-events-header">{`SPORTING EVENTS NEAR ${this.state.location.toUpperCase()}`}</h1>
                </div>
                <div className="row">
                  <div className="local-events-card-container">
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
