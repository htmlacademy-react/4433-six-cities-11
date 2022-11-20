import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types/offer';
import {Location} from '../../types/city';
import {URL_MARKER_DEFAULT, CITIES} from '../../const';
import useMap from '../../hooks/useMap/useMap';

type Props = {
  currentCity: string;
  offersByCity: Offer[];
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({currentCity, offersByCity}: Props): JSX.Element {
  const mapRef = useRef(null);
  const cityLocation: Location = CITIES[currentCity];
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map && cityLocation) {
      offersByCity.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offersByCity, cityLocation]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
