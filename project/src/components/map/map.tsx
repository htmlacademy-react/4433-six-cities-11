import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import useMap from '../../hooks/useMap/useMap';
import {useAppSelector} from '../../hooks';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(): JSX.Element {
  const mapRef = useRef(null);

  const currentCity: string = useAppSelector((state) => state.currentCity);
  const offersByCity = useAppSelector((state) => state.offers);
  const selectedOfferId = useAppSelector((state) => state.selectedOfferId);

  const map = useMap(mapRef, currentCity);

  useEffect(() => {
    if (map) {
      offersByCity.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOfferId !== 0 && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);

        map.flyTo({lat: offer.city.location.latitude, lng: offer.city.location.longitude}, offer.city.location.zoom);
      });
    }
  }, [map, offersByCity, currentCity, selectedOfferId]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
