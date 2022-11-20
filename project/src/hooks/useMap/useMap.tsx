import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {CITIES} from '../../const';
import {Location} from '../../types/city';
import {useAppSelector} from '../../hooks';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, currentCity: string): Map | null {
  const location: Location = CITIES[currentCity];

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        zoom: location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef, map, location, currentCity]);

  return map;
}

export default useMap;
