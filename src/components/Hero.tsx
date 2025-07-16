import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Car, Calendar, Users, ArrowRightLeft, Search, MapPin, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'cars'>('flights');
  const [tripType, setTripType] = useState('round-trip');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0, class: 'economy' });
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [fromLocation, setFromLocation] = useState('Maroc (MA)');
  const [toLocation, setToLocation] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [nearbyAirports, setNearbyAirports] = useState(false);
  const [directFlights, setDirectFlights] = useState(false);
  
  const navigate = useNavigate();
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const moroccanAirports = [
    { code: 'MA', name: 'Maroc', type: 'country', flag: '🇲🇦' },
    { code: 'CMN', name: 'Casablanca Mohamed V.', city: 'Maroc', type: 'airport' },
    { code: 'RBA', name: 'Rabat', city: 'Maroc', type: 'airport' },
    { code: 'RAK', name: 'Marrakech Menara', city: 'Maroc', type: 'airport' },
    { code: 'TNG', name: 'Tanger-Ibn Battouta', city: 'Maroc', type: 'airport' },
    { code: 'AGA', name: 'Agadir', city: 'Maroc', type: 'airport' },
    { code: 'FEZ', name: 'Fès Saïs', city: 'Maroc', type: 'airport' },
    { code: 'ESU', name: 'Essaouira', city: 'Maroc', type: 'airport' },
    { code: 'NDR', name: 'Nador', city: 'Maroc', type: 'airport' },
    { code: 'VIL', name: 'Dakhla', city: 'Maroc', type: 'airport' }
  ];

  const popularDestinations = [
    { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'France', type: 'airport' },
    { code: 'LHR', name: 'Londres Heathrow', city: 'Royaume-Uni', type: 'airport' },
    { code: 'MAD', name: 'Madrid Barajas', city: 'Espagne', type: 'airport' },
    { code: 'FCO', name: 'Rome Fiumicino', city: 'Italie', type: 'airport' },
    { code: 'IST', name: 'Istanbul', city: 'Turquie', type: 'airport' },
    { code: 'DXB', name: 'Dubaï', city: 'Émirats Arabes Unis', type: 'airport' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const searchData = {
      from: fromLocation,
      to: toLocation,
      departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
      returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
      passengers: passengers.adults + passengers.children + passengers.infants,
      class: passengers.class,
      tripType,
      nearbyAirports,
      directFlights
    };

    if (activeTab === 'flights') {
      navigate('/flight-results', { state: searchData });
    } else if (activeTab === 'hotels') {
      navigate('/hotel-results', { state: searchData });
    }
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const selectLocation = (location: any, type: 'from' | 'to') => {
    const locationText = location.type === 'country' 
      ? `${location.name} (${location.code})`
      : `${location.name} (${location.code})`;
    
    if (type === 'from') {
      setFromLocation(locationText);
      setShowFromDropdown(false);
    } else {
      setToLocation(locationText);
      setShowToDropdown(false);
    }
  };

  return (
    <section className="bg-[#0F1B3D] min-h-[600px] flex flex-col justify-center px-4 py-12">
      <div className="max-w-6xl mx-auto w-full">
        {/* Service Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('flights')}
            className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'flights'
                ? 'bg-[#2979FF] text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Plane className="mr-2" size={16} />
            Vols
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'hotels'
                ? 'bg-[#2979FF] text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Building className="mr-2" size={16} />
            Hôtels
          </button>
          <button
            onClick={() => setActiveTab('cars')}
            className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'cars'
                ? 'bg-[#2979FF] text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            <Car className="mr-2" size={16} />
            Location de voiture
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Des millions de vols pas chers.
          </h1>
          <p className="text-xl text-white/90">
            Une simple recherche.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          {/* Trip Type */}
          <div className="mb-6">
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="bg-transparent border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:border-transparent"
            >
              <option value="round-trip">Aller-retour</option>
              <option value="one-way">Aller simple</option>
              <option value="multi-city">Multi-destinations</option>
            </select>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* From */}
            <div className="relative" ref={fromRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
              <div
                className="relative bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-[#2979FF] focus-within:border-[#2979FF] focus-within:ring-2 focus-within:ring-[#2979FF]/20"
                onClick={() => setShowFromDropdown(!showFromDropdown)}
              >
                <div className="text-gray-900 font-medium">{fromLocation}</div>
                {showFromDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                    {moroccanAirports.map((airport) => (
                      <div
                        key={airport.code}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => selectLocation(airport, 'from')}
                      >
                        {airport.type === 'country' ? (
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{airport.flag}</span>
                            <div>
                              <div className="font-medium">{airport.name} ({airport.code})</div>
                              <div className="text-sm text-gray-600">{airport.name}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Plane className="text-gray-400 mr-3" size={20} />
                            <div>
                              <div className="font-medium">{airport.name} ({airport.code})</div>
                              <div className="text-sm text-gray-600">{airport.city}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center pb-3">
              <button
                onClick={swapLocations}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <ArrowRightLeft size={20} className="text-gray-600" />
              </button>
            </div>

            {/* To */}
            <div className="relative" ref={toRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vers</label>
              <div
                className="relative bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-[#2979FF] focus-within:border-[#2979FF] focus-within:ring-2 focus-within:ring-[#2979FF]/20"
                onClick={() => setShowToDropdown(!showToDropdown)}
              >
                <div className={`${toLocation ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {toLocation || 'Pays, ville ou aéroport'}
                </div>
                {showToDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                    {popularDestinations.map((airport) => (
                      <div
                        key={airport.code}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => selectLocation(airport, 'to')}
                      >
                        <Plane className="text-gray-400 mr-3" size={20} />
                        <div>
                          <div className="font-medium">{airport.name} ({airport.code})</div>
                          <div className="text-sm text-gray-600">{airport.city}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
              <div className="relative">
                <DatePicker
                  selected={departureDate}
                  onChange={(date: Date) => setDepartureDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  locale={fr}
                  placeholderText="Ajouter une date"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Retour</label>
              <div className="relative">
                <DatePicker
                  selected={returnDate}
                  onChange={(date: Date) => setReturnDate(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={departureDate || new Date()}
                  locale={fr}
                  placeholderText="Ajouter une date"
                  disabled={tripType === 'one-way'}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:border-transparent disabled:bg-gray-100"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          {/* Passengers and Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Voyageurs et classe</label>
              <div
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-[#2979FF] focus-within:border-[#2979FF] focus-within:ring-2 focus-within:ring-[#2979FF]/20"
                onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">
                    {passengers.adults + passengers.children + passengers.infants} Adulte{passengers.adults > 1 ? 's' : ''}, {passengers.class === 'economy' ? 'Économie' : passengers.class}
                  </span>
                  <Users size={20} className="text-gray-400" />
                </div>
              </div>

              {showPassengersDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Adultes</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{passengers.adults}</span>
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Enfants</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{passengers.children}</span>
                        <button
                          onClick={() => setPassengers(prev => ({ ...prev, children: prev.children + 1 }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
                      <select
                        value={passengers.class}
                        onChange={(e) => setPassengers(prev => ({ ...prev, class: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="economy">Économie</option>
                        <option value="premium">Premium</option>
                        <option value="business">Affaires</option>
                        <option value="first">Première</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setShowPassengersDropdown(false)}
                      className="w-full bg-[#2979FF] text-white py-2 rounded-lg hover:bg-[#1e5bb8] transition-colors"
                    >
                      Terminé
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={nearbyAirports}
                onChange={(e) => setNearbyAirports(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-[#2979FF] focus:ring-[#2979FF]"
              />
              <span className="text-sm text-gray-700">Ajouter des aéroports à proximité</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={directFlights}
                onChange={(e) => setDirectFlights(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-[#2979FF] focus:ring-[#2979FF]"
              />
              <span className="text-sm text-gray-700">Vols directs</span>
            </label>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-[#2979FF] hover:bg-[#1e5bb8] text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center"
            >
              <Search className="mr-2" size={20} />
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;