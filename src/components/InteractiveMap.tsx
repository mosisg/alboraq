import React, { useState, useEffect } from 'react';
import { MapPin, Star, X, Navigation, Layers } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  type: 'hotel' | 'attraction' | 'airport' | 'station';
  lat: number;
  lng: number;
  price?: number;
  rating?: number;
  image?: string;
  description?: string;
}

interface InteractiveMapProps {
  isOpen: boolean;
  onClose: () => void;
  center: { lat: number; lng: number };
  locations: MapLocation[];
  onLocationSelect?: (location: MapLocation) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  isOpen,
  onClose,
  center,
  locations,
  onLocationSelect
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [mapView, setMapView] = useState<'map' | 'satellite'>('map');
  const [filters, setFilters] = useState({
    hotels: true,
    attractions: true,
    transport: true
  });

  // Simulation d'une carte interactive avec des points
  const filteredLocations = locations.filter(location => {
    if (location.type === 'hotel' && !filters.hotels) return false;
    if (location.type === 'attraction' && !filters.attractions) return false;
    if ((location.type === 'airport' || location.type === 'station') && !filters.transport) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2" size={24} />
            Carte interactive
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Carte principale */}
          <div className="flex-1 relative bg-gray-100">
            {/* Contrôles de la carte */}
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <div className="bg-white rounded-lg shadow-md p-2">
                <button
                  onClick={() => setMapView(mapView === 'map' ? 'satellite' : 'map')}
                  className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  <Layers className="mr-2" size={16} />
                  {mapView === 'map' ? 'Satellite' : 'Plan'}
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-3">
                <h4 className="font-medium mb-2 text-sm">Filtres</h4>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.hotels}
                      onChange={(e) => setFilters({ ...filters, hotels: e.target.checked })}
                      className="mr-2"
                    />
                    Hôtels
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.attractions}
                      onChange={(e) => setFilters({ ...filters, attractions: e.target.checked })}
                      className="mr-2"
                    />
                    Attractions
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={filters.transport}
                      onChange={(e) => setFilters({ ...filters, transport: e.target.checked })}
                      className="mr-2"
                    />
                    Transport
                  </label>
                </div>
              </div>
            </div>

            {/* Simulation de la carte avec image de fond */}
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: mapView === 'map' 
                  ? 'url(https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg)'
                  : 'url(https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg)'
              }}
            >
              {/* Points sur la carte */}
              {filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${30 + (index % 5) * 15}%`,
                    top: `${20 + Math.floor(index / 5) * 20}%`
                  }}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform ${
                    location.type === 'hotel' ? 'bg-blue-500' :
                    location.type === 'attraction' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`}>
                    {location.type === 'hotel' ? '🏨' :
                     location.type === 'attraction' ? '🎯' :
                     location.type === 'airport' ? '✈️' : '🚂'}
                  </div>
                  {location.price && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-semibold">
                      {location.price}€
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contrôles de navigation */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <Navigation size={20} />
              </button>
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {selectedLocation ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{selectedLocation.name}</h3>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>

                {selectedLocation.image && (
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="capitalize">{selectedLocation.type}</span>
                  </div>

                  {selectedLocation.price && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Prix</span>
                      <span className="font-semibold text-blue-600">{selectedLocation.price}€</span>
                    </div>
                  )}

                  {selectedLocation.rating && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Note</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{selectedLocation.rating}/10</span>
                      </div>
                    </div>
                  )}

                  {selectedLocation.description && (
                    <div>
                      <span className="text-sm text-gray-600 block mb-1">Description</span>
                      <p className="text-sm">{selectedLocation.description}</p>
                    </div>
                  )}
                </div>

                {onLocationSelect && (
                  <button
                    onClick={() => onLocationSelect(selectedLocation)}
                    className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sélectionner
                  </button>
                )}
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Légende</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                      🏨
                    </div>
                    <span className="text-sm">Hôtels</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                      🎯
                    </div>
                    <span className="text-sm">Attractions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                      ✈️
                    </div>
                    <span className="text-sm">Transport</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-3">Statistiques</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Hôtels trouvés</span>
                      <span>{locations.filter(l => l.type === 'hotel').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attractions</span>
                      <span>{locations.filter(l => l.type === 'attraction').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix moyen</span>
                      <span>
                        {Math.round(locations.filter(l => l.price).reduce((acc, l) => acc + (l.price || 0), 0) / locations.filter(l => l.price).length)}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;