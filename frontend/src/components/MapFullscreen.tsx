import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useStore } from '../state/store';
import { CloseIcon } from './icons';
import { MapFitBounds } from './MapFitBounds';
import { buildLocationIcon } from './mapMarkers';

interface MapFullscreenProps {
  open: boolean;
  onClose: () => void;
}

export function MapFullscreen({ open, onClose }: MapFullscreenProps) {
  const { locations, selectedId, select } = useStore();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Map</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close map"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.1] text-white/80 hover:bg-white/[0.2]"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mx-4 mb-4 flex-1 overflow-hidden rounded-2xl border border-white/15 sm:mx-6 sm:mb-6">
        <MapContainer
          center={[1.3521, 103.8198]}
          zoom={11}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFitBounds locations={locations} />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={buildLocationIcon(location, location.id === selectedId)}
              eventHandlers={{
                click: () => {
                  select(location.id);
                  onClose();
                },
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
