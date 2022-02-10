import React from 'react';

export default function Spinner(props) {
  return (
    <div className='spinner-container flex-c'>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
