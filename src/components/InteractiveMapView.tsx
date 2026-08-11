import React, { useState, useRef } from 'react';
import { Property, ActiveScreen } from '../types';
import { 
  MapPin, Star, Navigation, ShieldCheck, Heart, Compass, Check,
  Pencil, RefreshCw, ZoomIn, ZoomOut, Layers, Sliders, Move, MousePointerClick, Search, Palmtree
} from 'lucide-react';

import { MOCK_PROPERTIES } from '../data/mockData';

interface InteractiveMapViewProps {
  properties?: Property[];
  onSelectProperty: (property: Property, initialTab?: 'hospedaje' | 'patrimonial') => void;
  setActiveScreen: (screen: ActiveScreen) => void;
  currency?: 'MXN' | 'USD' | 'EUR';
  selectedPropertyId?: string;
}

interface Point {
  x: number;
  y: number;
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({
  properties = MOCK_PROPERTIES,
  onSelectProperty,
  setActiveScreen,
  currency = 'MXN',
  selectedPropertyId
}) => {
  const safeProperties = properties || MOCK_PROPERTIES;
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    safeProperties.find(p => p.id === selectedPropertyId) || safeProperties[0] || null
  );
  const [mapStyle, setMapStyle] = useState<'vector' | 'satellite' | 'topographic'>('vector');
  const [searchRadiusKm, setSearchRadiusKm] = useState<number>(30);
  const [filterMode, setFilterMode] = useState<'ALL' | 'RENT' | 'FRACTIONAL'>('ALL');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');

  // Drawing mode state
  const [drawMode, setDrawMode] = useState<'NONE' | 'CIRCLE' | 'POLYGON'>('NONE');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnCenter, setDrawnCenter] = useState<Point | null>({ x: 50, y: 50 }); // percentage
  const [drawnRadius, setDrawnRadius] = useState<number>(22); // canvas %
  const [polygonPoints, setPolygonPoints] = useState<Point[]>([]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const formatPrice = (prop: Property) => {
    if (filterMode === 'FRACTIONAL' && prop.fractionalStartPriceUSD) {
      if (currency === 'MXN') return `$${(prop.fractionalStartPriceUSD * 20).toLocaleString('es-MX')} MXN`;
      if (currency === 'EUR') return `€${Math.round(prop.fractionalStartPriceUSD * 0.93).toLocaleString('de-DE')} EUR`;
      return `$${prop.fractionalStartPriceUSD.toLocaleString('en-US')} USD`;
    }

    if (currency === 'USD') return `$${Math.round(prop.nightlyPriceMXN / 20).toLocaleString('en-US')} USD`;
    if (currency === 'EUR') return `€${Math.round(prop.nightlyPriceMXN / 21.5).toLocaleString('de-DE')} EUR`;
    return `$${prop.nightlyPriceMXN.toLocaleString('es-MX')} MXN`;
  };

  const filteredProperties = safeProperties.filter(p => {
    if (filterMode === 'FRACTIONAL' && !p.hasFractionalOption) return false;
    if (filterMode === 'RENT' && p.isHospitalityAvailable === false) return false;
    if (sidebarSearch.trim()) {
      const q = sidebarSearch.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDest = p.locationDetails.toLowerCase().includes(q);
      const matchExp = p.propertyExperience.toLowerCase().includes(q);
      if (!matchTitle && !matchDest && !matchExp) return false;
    }
    return true;
  });

  // Convert property coordinates to SVG Canvas X, Y %
  const getPropCanvasCoords = (p: Property): Point => {
    const minLat = 18.5;
    const maxLat = 22.5;
    const minLng = -101.5;
    const maxLng = -88.0;

    const x = ((p.coordinates.lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - (((p.coordinates.lat - minLat) / (maxLat - minLat)) * 100);

    return { 
      x: Math.max(12, Math.min(88, x)), 
      y: Math.max(12, Math.min(88, y)) 
    };
  };

  // SVG Mouse handlers for drawing directly on map
  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (drawMode === 'NONE') return;
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    if (drawMode === 'CIRCLE') {
      setIsDrawing(true);
      setDrawnCenter({ x: clickX, y: clickY });
      setDrawnRadius(5);
    } else if (drawMode === 'POLYGON') {
      setPolygonPoints(prev => [...prev, { x: clickX, y: clickY }]);
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || drawMode !== 'CIRCLE' || !drawnCenter || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const dx = currentX - drawnCenter.x;
    const dy = currentY - drawnCenter.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    setDrawnRadius(Math.max(5, Math.min(45, dist)));
  };

  const handleSvgMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const clearDrawing = () => {
    setDrawnCenter({ x: 50, y: 50 });
    setDrawnRadius(22);
    setPolygonPoints([]);
    setDrawMode('NONE');
  };

  // Helper to check if a point is inside drawn radius
  const isPointInRadius = (pt: Point): boolean => {
    if (!drawnCenter) return true;
    const dx = pt.x - drawnCenter.x;
    const dy = pt.y - drawnCenter.y;
    return Math.sqrt(dx * dx + dy * dy) <= drawnRadius;
  };

  return (
    <div className="bg-white rounded-3xl border border-sky-100 shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[760px] relative">
      {/* LEFT CONTROL & LIST SIDEBAR */}
      <div className="w-full lg:w-[420px] bg-slate-50 border-r border-gray-200 flex flex-col h-full z-10 shrink-0">
        {/* Header Control Panel */}
        <div className="p-4 bg-[#252425] text-white space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#66C2F1]" />
              <h3 className="font-georama text-base font-bold text-white">Mapa Interactivo Liah</h3>
            </div>
            <span className="text-[10px] font-extrabold text-[#66C2F1] bg-[#66C2F1]/10 px-2.5 py-0.5 rounded-full border border-[#66C2F1]/30">
              {filteredProperties.length} Experiencias
            </span>
          </div>

          {/* Quick Search inside Map */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filtrar por nombre o ubicación..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-gray-400 text-xs pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#66C2F1]"
            />
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-1 bg-white/10 p-1 rounded-xl text-xs font-bold text-center">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'ALL' ? 'bg-[#66C2F1] text-[#252425] font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilterMode('RENT')}
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'RENT' ? 'bg-[#66C2F1] text-[#252425] font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Rentar
            </button>
            <button
              onClick={() => setFilterMode('FRACTIONAL')}
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'FRACTIONAL' ? 'bg-emerald-400 text-[#252425] font-black' : 'text-gray-300 hover:text-white'
              }`}
            >
              Fractional
            </button>
          </div>

          {/* Interactive Draw Mode Toolbar */}
          <div className="bg-[#1a191a] p-2.5 rounded-2xl border border-gray-700/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-gray-300 flex items-center space-x-1">
                <Pencil className="w-3.5 h-3.5 text-[#66C2F1]" />
                <span>Herramientas de Mapa:</span>
              </span>
              {(drawnCenter || polygonPoints.length > 0) && (
                <button
                  onClick={clearDrawing}
                  className="text-[10px] text-red-400 hover:text-red-300 font-extrabold flex items-center space-x-0.5 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Limpiar</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-extrabold">
              <button
                onClick={() => setDrawMode(drawMode === 'CIRCLE' ? 'NONE' : 'CIRCLE')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer border ${
                  drawMode === 'CIRCLE'
                    ? 'bg-[#66C2F1] text-[#252425] border-[#66C2F1]'
                    : 'bg-white/5 text-gray-300 border-gray-700 hover:bg-white/10'
                }`}
              >
                <MousePointerClick className="w-3 h-3" />
                <span>Trazar Radio</span>
              </button>

              <button
                onClick={() => setDrawMode(drawMode === 'POLYGON' ? 'NONE' : 'POLYGON')}
                className={`py-1.5 px-2 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer border ${
                  drawMode === 'POLYGON'
                    ? 'bg-[#66C2F1] text-[#252425] border-[#66C2F1]'
                    : 'bg-white/5 text-gray-300 border-gray-700 hover:bg-white/10'
                }`}
              >
                <Move className="w-3 h-3" />
                <span>Polígono</span>
              </button>

              <button
                onClick={clearDrawing}
                className="py-1.5 px-2 rounded-xl bg-white/5 text-gray-300 border border-gray-700 hover:bg-white/10 transition-all flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Por Defecto</span>
              </button>
            </div>

            {/* Slider Control when in standard mode */}
            {drawMode === 'NONE' && (
              <div className="space-y-1 pt-1 border-t border-gray-800">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-400">Radio de Búsqueda:</span>
                  <span className="text-[#66C2F1] font-black">{searchRadiusKm} km</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={searchRadiusKm}
                  onChange={(e) => setSearchRadiusKm(Number(e.target.value))}
                  className="w-full accent-[#66C2F1] cursor-pointer h-1.5 bg-gray-700 rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Property List in Map Sidebar */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-gray-100">
          {filteredProperties.map((p) => {
            const isSelected = activeProperty?.id === p.id;
            const pt = getPropCanvasCoords(p);
            const inside = isPointInRadius(pt);

            return (
              <div
                key={p.id}
                onClick={() => setActiveProperty(p)}
                className={`pt-2.5 first:pt-0 p-3 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#66C2F1] shadow-md ring-2 ring-[#66C2F1]/30'
                    : inside
                    ? 'bg-white hover:bg-sky-50/50 border-gray-100'
                    : 'bg-gray-50/70 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex space-x-3">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase text-[#66C2F1] truncate">
                        {p.destination} • {p.propertyExperience}
                      </span>
                      <span className="text-[10px] font-bold text-amber-600 flex items-center">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                        {p.rating}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#252425] truncate">
                      {p.title}
                    </h4>

                    {/* Specs snippet */}
                    <div className="text-[10px] text-gray-500 flex items-center space-x-2">
                      <span>{p.bedrooms} Recs</span>
                      <span>•</span>
                      <span>{p.bathrooms} Baños</span>
                      <span>•</span>
                      <span>Max {p.capacityGuests} H</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-extrabold text-[#252425]">
                        {formatPrice(p)}
                        <span className="text-[9px] font-normal text-gray-500">
                          {filterMode === 'FRACTIONAL' ? ' (Fractional)' : ' / noche'}
                        </span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(p, filterMode === 'FRACTIONAL' ? 'patrimonial' : 'hospedaje');
                          setActiveScreen(filterMode === 'FRACTIONAL' ? '06_FICHA_PATRIMONIAL' : '03_FICHA_HOSPEDAJE');
                        }}
                        className="text-[10px] bg-[#252425] text-[#66C2F1] hover:bg-[#0F2942] px-2.5 py-1 rounded-lg font-bold"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT HIGH-END VECTOR MAP CANVAS */}
      <div className="flex-1 relative bg-[#0b131e] h-full overflow-hidden flex flex-col justify-between p-4 sm:p-5 select-none">
        {/* MAP STYLE LAYER OVERLAYS */}
        <div className="absolute inset-0 pointer-events-none">
          {mapStyle === 'satellite' ? (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80')`
              }}
            />
          ) : mapStyle === 'topographic' ? (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80')`
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#0f1d2e] opacity-100" />
          )}

          {/* Grid lines overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#66C2F1_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        </div>

        {/* TOP MAP CONTROLS BAR */}
        <div className="relative z-20 flex flex-wrap items-center justify-between bg-[#132030]/90 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-[#66C2F1]/30 gap-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-white">
            <Navigation className="w-4 h-4 text-[#66C2F1] animate-pulse" />
            <span>Centro: {activeProperty ? activeProperty.destination : 'Yucatán'}</span>
            {drawMode !== 'NONE' && (
              <span className="text-[10px] text-[#66C2F1] bg-[#66C2F1]/10 px-2 py-0.5 rounded-md border border-[#66C2F1]/30 animate-pulse">
                Modo: {drawMode === 'CIRCLE' ? 'Dibujando Círculo' : 'Dibujando Polígono'}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <button
              onClick={() => setMapStyle('vector')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-colors ${
                mapStyle === 'vector' ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              Vectores Liah
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-colors ${
                mapStyle === 'satellite' ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              Satélite HD
            </button>
            <button
              onClick={() => setMapStyle('topographic')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold cursor-pointer transition-colors ${
                mapStyle === 'topographic' ? 'bg-[#66C2F1] text-[#252425]' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              Terreno
            </button>
          </div>
        </div>

        {/* INTERACTIVE SVG MAP CANVAS LAYER */}
        <div className="relative z-10 flex-1 my-3 rounded-2xl border border-[#66C2F1]/20 overflow-hidden bg-[#0a1420]/60 backdrop-blur-xs">
          <svg
            ref={svgRef}
            onMouseDown={handleSvgMouseDown}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
            className={`w-full h-full ${drawMode !== 'NONE' ? 'cursor-crosshair' : 'cursor-grab'}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Coastline and Landmass Vector Paths */}
            <path
              d="M 0,25 Q 20,20 40,30 T 70,25 T 100,20 L 100,100 L 0,100 Z"
              fill="#122538"
              stroke="#66C2F1"
              strokeWidth="0.3"
              strokeDasharray="1,1"
              opacity="0.7"
            />

            {/* Main Highways / Vector Road Network */}
            <path d="M 10,70 Q 30,50 60,65 T 90,40" fill="none" stroke="#66C2F1" strokeWidth="0.5" opacity="0.4" />
            <path d="M 40,30 Q 50,60 70,85" fill="none" stroke="#66C2F1" strokeWidth="0.5" opacity="0.4" />
            <path d="M 20,40 Q 60,40 85,55" fill="none" stroke="#38bdf8" strokeWidth="0.3" opacity="0.3" />

            {/* Topographic Contour Lines */}
            <circle cx="65" cy="55" r="18" fill="none" stroke="#66C2F1" strokeWidth="0.15" opacity="0.3" />
            <circle cx="65" cy="55" r="12" fill="none" stroke="#66C2F1" strokeWidth="0.15" opacity="0.3" />
            <circle cx="35" cy="45" r="14" fill="none" stroke="#38bdf8" strokeWidth="0.15" opacity="0.2" />

            {/* DRAWN CUSTOM SEARCH RADIUS CIRCLE */}
            {drawnCenter && (
              <g className="animate-pulse">
                <circle
                  cx={drawnCenter.x}
                  cy={drawnCenter.y}
                  r={drawnRadius}
                  fill="rgba(102, 194, 241, 0.12)"
                  stroke="#66C2F1"
                  strokeWidth="0.6"
                  strokeDasharray="2,1"
                />
                <circle cx={drawnCenter.x} cy={drawnCenter.y} r="1.5" fill="#66C2F1" />
                <line x1={drawnCenter.x - 3} y1={drawnCenter.y} x2={drawnCenter.x + 3} y2={drawnCenter.y} stroke="#66C2F1" strokeWidth="0.3" />
                <line x1={drawnCenter.x} y1={drawnCenter.y - 3} x2={drawnCenter.x} y2={drawnCenter.y + 3} stroke="#66C2F1" strokeWidth="0.3" />
              </g>
            )}

            {/* DRAWN CUSTOM POLYGON ZONES */}
            {polygonPoints.length > 1 && (
              <polygon
                points={polygonPoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill="rgba(16, 185, 129, 0.15)"
                stroke="#10b981"
                strokeWidth="0.6"
              />
            )}
            {polygonPoints.map((pt, idx) => (
              <circle key={idx} cx={pt.x} cy={pt.y} r="1" fill="#10b981" />
            ))}

            {/* MAP PROPERTY PINS ON SVG CANVAS */}
            {filteredProperties.map((prop) => {
              const pt = getPropCanvasCoords(prop);
              const isSelected = activeProperty?.id === prop.id;
              const inside = isPointInRadius(pt);

              return (
                <g
                  key={prop.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProperty(prop);
                  }}
                  className="cursor-pointer group transition-all"
                >
                  {/* Pin Ripple Effect */}
                  {isSelected && (
                    <circle cx={pt.x} cy={pt.y} r="6" fill="none" stroke="#66C2F1" strokeWidth="0.5" className="animate-ping" />
                  )}

                  {/* Pin Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? "2.5" : "1.8"}
                    fill={isSelected ? "#66C2F1" : inside ? "#ffffff" : "#64748b"}
                    stroke={isSelected ? "#ffffff" : "#0f172a"}
                    strokeWidth="0.6"
                  />

                  {/* Pin Label Box */}
                  <foreignObject
                    x={pt.x - 16}
                    y={pt.y - 8}
                    width="32"
                    height="8"
                    className="overflow-visible"
                  >
                    <div 
                      className={`text-[3.5px] font-black px-1.5 py-0.5 rounded-full text-center shadow-md whitespace-nowrap transition-all border ${
                        isSelected
                          ? 'bg-[#252425] text-[#66C2F1] border-[#66C2F1] scale-110'
                          : inside
                          ? 'bg-white text-[#252425] border-gray-300 hover:bg-[#0F2942] hover:text-white'
                          : 'bg-gray-800 text-gray-400 border-gray-700 opacity-60'
                      }`}
                    >
                      {formatPrice(prop)}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Drawing Hint Banner on Map */}
          {drawMode !== 'NONE' && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#252425]/90 backdrop-blur-md text-[#66C2F1] px-4 py-1.5 rounded-full text-xs font-bold border border-[#66C2F1]/40 shadow-lg flex items-center space-x-2 animate-bounce">
              <Pencil className="w-3.5 h-3.5" />
              <span>
                {drawMode === 'CIRCLE'
                  ? 'Haz clic y arrastra sobre el mapa para trazar tu radio'
                  : 'Haz varios clics sobre el mapa para marcar los vértices de tu zona'}
              </span>
            </div>
          )}
        </div>

        {/* ACTIVE PROPERTY POPUP CARD ON MAP */}
        {activeProperty && (
          <div className="relative z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-sky-200 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <img
                src={activeProperty.heroImage}
                alt={activeProperty.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-extrabold uppercase text-[#66C2F1] bg-[#0F2942] px-2 py-0.5 rounded-md">
                    {activeProperty.destination}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600 flex items-center">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                    {activeProperty.rating}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#252425] mt-0.5">
                  {activeProperty.title}
                </h4>
                <div className="text-[11px] text-gray-500 flex items-center space-x-2 mt-0.5">
                  <span>{activeProperty.bedrooms} Recámaras</span>
                  <span>•</span>
                  <span>{activeProperty.bathrooms} Baños</span>
                  <span>•</span>
                  <span>{activeProperty.capacityGuests} Huéspedes</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  onSelectProperty(activeProperty, 'hospedaje');
                  setActiveScreen('03_FICHA_HOSPEDAJE');
                }}
                className="bg-[#252425] text-white hover:bg-[#66C2F1] hover:text-[#252425] px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                Reservar Noche
              </button>

              {activeProperty.hasFractionalOption && (
                <button
                  onClick={() => {
                    onSelectProperty(activeProperty, 'patrimonial');
                    setActiveScreen('06_FICHA_PATRIMONIAL');
                  }}
                  className="bg-emerald-800 text-white hover:bg-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ver Fractional</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
