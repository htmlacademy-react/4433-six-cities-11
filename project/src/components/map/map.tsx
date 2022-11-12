import {useRef} from 'react';
import {Offers} from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type Props = {
  city: string;
  offers: Offers;
}

function Map({city, offers}: Props): JSX.Element {
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
