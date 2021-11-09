import React from 'react';

export default class LocalEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch('https://api.techniknews.net/ipgeo/')
      .then(request => request.json())
      .then(data => {
        fetch('http://api.seatgeek.com/2/events/?geoip=' + data.ip + '&client_id=OTEzNzY5NnwxNjM1Nzk3ODUzLjE2OTAyNTI')
          .then(request => request.json())
          .then(data => {
            this.setState({
              events: data
            });
          });
      });
  }

  render() {
    return (
      <div className="local-events-container">
        <div className="column-full">
          <div className="local-events-flex">
            <div className="local-events">

            </div>
          </div>
        </div>
      </div>
    );
  }
}
