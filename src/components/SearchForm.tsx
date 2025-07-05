import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronDown, Plus, Minus, Loader2 } from 'lucide-react';

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
}

interface SearchFormProps {
  type: 'flights' | 'hotels' | 'combined';
  fields: Field[];
  buttonText: string;
  buttonIcon: React.ReactNode;
  onSearch: (data: any, type: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ type, fields, buttonText, buttonIcon, onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [showPassengersDropdown, setShowPassengersDropdown] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      if (type === 'flights') {
        const searchData = {
          from: formData.get('departure') as string,
          to: formData.get('destination') as string,
          departureDate: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
          returnDate: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
          passengers: passengers.adults + passengers.children + passengers.infants,
          adults: passengers.adults,
          children: passengers.children,
          infants: passengers.infants,
          flexible: flexibleDates
        };
        
        if (!searchData.from || !searchData.to || !searchData.departureDate) {
          throw new Error('Veuillez remplir tous les champs requis');
        }
        
        // Simulation d'un délai de recherche
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSearch(searchData, 'flights');
      } else if (type === 'hotels') {
        const searchData = {
          destination: formData.get('destination') as string,
          checkIn: departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
          checkOut: returnDate ? format(returnDate, 'yyyy-MM-dd') : '',
          rooms: 1,
          adults: passengers.adults,
          children: passengers.children,
          flexible: flexibleDates
        };
        
        if (!searchData.destination || !searchData.checkIn || !searchData.checkOut) {
          throw new Error('Veuillez remplir tous les champs requis');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        onSearch(searchData, 'hotels');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handlePassengerChange = (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => {
    setPassengers(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
    }));
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields.map((field) => {
          if (field.id === 'dates') {
            return (
              <div key={field.id} className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <DatePicker
                      selected={departureDate}
                      onChange={(date: Date) => setDepartureDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      locale={fr}
                      placeholderText={type === 'hotels' ? 'Arrivée' : 'Départ'}
                      className="input-field pl-10 w-full text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                  </div>
                  <div className="relative">
                    <DatePicker
                      selected={returnDate}
                      onChange={(date: Date) => setReturnDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={departureDate || new Date()}
                      locale={fr}
                      placeholderText={type === 'hotels' ? 'Départ' : 'Retour'}
                      className="input-field pl-10 w-full text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (field.id === 'passengers' || field.id === 'rooms' || field.id === 'travelers') {
            return (
              <div key={field.id} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="input-field pl-10 pr-10 w-full text-left text-sm sm:text-base flex items-center justify-between"
                    onClick={() => setShowPassengersDropdown(!showPassengersDropdown)}
                  >
                    <span>{totalPassengers} voyageur{totalPassengers > 1 ? 's' : ''}</span>
                    <ChevronDown size={16} className={`transition-transform ${showPassengersDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </div>
                  
                  {showPassengersDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 animate-in slide-in-from-top-2 duration-200">
                      <PassengerSelector
                        type="adults"
                        label="Adultes"
                        subtitle="18 ans et plus"
                        value={passengers.adults}
                        onChange={handlePassengerChange}
                        min={1}
                      />
                      <PassengerSelector
                        type="children"
                        label="Enfants"
                        subtitle="2-17 ans"
                        value={passengers.children}
                        onChange={handlePassengerChange}
                      />
                      {type === 'flights' && (
                        <PassengerSelector
                          type="infants"
                          label="Bébés"
                          subtitle="0-2 ans"
                          value={passengers.infants}
                          onChange={handlePassengerChange}
                        />
                      )}
                      <div className="pt-3 border-t border-gray-200 mt-3">
                        <button
                          type="button"
                          onClick={() => setShowPassengersDropdown(false)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Confirmer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={field.id} className="relative">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  className="input-field pl-10 w-full text-sm sm:text-base"
                  placeholder={field.placeholder}
                  required
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Options avancées */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={flexibleDates}
            onChange={(e) => setFlexibleDates(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
          />
          <span className="ml-2 text-sm text-gray-700">Dates flexibles (±3 jours)</span>
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-700">Vol direct uniquement</span>
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            {error}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full sm:w-auto px-8 py-4 text-lg font-semibold flex items-center justify-center min-w-[200px] ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={20} />
              <span>Recherche en cours...</span>
            </>
          ) : (
            <>
              {buttonIcon}
              <span className="ml-2">{buttonText}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

interface PassengerSelectorProps {
  type: 'adults' | 'children' | 'infants';
  label: string;
  subtitle: string;
  value: number;
  onChange: (type: 'adults' | 'children' | 'infants', operation: 'add' | 'subtract') => void;
  min?: number;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ 
  type, label, subtitle, value, onChange, min = 0 
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onChange(type, 'subtract')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={value <= min}
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(type, 'add')}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default SearchForm;