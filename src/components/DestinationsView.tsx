import React from 'react';
import { ActiveScreen } from '../types';
import { MapPin, ArrowRight, Building2, Utensils, Compass } from 'lucide-react';

interface DestinationsViewProps {
  setActiveScreen: (screen: ActiveScreen) => void;
  onSelectDestination: (destination: string) => void;
}

const DESTINATIONS_DATA = [
  {
    name: 'San Miguel de Allende',
    state: 'Guanajuato',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 3,
    experiencesCount: 12,
    description: 'Arquitectura colonial barroca, viñedos excepcionales y gastronomía de autor de clase mundial.'
  },
  {
    name: 'Valle de Bravo',
    state: 'Estado de México',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 2,
    experiencesCount: 8,
    description: 'Montañas de pino, navegación en el lago, deportes de viento y paz absoluta en la sierra.'
  },
  {
    name: 'Punta Mita',
    state: 'Nayarit',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 2,
    experiencesCount: 10,
    description: 'Península privada con playas turquesa, campos de golf Jack Nicklaus y alta navegación.'
  },
  {
    name: 'Tulum',
    state: 'Quintana Roo',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
    propertiesCount: 2,
    experiencesCount: 9,
    description: 'Diseño eco-chic, selva maya, cenotes ancestrales y clubs de playa exclusivos.'
  }
];

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  setActiveScreen,
  onSelectDestination
}) => {
  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#66C2F1]/30 p-6 space-y-2">
        <span className="text-[10px] uppercase font-bold text-[#66C2F1] tracking-wider block">
          Puerta Principal • Destinos Liah
        </span>
        <h1 className="font-georama text-2xl font-extrabold text-[#252425]">
          Centros de Información & Decisión de Destino
        </h1>
        <p className="text-xs text-gray-500">
          Explora cada destino desde su arquitectura, qué hacer, gastronomía recomendada y experiencias disponibles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DESTINATIONS_DATA.map((dest) => (
          <div
            key={dest.name}
            onClick={() => {
              onSelectDestination(dest.name);
              setActiveScreen('02_RESULTADOS');
            }}
            className="group bg-white rounded-2xl overflow-hidden border border-sky-100 hover:border-[#66C2F1] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-52 overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[10px] text-[#66C2F1] uppercase font-bold tracking-wider block">{dest.state}</span>
                <h3 className="font-georama text-2xl font-bold">{dest.name}</h3>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {dest.description}
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1"><Building2 className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>{dest.propertiesCount} Experiencias</span></span>
                  <span className="flex items-center space-x-1"><Compass className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>{dest.experiencesCount} Experiencias</span></span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#66C2F1] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
