import React, { useState } from 'react';
import { Bell, X, TrendingDown, TrendingUp, Mail, Smartphone } from 'lucide-react';

interface PriceAlert {
  id: string;
  type: 'flight' | 'hotel';
  route?: string;
  destination?: string;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
  notificationMethod: 'email' | 'sms' | 'both';
}

interface PriceAlertsProps {
  isOpen: boolean;
  onClose: () => void;
  searchData?: any;
}

const PriceAlerts: React.FC<PriceAlertsProps> = ({ isOpen, onClose, searchData }) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      type: 'flight',
      route: 'Paris → Londres',
      targetPrice: 150,
      currentPrice: 189,
      isActive: true,
      createdAt: '2024-01-15',
      notificationMethod: 'email'
    },
    {
      id: '2',
      type: 'hotel',
      destination: 'Rome',
      targetPrice: 120,
      currentPrice: 156,
      isActive: true,
      createdAt: '2024-01-10',
      notificationMethod: 'both'
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    targetPrice: '',
    notificationMethod: 'email' as 'email' | 'sms' | 'both'
  });

  const handleCreateAlert = () => {
    if (!newAlert.targetPrice || !searchData) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      type: searchData.type || 'flight',
      route: searchData.type === 'flight' ? `${searchData.from} → ${searchData.to}` : undefined,
      destination: searchData.type === 'hotel' ? searchData.destination : undefined,
      targetPrice: Number(newAlert.targetPrice),
      currentPrice: searchData.currentPrice || 200,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      notificationMethod: newAlert.notificationMethod
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ targetPrice: '', notificationMethod: 'email' });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center">
            <Bell className="mr-2" size={24} />
            Alertes de prix
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Créer une nouvelle alerte */}
          {searchData && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Créer une alerte pour cette recherche</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix cible (€)
                  </label>
                  <input
                    type="number"
                    value={newAlert.targetPrice}
                    onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                    placeholder="Ex: 150"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification par
                  </label>
                  <select
                    value={newAlert.notificationMethod}
                    onChange={(e) => setNewAlert({ 
                      ...newAlert, 
                      notificationMethod: e.target.value as 'email' | 'sms' | 'both' 
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="both">Email + SMS</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleCreateAlert}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Créer l'alerte
                  </button>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <strong>Recherche :</strong> {' '}
                  {searchData.type === 'flight' 
                    ? `${searchData.from} → ${searchData.to}` 
                    : searchData.destination
                  }
                </p>
                <p>Vous serez notifié(e) dès que le prix descend en dessous de votre prix cible.</p>
              </div>
            </div>
          )}

          {/* Liste des alertes existantes */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mes alertes actives ({alerts.filter(a => a.isActive).length})</h3>
            
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell size={48} className="mx-auto mb-4 opacity-50" />
                <p>Aucune alerte configurée</p>
                <p className="text-sm">Créez votre première alerte pour être notifié des baisses de prix</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${alert.isActive ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-lg">
                            {alert.route || alert.destination}
                          </span>
                          <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                            alert.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {alert.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Prix cible :</span>
                            <span className="ml-2 font-semibold text-blue-600">{alert.targetPrice}€</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Prix actuel :</span>
                            <span className="ml-2 font-semibold">{alert.currentPrice}€</span>
                            {alert.currentPrice > alert.targetPrice ? (
                              <TrendingUp className="inline ml-1 text-red-500" size={16} />
                            ) : (
                              <TrendingDown className="inline ml-1 text-green-500" size={16} />
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-600">Notification :</span>
                            <div className="ml-2 flex items-center space-x-1">
                              {(alert.notificationMethod === 'email' || alert.notificationMethod === 'both') && (
                                <Mail size={14} className="text-blue-500" />
                              )}
                              {(alert.notificationMethod === 'sms' || alert.notificationMethod === 'both') && (
                                <Smartphone size={14} className="text-green-500" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          Créée le {new Date(alert.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => toggleAlert(alert.id)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            alert.isActive 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {alert.isActive ? 'Suspendre' : 'Activer'}
                        </button>
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informations sur les alertes */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-3">Comment fonctionnent les alertes de prix ?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Nous surveillons les prix 24h/24 pour vos recherches</li>
              <li>• Vous recevez une notification dès que le prix descend en dessous de votre prix cible</li>
              <li>• Les alertes restent actives pendant 90 jours</li>
              <li>• Vous pouvez suspendre ou supprimer vos alertes à tout moment</li>
              <li>• Maximum 10 alertes actives par compte</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceAlerts;