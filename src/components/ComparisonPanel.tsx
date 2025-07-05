import React, { useState } from 'react';
import { X, Star, Plane, Clock, Wifi, Car, Coffee, Plus, Minus } from 'lucide-react';

interface ComparisonItem {
  id: string;
  type: 'flight' | 'hotel';
  data: any;
}

interface ComparisonPanelProps {
  items: ComparisonItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  items,
  onRemoveItem,
  onClearAll,
  isOpen,
  onClose
}) => {
  if (!isOpen || items.length === 0) return null;

  const flightItems = items.filter(item => item.type === 'flight');
  const hotelItems = items.filter(item => item.type === 'hotel');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-4">Comparaison</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {items.length} élément{items.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClearAll}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Tout effacer
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {flightItems.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Vols ({flightItems.length})</h3>
              <FlightComparison items={flightItems} onRemoveItem={onRemoveItem} />
            </div>
          )}

          {hotelItems.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Hôtels ({hotelItems.length})</h3>
              <HotelComparison items={hotelItems} onRemoveItem={onRemoveItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FlightComparison: React.FC<{ items: ComparisonItem[]; onRemoveItem: (id: string) => void }> = ({
  items,
  onRemoveItem
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 font-medium text-gray-600">Critère</th>
            {items.map((item) => (
              <th key={item.id} className="text-center p-4 min-w-64">
                <div className="relative">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                  <div className="font-semibold text-lg">{item.data.airline}</div>
                  <div className="text-sm text-gray-600">
                    {item.data.departure.code} → {item.data.arrival.code}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Prix</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <span className="text-2xl font-bold text-blue-600">{item.data.price}€</span>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Durée</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">{item.data.duration}</td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Escales</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                {item.data.stops === 0 ? 'Direct' : `${item.data.stops} escale${item.data.stops > 1 ? 's' : ''}`}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Départ</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <div className="font-semibold">{item.data.departure.time}</div>
                <div className="text-sm text-gray-600">{item.data.departure.airport}</div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Arrivée</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <div className="font-semibold">{item.data.arrival.time}</div>
                <div className="text-sm text-gray-600">{item.data.arrival.airport}</div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Classe</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">{item.data.cabinClass}</td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Services</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <div className="flex justify-center space-x-2">
                  {item.data.amenities.map((amenity: string, index: number) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium">Action</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Sélectionner
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const HotelComparison: React.FC<{ items: ComparisonItem[]; onRemoveItem: (id: string) => void }> = ({
  items,
  onRemoveItem
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 font-medium text-gray-600">Critère</th>
            {items.map((item) => (
              <th key={item.id} className="text-center p-4 min-w-64">
                <div className="relative">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={12} />
                  </button>
                  <img 
                    src={item.data.image} 
                    alt={item.data.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <div className="font-semibold text-lg">{item.data.name}</div>
                  <div className="text-sm text-gray-600">{item.data.location}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Prix par nuit</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <span className="text-2xl font-bold text-emerald-600">{item.data.price}€</span>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Étoiles</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <div className="flex justify-center">
                  {[...Array(item.data.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Note client</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded inline-block">
                  {item.data.rating}/10
                </div>
                <div className="text-xs text-gray-600 mt-1">{item.data.reviews} avis</div>
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Distance du centre</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">{item.data.distance}</td>
            ))}
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium">Équipements</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <div className="flex flex-wrap justify-center gap-1">
                  {item.data.amenities.map((amenity: string, index: number) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 font-medium">Action</td>
            {items.map((item) => (
              <td key={item.id} className="p-4 text-center">
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Voir les chambres
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonPanel;