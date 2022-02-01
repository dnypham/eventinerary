import React from 'react';
import Banner from '../components/banner';
import LocalEvents from '../components/local-events';

export default function Home(props) {
  return (
    <>
      <Banner />
      <LocalEvents getLocalEventInfo={props.getLocalEventInfo}/>
    </>
  );
}
