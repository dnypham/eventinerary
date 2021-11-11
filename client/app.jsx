import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Results from './pages/results';
import Itinerary from './pages/itinerary';
import Trips from './pages/trips';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      searchResults: [],
      performer: [],
      meta: []
    };
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  getSearchResults(search) {

    fetch('https://api.seatgeek.com/2/performers?slug=' + search + '&client_id=OTEzNzY5NnwxNjM1Nzk3ODUzLjE2OTAyNTI')
      .then(request => request.json())
      .then(data => {
        this.setState({
          performer: data.performers[0]
        });
        fetch('https://api.seatgeek.com/2/events?performers.id=' + data.performers[0].id + '&per_page=50&client_id=OTEzNzY5NnwxNjM1Nzk3ODUzLjE2OTAyNTI')
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

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'results') {
      return <Results results={this.state.searchResults} performer={this.state.performer}/>;
    }
    if (route.path === 'itinerary') {
      return <Itinerary />;
    }
    if (route.path === 'trips') {
      return <Trips />;
    }
  }

  render() {
    return (
      <>
        <Header search={this.getSearchResults}/>
        {this.renderPage()}
        <Footer />
      </>
    );
  }
}
