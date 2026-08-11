import React from 'react';
import { ActiveScreen } from '../types';
import { Compass, Search, ShieldCheck, Luggage, UserCheck } from 'lucide-react';

interface BottomNavProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  hasActiveTrip?: boolean;
  onOpenMiLiahSidebar: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  setActiveScreen,
  hasActiveTrip,
  onOpenMiLiahSidebar,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#252425]/95 backdrop-blur-lg border-t border-gray-800 py-2 px-3 shadow-2xl max-w-7xl mx-auto text-white">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Explorar */}
        <button
          onClick={() => setActiveScreen('01_EXPLORAR')}
          className={`flex flex-col items-center justify-center transition-all py-1 px-2 rounded-xl cursor-pointer ${
            activeScreen === '01_EXPLORAR'
              ? 'text-[#66C2F1] font-bold scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeScreen === '01_EXPLORAR' ? 'bg-[#66C2F1]/20 text-[#66C2F1]' : ''}`}>
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Explorar</span>
        </button>

        {/* 2. Buscar */}
        <button
          onClick={() => setActiveScreen('02_RESULTADOS')}
          className={`flex flex-col items-center justify-center transition-all py-1 px-2 rounded-xl cursor-pointer ${
            activeScreen === '02_RESULTADOS'
              ? 'text-[#66C2F1] font-bold scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeScreen === '02_RESULTADOS' ? 'bg-[#66C2F1]/20 text-[#66C2F1]' : ''}`}>
            <Search className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Buscar</span>
        </button>

        {/* 3. Fractional */}
        <button
          onClick={() => setActiveScreen('07_FRACCIONES_DISPONIBLES')}
          className={`flex flex-col items-center justify-center transition-all py-1 px-2 rounded-xl cursor-pointer ${
            activeScreen === '07_FRACCIONES_DISPONIBLES' || activeScreen === '08_FRACCION_SIMULACION'
              ? 'text-[#66C2F1] font-bold scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeScreen === '07_FRACCIONES_DISPONIBLES' ? 'bg-[#66C2F1]/20 text-[#66C2F1]' : ''}`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Fractional</span>
        </button>

        {/* 4. Viajes */}
        <button
          onClick={() => setActiveScreen(hasActiveTrip ? '10_VIAJE_ACTIVO' : 'VIAJES')}
          className={`flex flex-col items-center justify-center transition-all relative py-1 px-2 rounded-xl cursor-pointer ${
            activeScreen === 'VIAJES' || activeScreen === '10_VIAJE_ACTIVO'
              ? 'text-[#66C2F1] font-bold scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {hasActiveTrip && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-extrabold px-1 py-0.2 rounded-full uppercase tracking-tighter animate-pulse">
              HOY
            </span>
          )}
          <div className={`p-1.5 rounded-xl transition-all ${activeScreen === 'VIAJES' || activeScreen === '10_VIAJE_ACTIVO' ? 'bg-[#66C2F1]/20 text-[#66C2F1]' : ''}`}>
            <Luggage className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight">Mis Viajes</span>
        </button>

        {/* 5. Mi Liah (Opens Sidebar) */}
        <button
          onClick={onOpenMiLiahSidebar}
          className="flex flex-col items-center justify-center transition-all py-1 px-2 rounded-xl cursor-pointer text-gray-400 hover:text-[#66C2F1]"
        >
          <div className="p-1.5 rounded-xl hover:bg-[#66C2F1]/20 transition-all">
            <UserCheck className="w-5 h-5 text-[#66C2F1]" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold tracking-tight text-[#66C2F1]">Mi Liah</span>
        </button>
      </div>
    </nav>
  );
};
