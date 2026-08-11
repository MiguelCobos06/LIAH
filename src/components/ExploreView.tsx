import React, { useState, useEffect } from 'react';
import { Property, ActiveScreen } from '../types';
import { 
  Compass, MapPin, Star, Calendar, Users, ShieldCheck, 
  Sparkles, SlidersHorizontal, ArrowRight, Heart, ChevronRight, ChevronLeft,
  Search, Map, Palmtree, Clock, Award, Building2, CheckCircle2, Zap
} from 'lucide-react';
import { InteractiveMapView } from './InteractiveMapView';
import { MOCK_PROPERTIES } from '../data/mockData';

interface ExploreViewProps {
  properties?: Property[];
  onSelectProperty: (property: Property, initialTab?: 'hospedaje' | 'patrimonial') => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  currency?: 'MXN' | 'USD' | 'EUR';
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  properties = MOCK_PROPERTIES,
  onSelectProperty,
  setActiveScreen,
  currency = 'MXN'
}) => {
  const [activeSearchTab, setActiveSearchTab] = useState<'ALL' | 'RENT' | 'FRACTIONAL'>('ALL');
  const [heroSearchText, setHeroSearchText] = useState<string>('');
  const [heroDestination, setHeroDestination] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [viewType, setViewType] = useState<'CARDS' | 'MAP'>('CARDS');

  // Hero background carousel state
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
      title: 'Casa Ananta • Costa Esmeralda, Yucatán',
      tag: 'Playa & Mar'
    },
    {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=80',
      title: 'Bungalow Ku\'uk • Valladolid & Cenote',
      tag: 'Selva & Cenote'
    },
    {
      url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=2000&q=80',
      title: 'Departamento Capri • Telchac Puerto',
      tag: 'Marina & Playa'
    },
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
      title: 'Casa Celesta • San Miguel de Allende',
      tag: 'Cultura Colonial'
    },
    {
      url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=80',
      title: 'Cabaña AURA • Valle de Bravo',
      tag: 'Bosque & Laguna'
    }
  ];

  const [heroImageIndex, setHeroImageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const categories = [
    { id: 'Todos', label: 'Todas las Experiencias', icon: Compass },
    { id: 'Playa y Mar', label: 'Frente al Mar', icon: Palmtree },
    { id: 'Cenote Privado', label: 'Cenote & Selva', icon: Sparkles },
    { id: 'Colonial', label: 'Pueblos Mágicos', icon: Building2 },
    { id: 'Lago y Bosque', label: 'Bosque & Lago', icon: Compass }
  ];

  const filteredProperties = (properties || MOCK_PROPERTIES).filter(p => {
    if (activeSearchTab === 'RENT' && p.isHospitalityAvailable === false) return false;
    if (activeSearchTab === 'FRACTIONAL' && !p.hasFractionalOption) return false;

    if (heroDestination !== 'Todos' && !p.locationDetails.toLowerCase().includes(heroDestination.toLowerCase())) {
      return false;
    }

    if (selectedCategory !== 'Todos') {
      const catMatch = p.propertyExperience.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                       p.amenities.some(a => a.toLowerCase().includes(selectedCategory.toLowerCase()));
      if (!catMatch) return false;
    }

    if (heroSearchText.trim()) {
      const q = heroSearchText.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDest = p.locationDetails.toLowerCase().includes(q);
      const matchExp = p.propertyExperience.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchAmenity = p.amenities.some(a => a.toLowerCase().includes(q));
      if (!matchTitle && !matchDest && !matchExp && !matchDesc && !matchAmenity) return false;
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* ELEVATED HERO SEARCH SECTION WITH AUTOMATIC & INTERACTIVE CAROUSEL BACKGROUND */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0F2942] text-white shadow-2xl min-h-[500px] flex flex-col justify-center p-6 sm:p-10 md:p-12">
        {/* Carousel Background Images with high clarity */}
        {heroImages.map((img, idx) => (
          <div
            key={img.url}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out pointer-events-none ${
              idx === heroImageIndex ? 'opacity-85 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${img.url}')`,
              transitionProperty: 'opacity, transform',
              transitionDuration: '1000ms'
            }}
          />
        ))}

        {/* Subtle Vignette Overlay (legible text without dark blue wash) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2942]/90 via-[#0F2942]/35 to-black/25 pointer-events-none" />

        {/* Carousel Left / Right Navigation Controls */}
        <button
          onClick={() => setHeroImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#66C2F1] text-white hover:text-[#252425] p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg group"
          title="Fotografía anterior"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => setHeroImageIndex((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#66C2F1] text-white hover:text-[#252425] p-2.5 rounded-full backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg group"
          title="Siguiente fotografía"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Carousel Slide Indicators & Active Image Tag */}
        <div className="absolute top-4 right-6 z-20 flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] text-gray-200">
          <span className="font-bold text-[#66C2F1]">{heroImages[heroImageIndex].tag}</span>
          <span className="text-gray-400">•</span>
          <div className="flex items-center space-x-1.5">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroImageIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === heroImageIndex ? 'w-5 bg-[#66C2F1]' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-[#66C2F1]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#66C2F1]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Liah • Experiencias Vacacionales de Autor & Fractional</span>
          </div>

          <h1 className="font-georama text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Encuentra tu próxima experiencia
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Busca por destino, amenidad o palabra clave. Elige entre estancias por noche o fracciones escrituradas.
          </p>

          {/* ADVANCED MULTI-FIELD SEARCH CARD */}
          <div className="bg-white text-[#252425] rounded-3xl p-4 sm:p-6 shadow-2xl border border-sky-100 text-left max-w-4xl mx-auto">
            {/* Tabs for Search Context */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4 overflow-x-auto no-scrollbar gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveSearchTab('ALL')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                    activeSearchTab === 'ALL'
                      ? 'bg-[#252425] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#66C2F1]" />
                  <span>Explorar Todo</span>
                </button>

                <button
                  onClick={() => setActiveSearchTab('RENT')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                    activeSearchTab === 'RENT'
                      ? 'bg-[#252425] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Palmtree className="w-3.5 h-3.5 text-[#66C2F1]" />
                  <span>Rentar por Noche</span>
                </button>

                <button
                  onClick={() => setActiveSearchTab('FRACTIONAL')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                    activeSearchTab === 'FRACTIONAL'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Fractional</span>
                </button>
              </div>

              <span className="text-[11px] font-bold text-gray-400 hidden md:inline">
                {filteredProperties.length} experiencias disponibles
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Destination Dropdown */}
              <div className="sm:col-span-4 bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">
                  Ubicación / Destino
                </label>
                <select
                  value={heroDestination}
                  onChange={(e) => setHeroDestination(e.target.value)}
                  className="w-full bg-transparent font-bold text-xs text-[#252425] focus:outline-none cursor-pointer"
                >
                  <option value="Todos">Todos los Destinos</option>
                  <option value="Telchac">Telchac Puerto, Yuc.</option>
                  <option value="Valladolid">Valladolid, Yuc.</option>
                  <option value="San Miguel">San Miguel de Allende, Gto.</option>
                  <option value="Valle de Bravo">Valle de Bravo, Méx.</option>
                </select>
              </div>

              {/* Free Text Search Input */}
              <div className="sm:col-span-5 bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">
                  Experiencia o Amenidad
                </label>
                <div className="flex items-center space-x-2">
                  <Search className="w-3.5 h-3.5 text-[#66C2F1] shrink-0" />
                  <input
                    type="text"
                    placeholder='Ej. "Alberca", "Cenote", "Playa"...'
                    value={heroSearchText}
                    onChange={(e) => setHeroSearchText(e.target.value)}
                    className="w-full bg-transparent font-semibold text-xs text-[#252425] placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Submit CTA */}
              <div className="sm:col-span-3">
                <button
                  onClick={() => setActiveScreen('02_RESULTADOS')}
                  className="w-full bg-[#252425] hover:bg-[#66C2F1] text-white hover:text-[#252425] py-3.5 rounded-2xl font-georama font-extrabold text-xs transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>Buscar Experiencias</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORY CHIPS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-georama text-lg font-bold text-[#252425]">
            Explorar por Tipo de Experiencia
          </h3>
          <button
            onClick={() => setActiveScreen('DESTINOS')}
            className="text-xs font-bold text-[#66C2F1] hover:underline flex items-center space-x-1"
          >
            <span>Ver Destinos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-[#252425] text-white border-[#252425] shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-sky-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#66C2F1]' : 'text-gray-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* DESTINATION HIGHLIGHT CARDS (3 POPULAR REGIONS) */}
      <section className="space-y-4">
        <h3 className="font-georama text-lg font-bold text-[#252425]">
          Destinos Liah Destacados
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telchac */}
          <div 
            onClick={() => {
              setHeroDestination('Telchac');
              setActiveScreen('02_RESULTADOS');
            }}
            className="relative rounded-3xl overflow-hidden h-48 group cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
              alt="Telchac Puerto" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-extrabold uppercase text-[#66C2F1] tracking-widest">
                Costa Esmeralda, Yucatán
              </span>
              <h3 className="font-georama text-lg font-bold">Telchac Puerto</h3>
              <p className="text-xs text-gray-300">Playas infinitas y ambiente marinero</p>
            </div>
          </div>

          {/* Valladolid */}
          <div 
            onClick={() => {
              setHeroDestination('Valladolid');
              setActiveScreen('02_RESULTADOS');
            }}
            className="relative rounded-3xl overflow-hidden h-48 group cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80" 
              alt="Valladolid" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-extrabold uppercase text-[#66C2F1] tracking-widest">
                Yucatán Mágico
              </span>
              <h3 className="font-georama text-lg font-bold">Valladolid</h3>
              <p className="text-xs text-gray-300">Cenotes privados y gastronomía maya</p>
            </div>
          </div>

          {/* Valle de Bravo */}
          <div 
            onClick={() => {
              setHeroDestination('Valle de Bravo');
              setActiveScreen('02_RESULTADOS');
            }}
            className="relative rounded-3xl overflow-hidden h-48 group cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img 
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80" 
              alt="Valle de Bravo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] font-extrabold uppercase text-[#66C2F1] tracking-widest">
                Estado de México
              </span>
              <h3 className="font-georama text-lg font-bold">Valle de Bravo</h3>
              <p className="text-xs text-gray-300">Refugios entre Bosque y Lago</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: UNIFIED "COLECCIÓN DE EXPERIENCIAS DESTACADAS LIAH" WITH CLEAR SPECS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#252425] text-[#66C2F1] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#66C2F1]" />
              <span>Colección Oficial Liah</span>
            </div>
            <h2 className="font-georama text-2xl font-bold text-[#252425]">
              Experiencias Destacadas ({filteredProperties.length})
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Consulta las características principales (recámaras, baños, capacidad) y elige tu modalidad.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 p-1 rounded-xl flex items-center space-x-1 border border-gray-200">
              <button
                onClick={() => setViewType('CARDS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  viewType === 'CARDS'
                    ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                    : 'text-gray-600 hover:text-[#252425]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>

              <button
                onClick={() => setViewType('MAP')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  viewType === 'MAP'
                    ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                    : 'text-gray-600 hover:text-[#252425]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Mapa Interactivo</span>
              </button>
            </div>

            <button
              onClick={() => setActiveScreen('02_RESULTADOS')}
              className="text-xs font-bold text-[#0F2942] hover:text-[#66C2F1] flex items-center space-x-1 hover:underline cursor-pointer"
            >
              <span>Filtros</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewType === 'MAP' ? (
          <InteractiveMapView
            properties={filteredProperties}
            onSelectProperty={onSelectProperty}
            setActiveScreen={setActiveScreen}
            currency={currency}
          />
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center space-y-3 border border-gray-200">
            <p className="text-sm font-bold text-gray-600">No se encontraron experiencias con los filtros aplicados.</p>
            <button
              onClick={() => {
                setHeroSearchText('');
                setHeroDestination('Todos');
                setSelectedCategory('Todos');
                setActiveSearchTab('ALL');
              }}
              className="bg-[#252425] text-[#66C2F1] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#0F2942] cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelectProperty={onSelectProperty}
                setActiveScreen={setActiveScreen}
                currency={currency}
              />
            ))}
          </div>
        )}
      </section>

      {/* WHY LIAH BANNER */}
      <section className="bg-[#161516] text-white rounded-3xl p-8 md:p-12 space-y-8 border border-sky-200/20 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#66C2F1]">
            El Modelo Liah
          </span>
          <h2 className="font-georama text-2xl sm:text-3xl font-extrabold">
            ¿Por qué elegir el ecosistema Liah?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Plataforma integral para disfrutar de experiencias de autor sin complicaciones operativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#66C2F1]/20 text-[#66C2F1] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-georama text-lg font-bold">Adquisición Fractional Real</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Adquiere fracciones vitalicias de la propiedad mediante fideicomiso bancario con escrituración pública a tu nombre. Tu patrimonio real que gana plusvalía.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#66C2F1]/20 text-[#66C2F1] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-georama text-lg font-bold">Administración Total</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Liah gestiona limpieza, mantenimiento, pago de servicios y conserjería. Tu experiencia siempre estará lista con calidad hotelera de 5 estrellas.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#66C2F1]/20 text-[#66C2F1] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-georama text-lg font-bold">Flexibilidad & Liah Freedom</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Intercambia semanas asignadas para vacacionar en otras experiencias de la colección Liah o rentar tus semanas disponibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

// SUBCOMPONENT: PROPERTY CARD WITH EXPLICIT SPECS & SINGLE DUAL-ACTION CLICK
interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property, initialTab?: 'hospedaje' | 'patrimonial') => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  currency?: 'MXN' | 'USD' | 'EUR';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  setActiveScreen,
  currency = 'MXN'
}) => {
  const formatNightlyPrice = (mxn: number) => {
    if (currency === 'USD') return `$${Math.round(mxn / 20).toLocaleString('en-US')} USD`;
    if (currency === 'EUR') return `€${Math.round(mxn / 21.5).toLocaleString('de-DE')} EUR`;
    return `$${mxn.toLocaleString('es-MX')} MXN`;
  };

  const formatFractionalPrice = (usd?: number) => {
    if (!usd) return '$0 MXN';
    if (currency === 'MXN') return `$${(usd * 20).toLocaleString('es-MX')} MXN`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.93).toLocaleString('de-DE')} EUR`;
    return `$${usd.toLocaleString('en-US')} USD`;
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* IMAGE & BADGES */}
        <div 
          onClick={() => {
            onSelectProperty(property, 'hospedaje');
            setActiveScreen('03_FICHA_HOSPEDAJE');
          }}
          className="relative h-64 overflow-hidden cursor-pointer"
        >
          <img
            src={property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black text-[#252425] flex items-center space-x-1 shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{property.rating}</span>
          </div>

          {/* Top Left Experience Badge */}
          <div className="absolute top-3 left-3 bg-[#252425]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-[#66C2F1] uppercase tracking-wider border border-[#66C2F1]/30">
            {property.propertyExperience}
          </div>

          {/* Bottom Title & Location */}
          <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
            <h3 className="font-georama text-xl font-black text-white leading-tight drop-shadow-sm">
              {property.title}
            </h3>
            <p className="text-xs text-gray-200 flex items-center space-x-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#66C2F1]" />
              <span>{property.locationDetails}</span>
            </p>
          </div>
        </div>

        {/* CONTENT & SPECS */}
        <div className="p-5 space-y-4">
          {/* Key Specs Bar (Guests, Bedrooms, Bathrooms, Area) */}
          <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-2xl text-center border border-slate-100 text-[#252425]">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase font-black block">Huéspedes</span>
              <span className="font-extrabold text-xs flex items-center justify-center space-x-1">
                <Users className="w-3 h-3 text-[#66C2F1]" />
                <span>{property.specs?.guestsCapacity ?? property.capacityGuests}</span>
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase font-black block">Recámaras</span>
              <span className="font-extrabold text-xs flex items-center justify-center space-x-1">
                <span>{property.specs?.bedroomsCount ?? property.bedrooms}</span>
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase font-black block">Baños</span>
              <span className="font-extrabold text-xs flex items-center justify-center space-x-1">
                <span>{property.specs?.bathroomsCount ?? property.bathrooms}</span>
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 uppercase font-black block">Área</span>
              <span className="font-extrabold text-xs flex items-center justify-center space-x-1">
                <span>{property.specs?.constructionAreaSqM ?? property.areaSqM}m²</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {property.subtitle}
          </p>

          {/* DUAL MODEL PRICING BOX */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {/* Rent Mode */}
            <div
              onClick={() => {
                onSelectProperty(property, 'hospedaje');
                setActiveScreen('03_FICHA_HOSPEDAJE');
              }}
              className="bg-sky-50/70 hover:bg-sky-100/90 p-3 rounded-2xl border border-sky-150 transition-all cursor-pointer space-y-1 group/rent"
            >
              <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider block">
                Rentar por Noche
              </span>
              <span className="font-georama text-sm font-black text-[#252425] block">
                {formatNightlyPrice(property.nightlyPriceMXN)}
              </span>
              <span className="text-[10px] text-sky-700 font-bold flex items-center space-x-0.5 group-hover/rent:translate-x-0.5 transition-transform">
                <span>Hospedaje</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>

            {/* Fractional Mode */}
            <div
              onClick={() => {
                onSelectProperty(property, 'patrimonial');
                setActiveScreen('06_FICHA_PATRIMONIAL');
              }}
              className="bg-emerald-50/70 hover:bg-emerald-100/90 p-3 rounded-2xl border border-emerald-150 transition-all cursor-pointer space-y-1 group/frac"
            >
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider">
                  Fractional
                </span>
              </div>
              <span className="font-georama text-sm font-black text-[#252425] block">
                {formatFractionalPrice(property.fractionalStartPriceUSD)}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold flex items-center space-x-0.5 group-hover/frac:translate-x-0.5 transition-transform">
                <span>Ver Fracciones</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-500">
          Atención personalizada Concierge Liah
        </span>

        <button
          onClick={() => {
            onSelectProperty(property, 'hospedaje');
            setActiveScreen('03_FICHA_HOSPEDAJE');
          }}
          className="bg-[#252425] text-[#66C2F1] hover:bg-[#0F2942] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-xs"
        >
          <span>Ver Detalle</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
