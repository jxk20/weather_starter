import L from 'leaflet';
import type { Location } from '../types';
import { formatTemperature } from './format';

export function buildLocationIcon(location: Location, isSelected: boolean): L.DivIcon {
  const temperature = formatTemperature(location.weather?.temperature_c);
  const label =
    location.weather?.area || `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`;
  const pinColor = isSelected ? '#ffffff' : 'rgba(255,255,255,0.75)';

  return L.divIcon({
    className: 'weather-map-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-100%);">
        <div style="
          display:flex;flex-direction:column;align-items:center;gap:1px;
          padding:4px 8px;border-radius:10px;
          background:rgba(20,26,34,0.75);backdrop-filter:blur(8px);
          border:1px solid rgba(255,255,255,${isSelected ? '0.5' : '0.18'});
          color:#fff;font-family:inherit;white-space:nowrap;margin-bottom:2px;
        ">
          <span style="font-size:11px;line-height:1;font-weight:600;">${temperature}</span>
          <span style="font-size:9px;line-height:1;opacity:0.75;max-width:90px;overflow:hidden;text-overflow:ellipsis;">${label}</span>
        </div>
        <div style="
          width:10px;height:10px;border-radius:9999px;
          background:${pinColor};border:2px solid rgba(20,26,34,0.85);
          box-shadow:0 1px 4px rgba(0,0,0,0.4);
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export function computeBounds(locations: Location[]): L.LatLngBoundsExpression | null {
  if (locations.length === 0) return null;
  return locations.map((l) => [l.latitude, l.longitude] as [number, number]);
}
