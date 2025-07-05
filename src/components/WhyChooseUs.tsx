import React from 'react';
import { Key, Plane, Shield, Headphones, Clock, CreditCard } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: 'Paiement sécurisé',
    description: 'Vos données bancaires sont protégées par un cryptage SSL'
  },
  {
    id: 2,
    icon: <Headphones className="h-8 w-8 text-blue-500" />,
    title: 'Assistance 24/7',
    description: 'Notre équipe est disponible à tout moment pour vous aider'
  },
  {
    id: 3,
    icon: <Plane className="h-8 w-8 text-blue-500" />,
    title: 'Meilleur prix garanti',
    description: 'Nous vous remboursons la différence si vous trouvez moins cher'
  },
  {
    id: 4,
    icon: <Clock className="h-8 w-8 text-blue-500" />,
    title: 'Réservation rapide',
    description: 'Complétez votre réservation en moins de 3 minutes'
  },
  {
    id: 5,
    icon: <Key className="h-8 w-8 text-blue-500" />,
    title: 'Hôtels sélectionnés',
    description: 'Nous vérifions personnellement chaque hébergement'
  },
  {
    id: 6,
    icon: <CreditCard className="h-8 w-8 text-blue-500" />,
    title: 'Annulation gratuite',
    description: 'Modifiez ou annulez votre réservation sans frais'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Pourquoi nous choisir ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des milliers de voyageurs nous font confiance chaque jour pour organiser leur séjour parfait.
            Découvrez pourquoi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:max-w-md">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Prêt à vivre une expérience inoubliable ?
            </h3>
            <p className="text-gray-600">
              Rejoignez notre newsletter et recevez des offres exclusives et des conseils de voyage.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="input-field mb-3 sm:mb-0 sm:mr-3 sm:w-64"
              />
              <button className="btn-primary whitespace-nowrap">
                Je m'inscris
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-blue-900 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export default WhyChooseUs;