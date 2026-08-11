import React, { useState } from 'react';
import { Property, PropertyExperienceCategory, ActiveScreen } from '../types';
import { MOCK_PROPERTIES } from '../data/mockData';
import { InteractiveMapView } from './InteractiveMapView';
import { 
  Search, Sparkles, MapPin, Star, Map, Grid, ShieldCheck, Check, RefreshCw, Compass,
  Bed, Bath, Users, Heart
} from 'lucide-react';

interface SearchResultsViewProps {
  onSelectProperty: (property: Property, initialTab?: 'hospedaje' | 'patrimonial') => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  selectedCategory: PropertyExperienceCategory | 'Todos';
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  currency?: 'MXN' | 'USD' | 'EUR';
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  onSelectProperty,
  setActiveScreen,
  selectedCategory: initialCategory,
  searchQuery = '',
  setSearchQuery,
  currency = 'MXN'
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('Todos');
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [onlyFractional, setOnlyFractional] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const formatNightlyPrice = (priceMXN: number) => {
    if (currency === 'USD') {
      const usd = Math.round(priceMXN / 20);
      return `$${usd.toLocaleString('en-US')} USD`;
    }
    if (currency === 'EUR') {
      const eur = Math.round(priceMXN / 21.5);
      return `€${eur.toLocaleString('de-DE')} EUR`;
    }
    return `$${priceMXN.toLocaleString('es-MX')} MXN`;
  };

  const formatFractionalPrice = (priceUSD?: number) => {
    const baseUsd = priceUSD || 60000;
    if (currency === 'MXN') {
      const mxn = baseUsd * 20;
      return `$${mxn.toLocaleString('es-MX')} MXN`;
    }
    if (currency === 'EUR') {
      const eur = Math.round(baseUsd * 0.93);
      return `€${eur.toLocaleString('de-DE')} EUR`;
    }
    return `$${baseUsd.toLocaleString('en-US')} USD`;
  };

  // Normalize search text for smart natural language AI matching
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Smart AI natural language filtering engine
  const filtered = MOCK_PROPERTIES.filter((p) => {
    if (selectedDestination !== 'Todos' && p.destination !== selectedDestination) return false;
    if (categoryFilter !== 'Todos' && p.propertyExperience !== categoryFilter) return false;
    if (onlyFractional && !p.hasFractionalOption) return false;
    if (p.capacityGuests < guestsCount) return false;

    if (normalizedQuery) {
      const matchTitle = p.title.toLowerCase().includes(normalizedQuery);
      const matchDest = p.destination.toLowerCase().includes(normalizedQuery);
      const matchLoc = p.locationDetails.toLowerCase().includes(normalizedQuery);
      const matchDesc = p.description.toLowerCase().includes(normalizedQuery);
      const matchSub = p.subtitle.toLowerCase().includes(normalizedQuery);
      const matchExp = p.propertyExperience.toLowerCase().includes(normalizedQuery);
      const matchAmenities = p.amenities.some(a => a.toLowerCase().includes(normalizedQuery));

      const isTelchacQuery = (normalizedQuery.includes('telchac') || normalizedQuery.includes('ananta') || normalizedQuery.includes('capri'));
      const isValladolidQuery = (normalizedQuery.includes('valladolid') || normalizedQuery.includes('ku\'uk') || normalizedQuery.includes('kuuk') || normalizedQuery.includes('cenote'));
      const isBeachQuery = (normalizedQuery.includes('playa') || normalizedQuery.includes('mar') || normalizedQuery.includes('costa') || normalizedQuery.includes('alberca'));
      const isFractionalQuery = (normalizedQuery.includes('fractional') || normalizedQuery.includes('inversion') || normalizedQuery.includes('comprar'));

      if (isTelchacQuery && p.destination === 'Telchac') return true;
      if (isValladolidQuery && p.destination === 'Valladolid') return true;
      if (isBeachQuery && p.propertyExperience === 'Playa') return true;
      if (isFractionalQuery && p.hasFractionalOption) return true;

      return matchTitle || matchDest || matchLoc || matchDesc || matchSub || matchExp || matchAmenities;
    }

    return true;
  });

