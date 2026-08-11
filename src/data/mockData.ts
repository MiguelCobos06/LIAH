import { Property, DestinationExperience, RestaurantItem, TripBooking, AcquisitionProgress } from '../types';

export const MOCK_EXPERIENCES_DESTINO: DestinationExperience[] = [
  {
    id: 'exp-1',
    title: 'Cata de Vinos Privada & Vuelo en Globo sobre los Viñedos',
    category: 'Gastronomía',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    priceMXN: 4800,
    duration: '4 horas',
    rating: 4.9,
    location: 'San Miguel de Allende',
    description: 'Recorrido exclusivo al amanecer por viñedos locales con sombrero ceremonial, cata maridaje con sommelier privado y vuelo libre.'
  },
  {
    id: 'exp-2',
    title: 'Navegación Privada en Catamarán al Atardecer',
    category: 'Recreativa',
    image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?auto=format&fit=crop&w=800&q=80',
    priceMXN: 12500,
    duration: '3.5 horas',
    rating: 5.0,
    location: 'Punta Mita',
    description: 'Catamarán exclusivo con chef a bordo, coctelería de autor y parada en caletas vírgenes para natación de alta experiencia.'
  },
  {
    id: 'exp-3',
    title: 'Cena de Autor bajo el Bosque Encantado',
    category: 'Gastronomía',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    priceMXN: 3900,
    duration: '3 horas',
    rating: 4.8,
    location: 'Valle de Bravo',
    description: 'Experiencia gastronómica sensorial de 7 tiempos elaborada con insumos orgánicos de la sierra frente al lago.'
  },
  {
    id: 'exp-4',
    title: 'Sanación Holográfica y Sonoterapia en Cenote Privado',
    category: 'Bienestar',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    priceMXN: 3200,
    duration: '2.5 horas',
    rating: 4.9,
    location: 'Tulum',
    description: 'Ceremonia de cuencos de cuarzo y baño ancestral de plantas curativas en las profundidades de una reserva natural sagrada.'
  },
  {
    id: 'exp-5',
    title: 'Expedición de Aventura en Cuatrimoto por Rutas Secretas',
    category: 'Aventura',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    priceMXN: 2900,
    duration: '3 horas',
    rating: 4.7,
    location: 'San Miguel de Allende',
    description: 'Travesía de adrenalina por los senderos de cañadas históricas y capillas del siglo XVIII.'
  }
];

