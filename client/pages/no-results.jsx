import React from 'react';

export default class NoResults extends React.Component {

  render() {
    return (
      <div className='no-results-container flex-c'>
        <h1>NO RESULTS FOR &apos;<span className='no-results-search'>{this.props.search}</span>&apos;</h1>
      </div>
    );
  }
}
