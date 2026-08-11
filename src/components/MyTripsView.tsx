import React from 'react';
import { ActiveScreen, TripBooking } from '../types';
import { DEFAULT_BOOKING } from '../data/mockData';
import { Luggage, Calendar, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface MyTripsViewProps {
  booking?: TripBooking;
  setActiveScreen: (screen: ActiveScreen) => void;
  onActivateTripMode: () => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  booking = DEFAULT_BOOKING,
  setActiveScreen,
  onActivateTripMode
}) => {
  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#66C2F1]/30 p-6 space-y-2">
        <span className="text-[10px] uppercase font-bold text-[#66C2F1] tracking-wider block">
          Puerta Principal • Gestor de Viajes
        </span>
        <h1 className="font-georama text-2xl font-extrabold text-[#252425]">
          Planeación, Próximos Viajes & Itinerarios
        </h1>
        <p className="text-xs text-gray-500">
          Revisa tus reservaciones confirmadas, completa tu viaje con vuelo y movilidad o activa el modo de viaje en destino.
        </p>
      </div>

      {/* Active / Upcoming Trip Card */}
      <div className="bg-gradient-to-br from-[#E0F2FE]/50 via-white to-white rounded-2xl border-2 border-[#66C2F1]/40 p-6 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
            Próximo Viaje Confirmado
          </span>
          <span className="text-xs text-gray-500">ID Reservación: #{booking.id}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <img src={booking.propertyImage} alt="" className="w-full md:w-40 h-32 rounded-xl object-cover shrink-0" />

          <div className="space-y-2 flex-1">
            <h3 className="font-georama text-xl font-bold text-[#252425]">
              {booking.propertyTitle}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>{booking.destination}</span></span>
              <span>•</span>
              <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>{booking.checkInDate} al {booking.checkOutDate}</span></span>
            </div>

            <p className="text-xs text-gray-500">
              {booking.guestsCount} huéspedes • {booking.nights} noches • Total pagado: ${booking.totalMXN.toLocaleString('es-MX')} MXN
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setActiveScreen('05_HOSPEDAJE_CONFIRMADO')}
            className="text-xs font-bold text-[#66C2F1] hover:underline flex items-center space-x-1"
          >
            <span>Ver opciones para Completa tu viaje</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              onActivateTripMode();
              setActiveScreen('10_VIAJE_ACTIVO');
            }}
            className="bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#66C2F1]" />
            <span>Ir a Mi Viaje Activo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
