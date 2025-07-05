import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Building, Star, Wifi, Car, Coffee, Dumbbell, MapPin, Filter, SortAsc, Plus, Bell, Map, BarChart3 } from 'lucide-react';
import AdvancedFilters from '../components/AdvancedFilters';
import ComparisonPanel from '../components/ComparisonPanel';
import PriceAlerts from '../components/PriceAlerts';
import FlexibleSearch from '../components/FlexibleSearch';
import InteractiveMap from '../components/InteractiveMap';

interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  amenities: string[];
  description: string;
  distance: string;
}

const HotelResults: React.FC = () => {
  const location = useLocation();
  const searchParams = location.state;
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    stars: [],
    rating: 0,
    amenities: [],
    propertyTypes: [],
    districts: [],
    guestRating: 0
  });

  // États pour les nouvelles fonctionnalités
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [comparisonItems, setComparisonItems] = useState<any[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  const [showFlexibleSearch, setShowFlexibleSearch] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setHotels(mockHotels);
      setLoading(false);
    }, 1500);
  }, []);

  const sortedHotels = [...hotels].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'stars':
        return b.stars - a.stars;
      default:
        return 0;
    }
  });

  const addToComparison = (hotel: Hotel) => {
    if (comparisonItems.length < 4 && !comparisonItems.find(item => item.id === hotel.id)) {
      setComparisonItems([...comparisonItems, { id: hotel.id, type: 'hotel', data: hotel }]);
    }
  };

  const removeFromComparison = (id: string) => {
    setComparisonItems(comparisonItems.filter(item => item.id !== id));
  };

  const mapLocations = hotels.map((hotel, index) => ({
    id: hotel.id,
    name: hotel.name,
    type: 'hotel' as const,
    lat: 48.8566 + (Math.random() - 0.5) * 0.1,
    lng: 2.3522 + (Math.random() - 0.5) * 0.1,
    price: hotel.price,
    rating: hotel.rating,
    image: hotel.image,
    description: hotel.description
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Recherche des meilleurs hôtels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Summary */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Hôtels à {searchParams?.destination}
              </h1>
              <p className="text-gray-600">
                {searchParams?.checkIn} - {searchParams?.checkOut} • {searchParams?.rooms} chambre{searchParams?.rooms > 1 ? 's' : ''} • {searchParams?.adults + searchParams?.children} voyageur{searchParams?.adults + searchParams?.children > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowFlexibleSearch(true)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm"
              >
                <BarChart3 className="inline mr-1" size={16} />
                Dates flexibles
              </button>
              <button
                onClick={() => setShowPriceAlerts(true)}
                className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
              >
                <Bell className="inline mr-1" size={16} />
                Alerte prix
              </button>
              <button
                onClick={() => setShowMap(true)}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors text-sm"
              >
                <Map className="inline mr-1" size={16} />
                Carte
              </button>
              <Link
                to="/hotels"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                Modifier la recherche
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="mr-2" size={20} />
                  Filtres
                </h3>
                <button
                  onClick={() => setShowAdvancedFilters(true)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm"
                >
                  Avancés
                </button>
              </div>
              
              {/* Sort Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="price">Prix (croissant)</option>
                  <option value="rating">Note client</option>
                  <option value="stars">Nombre d'étoiles</option>
                </select>
              </div>

              {/* Stars Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Étoiles
                </label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(star => (
                    <label key={star} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex items-center">
                        {[...Array(star)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note minimum
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="0">Toutes les notes</option>
                  <option value="7">7+ Bien</option>
                  <option value="8">8+ Très bien</option>
                  <option value="9">9+ Excellent</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix par nuit (€)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Wi-Fi gratuit
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Parking
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Piscine
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Salle de sport
                  </label>
                </div>
              </div>
            </div>

            {/* Comparison Panel Toggle */}
            {comparisonItems.length > 0 && (
              <div className="mt-4 bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Comparaison</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                    {comparisonItems.length}
                  </span>
                </div>
                <button
                  onClick={() => setShowComparison(true)}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Comparer
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {hotels.length} hôtels trouvés
              </p>
              <div className="flex items-center space-x-2">
                <SortAsc size={16} />
                <span className="text-sm text-gray-600">Triés par prix</span>
              </div>
            </div>

            <div className="space-y-6">
              {sortedHotels.map((hotel) => (
                <HotelCard 
                  key={hotel.id} 
                  hotel={hotel} 
                  onAddToComparison={addToComparison}
                  isInComparison={comparisonItems.some(item => item.id === hotel.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AdvancedFilters
        type="hotels"
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />

      <ComparisonPanel
        items={comparisonItems}
        onRemoveItem={removeFromComparison}
        onClearAll={() => setComparisonItems([])}
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />

      <PriceAlerts
        isOpen={showPriceAlerts}
        onClose={() => setShowPriceAlerts(false)}
        searchData={{
          type: 'hotel',
          destination: searchParams?.destination,
          currentPrice: sortedHotels[0]?.price
        }}
      />

      <FlexibleSearch
        isOpen={showFlexibleSearch}
        onClose={() => setShowFlexibleSearch(false)}
        onSearch={(data) => console.log('Flexible search:', data)}
        initialData={searchParams}
      />

      <InteractiveMap
        isOpen={showMap}
        onClose={() => setShowMap(false)}
        center={{ lat: 48.8566, lng: 2.3522 }}
        locations={mapLocations}
        onLocationSelect={(location) => {
          console.log('Selected hotel:', location);
          setShowMap(false);
        }}
      />
    </div>
  );
};

interface HotelCardProps {
  hotel: Hotel;
  onAddToComparison: (hotel: Hotel) => void;
  isInComparison: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onAddToComparison, isInComparison }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-48 lg:h-full object-cover"
          />
        </div>
        
        <div className="lg:w-2/3 p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between h-full">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{hotel.location}</span>
                <span className="ml-2 text-sm">• {hotel.distance} du centre</span>
              </div>

              <div className="flex items-center mb-3">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                  {hotel.rating}/10
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {hotel.reviews} avis
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {hotel.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {amenity === 'wifi' && <Wifi size={12} className="mr-1" />}
                    {amenity === 'parking' && <Car size={12} className="mr-1" />}
                    {amenity === 'restaurant' && <Coffee size={12} className="mr-1" />}
                    {amenity === 'gym' && <Dumbbell size={12} className="mr-1" />}
                    <span className="capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:ml-6 text-center lg:text-right">
              <div className="mb-2">
                {hotel.originalPrice && (
                  <span className="text-gray-500 line-through text-sm block">
                    {hotel.originalPrice}€
                  </span>
                )}
                <span className="text-3xl font-bold text-emerald-600">
                  {hotel.price}€
                </span>
                <span className="text-gray-500 text-sm block">par nuit</span>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Taxes et frais inclus
              </div>

              <div className="space-y-2">
                <button className="w-full lg:w-auto bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  Voir les chambres
                </button>
                
                <button
                  onClick={() => onAddToComparison(hotel)}
                  disabled={isInComparison}
                  className={`w-full lg:w-auto px-6 py-2 rounded-lg border transition-colors text-sm ${
                    isInComparison 
                      ? 'border-green-300 text-green-600 bg-green-50' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Plus size={14} className="inline mr-1" />
                  {isInComparison ? 'Ajouté' : 'Comparer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Hôtel des Grands Boulevards',
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    location: '2e arrondissement, Paris',
    stars: 4,
    rating: 8.9,
    reviews: 1247,
    price: 189,
    originalPrice: 220,
    distance: '1.2 km',
    amenities: ['wifi', 'restaurant', 'gym'],
    description: 'Hôtel de charme situé dans le cœur historique de Paris, à proximité des grands magasins et des théâtres.'
  },
  {
    id: '2',
    name: 'Le Marais Boutique Hotel',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    location: '4e arrondissement, Paris',
    stars: 4,
    rating: 9.1,
    reviews: 856,
    price: 245,
    distance: '0.8 km',
    amenities: ['wifi', 'parking', 'restaurant'],
    description: 'Hôtel boutique élégant dans le quartier historique du Marais, alliant charme parisien et confort moderne.'
  },
  {
    id: '3',
    name: 'Hotel Saint-Germain',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    location: '6e arrondissement, Paris',
    stars: 3,
    rating: 8.5,
    reviews: 1543,
    price: 156,
    distance: '2.1 km',
    amenities: ['wifi', 'restaurant'],
    description: 'Hôtel traditionnel parisien dans le quartier de Saint-Germain-des-Prés, proche des cafés et galeries d\'art.'
  },
  {
    id: '4',
    name: 'Luxury Palace Hotel',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    location: '1er arrondissement, Paris',
    stars: 5,
    rating: 9.5,
    reviews: 2341,
    price: 450,
    originalPrice: 520,
    distance: '0.5 km',
    amenities: ['wifi', 'parking', 'restaurant', 'gym'],
    description: 'Palace parisien de luxe offrant un service exceptionnel et des vues imprenables sur la Seine et le Louvre.'
  },
  {
    id: '5',
    name: 'Budget Comfort Inn',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
    location: '11e arrondissement, Paris',
    stars: 2,
    rating: 7.8,
    reviews: 967,
    price: 89,
    distance: '3.5 km',
    amenities: ['wifi'],
    description: 'Hôtel économique et confortable dans le quartier animé de République, idéal pour les voyageurs à petit budget.'
  },
  {
    id: '6',
    name: 'Modern Business Hotel',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    location: '8e arrondissement, Paris',
    stars: 4,
    rating: 8.7,
    reviews: 1876,
    price: 298,
    distance: '1.8 km',
    amenities: ['wifi', 'parking', 'gym'],
    description: 'Hôtel moderne et fonctionnel près des Champs-Élysées, parfait pour les voyages d\'affaires et de loisirs.'
  }
];

export default HotelResults;