export const MOCK_RESTAURANTS: RestaurantItem[] = [
  {
    id: 'rest-1',
    name: 'Atrio Mirador',
    cuisine: 'Cocina Contemporánea',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    priceLevel: '$$$$',
    location: 'San Miguel de Allende',
    liahRecommended: true
  },
  {
    id: 'rest-2',
    name: 'Clevo Restaurante & Cava',
    cuisine: 'Alta Gastronomía de Sierra',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    priceLevel: '$$$',
    location: 'Valle de Bravo',
    liahRecommended: true
  },
  {
    id: 'rest-3',
    name: 'Manta Beach & Fire',
    cuisine: 'Mariscos & Fuego Vivo',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    priceLevel: '$$$$',
    location: 'Punta Mita',
    liahRecommended: true
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Casa Ananta - Telchac',
    subtitle: 'Experiencia costera de diseño frente al mar esmeralda con alberca infinita, terrazas de chukum y palapa privada en Telchac Puerto.',
    destination: 'Telchac',
    locationDetails: 'Telchac Puerto, Costa Esmeralda de Yucatán',
    propertyExperience: 'Playa',
    isLiahOriginal: true,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    capacityGuests: 10,
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqM: 450,
    nightlyPriceMXN: 16800,
    rating: 4.98,
    reviewsCount: 41,
    description: 'Casa Ananta es un santuario costero de ultra-lujo en la codiciada Costa Esmeralda de Yucatán (Telchac Puerto). Construida con materiales autóctonos como el chukum y piedra de cantera maya, ofrece alberca infinita a pie de playa, acceso privado al mar y servicio de concierge personal 24/7.',
    architectureHighlights: [
      'Construcción bioclimática en Chukum natural de Yucatán.',
      'Alberca infinita que colinda directamente con la arena fina de Telchac.',
      'Palapa lounge de doble altura con barra de mixología y asador al carbón.',
      'Amplios ventanales corredizos con aislamiento térmico y acústico.'
    ],
    amenities: [
      'Alberca Infinita a Pie de Playa',
      'Acceso Privado al Mar',
      'Palapa Lounge con Firepit',
      'Concierge Privado Liah 24/7',
      'Cocinero Maya Tradicional (Opcional)',
      'Kayak & Paddleboards',
      'Starlink Wi-Fi de Alta Velocidad'
    ],
    coordinates: { lat: 21.3414, lng: -89.2660 },
    hasFractionalOption: true,
    fractionalStartPriceUSD: 9480,
    constructionStatus: 'Preventa / Avance 85%',
    fractions: [
      {
        id: 'frac-ananta-1',
        propertyId: 'prop-1',
        fractionCode: 'Diamante Semanal',
        tier: 'Diamante',
        frequency: 'Semanal',
        season: 'Top Demanda',
        weeksPerYear: 1,
        nightsPerYear: 7,
        totalPriceMXN: 361600,
        totalPriceUSD: 18080,
        downPaymentPercent: 30,
        downPaymentMXN: 108480,
        downPaymentUSD: 5424,
        monthlyPaymentMXN: 7031,
        monthlyPaymentUSD: 351,
        termMonths: 36,
        estimatedOccupancy: '85%',
        availableCount: 7,
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Freedom',
          description: 'Semanas Top en demanda turística con ocupación estimada del 85% y máxima plusvalía de renta.'
        }
      },
      {
        id: 'frac-ananta-2',
        propertyId: 'prop-1',
        fractionCode: 'Platino Semanal',
        tier: 'Platino',
        frequency: 'Semanal',
        season: 'Alta',
        weeksPerYear: 1,
        nightsPerYear: 7,
        totalPriceMXN: 233700,
        totalPriceUSD: 11685,
        downPaymentPercent: 30,
        downPaymentMXN: 70110,
        downPaymentUSD: 3505,
        monthlyPaymentMXN: 4544,
        monthlyPaymentUSD: 227,
        termMonths: 36,
        estimatedOccupancy: '65%',
        availableCount: 9,
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Freedom',
          description: 'Temporada alta con ocupación estimada del 65% y excelente flexibilidad de goce.'
        }
      },
      {
        id: 'frac-ananta-3',
        propertyId: 'prop-1',
        fractionCode: 'Platino Quincenal',
        tier: 'Platino',
        frequency: 'Quincenal',
        season: 'Alta',
        weeksPerYear: 2,
        nightsPerYear: 14,
        totalPriceMXN: 379300,
        totalPriceUSD: 18965,
        downPaymentPercent: 30,
        downPaymentMXN: 113790,
        downPaymentUSD: 5689,
        monthlyPaymentMXN: 7375,
        monthlyPaymentUSD: 368,
        termMonths: 36,
        estimatedOccupancy: '65%',
        availableCount: 2,
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Experience',
          description: '14 noches garantizadas al año en temporada alta para estancias prolongadas en familia.'
        }
      },
      {
        id: 'frac-ananta-4',
        propertyId: 'prop-1',
        fractionCode: 'Oro Semanal',
        tier: 'Oro',
        frequency: 'Semanal',
        season: 'Media Alta',
        weeksPerYear: 1,
        nightsPerYear: 7,
        totalPriceMXN: 189600,
        totalPriceUSD: 9480,
        downPaymentPercent: 30,
        downPaymentMXN: 56880,
        downPaymentUSD: 2844,
        monthlyPaymentMXN: 3687,
        monthlyPaymentUSD: 184,
        termMonths: 36,
        estimatedOccupancy: '55%',
        availableCount: 6,
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Freedom',
          description: 'Inversión accesible con 36 mensualidades sin intereses de $3,687 MXN.'
        }
      },
      {
        id: 'frac-ananta-5',
        propertyId: 'prop-1',
        fractionCode: 'Oro Quincenal',
        tier: 'Oro',
        frequency: 'Quincenal',
        season: 'Media Alta',
        weeksPerYear: 2,
        nightsPerYear: 14,
        totalPriceMXN: 321900,
        totalPriceUSD: 16095,
        downPaymentPercent: 30,
        downPaymentMXN: 96570,
        downPaymentUSD: 4828,
        monthlyPaymentMXN: 6259,
        monthlyPaymentUSD: 313,
        termMonths: 36,
        estimatedOccupancy: '55%',
        availableCount: 7,
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Experience',
          description: '14 noches al año con ocupación estimada del 55% y plan de pagos sumamente cómodo.'
        }
      },
      {
        id: 'frac-ananta-6',
        propertyId: 'prop-1',
        fractionCode: 'Plata Mensual (Junio)',
        tier: 'Plata',
        frequency: 'Mensual',
        season: 'Media',
        weeksPerYear: 4,
        nightsPerYear: 30,
        totalPriceMXN: 339600,
        totalPriceUSD: 16980,
        downPaymentPercent: 30,
        downPaymentMXN: 101880,
        downPaymentUSD: 5094,
        monthlyPaymentMXN: 6603,
        monthlyPaymentUSD: 330,
        termMonths: 36,
        estimatedOccupancy: '50%',
        availableCount: 1,
        specificMonthsNote: 'Mes completo de junio',
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Freedom',
          description: 'Disfruta de la experiencia durante todo el mes de junio (30 noches completas al año).'
        }
      },
      {
        id: 'frac-ananta-7',
        propertyId: 'prop-1',
        fractionCode: 'Oro Mensual (Mayo / Octubre)',
        tier: 'Oro',
        frequency: 'Mensual',
        season: 'Media Alta',
        weeksPerYear: 4,
        nightsPerYear: 30,
        totalPriceMXN: 436600,
        totalPriceUSD: 21830,
        downPaymentPercent: 30,
        downPaymentMXN: 130980,
        downPaymentUSD: 6549,
        monthlyPaymentMXN: 8489,
        monthlyPaymentUSD: 424,
        termMonths: 36,
        estimatedOccupancy: '55%',
        availableCount: 2,
        specificMonthsNote: 'Mes completo Mayo / Octubre (Temporada media alta)',
        deliveryDate: 'Diciembre 2029',
        status: 'Disponible',
        typology: 'Experiencia de Playa 4 Recámaras + Alberca Infinita',
        certification: {
          type: 'Experience',
          description: 'Mes completo garantizado en Mayo u Octubre con 30 noches anuales.'
        }
      }
    ],
    nearbyExperiences: MOCK_EXPERIENCES_DESTINO.filter(e => e.location === 'Punta Mita' || e.category === 'Gastronomía'),
    nearbyRestaurants: MOCK_RESTAURANTS.filter(r => r.location === 'Punta Mita')
  },

  {
    id: 'prop-2',
    title: 'Bungalow Ku\'uk - Valladolid',
    subtitle: 'Bungalow orgánico mimetizado en la jungla maya con cenote privado y arquitectura de autor a minutos del centro histórico de Valladolid.',
    destination: 'Valladolid',
    locationDetails: 'Barrio de Sisal, junto al Ex-Convento de San Bernardino, Valladolid, Yucatán',
    propertyExperience: 'Selva',
    isLiahOriginal: true,
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
    ],
    capacityGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    areaSqM: 210,
    nightlyPriceMXN: 8900,
    rating: 4.95,
    reviewsCount: 28,
    description: 'Bungalow Ku\'uk combina la riqueza cultural del Pueblo Mágico de Valladolid con la tranquilidad de una reserva selvática privada. Disfruta de alberca de agua de cenote, jardín de sanación maya y estancias interiores en madera de zapote y teca.',
    architectureHighlights: [
      'Integración sustentable entre selva baja y patrimonio colonial.',
      'Alberca sumergida tipo cenote con iluminación biológica.',
      'Muebles elaborados por artesanos carpinteros de Valladolid.',
      'Sistema solar híbrido de huella de carbono neutra.'
    ],
    amenities: [
      'Alberca Tipo Cenote Privado',
      'Jardín Botanico & Hamacario Maya',
      'Bicicletas Vintage de Paseo',
      'Desayuno Yucateco Artesanal Incluido',
      'Ceremonia Cacao / Sonoterapia (A solicitud)',
      'Wi-Fi Starlink'
    ],
    coordinates: { lat: 20.6896, lng: -88.2017 },
    hasFractionalOption: true,
    fractionalStartPriceUSD: 54000,
    constructionStatus: 'Llave en mano',
    fractions: [
      {
        id: 'frac-2-1',
        propertyId: 'prop-2',
        fractionCode: 'Fracción Ku\'uk',
        season: 'Alta',
        weeksPerYear: 6,
        totalPriceUSD: 54000,
        downPaymentPercent: 20,
        downPaymentUSD: 10800,
        monthlyPaymentUSD: 820,
        termMonths: 60,
        status: 'Disponible',
        typology: 'Bungalow de Selva 2 Recámaras + Cenote',
        certification: {
          type: 'Freedom',
          description: 'Certificación Liah Freedom: Mantenimiento botánico y ecológico integral garantizado.'
        }
      }
    ],
    nearbyExperiences: MOCK_EXPERIENCES_DESTINO.filter(e => e.location === 'Tulum' || e.category === 'Bienestar'),
    nearbyRestaurants: []
  },

  {
    id: 'prop-3',
    title: 'Departamento Capri - Telchac',
    subtitle: 'Exclusivo penthouse costero en Marina Capri Telchac con muelle privado, jacuzzi panorámico y vistas 360° al Golfo de México.',
    destination: 'Telchac',
    locationDetails: 'Marina Capri, Telchac Puerto, Yucatán',
    propertyExperience: 'Playa',
    isLiahOriginal: true,
    heroImage: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80'
    ],
    capacityGuests: 6,
    bedrooms: 3,
    bathrooms: 3.5,
    areaSqM: 310,
    nightlyPriceMXN: 12500,
    rating: 4.91,
    reviewsCount: 33,
    description: 'Ubicado en la distinguida Marina Capri de Telchac Puerto, este departamento estilo Penthouse ofrece elevador privado directo al condominio, slip reservado para embarcación de hasta 35 pies, alberca comunitaria de resort y jacuzzi en terraza privada frente al mar.',
    architectureHighlights: [
      'Acceso en elevador directo a piso privado.',
      'Terraza volada de 60m² con jacuzzi privado e hidromasaje.',
      'Slip de marina privado con servicio de marina seca.',
      'Acabados en mármol blanco y maderas de teca importada.'
    ],
    amenities: [
      'Jacuzzi Privado en Terraza',
      'Slip de Marina para Embarcación',
      'Alberca de Resort Frente al Mar',
      'Elevador Privado',
      'Seguridad & Valet 24/7',
      'Gimnasio & Spa Marina'
    ],
    coordinates: { lat: 21.3425, lng: -89.2610 },
    hasFractionalOption: true,
    fractionalStartPriceUSD: 68000,
    constructionStatus: 'Llave en mano',
    fractions: [
      {
        id: 'frac-3-1',
        propertyId: 'prop-3',
        fractionCode: 'Fracción Marina',
        season: 'Alta',
        weeksPerYear: 6,
        totalPriceUSD: 68000,
        downPaymentPercent: 20,
        downPaymentUSD: 13600,
        monthlyPaymentUSD: 1020,
        termMonths: 60,
        status: 'Disponible',
        typology: 'Penthouse de Marina 3 Recámaras + Slip'
      }
    ],
    nearbyExperiences: [],
    nearbyRestaurants: []
  },

  {
    id: 'prop-4',
    title: 'Casa Celesta - Santuario Colonial',
    subtitle: 'Arquitectura neoclásica reinterpretada con patios de piedra natural y alberca climatizada privada.',
    destination: 'San Miguel de Allende',
    locationDetails: 'Centro Histórico, a 4 minutos de la Parroquia de San Miguel',
    propertyExperience: 'Colonial',
    isLiahOriginal: false,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    capacityGuests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    areaSqM: 420,
    nightlyPriceMXN: 14500,
    rating: 4.96,
    reviewsCount: 38,
    description: 'Casa Celesta es una obra cumbre del diseño barroco-moderno. Sus gruesos muros de cantera rosada albergan una experiencia de ultra-lujo con jardines interiores, jacuzzi artesanal y vista directa a la parroquia.',
    architectureHighlights: [
      'Fachada protegida con intervención de Legorreta Studio.',
      'Rooftop lounge con fuego central y bar panorámico 360°.'
    ],
    amenities: [
      'Alberca Climatizada',
      'Concierge Privado 24/7',
      'Cava Privada',
      'Rooftop con Firepit'
    ],
    coordinates: { lat: 20.9144, lng: -100.7452 },
    hasFractionalOption: true,
    fractionalStartPriceUSD: 78000,
    constructionStatus: 'Llave en mano',
    fractions: [
      {
        id: 'frac-4-1',
        propertyId: 'prop-4',
        fractionCode: 'Fracción Colonial',
        season: 'Alta',
        weeksPerYear: 6,
        totalPriceUSD: 78000,
        downPaymentPercent: 20,
        downPaymentUSD: 15600,
        monthlyPaymentUSD: 1150,
        termMonths: 60,
        status: 'Disponible',
        typology: 'Experiencia Colonial 4 Recámaras'
      }
    ],
    nearbyExperiences: MOCK_EXPERIENCES_DESTINO.filter(e => e.location === 'San Miguel de Allende'),
    nearbyRestaurants: MOCK_RESTAURANTS.filter(r => r.location === 'San Miguel de Allende')
  },

  {
    id: 'prop-5',
    title: 'Villa Nieve Silvestre - Refugio Alpine',
    subtitle: 'Experiencia de madera noble y cristal suspendida entre los pinos con muelle sobre la laguna.',
    destination: 'Valle de Bravo',
    locationDetails: 'Avándaro, junto a la reserva biológica',
    propertyExperience: 'Bosque',
    isLiahOriginal: false,
    heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    capacityGuests: 10,
    bedrooms: 5,
    bathrooms: 5,
    areaSqM: 580,
    nightlyPriceMXN: 18900,
    rating: 4.98,
    reviewsCount: 24,
    description: 'Imersión absoluta en la naturaleza de la sierra. Diseñada para aislar el ruido del mundo y brindar confort térmico superior mediante calefacción radial de baja huella ecológica.',
    architectureHighlights: [
      'Deck flotante de 120m² con jacuzzi infinito contemplativo.'
    ],
    amenities: [
      'Jacuzzi Flotante Climatizado',
      'Muelle Privado para Lancha',
      'Sauna Seco Finlandia'
    ],
    coordinates: { lat: 19.1925, lng: -100.1306 },
    hasFractionalOption: true,
    fractionalStartPriceUSD: 92000,
    constructionStatus: 'Llave en mano',
    fractions: [
      {
        id: 'frac-5-1',
        propertyId: 'prop-5',
        fractionCode: 'Fracción Bosque',
        season: 'Alta',
        weeksPerYear: 8,
        totalPriceUSD: 92000,
        downPaymentPercent: 20,
        downPaymentUSD: 18400,
        monthlyPaymentUSD: 1350,
        termMonths: 60,
        status: 'Disponible',
        typology: 'Villa de Montaña 5 Recámaras'
      }
    ],
    nearbyExperiences: MOCK_EXPERIENCES_DESTINO.filter(e => e.location === 'Valle de Bravo'),
    nearbyRestaurants: MOCK_RESTAURANTS.filter(r => r.location === 'Valle de Bravo')
  }
];

