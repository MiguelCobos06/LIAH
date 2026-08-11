import React, { useState } from 'react';
import { ActiveScreen, DestinationExperience, RestaurantItem } from '../types';
import { MOCK_EXPERIENCES_DESTINO, MOCK_RESTAURANTS, DEFAULT_BOOKING } from '../data/mockData';
import { 
  Compass, Sparkles, MapPin, Calendar, Clock, UtensilsCrossed, Headset, 
  ShieldCheck, Heart, ArrowRight, MessageSquareCode, Phone, BellRing, Navigation, CheckCircle2
} from 'lucide-react';

interface ActiveTripViewProps {
  setActiveScreen: (screen: ActiveScreen) => void;
  onOpenAiConcierge: () => void;
}

export const ActiveTripView: React.FC<ActiveTripViewProps> = ({
  setActiveScreen,
  onOpenAiConcierge
}) => {
  const [travelModeActive, setTravelModeActive] = useState<boolean>(true);
  const [activeNotification, setActiveNotification] = useState<string | null>(
    '🔔 Notificación Liah: ¡Te encuentras a 350m del Cenote Privado Ku\'uk! Tu Pase VIP está listo.'
  );

  const [selectedDay, setSelectedDay] = useState<number>(3); // Day 3 of 5
  const [showAddActivityModal, setShowAddActivityModal] = useState<boolean>(false);
  const [newActivityTitle, setNewActivityTitle] = useState<string>('');
  const [newActivityTime, setNewActivityTime] = useState<string>('04:00 PM');
  const [newActivityCategory, setNewActivityCategory] = useState<string>('Experiencia');

  const [itineraryDays, setItineraryDays] = useState([
    {
      dayNumber: 1,
      dateLabel: 'Jueves 15 Oct',
      title: 'Llegada & Check-In VIP',
      events: [
        { id: '101', time: '02:00 PM', title: 'Traslado privado Aeropuerto - Experiencia', category: 'Movilidad', completed: true, location: 'Vehículo Liah SUV' },
        { id: '102', time: '03:30 PM', title: 'Check-in y Bienvenida Concierge en Experiencia', category: 'Hospedaje', completed: true, location: 'Casa Celesta' },
        { id: '103', time: '08:00 PM', title: 'Cena Maridaje de Bienvenida', category: 'Gastronomía', completed: true, location: 'Comedor de Autor' }
      ]
    },
    {
      dayNumber: 2,
      dateLabel: 'Viernes 16 Oct',
      title: 'Cultura & Gastronomía Colonial',
      events: [
        { id: '201', time: '09:00 AM', title: 'Desayuno Artesanal en Experiencia', category: 'Gastronomía', completed: true, location: 'Terraza Casa Celesta' },
        { id: '202', time: '11:00 AM', title: 'Recorrido Arquitectónico por el Centro Histórico', category: 'Cultura', completed: true, location: 'Plaza Principal' },
        { id: '203', time: '02:30 PM', title: 'Comida de Autor en Restaurante La Cienega', category: 'Gastronomía', completed: true, location: 'La Cienega' }
      ]
    },
    {
      dayNumber: 3,
      dateLabel: 'Sábado 17 Oct (Hoy)',
      title: 'Día de Naturaleza & Experiencias',
      events: [
        { id: '301', time: '09:30 AM', title: 'Paseo en Globo al Amanecer sobre Viñedos', category: 'Aventura', completed: true, location: 'Viñedo San Lucas' },
        { id: '302', time: '01:00 PM', title: 'Cata de Vinos Orgánicos & Quesos Finos', category: 'Gastronomía', completed: true, location: 'Cava Privada' },
        { id: '303', time: '03:30 PM', title: 'Hueco Libre en tu Itinerario (Tiempo de Descanso / Spa)', category: 'Tiempo Libre', completed: false, location: 'Experiencia Liah' },
        { id: '304', time: '07:30 PM', title: 'Cena de Autor en Atrio Mirador', category: 'Gastronomía', completed: false, location: 'Terraza Panorámica' }
      ]
    },
    {
      dayNumber: 4,
      dateLabel: 'Domingo 18 Oct',
      title: 'Bienestar & Relajación',
      events: [
        { id: '401', time: '10:00 AM', title: 'Sesión de Masaje Holístico en Terraza', category: 'Bienestar', completed: false, location: 'Casa Celesta' },
        { id: '402', time: '02:00 PM', title: 'Brunch Dominical con Música en Vivo', category: 'Gastronomía', completed: false, location: 'Jardín Principal' }
      ]
    },
    {
      dayNumber: 5,
      dateLabel: 'Lunes 19 Oct',
      title: 'Check-Out & Regreso',
      events: [
        { id: '501', time: '11:00 AM', title: 'Check-Out Asistido & Entrega de Maletas', category: 'Hospedaje', completed: false, location: 'Casa Celesta' },
        { id: '502', time: '12:30 PM', title: 'Traslado Privado a Aeropuerto', category: 'Movilidad', completed: false, location: 'Vehículo Liah SUV' }
      ]
    }
  ]);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityTitle.trim()) return;

    setItineraryDays(prev => prev.map(day => {
      if (day.dayNumber === selectedDay) {
        return {
          ...day,
          events: [
            ...day.events,
            {
              id: Date.now().toString(),
              time: newActivityTime,
              title: newActivityTitle,
              category: newActivityCategory,
              completed: false,
              location: 'San Miguel de Allende'
            }
          ]
        };
      }
      return day;
    }));

    setNewActivityTitle('');
    setShowAddActivityModal(false);
  };

  const toggleEventComplete = (dayNum: number, eventId: string) => {
    setItineraryDays(prev => prev.map(day => {
      if (day.dayNumber === dayNum) {
        return {
          ...day,
          events: day.events.map(ev => ev.id === eventId ? { ...ev, completed: !ev.completed } : ev)
        };
      }
      return day;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      {/* TRAVEL MODE LOCATION NOTIFICATION BAR */}
      <div className="bg-[#252425] text-white p-4 rounded-2xl border border-[#66C2F1]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-[#66C2F1]/20 text-[#66C2F1] rounded-xl shrink-0">
            <Navigation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-white">Modo Viaje Inteligente Liah</span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                travelModeActive ? 'bg-emerald-500 text-white' : 'bg-gray-600 text-gray-300'
              }`}>
                {travelModeActive ? 'GPS Activo' : 'Pausado'}
              </span>
            </div>
            <p className="text-[11px] text-gray-300 mt-0.5">
              Detecta automáticamente atracciones, catas y cenotes cercanos a tu ubicación actual.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setTravelModeActive(!travelModeActive);
            if (!travelModeActive) {
              setActiveNotification('🔔 Notificación Liah: GPS Sincronizado. Ubicación detectada en Yucatán.');
            }
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all whitespace-nowrap ${
            travelModeActive 
              ? 'bg-[#66C2F1] text-[#252425] hover:bg-white' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {travelModeActive ? 'Modo Viaje Activado ✓' : 'Activar Modo Viaje'}
        </button>
      </div>

      {/* ACTIVE NOTIFICATION ALERT POPUP */}
      {activeNotification && travelModeActive && (
        <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between shadow-md text-xs text-[#252425] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center space-x-3">
            <BellRing className="w-5 h-5 text-amber-600 shrink-0 animate-bounce" />
            <span className="font-bold text-[#0F2942]">
              {activeNotification}
            </span>
          </div>
          <button
            onClick={() => setActiveNotification(null)}
            className="text-xs text-gray-400 hover:text-gray-700 font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Active Trip Header Badge */}
      <div className="bg-gradient-to-r from-[#0F2942] via-[#252425] to-[#0F2942] text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-md relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
              En Viaje Activo Hoy
            </span>
            <span className="text-xs text-sky-200">
              San Miguel de Allende, México
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-300">Experiencia:</span>
            <span className="font-bold text-[#66C2F1]">Casa Celesta</span>
          </div>
        </div>

        {/* Hero Question */}
        <div className="space-y-2 relative z-10">
          <h1 className="font-georama text-3xl md:text-4xl font-black text-[#66C2F1]">
            ¿Qué quieres hacer hoy, Miguel?
          </h1>
          <p className="text-xs text-gray-300 max-w-lg">
            Liah ha transformado la pantalla principal para ayudarte a disfrutar tu estancia al máximo sin distracciones de planeación.
          </p>
        </div>

        {/* Direct 24/7 Concierge Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={onOpenAiConcierge}
            className="bg-[#66C2F1] hover:bg-white text-[#252425] font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#252425]" />
            <span>Asistente Concierge Liah (IA)</span>
          </button>

          <a
            href="tel:+525512345678"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
          >
            <Phone className="w-4 h-4 text-[#66C2F1]" />
            <span>Concierge Humano 24/7</span>
          </a>
        </div>
      </div>

      {/* FULL ITINERARY TIMELINE MODULE */}
      <div className="bg-white rounded-3xl border border-sky-100 p-6 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#66C2F1] tracking-wider block">
              Tu Itinerario de Viaje Liah
            </span>
            <h2 className="font-georama text-2xl font-black text-[#252425]">
              Cronograma & Actividades
            </h2>
          </div>

          <button
            onClick={() => setShowAddActivityModal(true)}
            className="bg-[#252425] hover:bg-[#0F2942] text-[#66C2F1] font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>+ Agregar Actividad</span>
          </button>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {itineraryDays.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => setSelectedDay(d.dayNumber)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 text-left border ${
                selectedDay === d.dayNumber
                  ? 'bg-[#252425] text-white border-[#66C2F1] shadow-md ring-2 ring-[#66C2F1]/30'
                  : 'bg-slate-50 text-gray-600 border-gray-200 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] font-extrabold text-[#66C2F1] uppercase">Día {d.dayNumber}</div>
              <div className="font-bold text-xs">{d.dateLabel}</div>
            </button>
          ))}
        </div>

        {/* Selected Day Timeline List */}
        {itineraryDays.find(d => d.dayNumber === selectedDay) && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between bg-sky-50/80 p-3 rounded-2xl border border-sky-100">
              <span className="text-xs font-black text-[#0F2942]">
                {itineraryDays.find(d => d.dayNumber === selectedDay)?.title}
              </span>
              <span className="text-[11px] text-gray-500 font-bold">
                {itineraryDays.find(d => d.dayNumber === selectedDay)?.events.length} Eventos Programados
              </span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-sky-200">
              {itineraryDays.find(d => d.dayNumber === selectedDay)?.events.map((ev) => (
                <div key={ev.id} className="relative flex items-start justify-between bg-slate-50 hover:bg-white p-3.5 rounded-2xl border border-gray-100 hover:border-[#66C2F1] transition-all shadow-xs">
                  {/* Timeline Dot */}
                  <div 
                    onClick={() => toggleEventComplete(selectedDay, ev.id)}
                    className={`absolute -left-[21px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                      ev.completed 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'bg-white border-[#66C2F1] text-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-black text-[#252425] flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#66C2F1]" />
                        <span>{ev.time}</span>
                      </span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-sky-100 text-[#0F2942]">
                        {ev.category}
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold ${ev.completed ? 'line-through text-gray-400' : 'text-[#252425]'}`}>
                      {ev.title}
                    </h4>

                    <div className="text-[11px] text-gray-500 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-[#66C2F1]" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleEventComplete(selectedDay, ev.id)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
                      ev.completed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {ev.completed ? 'Completado ✓' : 'Marcar Listo'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ADD ACTIVITY MODAL */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-sky-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-georama text-lg font-bold text-[#252425]">
                Agregar Actividad al Día {selectedDay}
              </h3>
              <button
                onClick={() => setShowAddActivityModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddActivity} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nombre de la Actividad</label>
                <input
                  type="text"
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  placeholder="Ej. Visita a Galería de Arte / Clase de Cocina"
                  className="w-full bg-slate-50 border border-gray-200 p-2.5 rounded-xl font-medium focus:border-[#66C2F1] focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Hora</label>
                  <input
                    type="text"
                    value={newActivityTime}
                    onChange={(e) => setNewActivityTime(e.target.value)}
                    placeholder="Ej. 04:30 PM"
                    className="w-full bg-slate-50 border border-gray-200 p-2.5 rounded-xl font-medium focus:border-[#66C2F1] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Categoría</label>
                  <select
                    value={newActivityCategory}
                    onChange={(e) => setNewActivityCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 p-2.5 rounded-xl font-medium focus:border-[#66C2F1] focus:outline-hidden"
                  >
                    <option value="Experiencia">Experiencia</option>
                    <option value="Gastronomía">Gastronomía</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Bienestar">Bienestar</option>
                    <option value="Movilidad">Movilidad</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#252425] text-[#66C2F1] hover:bg-[#0F2942] font-bold cursor-pointer"
                >
                  Guardar en Itinerario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Próximo Evento del Itinerario */}
      <div className="bg-white rounded-2xl border-2 border-[#66C2F1]/40 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66C2F1]">
            Próximo Evento de tu Itinerario
          </span>
          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md text-[10px]">
            Hoy 7:30 PM
          </span>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-3 bg-sky-100 text-[#0F2942] rounded-2xl shrink-0">
            <UtensilsCrossed className="w-6 h-6" />
          </div>

          <div className="space-y-1 flex-1">
            <h3 className="font-georama text-lg font-bold text-[#252425]">
              Cena de Autor en Atrio Mirador
            </h3>
            <p className="text-xs text-gray-600">
              Mesa en terraza panorámica confirmada para 4 personas con acceso prioritario Liah.
            </p>
            <div className="flex items-center space-x-3 text-[11px] text-gray-500 pt-1">
              <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-[#66C2F1]" /> <span>A 6 mins en vehículo Liah</span></span>
              <span>•</span>
              <span className="text-emerald-600 font-bold">Código Liah: #SMA-881</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cerca de ti Hoy: Experiencias en Destino */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#66C2F1] tracking-wider block">
              Exploración de Destino
            </span>
            <h2 className="font-georama text-xl font-bold text-[#252425]">
              Cerca de ti hoy en San Miguel de Allende
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOCK_EXPERIENCES_DESTINO.slice(0, 2).map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl overflow-hidden border border-sky-100 hover:border-[#66C2F1] p-3 flex space-x-3 shadow-xs transition-all">
              <img src={exp.image} alt="" className="w-24 h-24 object-cover rounded-xl shrink-0" />
              <div className="flex flex-col justify-between text-xs flex-1">
                <div>
                  <span className="text-[9px] font-bold text-[#66C2F1] uppercase block">{exp.category}</span>
                  <h3 className="font-bold text-[#252425]">{exp.title}</h3>
                  <span className="text-[10px] text-gray-500 block mt-0.5">{exp.duration} • {exp.location}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="font-extrabold text-[#252425]">${exp.priceMXN.toLocaleString('es-MX')} MXN</span>
                  <button className="bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors">
                    Reservar Hoy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gastronomía & Beneficios Exclusivos Liah */}
      <div className="bg-gradient-to-br from-[#E0F2FE]/40 via-white to-white rounded-2xl p-6 border border-[#66C2F1]/30 space-y-4">
        <h3 className="font-georama text-lg font-bold text-[#252425] flex items-center space-x-2">
          <UtensilsCrossed className="w-5 h-5 text-[#66C2F1]" />
          <span>Gastronomía & Mesas Preferenciales Liah</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_RESTAURANTS.map((rest) => (
            <div key={rest.id} className="bg-white p-3 rounded-xl border border-gray-100 space-y-2 text-xs">
              <img src={rest.image} alt="" className="w-full h-20 object-cover rounded-lg" />
              <div>
                <span className="text-[9px] font-bold text-[#66C2F1] uppercase block">{rest.cuisine}</span>
                <h4 className="font-bold text-[#252425]">{rest.name}</h4>
              </div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-gray-100">
                <span className="text-gray-500">{rest.priceLevel}</span>
                <span className="text-emerald-600 font-bold">Reserva Prioritaria Liah</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
