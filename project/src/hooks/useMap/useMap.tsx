import {useEffect, useState, useRef} from 'react';

function Map(): JSX.Element {
  const mapRef = useRef(null);

  return(
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
