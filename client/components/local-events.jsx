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
        fetch('http://api.seatgeek.com/2/events/?geoip=' + data.ip + '&client_id=OTEzNzY5NnwxNjM1Nzk3ODUzLjE2OTAyNTI')
          .then(request => request.json())
          .then(data => {
            this.setState({
              events: data.events,
              meta: data.meta
            });
          });
      });
  }

  renderEvents() {
    return this.state.events.map((event, index) => (
      <div className="event-card-container" data-id={event.id} key={event.id}>
        <div className="event-image-container">
          <img src={event.performers[0].image}></img>
        </div>
      </div>
    ));
  }

  render() {
    console.log(this.state.ip);
    console.log(this.state.events);
    console.log(this.state.meta);
    return (
      <div className="local-events-container">
        <div className="column-full">
          <div className="local-events-flex">
            <div className="local-events">
              <div className="row">
                <h1 className="local-events-header">{`EVENTS NEAR: ${this.state.location.toUpperCase()}`}</h1>
              </div>
              <div className="row">
                <div className="local-events-card-container">
                  {this.renderEvents()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
