import React from 'react';
import { ActiveScreen } from '../types';
import { ArrowLeft, Home, ChevronRight, Compass, MapPin, Sparkles, Luggage, UserCheck } from 'lucide-react';

interface BreadcrumbNavProps {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  selectedPropertyTitle?: string;
  selectedDestinationName?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  activeScreen,
  setActiveScreen,
  selectedPropertyTitle,
  selectedDestinationName,
}) => {
  // Hide breadcrumb on primary home screen 01_EXPLORAR
  if (activeScreen === '01_EXPLORAR') return null;

  const getBreadcrumbItems = () => {
    switch (activeScreen) {
      case '02_RESULTADOS':
        return {
          parentLabel: 'Explorar',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: 'Resultados de Búsqueda',
        };
      case '03_FICHA_HOSPEDAJE':
      case '06_FICHA_PATRIMONIAL':
        return {
          parentLabel: 'Explorar',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: selectedPropertyTitle || 'Ficha de Experiencia',
        };
      case '04_CHECKOUT':
        return {
          parentLabel: selectedPropertyTitle || 'Ficha de Experiencia',
          parentScreen: '03_FICHA_HOSPEDAJE' as ActiveScreen,
          currentLabel: 'Reservar Estancia',
        };
      case '05_HOSPEDAJE_CONFIRMADO':
        return {
          parentLabel: 'Viajes',
          parentScreen: 'VIAJES' as ActiveScreen,
          currentLabel: 'Estancia Confirmada',
        };
      case '07_FRACCIONES_DISPONIBLES':
        return {
          parentLabel: selectedPropertyTitle || 'Ficha de Experiencia',
          parentScreen: '03_FICHA_HOSPEDAJE' as ActiveScreen,
          currentLabel: 'Fracciones Disponibles',
        };
      case '08_FRACCION_SIMULACION':
        return {
          parentLabel: 'Fracciones Disponibles',
          parentScreen: '07_FRACCIONES_DISPONIBLES' as ActiveScreen,
          currentLabel: 'Simulador de Fracción',
        };
      case '09_MI_ADQUISICION':
        return {
          parentLabel: 'Mi Liah',
          parentScreen: 'MI_LIAH' as ActiveScreen,
          currentLabel: 'Proceso de Adquisición',
        };
      case '10_VIAJE_ACTIVO':
        return {
          parentLabel: 'Viajes',
          parentScreen: 'VIAJES' as ActiveScreen,
          currentLabel: 'Viaje Activo Hoy',
        };
      case 'DESTINOS':
        return {
          parentLabel: 'Inicio',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: 'Destinos Liah',
        };
      case 'EXPERIENCIAS':
        return {
          parentLabel: 'Inicio',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: 'Experiencias en Destino',
        };
      case 'VIAJES':
        return {
          parentLabel: 'Inicio',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: 'Mis Viajes',
        };
      case 'MI_LIAH':
        return {
          parentLabel: 'Inicio',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: 'Mi Cuenta & Patrimonio',
        };
      default:
        return {
          parentLabel: 'Explorar',
          parentScreen: '01_EXPLORAR' as ActiveScreen,
          currentLabel: 'Sección Liah',
        };
    }
  };

  const breadcrumb = getBreadcrumbItems();

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 py-2 px-4 shadow-xs sticky top-[72px] z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        {/* Back Button & Path Trail */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveScreen(breadcrumb.parentScreen)}
            className="flex items-center space-x-1 font-bold text-gray-700 hover:text-[#66C2F1] transition-colors py-1 px-2.5 rounded-lg bg-gray-50 hover:bg-sky-50 border border-gray-200 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a {breadcrumb.parentLabel}</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1.5 text-gray-400 font-medium">
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[#252425] font-bold bg-sky-50 text-[#0F2942] px-2.5 py-0.5 rounded-full text-[11px] border border-sky-100">
              {breadcrumb.currentLabel}
            </span>
          </div>
        </div>

        {/* Home Reset Quick Jump */}
        <button
          onClick={() => setActiveScreen('01_EXPLORAR')}
          className="text-gray-400 hover:text-[#252425] flex items-center space-x-1 transition-colors text-[11px] font-medium cursor-pointer"
          title="Ir al inicio principal (Explorar)"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Inicio Liah</span>
        </button>
      </div>
    </div>
  );
};
