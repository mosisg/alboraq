import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ArrowRightLeft, Search, MapPin, Filter } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Flights: React.FC = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<'round-trip' | 'one-way' | 'multi-city'>('round-trip');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [cabinClass, setCabinClass] = useState('economy');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchParams = {
      from: formData.get('departure'),
      to: formData.get('destination'),
      departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
      passengers: passengers.adults + passengers.children + passengers.infants,
      cabinClass,
      tripType
    };
    
    navigate('/flight-results', { state: searchParams });
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trouvez votre vol idéal
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Comparez des millions de vols et économisez jusqu'à 70%
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Trip Type Selector */}
          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={tripType === 'round-trip'}
                onChange={(e) => setTripType(e.target.value as any)}
                className="mr-2"
              />
              <span className="font-medium">Aller-retour</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={tripType === 'one-way'}
                onChange={(e) => setTripType(e.target.value as any)}
                className="mr-2"
              />
              <span className="font-medium">Aller simple</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tripType"
                value="multi-city"
                checked={tripType === 'multi-city'}
                onChange={(e) => setTripType(e.target.value as any)}
                className="mr-2"
              />
              <span className="font-medium">Multi-destinations</span>
            </label>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Départ de
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="departure"
                    placeholder="Ville ou aéroport de départ"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Ville ou aéroport de destination"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <DatePicker
                    selected={departureDate}
                    onChange={(date: Date) => setDepartureDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    locale={fr}
                    placeholderText="Sélectionner une date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {tripType === 'round-trip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de retour
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <DatePicker
                      selected={returnDate}
                      onChange={(date: Date) => setReturnDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={departureDate || new Date()}
                      locale={fr}
                      placeholderText="Sélectionner une date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Passengers and Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <button
                    type="button"
                    onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {totalPassengers} voyageur{totalPassengers > 1 ? 's' : ''}
                  </button>
                  
                  {showPassengersDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                      <PassengerSelector
                        type="adults"
                        label="Adultes"
                        value={passengers.adults}
                        onChange={(type, operation) => {
                          setPassengers(prev => ({
                            ...prev,
                            [type]: operation === 'add' ? prev[type] + 1 : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
                          }));
                        }}
                      />
                      <PassengerSelector
                        type="children"
                        label="Enfants (2-11 ans)"
                        value={passengers.children}
                        onChange={(type, operation) => {
                          setPassengers(prev => ({
                            ...prev,
                            [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
                          }));
                        }}
                      />
                      <PassengerSelector
                        type="infants"
                        label="Bébés (0-2 ans)"
                        value={passengers.infants}
                        onChange={(type, operation) => {
                          setPassengers(prev => ({
                            ...prev,
                            [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Classe
                </label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="economy">Économique</option>
                  <option value="premium">Premium</option>
                  <option value="business">Affaires</option>
                  <option value="first">Première</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center"
              >
                <Search className="mr-2" size={20} />
                Rechercher des vols
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Destinations populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{dest.name}</h3>
                <p className="text-gray-600 text-sm">{dest.country}</p>
                <p className="text-blue-600 font-bold mt-2">À partir de {dest.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PassengerSelectorProps {
  type: 'adults' | 'children' | 'infants';
  label: string;
  value: number;
  onChange: (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ type, label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{label}</span>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onChange(type, 'subtract')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          disabled={type === 'adults' ? value <= 1 : value <= 0}
        >
          -
        </button>
        <span className="w-8 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(type, 'add')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

const popularDestinations = [
  { id: 1, name: 'Paris', country: 'France', price: 89, image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg' },
  { id: 2, name: 'Londres', country: 'Royaume-Uni', price: 125, image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg' },
  { id: 3, name: 'Rome', country: 'Italie', price: 156, image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg' },
  { id: 4, name: 'Barcelone', country: 'Espagne', price: 98, image: 'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg' },
  { id: 5, name: 'Amsterdam', country: 'Pays-Bas', price: 134, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' },
  { id: 6, name: 'Berlin', country: 'Allemagne', price: 112, image: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg' },
  { id: 7, name: 'Madrid', country: 'Espagne', price: 87, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' },
  { id: 8, name: 'Lisbonne', country: 'Portugal', price: 145, image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg' }
];

export default Flights;