export const DEFAULT_BOOKING: TripBooking = {
  id: 'booking-8821',
  propertyId: 'prop-1',
  propertyTitle: 'Casa Ananta - Telchac',
  propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  destination: 'Telchac',
  checkInDate: '2026-08-20',
  checkOutDate: '2026-08-24',
  guestsCount: 4,
  nights: 4,
  nightlyPrice: 16800,
  cleaningFee: 2200,
  serviceFee: 3100,
  totalMXN: 72500,
  status: 'Confirmado',
  unlockedServices: {
    flightsBooked: false,
    carRentalBooked: false,
    experiencesBooked: [],
    restaurantsBooked: []
  }
};

export const DEFAULT_ACQUISITION: AcquisitionProgress = {
  id: 'acq-1092',
  fractionalOptionId: 'frac-1-1',
  propertyTitle: 'Casa Ananta - Telchac',
  propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  fractionCode: 'Fracción Esmeralda',
  totalPriceUSD: 82000,
  downPaymentUSD: 16400,
  monthlyPaymentUSD: 1210,
  currentStepIndex: 1,
  steps: [
    { title: 'Selección & Intención Formal', subtitle: 'Apartado registrado con éxito', status: 'Completado' },
    { title: 'Datos del Titular & Expediente KYC', subtitle: 'Identificación oficial y comprobante de domicilio', status: 'En Progreso', actionText: 'Cargar Documentos' },
    { title: 'Redacción de Fideicomiso & Contrato', subtitle: 'Revisión por Notaría de Yucatán', status: 'Pendiente' },
    { title: 'Firma Digital Autógrafa', subtitle: 'Validación por biometría avanzada Liah', status: 'Pendiente' },
    { title: 'Pago de Enganche & Escrituración', subtitle: 'Transferencia formal a la cuenta fiduciaria', status: 'Pendiente' },
    { title: 'Integración a Mi Liah / Mis Fracciones', subtitle: 'Entrega de certificado patrimonial digital', status: 'Pendiente' }
  ],
  documents: [
    { name: 'Identificación Oficial (INE / Pasaporte)', type: 'PDF / JPG', uploaded: true },
    { name: 'Comprobante de Domicilio (<3 meses)', type: 'PDF', uploaded: false },
    { name: 'Cédula Fiscal RFC / Tax ID', type: 'PDF', uploaded: false }
  ],
  advisorName: 'Sofía de la Parra',
  advisorContact: 'sofia.patrimonio@liah.com'
};
