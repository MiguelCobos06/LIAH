import React, { useState } from 'react';
import { ActiveScreen, TripBooking, DestinationExperience, RestaurantItem } from '../types';
import { MOCK_EXPERIENCES_DESTINO, MOCK_RESTAURANTS } from '../data/mockData';
import { CheckCircle2, Plane, Car, Sparkles, UtensilsCrossed, Calendar, MapPin, ArrowRight, Check, Clock } from 'lucide-react';

interface TripConfirmedViewProps {
  booking: TripBooking;
  setActiveScreen: (screen: ActiveScreen) => void;
  onActivateTripMode: () => void;
}

export const TripConfirmedView: React.FC<TripConfirmedViewProps> = ({
  booking,
  setActiveScreen,
  onActivateTripMode
}) => {
  const [selectedFlight, setSelectedFlight] = useState(false);
  const [selectedCar, setSelectedCar] = useState(false);
  const [bookedExperiences, setBookedExperiences] = useState<string[]>([]);
  const [bookedRestaurants, setBookedRestaurants] = useState<string[]>([]);

  const toggleExp = (id: string) => {
    setBookedExperiences(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleRest = (id: string) => {
    setBookedRestaurants(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      {/* Tranquil Confirmation Hero Header */}
      <div className="bg-gradient-to-br from-[#E0F2FE] via-[#F5FDFF] to-white rounded-3xl p-8 border border-[#66C2F1]/40 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#66C2F1] uppercase tracking-widest block mb-1">
            Reserva Confirmada • Folio Liah #SMA-8821
          </span>
          <h1 className="font-georama text-3xl font-extrabold text-[#252425]">
            ¡Tu estancia está confirmada, Miguel!
          </h1>
          <p className="text-sm text-gray-600 max-w-lg mx-auto mt-1">
            Tu viaje a <strong className="text-[#252425]">{booking.destination}</strong> en <strong className="text-[#252425]">{booking.propertyTitle}</strong> ha nacido formalmente en tu cuenta Liah.
          </p>
        </div>

        <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-sky-150 text-xs text-gray-700">
          <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>20 - 24 Ago 2026</span></span>
          <span>•</span>
          <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>San Miguel de Allende</span></span>
        </div>
      </div>

      {/* "Completa tu Viaje" Unlock Section */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#66C2F1] text-[#252425] px-2 py-0.5 rounded-md font-bold text-[10px] uppercase">
                Servicios Desbloqueados
              </span>
              <h2 className="font-georama text-2xl font-bold text-[#252425]">
                Completa tu viaje
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Contrata vuelos, movilidad y experiencias en destino de forma progresiva. Una compra a la vez.
            </p>
          </div>

          {/* Critical UX Rule: "Lo haré después" option */}
          <button
            onClick={() => {
              onActivateTripMode();
              setActiveScreen('10_VIAJE_ACTIVO');
            }}
            className="text-xs font-bold text-gray-500 hover:text-[#252425] bg-white border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            Lo haré después (Ir a Mi Viaje)
          </button>
        </div>

        {/* Unlocked Component 1: Vuelo & Traslado / Movilidad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Flight Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            selectedFlight ? 'bg-sky-50 border-[#66C2F1] ring-1 ring-[#66C2F1]' : 'bg-white border-sky-100 hover:border-sky-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="p-2.5 bg-sky-100 text-[#0F2942] rounded-xl mb-3">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#66C2F1] uppercase">Liah Mobility</span>
            </div>
            <h3 className="font-georama text-base font-bold text-[#252425]">Vuelo a Querétaro / BJX</h3>
            <p className="text-xs text-gray-500 mt-1">
              Vuelo directo sugerido para tus fechas con asistencia de equipaje Liah en hangar.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="font-bold text-xs text-[#252425]">$4,800 MXN / persona</span>
              <button
                onClick={() => setSelectedFlight(!selectedFlight)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                  selectedFlight ? 'bg-emerald-600 text-white' : 'bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425]'
                }`}
              >
                {selectedFlight ? <><Check className="w-3.5 h-3.5" /> <span>Agregado</span></> : <span>Agregar</span>}
              </button>
            </div>
          </div>

          {/* Car Rental / Transfer Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            selectedCar ? 'bg-sky-50 border-[#66C2F1] ring-1 ring-[#66C2F1]' : 'bg-white border-sky-100 hover:border-sky-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="p-2.5 bg-sky-100 text-[#0F2942] rounded-xl mb-3">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-[#66C2F1] uppercase">Traslado Chófer</span>
            </div>
            <h3 className="font-georama text-base font-bold text-[#252425]">Suburban Privada & Chófer</h3>
            <p className="text-xs text-gray-500 mt-1">
              Recepción privada en aeropuerto y disponibilidad diaria durante toda la estancia.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="font-bold text-xs text-[#252425]">$3,200 MXN / día</span>
              <button
                onClick={() => setSelectedCar(!selectedCar)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                  selectedCar ? 'bg-emerald-600 text-white' : 'bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425]'
                }`}
              >
                {selectedCar ? <><Check className="w-3.5 h-3.5" /> <span>Agregado</span></> : <span>Agregar</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Unlocked Component 2: Experiencias en Destino Reservables */}
        <div className="space-y-3 pt-4">
          <h3 className="font-georama text-lg font-bold text-[#252425] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#66C2F1]" />
            <span>Experiencias Exclusivas en Destino</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_EXPERIENCES_DESTINO.filter(e => e.location === 'San Miguel de Allende').map((exp) => {
              const isAdded = bookedExperiences.includes(exp.id);
              return (
                <div key={exp.id} className="bg-white rounded-2xl overflow-hidden border border-sky-100 p-3 flex space-x-3">
                  <img src={exp.image} alt="" className="w-24 h-24 object-cover rounded-xl shrink-0" />
                  <div className="flex flex-col justify-between text-xs flex-1">
                    <div>
                      <span className="text-[9px] font-bold text-[#66C2F1] uppercase block">{exp.category}</span>
                      <h4 className="font-bold text-[#252425]">{exp.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{exp.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="font-extrabold text-[#252425]">${exp.priceMXN.toLocaleString('es-MX')} MXN</span>
                      <button
                        onClick={() => toggleExp(exp.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          isAdded ? 'bg-emerald-600 text-white' : 'bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425]'
                        }`}
                      >
                        {isAdded ? 'Reservado' : 'Reservar'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200">
          <button
            onClick={() => {
              onActivateTripMode();
              setActiveScreen('10_VIAJE_ACTIVO');
            }}
            className="w-full sm:w-auto bg-[#252425] hover:bg-[#0F2942] text-white px-8 py-3.5 rounded-xl font-georama font-bold text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md"
          >
            <span>Ver mi Itinerario Completo (Mi Viaje Activo)</span>
            <ArrowRight className="w-4 h-4 text-[#66C2F1]" />
          </button>
        </div>
      </div>
    </div>
  );
};
