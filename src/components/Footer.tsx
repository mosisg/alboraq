import React from 'react';
import { 
  Plane, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  CreditCard, 
  Shield,
  Award,
  Users,
  MapPin,
  Clock
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-16 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 relative">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative">
                <Plane className="h-10 w-10 text-emerald-400 transform -rotate-45" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Nooraya
                </span>
                <span className="block text-xs text-gray-400 font-light tracking-wider uppercase">
                  Groupe
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire de confiance depuis 2010. Nous transformons vos rêves de voyage en réalité avec notre expertise et notre service d'exception.
            </p>
            
            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-bold text-blue-400">2M+</div>
                <div className="text-xs text-gray-400">Destinations</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <div className="text-xl font-bold text-purple-400">1M+</div>
                <div className="text-xs text-gray-400">Clients satisfaits</div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Award className="mr-2" size={20} />
              Nos Services
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Réservation de vols" />
              <FooterLink text="Hôtels de luxe" />
              <FooterLink text="Packages sur mesure" />
              <FooterLink text="Assurance voyage" />
              <FooterLink text="Transferts aéroport" />
              <FooterLink text="Guides locaux" />
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Users className="mr-2" size={20} />
              Support Client
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Centre d'aide" />
              <FooterLink text="Chat en direct" />
              <FooterLink text="Politique d'annulation" />
              <FooterLink text="Remboursements" />
              <FooterLink text="FAQ" />
              <FooterLink text="Réclamations" />
            </ul>
            
            {/* Contact rapide */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <div className="flex items-center mb-2">
                <Phone size={16} className="mr-2 text-green-400" />
                <span className="text-sm">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center mb-2">
                <Mail size={16} className="mr-2 text-blue-400" />
                <span className="text-sm">support@alboraq.com</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-purple-400" />
                <span className="text-sm">24h/24 - 7j/7</span>
              </div>
            </div>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Shield className="mr-2" size={20} />
              Informations Légales
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Conditions générales" />
              <FooterLink text="Politique de confidentialité" />
              <FooterLink text="Cookies" />
              <FooterLink text="Mentions légales" />
              <FooterLink text="RGPD" />
              <FooterLink text="Règlement des litiges" />
            </ul>

            {/* Certifications */}
            <div className="mt-6">
              <h4 className="font-medium mb-3 text-sm">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs">IATA</div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs">ATOL</div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs">ISO 9001</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section paiements et sécurité */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <h4 className="font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Moyens de paiement sécurisés
              </h4>
              <div className="flex flex-wrap gap-3">
                <PaymentBadge text="Visa" />
                <PaymentBadge text="Mastercard" />
                <PaymentBadge text="PayPal" />
                <PaymentBadge text="Apple Pay" />
                <PaymentBadge text="Google Pay" />
                <PaymentBadge text="Amex" />
              </div>
            </div>
            
            <div className="flex flex-col items-center lg:items-end">
              <div className="flex items-center mb-3">
                <Shield className="h-6 w-6 text-green-400 mr-2" />
                <span className="font-medium">Paiement 100% sécurisé</span>
              </div>
              <div className="text-sm text-gray-400 text-center lg:text-right">
                Cryptage SSL 256 bits<br />
                Données protégées
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:max-w-md">
              <h3 className="text-xl font-bold mb-2">
                Restez informé de nos meilleures offres
              </h3>
              <p className="text-gray-300 text-sm">
                Recevez en exclusivité nos promotions et conseils de voyage
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="input-field bg-white/10 border-white/20 text-white placeholder-gray-300 sm:w-64"
                />
                <button className="btn-primary whitespace-nowrap px-6">
                  S'abonner
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Pas de spam, désinscription facile
              </p>
            </div>
          </div>
        </div>

        {/* Copyright et liens */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Alboraq. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Licence d'agence de voyage n° IM075180042
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Plan du site</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Partenaires</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Carrières</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ text: string }> = ({ text }) => {
  return (
    <li>
      <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block">
        {text}
      </a>
    </li>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <a 
      href="#" 
      className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-6"
    >
      {icon}
    </a>
  );
};

const PaymentBadge: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="bg-white rounded-lg px-3 py-2 text-gray-800 font-medium text-sm shadow-sm">
      {text}
    </div>
  );
};

export default Footer;