export type PropertyExperienceCategory = 
  | 'Bosque'
  | 'Ciudad'
  | 'Colonial'
  | 'Desierto'
  | 'Montaña'
  | 'Nieve'
  | 'Playa'
  | 'Rancho'
  | 'Selva'
  | 'Viñedo';

export type DestinationName = 
  | 'Telchac'
  | 'Valladolid'
  | 'San Miguel de Allende'
  | 'Valle de Bravo'
  | 'Tulum'
  | 'Punta Mita'
  | 'Los Cabos'
  | 'Oaxaca'
  | 'Holbox';

export interface PropertyCertification {
  type: 'Freedom' | 'Experience';
  description: string;
}

export interface FractionalOption {
  id: string;
  propertyId: string;
  fractionCode: string; // e.g. "Diamante Semanal"
  season: 'Alta' | 'Media' | 'Baja' | 'Anual Combinada' | 'Top Demanda' | 'Media Alta';
  weeksPerYear: number;
  totalPriceUSD: number;
  totalPriceMXN?: number;
  downPaymentPercent: number; // e.g. 30%
  downPaymentUSD: number;
  downPaymentMXN?: number;
  monthlyPaymentUSD: number;
  monthlyPaymentMXN?: number;
  termMonths: number;
  status: 'Disponible' | 'Reservada' | 'Adquirida';
  typology: string; // e.g. "3 Recámaras + Rooftop Privado"
  certification?: PropertyCertification;
  // New official Liah fraction attributes from chart
  tier?: 'Diamante' | 'Platino' | 'Oro' | 'Plata';
  frequency?: 'Semanal' | 'Quincenal' | 'Mensual';
  nightsPerYear?: number; // 7, 14, 30
  estimatedOccupancy?: string; // e.g. "85%", "65%", "55%"
  availableCount?: number; // e.g. 7, 9, 2
  specificMonthsNote?: string; // e.g. "Mes completo de junio"
  deliveryDate?: string; // e.g. "Diciembre 2029"
}

export interface DestinationExperience {
  id: string;
  title: string;
  category: 'Recreativa' | 'Gastronomía' | 'Bienestar' | 'Aventura' | 'Cultura' | 'Vida Nocturna';
  image: string;
  priceMXN: number;
  duration: string;
  rating: number;
  location: string;
  description: string;
}

export interface RestaurantItem {
  id: string;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  priceLevel: string;
  location: string;
  liahRecommended: boolean;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  destination: DestinationName;
  locationDetails: string;
  propertyExperience: PropertyExperienceCategory;
  isLiahOriginal: boolean;
  heroImage: string;
  galleryImages: string[];
  capacityGuests: number;
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  nightlyPriceMXN: number;
  rating: number;
  reviewsCount: number;
  description: string;
  architectureHighlights: string[];
  amenities: string[];
  coordinates: { lat: number; lng: number };
  hasFractionalOption: boolean;
  isHospitalityAvailable?: boolean;
  fractionalStartPriceUSD?: number;
  fractions?: FractionalOption[];
  nearbyExperiences?: DestinationExperience[];
  nearbyRestaurants?: RestaurantItem[];
  constructionStatus?: 'Llave en mano' | 'Preventa / Avance 85%' | 'Render Conceptual';
  specs?: {
    guestsCapacity?: number;
    bedroomsCount?: number;
    bathroomsCount?: number;
    constructionAreaSqM?: number;
  };
}

export interface TripBooking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  destination: DestinationName;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  nights: number;
  nightlyPrice: number;
  cleaningFee: number;
  serviceFee: number;
  totalMXN: number;
  status: 'Confirmado' | 'En Proceso' | 'Completado';
  unlockedServices?: {
    flightsBooked?: boolean;
    carRentalBooked?: boolean;
    experiencesBooked?: DestinationExperience[];
    restaurantsBooked?: RestaurantItem[];
  };
}

export interface AcquisitionProgress {
  id: string;
  fractionalOptionId: string;
  propertyTitle: string;
  propertyImage: string;
  fractionCode: string;
  totalPriceUSD: number;
  downPaymentUSD: number;
  monthlyPaymentUSD: number;
  currentStepIndex: number; // 0 to 5
  steps: {
    title: string;
    subtitle: string;
    status: 'Completado' | 'En Progreso' | 'Pendiente';
    actionText?: string;
  }[];
  documents: {
    name: string;
    type: string;
    uploaded: boolean;
  }[];
  advisorName: string;
  advisorContact: string;
}

export type ActiveScreen = 
  | '01_EXPLORAR'
  | '02_RESULTADOS'
  | '03_FICHA_HOSPEDAJE'
  | '04_CHECKOUT'
  | '05_HOSPEDAJE_CONFIRMADO'
  | '06_FICHA_PATRIMONIAL'
  | '07_FRACCIONES_DISPONIBLES'
  | '08_FRACCION_SIMULACION'
  | '09_MI_ADQUISICION'
  | '10_VIAJE_ACTIVO'
  | 'DESTINOS'
  | 'EXPERIENCIAS'
  | 'VIAJES'
  | 'MI_LIAH';

export type ViewMode = 'MOBILE' | 'DESKTOP';
