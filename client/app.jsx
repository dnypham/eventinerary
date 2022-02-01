import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Results from './pages/results';
import Event from './pages/event';
import SavedEvents from './pages/saved-events';
import Itinerary from './pages/itinerary';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      searchResults: [],
      performer: [],
      meta: [],
      eventInfo: []
    };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.getEventInfo = this.getEventInfo.bind(this);
    this.getLocalEventInfo = this.getLocalEventInfo.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  getSearchResults(search) {

    fetch('https://api.seatgeek.com/2/performers?slug=' + search + '&client_id=' + process.env.SEATGEEK_API_KEY)
      .then(request => request.json())
      .then(data => {
        this.setState({
          performer: data.performers[0]
        });
        fetch('https://api.seatgeek.com/2/events?performers.id=' + data.performers[0].id + '&per_page=50&client_id=' + process.env.SEATGEEK_API_KEY)
          .then(request => request.json())
          .then(data => {
            this.setState({
              searchResults: data.events,
              meta: data.meta
            }, () => {
              location.hash = '#results';
            });
          });
      });
  }

  getEventInfo(eventId) {
    fetch('https://api.seatgeek.com/2/events/' + eventId + '?client_id=' + process.env.SEATGEEK_API_KEY)
      .then(request => request.json())
      .then(data => {
        this.setState({
          eventInfo: data
        }, () => {
          location.hash = '#event';
        });
      });
  }

  getLocalEventInfo(eventId) {
    fetch('https://api.seatgeek.com/2/events/' + eventId + '?client_id=' + process.env.SEATGEEK_API_KEY)
      .then(request => request.json())
      .then(data => {
        this.setState({
          eventInfo: data,
          performer: data.performers[0]
        }, () => {
          location.hash = '#event';
        });
      });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home getLocalEventInfo={this.getLocalEventInfo} />;
    }
    if (route.path === 'results') {
      return <Results getEventInfo={this.getEventInfo} results={this.state.searchResults} performer={this.state.performer} />;
    }
    if (route.path === 'itinerary') {
      return <Itinerary />;
    }
    if (route.path === 'event') {
      return <Event eventInfo={this.state.eventInfo} performer={this.state.performer}/>;
    }
    if (route.path === 'saved-events') {
      return <SavedEvents />;
    }
  }

  render() {
    return (
      <>
        <Header search={this.getSearchResults} />
        {this.renderPage()}
        <Footer />
      </>
    );
  }
}
