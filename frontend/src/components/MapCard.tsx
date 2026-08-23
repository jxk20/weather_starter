import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useStore } from '../state/store';
import { ExpandIcon } from './icons';
import { MapFitBounds } from './MapFitBounds';
import { MapFullscreen } from './MapFullscreen';
import { buildLocationIcon } from './mapMarkers';

export function MapCard() {
  const { locations, selectedId, select } = useStore();
  const [expanded, setExpanded] = useState(false);

  if (locations.length === 0) return null;

  return (
    <>
      <section className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-xl">
        <header className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
          <span>Map</span>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Expand map"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition hover:bg-white/15 hover:text-white/90"
          >
            <ExpandIcon className="h-3.5 w-3.5" />
          </button>
        </header>
        <div
          className="h-56 w-full cursor-pointer overflow-hidden rounded-xl"
          onClick={() => setExpanded(true)}
        >
          <MapContainer
            center={[1.3521, 103.8198]}
            zoom={11}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapFitBounds locations={locations} />
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
                icon={buildLocationIcon(location, location.id === selectedId)}
                eventHandlers={{
                  click: (event) => {
                    event.originalEvent.stopPropagation();
                    select(location.id);
                  },
                }}
              />
            ))}
          </MapContainer>
        </div>
      </section>
      <MapFullscreen open={expanded} onClose={() => setExpanded(false)} />
    </>
  );
}
