import React from 'react';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="event-info-layout-container">
        <div className="event-info-layout-flex">
          <div className="event-info-container">
            <div className="row">
              <img className="event-info-image" src={this.props.performer.image}></img>
              <div className="event-info-header-text-container">
                <h1 className={'event-info-header-text'}>{this.props.performer.name.toUpperCase()}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
