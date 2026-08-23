import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { Location } from '../types';
import { computeBounds } from './mapMarkers';

interface MapFitBoundsProps {
  locations: Location[];
}

export function MapFitBounds({ locations }: MapFitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    const bounds = computeBounds(locations);
    if (!bounds) return;
    if (locations.length === 1) {
      map.setView([locations[0].latitude, locations[0].longitude], 11);
    } else {
      map.fitBounds(bounds, { padding: [48, 48] });
    }
  }, [map, locations]);

  return null;
}
