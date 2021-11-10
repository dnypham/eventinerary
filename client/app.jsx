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
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'results') {
      return <Results />;
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
        <Header />
        {this.renderPage()}
        <Footer />
      </>
    );
  }
}
