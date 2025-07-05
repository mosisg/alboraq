import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Building, Calendar, Users, ArrowRightLeft, Search, MapPin, Sparkles, TrendingUp } from 'lucide-react';
import SearchForm from './SearchForm';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'combined'>('flights');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const backgroundImages = [
    'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg',
    'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg',
    'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (searchData: any, type: string) => {
    if (type === 'flights') {
      navigate('/flight-results', { state: searchData });
    } else if (type === 'hotels') {
      navigate('/hotel-results', { state: searchData });
    }
  };

  return (
    <section className="relative flex items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] px-4 py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Background avec transition */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-blue-800/70"></div>
        
        {/* Éléments décoratifs flottants */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl floating-animation"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center px-4">
        {/* Badge de promotion */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium mb-6 animate-pulse">
          <Sparkles className="mr-2" size={16} />
          Offres limitées - Jusqu'à 70% de réduction
          <TrendingUp className="ml-2" size={16} />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
          <span className="block">Partez l'esprit</span>
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            léger
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-8 sm:mb-12 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
          Découvrez le monde avec nos offres exclusives et notre service premium
        </p>

        {/* Statistiques impressionnantes */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 sm:mb-12">
          <StatCard number="2M+" label="Destinations" />
          <StatCard number="50K+" label="Hôtels partenaires" />
          <StatCard number="1M+" label="Voyageurs satisfaits" />
        </div>

        <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          {/* Onglets de recherche améliorés */}
          <div className="flex overflow-x-auto sm:overflow-visible border-b border-white/20">
            <SearchTab
              active={activeTab === 'flights'}
              onClick={() => setActiveTab('flights')}
              icon={<Plane size={20} />}
              label="Vols"
              description="Comparez les prix"
            />
            
            <SearchTab
              active={activeTab === 'hotels'}
              onClick={() => setActiveTab('hotels')}
              icon={<Building size={20} />}
              label="Hôtels"
              description="Meilleurs tarifs"
            />
            
            <SearchTab
              active={activeTab === 'combined'}
              onClick={() => setActiveTab('combined')}
              icon={<ArrowRightLeft size={20} />}
              label="Vol + Hôtel"
              description="Économisez plus"
              badge="Populaire"
            />
          </div>

          {/* Formulaires de recherche */}
          <div className="p-6 sm:p-8">
            {activeTab === 'flights' && (
              <SearchForm 
                type="flights"
                onSearch={handleSearch}
                fields={[
                  { 
                    id: 'departure', 
                    label: 'Départ de', 
                    type: 'text', 
                    placeholder: 'Ville ou aéroport',
                    icon: <MapPin size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'destination', 
                    label: 'Destination', 
                    type: 'text', 
                    placeholder: 'Ville ou aéroport',
                    icon: <MapPin size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'dates', 
                    label: 'Dates', 
                    type: 'text', 
                    placeholder: 'Aller - Retour',
                    icon: <Calendar size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'passengers', 
                    label: 'Voyageurs', 
                    type: 'text', 
                    placeholder: '1 adulte',
                    icon: <Users size={18} className="text-gray-400" />
                  }
                ]}
                buttonText="Rechercher des vols"
                buttonIcon={<Search size={20} />}
              />
            )}

            {activeTab === 'hotels' && (
              <SearchForm 
                type="hotels"
                onSearch={handleSearch}
                fields={[
                  { 
                    id: 'destination', 
                    label: 'Destination', 
                    type: 'text', 
                    placeholder: 'Ville ou hôtel',
                    icon: <MapPin size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'dates', 
                    label: 'Dates', 
                    type: 'text', 
                    placeholder: 'Arrivée - Départ',
                    icon: <Calendar size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'rooms', 
                    label: 'Chambres', 
                    type: 'text', 
                    placeholder: '1 chambre, 2 adultes',
                    icon: <Users size={18} className="text-gray-400" />
                  }
                ]}
                buttonText="Trouver un hôtel"
                buttonIcon={<Search size={20} />}
              />
            )}

            {activeTab === 'combined' && (
              <SearchForm 
                type="combined"
                onSearch={handleSearch}
                fields={[
                  { 
                    id: 'departure', 
                    label: 'Départ de', 
                    type: 'text', 
                    placeholder: 'Ville ou aéroport',
                    icon: <MapPin size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'destination', 
                    label: 'Destination', 
                    type: 'text', 
                    placeholder: 'Ville ou région',
                    icon: <MapPin size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'dates', 
                    label: 'Dates', 
                    type: 'text', 
                    placeholder: 'Départ - Retour',
                    icon: <Calendar size={18} className="text-gray-400" />
                  },
                  { 
                    id: 'travelers', 
                    label: 'Voyageurs', 
                    type: 'text', 
                    placeholder: '2 adultes, 1 chambre',
                    icon: <Users size={18} className="text-gray-400" />
                  }
                ]}
                buttonText="Rechercher le package"
                buttonIcon={<Search size={20} />}
              />
            )}
          </div>
        </div>

        {/* Boutons d'action améliorés */}
        <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-3 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={() => navigate('/offers')}
            className="btn-secondary w-full sm:w-auto px-8 py-4 text-lg font-semibold"
          >
            <Sparkles className="mr-2" size={20} />
            Découvrir les offres
          </button>
          <button 
            onClick={() => navigate('/destinations')}
            className="btn-primary w-full sm:w-auto px-8 py-4 text-lg font-semibold"
          >
            <TrendingUp className="mr-2" size={20} />
            Destinations tendances
          </button>
        </div>
      </div>
    </section>
  );
};

interface SearchTabProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
  badge?: string;
}

const SearchTab: React.FC<SearchTabProps> = ({ active, onClick, icon, label, description, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex-none sm:flex-1 py-4 px-6 text-center font-medium border-b-2 whitespace-nowrap transition-all duration-300 ${
        active 
          ? 'text-blue-600 border-blue-600 bg-blue-50/50' 
          : 'text-gray-600 border-transparent hover:text-blue-500 hover:bg-blue-50/30'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-1">
          {icon}
          <span className="ml-2 font-semibold">{label}</span>
          {badge && (
            <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">{description}</span>
      </div>
    </button>
  );
};

const StatCard: React.FC<{ number: string; label: string }> = ({ number, label }) => {
  return (
    <div className="glass-effect px-6 py-3 rounded-2xl">
      <div className="text-2xl font-bold text-white">{number}</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
};

export default Hero;