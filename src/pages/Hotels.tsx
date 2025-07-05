import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Calendar, Users, Search, MapPin, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Hotels: React.FC = () => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchParams = {
      destination: formData.get('destination'),
      checkIn: checkInDate ? format(checkInDate, 'yyyy-MM-dd') : '',
      checkOut: checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '',
      rooms,
      adults: guests.adults,
      children: guests.children
    };
    
    navigate('/hotel-results', { state: searchParams });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trouvez l'hôtel parfait
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Plus de 2 millions d'hébergements dans le monde entier
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="destination"
                  placeholder="Ville, région, hôtel ou point d'intérêt"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'arrivée
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date: Date) => setCheckInDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    locale={fr}
                    placeholderText="Sélectionner une date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de départ
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date: Date) => setCheckOutDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={checkInDate || new Date()}
                    locale={fr}
                    placeholderText="Sélectionner une date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Rooms and Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chambres
                </label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} chambre{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voyageurs
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <button
                    type="button"
                    onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {guests.adults + guests.children} voyageur{guests.adults + guests.children > 1 ? 's' : ''}
                  </button>
                  
                  {showGuestsDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                      <GuestSelector
                        type="adults"
                        label="Adultes"
                        value={guests.adults}
                        onChange={(type, operation) => {
                          setGuests(prev => ({
                            ...prev,
                            [type]: operation === 'add' ? prev[type] + 1 : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
                          }));
                        }}
                      />
                      <GuestSelector
                        type="children"
                        label="Enfants (0-17 ans)"
                        value={guests.children}
                        onChange={(type, operation) => {
                          setGuests(prev => ({
                            ...prev,
                            [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center"
              >
                <Search className="mr-2" size={20} />
                Rechercher des hôtels
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Featured Hotels */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Hôtels recommandés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <div className="flex items-center">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                <div className="flex items-center mb-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                    {hotel.rating}/10
                  </span>
                  <span className="ml-2 text-sm text-gray-600">{hotel.reviews} avis</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">{hotel.price}€</span>
                    <span className="text-gray-500 text-sm ml-1">/ nuit</span>
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Voir l'offre
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface GuestSelectorProps {
  type: 'adults' | 'children';
  label: string;
  value: number;
  onChange: (type: 'adults' | 'children', operation: 'add' | 'subtract') => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ type, label, value, onChange }) => {
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

const featuredHotels = [
  {
    id: 1,
    name: 'Hôtel des Grands Boulevards',
    location: 'Paris, France',
    stars: 4,
    rating: 8.9,
    reviews: 1247,
    price: 189,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
  },
  {
    id: 2,
    name: 'The Savoy',
    location: 'Londres, Royaume-Uni',
    stars: 5,
    rating: 9.2,
    reviews: 2156,
    price: 425,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
  },
  {
    id: 3,
    name: 'Hotel Artemide',
    location: 'Rome, Italie',
    stars: 4,
    rating: 8.7,
    reviews: 987,
    price: 156,
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
  },
  {
    id: 4,
    name: 'Casa Fuster',
    location: 'Barcelone, Espagne',
    stars: 5,
    rating: 9.1,
    reviews: 1543,
    price: 298,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
  },
  {
    id: 5,
    name: 'The Hoxton',
    location: 'Amsterdam, Pays-Bas',
    stars: 4,
    rating: 8.8,
    reviews: 1876,
    price: 167,
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg'
  },
  {
    id: 6,
    name: 'Hotel Adlon Kempinski',
    location: 'Berlin, Allemagne',
    stars: 5,
    rating: 9.3,
    reviews: 2341,
    price: 389,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
  }
];

export default Hotels;