import React, { useState } from 'react';
import { Filter, X, Clock, Plane, Building, Star, Wifi, Car, Coffee, Dumbbell, MapPin } from 'lucide-react';

interface AdvancedFiltersProps {
  type: 'flights' | 'hotels';
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: any;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  type,
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState(currentFilters);

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = type === 'flights' 
      ? { 
          priceRange: [0, 2000],
          stops: [],
          airlines: [],
          departureTime: [],
          arrivalTime: [],
          duration: [0, 24],
          airports: []
        }
      : {
          priceRange: [0, 1000],
          stars: [],
          rating: 0,
          amenities: [],
          propertyTypes: [],
          districts: [],
          guestRating: 0
        };
    setFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center">
            <Filter className="mr-2" size={24} />
            Filtres avancés
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {type === 'flights' ? (
            <FlightFilters filters={filters} setFilters={setFilters} />
          ) : (
            <HotelFilters filters={filters} setFilters={setFilters} />
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-between">
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
          <div className="space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FlightFilters: React.FC<{ filters: any; setFilters: any }> = ({ filters, setFilters }) => {
  const airlines = [
    'Air France', 'British Airways', 'Lufthansa', 'KLM', 'Ryanair', 'EasyJet', 'Emirates', 'Qatar Airways'
  ];

  const airports = [
    { code: 'CDG', name: 'Charles de Gaulle' },
    { code: 'ORY', name: 'Orly' },
    { code: 'LHR', name: 'Heathrow' },
    { code: 'LGW', name: 'Gatwick' },
    { code: 'FRA', name: 'Frankfurt' },
    { code: 'AMS', name: 'Amsterdam' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Prix */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Prix (€)</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="2000"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]]
              })}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]]
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)]
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Escales */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Escales</h3>
        <div className="space-y-2">
          {['Direct', '1 escale', '2+ escales'].map((stop, index) => (
            <label key={stop} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.stops.includes(index)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      stops: [...filters.stops, index]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      stops: filters.stops.filter((s: number) => s !== index)
                    });
                  }
                }}
                className="mr-2"
              />
              {stop}
            </label>
          ))}
        </div>
      </div>

      {/* Compagnies */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Compagnies aériennes</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {airlines.map((airline) => (
            <label key={airline} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      airlines: [...filters.airlines, airline]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      airlines: filters.airlines.filter((a: string) => a !== airline)
                    });
                  }
                }}
                className="mr-2"
              />
              {airline}
            </label>
          ))}
        </div>
      </div>

      {/* Horaires de départ */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Heure de départ</h3>
        <div className="space-y-2">
          {[
            { label: 'Matin (06:00 - 12:00)', value: 'morning' },
            { label: 'Après-midi (12:00 - 18:00)', value: 'afternoon' },
            { label: 'Soir (18:00 - 00:00)', value: 'evening' },
            { label: 'Nuit (00:00 - 06:00)', value: 'night' }
          ].map((time) => (
            <label key={time.value} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.departureTime.includes(time.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      departureTime: [...filters.departureTime, time.value]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      departureTime: filters.departureTime.filter((t: string) => t !== time.value)
                    });
                  }
                }}
                className="mr-2"
              />
              {time.label}
            </label>
          ))}
        </div>
      </div>

      {/* Durée de vol */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Durée de vol (heures)</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="24"
            value={filters.duration[1]}
            onChange={(e) => setFilters({
              ...filters,
              duration: [0, Number(e.target.value)]
            })}
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            Jusqu'à {filters.duration[1]} heures
          </div>
        </div>
      </div>

      {/* Aéroports */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Aéroports préférés</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {airports.map((airport) => (
            <label key={airport.code} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.airports.includes(airport.code)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      airports: [...filters.airports, airport.code]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      airports: filters.airports.filter((a: string) => a !== airport.code)
                    });
                  }
                }}
                className="mr-2"
              />
              <span className="font-medium">{airport.code}</span>
              <span className="ml-2 text-sm text-gray-600">{airport.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const HotelFilters: React.FC<{ filters: any; setFilters: any }> = ({ filters, setFilters }) => {
  const amenities = [
    { icon: <Wifi size={16} />, label: 'Wi-Fi gratuit', value: 'wifi' },
    { icon: <Car size={16} />, label: 'Parking', value: 'parking' },
    { icon: <Coffee size={16} />, label: 'Restaurant', value: 'restaurant' },
    { icon: <Dumbbell size={16} />, label: 'Salle de sport', value: 'gym' },
    { icon: <Building size={16} />, label: 'Piscine', value: 'pool' },
    { icon: <Star size={16} />, label: 'Spa', value: 'spa' }
  ];

  const propertyTypes = [
    'Hôtel', 'Appartement', 'Maison d\'hôtes', 'Resort', 'Auberge', 'Villa'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Prix */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Prix par nuit (€)</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters({
              ...filters,
              priceRange: [0, Number(e.target.value)]
            })}
            className="w-full"
          />
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]]
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)]
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Étoiles */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Nombre d'étoiles</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(star => (
            <label key={star} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.stars.includes(star)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      stars: [...filters.stars, star]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      stars: filters.stars.filter((s: number) => s !== star)
                    });
                  }
                }}
                className="mr-2"
              />
              <div className="flex items-center">
                {[...Array(star)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Équipements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Équipements</h3>
        <div className="space-y-2">
          {amenities.map((amenity) => (
            <label key={amenity.value} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      amenities: [...filters.amenities, amenity.value]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      amenities: filters.amenities.filter((a: string) => a !== amenity.value)
                    });
                  }
                }}
                className="mr-2"
              />
              <span className="mr-2">{amenity.icon}</span>
              {amenity.label}
            </label>
          ))}
        </div>
      </div>

      {/* Type de propriété */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Type de propriété</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      propertyTypes: [...filters.propertyTypes, type]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      propertyTypes: filters.propertyTypes.filter((t: string) => t !== type)
                    });
                  }
                }}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Note client */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Note client minimum</h3>
        <div className="space-y-2">
          {[
            { label: '9+ Excellent', value: 9 },
            { label: '8+ Très bien', value: 8 },
            { label: '7+ Bien', value: 7 },
            { label: '6+ Correct', value: 6 }
          ].map((rating) => (
            <label key={rating.value} className="flex items-center">
              <input
                type="radio"
                name="guestRating"
                checked={filters.guestRating === rating.value}
                onChange={() => setFilters({
                  ...filters,
                  guestRating: rating.value
                })}
                className="mr-2"
              />
              {rating.label}
            </label>
          ))}
        </div>
      </div>

      {/* Quartiers */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quartiers</h3>
        <div className="space-y-2">
          {[
            'Centre-ville', 'Quartier des affaires', 'Près de l\'aéroport', 
            'Front de mer', 'Quartier historique', 'Zone commerciale'
          ].map((district) => (
            <label key={district} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.districts.includes(district)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      districts: [...filters.districts, district]
                    });
                  } else {
                    setFilters({
                      ...filters,
                      districts: filters.districts.filter((d: string) => d !== district)
                    });
                  }
                }}
                className="mr-2"
              />
              {district}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;