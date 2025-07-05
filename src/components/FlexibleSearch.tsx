import React, { useState } from 'react';
import { Calendar, MapPin, TrendingDown, ArrowRight } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

interface FlexibleSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchData: any) => void;
  initialData?: any;
}

const FlexibleSearch: React.FC<FlexibleSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  initialData
}) => {
  const [searchType, setSearchType] = useState<'dates' | 'destinations'>('dates');
  const [flexibleDates, setFlexibleDates] = useState({
    month: new Date(),
    duration: 7,
    flexibility: 3
  });
  const [nearbyDestinations, setNearbyDestinations] = useState({
    origin: initialData?.from || '',
    radius: 250,
    budget: 500
  });

  const generateFlexibleDates = () => {
    const startDate = startOfMonth(flexibleDates.month);
    const endDate = endOfMonth(flexibleDates.month);
    const dates = [];
    
    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
      const returnDate = addDays(d, flexibleDates.duration);
      dates.push({
        departure: d,
        return: returnDate,
        price: Math.floor(Math.random() * 300) + 150 // Prix simulé
      });
    }
    
    return dates.sort((a, b) => a.price - b.price).slice(0, 15);
  };

  const nearbyDestinationsData = [
    { city: 'Londres', country: 'Royaume-Uni', price: 125, distance: 344, image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg' },
    { city: 'Amsterdam', country: 'Pays-Bas', price: 134, distance: 430, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' },
    { city: 'Barcelone', country: 'Espagne', price: 98, distance: 831, image: 'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg' },
    { city: 'Rome', country: 'Italie', price: 156, distance: 1105, image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg' },
    { city: 'Berlin', country: 'Allemagne', price: 112, distance: 878, image: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg' },
    { city: 'Madrid', country: 'Espagne', price: 87, distance: 1053, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' }
  ].filter(dest => dest.distance <= nearbyDestinations.radius && dest.price <= nearbyDestinations.budget);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recherche flexible</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            ×
          </button>
        </div>

        <div className="p-6">
          {/* Type de recherche flexible */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSearchType('dates')}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                searchType === 'dates' 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="mr-2" size={20} />
              Dates flexibles
            </button>
            <button
              onClick={() => setSearchType('destinations')}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                searchType === 'destinations' 
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MapPin className="mr-2" size={20} />
              Destinations proches
            </button>
          </div>

          {searchType === 'dates' ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Trouvez les meilleurs prix sur le mois</h3>
              
              {/* Contrôles de recherche flexible */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mois de voyage
                  </label>
                  <DatePicker
                    selected={flexibleDates.month}
                    onChange={(date: Date) => setFlexibleDates({ ...flexibleDates, month: date })}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    locale={fr}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée du séjour
                  </label>
                  <select
                    value={flexibleDates.duration}
                    onChange={(e) => setFlexibleDates({ ...flexibleDates, duration: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value={3}>3 jours</option>
                    <option value={7}>1 semaine</option>
                    <option value={14}>2 semaines</option>
                    <option value={21}>3 semaines</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flexibilité
                  </label>
                  <select
                    value={flexibleDates.flexibility}
                    onChange={(e) => setFlexibleDates({ ...flexibleDates, flexibility: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value={1}>± 1 jour</option>
                    <option value={3}>± 3 jours</option>
                    <option value={7}>± 1 semaine</option>
                  </select>
                </div>
              </div>

              {/* Calendrier des prix */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Meilleurs prix pour {format(flexibleDates.month, 'MMMM yyyy', { locale: fr })}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {generateFlexibleDates().map((dateOption, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 border hover:border-blue-300 cursor-pointer transition-colors"
                      onClick={() => {
                        onSearch({
                          ...initialData,
                          departureDate: format(dateOption.departure, 'yyyy-MM-dd'),
                          returnDate: format(dateOption.return, 'yyyy-MM-dd'),
                          flexible: true
                        });
                        onClose();
                      }}
                    >
                      <div className="text-center">
                        <div className="text-sm text-gray-600">
                          {format(dateOption.departure, 'dd MMM', { locale: fr })}
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {flexibleDates.duration} jours
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {dateOption.price}€
                        </div>
                        {index < 3 && (
                          <div className="text-xs text-green-600 mt-1 flex items-center justify-center">
                            <TrendingDown size={12} className="mr-1" />
                            Meilleur prix
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4">Explorez les destinations proches</h3>
              
              {/* Contrôles de recherche de destinations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rayon de recherche
                  </label>
                  <select
                    value={nearbyDestinations.radius}
                    onChange={(e) => setNearbyDestinations({ ...nearbyDestinations, radius: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value={250}>250 km</option>
                    <option value={500}>500 km</option>
                    <option value={1000}>1000 km</option>
                    <option value={2000}>2000 km</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget maximum
                  </label>
                  <select
                    value={nearbyDestinations.budget}
                    onChange={(e) => setNearbyDestinations({ ...nearbyDestinations, budget: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value={200}>200€</option>
                    <option value={500}>500€</option>
                    <option value={1000}>1000€</option>
                    <option value={2000}>2000€</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville de départ
                  </label>
                  <input
                    type="text"
                    value={nearbyDestinations.origin}
                    onChange={(e) => setNearbyDestinations({ ...nearbyDestinations, origin: e.target.value })}
                    placeholder="Paris"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Destinations suggérées */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyDestinationsData.map((destination, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      onSearch({
                        ...initialData,
                        to: destination.city,
                        flexible: true
                      });
                      onClose();
                    }}
                  >
                    <img 
                      src={destination.image} 
                      alt={destination.city}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{destination.city}</h4>
                          <p className="text-gray-600 text-sm">{destination.country}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">{destination.price}€</div>
                          <div className="text-xs text-gray-500">aller-retour</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{destination.distance} km</span>
                        <div className="flex items-center">
                          <span>Voir les vols</span>
                          <ArrowRight size={14} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {nearbyDestinationsData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aucune destination trouvée avec ces critères</p>
                  <p className="text-sm">Essayez d'augmenter le rayon de recherche ou le budget</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlexibleSearch;