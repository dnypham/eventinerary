import React from 'react';
import Spinner from './spinner';
import convertDateTime from '../lib/convertDateTime';

export default class LocalEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingIp: true,
      isLoadingEvents: true,
      events: [],
      meta: [],
      location: '',
      errorIp: false,
      errorEvents: false
    };
  }

  componentDidMount() {
    fetch('https://api.techniknews.net/ipgeo/')
      .then(request => {
        if (!request.ok) {
          this.setState({
            isLoadingIp: false,
            errorIp: true
          });
        } else {
          return request.json();
        }
      })
      .catch(err => {
        this.setState({
          isLoadingIp: false,
          isLoadingEvents: false,
          errorIp: true
        });
        throw err;
      })
      .then(data => {
        this.setState({
          isLoadingIp: false,
          ip: data,
          location: data.city + ', ' + data.regionName,
          errorIp: false
        });
        fetch('https://api.seatgeek.com/2/events/?per_page=50&geoip=' + data.ip + '&client_id=' + process.env.SEATGEEK_API_KEY)
          .then(request => {
            if (!request.ok) {
              this.setState({
                isLoadingEvents: false,
                errorEvents: true
              });
            } else {
              return request.json();
            }
          })
          .catch(err => {
            this.setState({
              isLoadingEvents: false,
              errorEvents: true
            });
            throw err;
          })
          .then(data => {
            this.setState({
              isLoadingEvents: false,
              events: data.events,
              meta: data.meta,
              errorEvents: false
            });
          });
      });
  }

  renderConcerts() {

    if (this.state.isLoadingEvents) {
      return <Spinner />;
    }

    if (this.state.errorEvents || this.state.errorIp) {
      return (
        <div className='home-error flex-c'>
          <h3>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</h3>
        </div>
      );
    }

    const concerts = this.state.events.filter(event => event.taxonomies[0].name === 'concert');

    return concerts.map((event, index) => (
      <div className="home-event-card-container pos-rel border-radius" data-id={event.id} key={event.id} onClick={() => this.props.getLocalEventInfo(event.id)}>
        <div className="home-event-image-container">
          <img className="border-radius-t" src={event.performers[0].image}></img>
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

    if (this.state.isLoadingEvents) {
      return <Spinner />;
    }

    if (this.state.errorEvents || this.state.errorIp) {
      return (
        <div className='home-error flex-c'>
          <h3>Sorry, there was an error connecting to the network! Please check your internet connection and try again.</h3>
        </div>
      );
    }

    const sportingEvents = this.state.events.filter(event => event.taxonomies[0].name === 'sports');

    return sportingEvents.map((event, index) => (
      <div className="home-event-card-container pos-rel border-radius" data-id={event.id} key={event.id} onClick={() => this.props.getLocalEventInfo(event.id)}>
        <div className="home-event-image-container">
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
                  <h1 className="home-header">{this.state.isLoadingIp ? <Spinner /> : this.state.errorIp ? 'Sorry, there was an error connecting to the network! Please check your internet connection and try again.' : `CONCERTS NEAR ${this.state.location.toUpperCase()}`}</h1>
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
                  <h1 className="home-header">{this.state.isLoadingIp ? <Spinner /> : this.state.errorIp ? 'Sorry, there was an error connecting to the network! Please check your internet connection and try again.' : `SPORTING EVENTS NEAR ${this.state.location.toUpperCase()}`}</h1>
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
