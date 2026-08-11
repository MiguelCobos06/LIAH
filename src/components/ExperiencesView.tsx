import React, { useState } from 'react';
import { ActiveScreen } from '../types';
import { MOCK_EXPERIENCES_DESTINO } from '../data/mockData';
import { Sparkles, MapPin, Clock, Star, Utensils, Heart } from 'lucide-react';

interface ExperiencesViewProps {
  setActiveScreen: (screen: ActiveScreen) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({ setActiveScreen }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Gastronomía', 'Recreativa', 'Bienestar', 'Aventura'];

  const filtered = selectedSubCategory === 'Todas'
    ? MOCK_EXPERIENCES_DESTINO
    : MOCK_EXPERIENCES_DESTINO.filter(e => e.category === selectedSubCategory);

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#66C2F1]/30 p-6 space-y-2">
        <span className="text-[10px] uppercase font-bold text-[#66C2F1] tracking-wider block">
          Puerta Principal • Experiencias en Destino
        </span>
        <h1 className="font-georama text-2xl font-extrabold text-[#252425]">
          Lo que puedes vivir en tu próximo viaje
        </h1>
        <p className="text-xs text-gray-500">
          Actividades reservables exclusivas: gastronomía, recreativas, culturales, bienestar y aventura. Puedes explorar y guardarlas antes de reservar tu hospedaje.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedSubCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedSubCategory === cat
                ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#66C2F1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Destination Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-2xl overflow-hidden border border-sky-100 hover:border-[#66C2F1] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#252425]/90 text-[#66C2F1] px-2.5 py-1 rounded-full text-[10px] font-bold">
                {exp.category}
              </div>
              <div className="absolute bottom-3 left-3 bg-white/90 text-[#252425] px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#66C2F1]" />
                <span>{exp.location}</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-georama text-base font-bold text-[#252425]">
                {exp.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {exp.description}
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block">Duración: {exp.duration}</span>
                  <span className="font-georama text-base font-bold text-[#252425]">
                    ${exp.priceMXN.toLocaleString('es-MX')} MXN
                  </span>
                </div>

                <button
                  onClick={() => setActiveScreen('01_EXPLORAR')}
                  className="bg-sky-50 text-[#0F2942] hover:bg-[#252425] hover:text-white border border-sky-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  Guardar en Mi Viaje
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