  // AI query interpretation summary
  const getAiInterpretation = () => {
    if (!normalizedQuery) return null;
    let tags: string[] = [];
    if (normalizedQuery.includes('telchac') || normalizedQuery.includes('ananta') || normalizedQuery.includes('capri')) tags.push('Costa Esmeralda Telchac');
    if (normalizedQuery.includes('valladolid') || normalizedQuery.includes('ku\'uk') || normalizedQuery.includes('cenote')) tags.push('Pueblo Mágico Valladolid & Cenote');
    if (normalizedQuery.includes('playa') || normalizedQuery.includes('mar')) tags.push('Frente al Mar');
    if (normalizedQuery.includes('alberca')) tags.push('Alberca / Cenote Privado');
    if (normalizedQuery.includes('fractional') || normalizedQuery.includes('propiedad')) tags.push('Opciones Fractional');

    return {
      query: searchQuery,
      interpretedTags: tags.length > 0 ? tags : ['Búsqueda Semántica Liah IA'],
    };
  };

  const aiInterpretation = getAiInterpretation();

  return (
    <div className="space-y-6 pb-20">
      {/* AI Search Header & Input Control */}
      <div className="bg-white rounded-3xl border border-sky-100 p-5 md:p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#252425] text-[#66C2F1] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#66C2F1]" />
              <span>Resultados de Búsqueda Liah</span>
            </div>
            <h1 className="font-georama text-2xl sm:text-3xl font-black text-[#252425]">
              {filtered.length} {filtered.length === 1 ? 'Experiencia Encontrada' : 'Experiencias Encontradas'}
            </h1>
          </div>

          {/* Quick Natural Language Search Input */}
          {setSearchQuery && (
            <div className="flex-1 max-w-lg relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Escribe p.ej. "Alberca", "Telchac", "Cenote", "Valladolid"...'
                  className="w-full bg-gray-50 border border-sky-200 rounded-2xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-[#252425] focus:outline-hidden focus:border-[#66C2F1] focus:bg-white shadow-2xs transition-all font-semibold"
                />
                <Search className="w-4 h-4 text-[#66C2F1] absolute left-3.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 text-xs font-bold cursor-pointer"
                    title="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* View Toggle (Cards vs Interactive Map) */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="bg-gray-100 p-1 rounded-xl flex items-center space-x-1 border border-gray-200">
              <button
                onClick={() => setShowMap(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  !showMap
                    ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                    : 'text-gray-600 hover:text-[#252425]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>

              <button
                onClick={() => setShowMap(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  showMap
                    ? 'bg-[#252425] text-[#66C2F1] shadow-xs'
                    : 'text-gray-600 hover:text-[#252425]'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Mapa Interactivo</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Quick Filter Suggestion Chips */}
        {setSearchQuery && (
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block tracking-wider">
              Búsquedas Frecuentes Liah:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSearchQuery('Telchac')}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  searchQuery === 'Telchac'
                    ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                    : 'bg-sky-50 text-[#252425] border-sky-100 hover:border-[#66C2F1]'
                }`}
              >
                🌴 Telchac Puerto
              </button>

              <button
                onClick={() => setSearchQuery('Valladolid')}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  searchQuery === 'Valladolid'
                    ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                    : 'bg-sky-50 text-[#252425] border-sky-100 hover:border-[#66C2F1]'
                }`}
              >
                🌿 Valladolid & Cenote
              </button>

              <button
                onClick={() => setSearchQuery('San Miguel de Allende')}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  searchQuery === 'San Miguel de Allende'
                    ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                    : 'bg-sky-50 text-[#252425] border-sky-100 hover:border-[#66C2F1]'
                }`}
              >
                🏛️ San Miguel de Allende
              </button>

              <button
                onClick={() => setSearchQuery('Valle de Bravo')}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  searchQuery === 'Valle de Bravo'
                    ? 'bg-[#252425] text-[#66C2F1] border-[#252425]'
                    : 'bg-sky-50 text-[#252425] border-sky-100 hover:border-[#66C2F1]'
                }`}
              >
                🌲 Valle de Bravo
              </button>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1 rounded-full text-xs font-extrabold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Limpiar Filtro</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* AI Interpretation Banner */}
        {aiInterpretation && (
          <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-200 p-3 rounded-2xl flex items-center justify-between text-xs text-[#252425]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#66C2F1] shrink-0 animate-pulse" />
              <div>
                <span className="font-extrabold text-[#0F2942]">
                  Interpretación Liah IA para "{aiInterpretation.query}":
                </span>
                <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                  {aiInterpretation.interpretedTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-sky-200 text-[#0F2942] px-2 py-0.5 rounded-md font-extrabold text-[10px]"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 text-xs">
          {/* Destination Selector */}
          <div className="flex items-center space-x-1.5 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <MapPin className="w-3.5 h-3.5 text-[#66C2F1]" />
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="bg-transparent font-bold text-[#252425] focus:outline-hidden cursor-pointer"
            >
              <option value="Todos">Todos los Destinos</option>
              <option value="Telchac">Telchac (Yucatán)</option>
              <option value="Valladolid">Valladolid (Yucatán)</option>
              <option value="San Miguel de Allende">San Miguel de Allende</option>
              <option value="Valle de Bravo">Valle de Bravo</option>
            </select>
          </div>

          {/* Experience Category Selector */}
          <div className="flex items-center space-x-1.5 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
            <span className="text-gray-400 font-bold">Experiencia:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent font-bold text-[#252425] focus:outline-hidden cursor-pointer"
            >
              <option value="Todos">Todas las Experiencias</option>
              <option value="Playa">Playa</option>
              <option value="Selva">Selva</option>
              <option value="Colonial">Colonial</option>
              <option value="Bosque">Bosque</option>
            </select>
          </div>

          {/* Fractional Option Toggle */}
          <button
            onClick={() => setOnlyFractional(!onlyFractional)}
            className={`px-3 py-2 rounded-xl font-bold flex items-center space-x-1.5 border transition-all cursor-pointer ${
              onlyFractional
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${onlyFractional ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span>Disponible en Fractional</span>
            {onlyFractional && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE VIEW: MAP OR POLISHED CARDS */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sky-150 p-10 text-center space-y-4">
          <Compass className="w-12 h-12 text-[#66C2F1] mx-auto animate-spin-slow" />
          <h3 className="font-georama text-xl font-bold text-[#252425]">
            No encontramos coincidencias para tu criterio
          </h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Intenta cambiar el destino o limpiar los términos de búsqueda.
          </p>
          {setSearchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDestination('Todos');
                setCategoryFilter('Todos');
                setOnlyFractional(false);
              }}
              className="bg-[#252425] text-[#66C2F1] px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-[#0F2942] transition-all cursor-pointer"
            >
              Ver Todas las Experiencias
            </button>
          )}
        </div>
      ) : showMap ? (
        <InteractiveMapView
          properties={filtered}
          onSelectProperty={onSelectProperty}
          setActiveScreen={setActiveScreen}
          currency={currency}
        />
      ) : (
        /* POLISHED HIGH-END RESIDENTIAL GRID MATCHING EXPLORE VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((property) => (
            <div
              key={property.id}
              onClick={() => {
                onSelectProperty(property, 'hospedaje');
                setActiveScreen('03_FICHA_HOSPEDAJE');
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#66C2F1] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Image & Top Badges */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={property.heroImage}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(property.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Destination Tag */}
                <div className="absolute top-3 left-3 bg-[#252425]/90 backdrop-blur-md text-[#66C2F1] px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                  {property.destination}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#252425] px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center space-x-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{property.rating} ({property.reviewsCount} reseñas)</span>
                </div>
              </div>

              {/* Card Content focused on Specs & Characteristics */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-[#66C2F1] tracking-wider mb-0.5">
                    {property.propertyExperience}
                  </div>
                  <h3 className="font-georama text-lg font-bold text-[#252425] group-hover:text-[#66C2F1] transition-colors leading-snug">
                    {property.title}
                  </h3>
                </div>

                {/* STRUCTURED CHARACTERISTICS GRID */}
                <div className="bg-sky-50/70 border border-sky-150 rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center justify-center p-1">
                    <Bed className="w-4 h-4 text-[#0F2942] mb-1" />
                    <span className="text-[11px] font-extrabold text-[#252425]">
                      {property.bedrooms} Recámaras
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-1 border-x border-sky-200">
                    <Bath className="w-4 h-4 text-[#0F2942] mb-1" />
                    <span className="text-[11px] font-extrabold text-[#252425]">
                      {property.bathrooms} Baños
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-1">
                    <Users className="w-4 h-4 text-[#0F2942] mb-1" />
                    <span className="text-[11px] font-extrabold text-[#252425]">
                      Hasta {property.capacityGuests}
                    </span>
                  </div>
                </div>

                {/* Key Amenity Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {property.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-gray-200"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Price & Action Footer */}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-gray-400 block">Renta por noche</span>
                      <span className="font-georama text-base font-extrabold text-[#252425]">
                        {formatNightlyPrice(property.nightlyPriceMXN)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProperty(property, 'hospedaje');
                        setActiveScreen('03_FICHA_HOSPEDAJE');
                      }}
                      className="bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425] px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      Reservar
                    </button>
                  </div>

                  {property.hasFractionalOption && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProperty(property, 'patrimonial');
                        setActiveScreen('06_FICHA_PATRIMONIAL');
                      }}
                      className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="text-[10px] font-extrabold text-emerald-900 block uppercase">Fractional</span>
                          <span className="text-xs font-bold text-emerald-950">
                            {formatFractionalPrice(property.fractionalStartPriceUSD)}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 underline">Ver Fracción</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
