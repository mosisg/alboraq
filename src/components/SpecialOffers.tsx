import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

interface Offer {
  id: number;
  destination: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  duration: string;
}

const offers: Offer[] = [
  {
    id: 1,
    destination: 'Paris, France',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
    oldPrice: 800,
    newPrice: 650,
    discount: 20,
    duration: '3 nuits'
  },
  {
    id: 2,
    destination: 'Bali, Indonésie',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg',
    oldPrice: 1400,
    newPrice: 1050,
    discount: 25,
    duration: '7 nuits'
  },
  {
    id: 3,
    destination: 'New York, États-Unis',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    oldPrice: 1200,
    newPrice: 950,
    discount: 20,
    duration: '5 nuits'
  },
  {
    id: 4,
    destination: 'Barcelone, Espagne',
    image: 'https://images.pexels.com/photos/175773/pexels-photo-175773.jpeg',
    oldPrice: 950,
    newPrice: 750,
    discount: 20,
    duration: '4 nuits'
  }
];

const SpecialOffers: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center text-green-500 font-medium mb-2">
              <Tag size={18} className="mr-2" />
              <span>OFFRES SPÉCIALES</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-900">Promotions exclusives</h2>
            <p className="text-gray-600 mt-2">Économisez jusqu'à 25% sur ces destinations</p>
          </div>
          <a href="#" className="hidden md:flex items-center text-blue-500 hover:text-blue-700 transition-colors">
            <span className="mr-1">Voir toutes les offres</span>
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
            <span className="mr-1">Voir toutes les offres</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  return (
    <div className="card card-hover group">
      <div className="relative">
        <img 
          src={offer.image} 
          alt={offer.destination} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
          -{offer.discount}%
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-900 mb-2">{offer.destination}</h3>
        <p className="text-gray-600 text-sm mb-3">{offer.duration} • Vol + Hôtel</p>
        <div className="flex items-baseline">
          <span className="text-gray-500 line-through text-sm mr-2">{offer.oldPrice}€</span>
          <span className="text-2xl font-bold text-blue-500">{offer.newPrice}€</span>
          <span className="text-gray-500 text-sm ml-1">/ personne</span>
        </div>
        <button className="mt-4 w-full py-2 border border-blue-500 text-blue-500 rounded-lg font-medium transition-colors hover:bg-blue-50">
          Voir l'offre
        </button>
      </div>
    </div>
  );
};

export default SpecialOffers;