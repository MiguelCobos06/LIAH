import React, { useState, useEffect } from 'react';
import { ActiveScreen, Property, FractionalOption, PropertyExperienceCategory, ViewMode, TripBooking, AcquisitionProgress } from './types';
import { MOCK_PROPERTIES, DEFAULT_BOOKING, DEFAULT_ACQUISITION } from './data/mockData';
import { Header } from './components/Header';
import { ExploreView } from './components/ExploreView';
import { SearchResultsView } from './components/SearchResultsView';
import { PropertyDetailView } from './components/PropertyDetailView';
import { CheckoutView } from './components/CheckoutView';
import { TripConfirmedView } from './components/TripConfirmedView';
import { FractionsListView } from './components/FractionsListView';
import { FractionDetailView } from './components/FractionDetailView';
import { AcquisitionProgressView } from './components/AcquisitionProgressView';
import { ActiveTripView } from './components/ActiveTripView';
import { DestinationsView } from './components/DestinationsView';
import { ExperiencesView } from './components/ExperiencesView';
import { MyTripsView } from './components/MyTripsView';
import { MiLiahView } from './components/MiLiahView';
import { LiahAiConciergeModal } from './components/LiahAiConciergeModal';
import { LoginModal } from './components/LoginModal';
import { BreadcrumbNav } from './components/BreadcrumbNav';
import { MiLiahSidebar } from './components/MiLiahSidebar';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('01_EXPLORAR');
  const [viewMode, setViewMode] = useState<ViewMode>('DESKTOP');
  const [hasActiveTrip, setHasActiveTrip] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PropertyExperienceCategory | 'Todos'>('Todos');

  // Regional Preferences: Currency and Language
  const [currency, setCurrency] = useState<'MXN' | 'USD' | 'EUR'>('MXN');
  const [language, setLanguage] = useState<'ES' | 'EN'>('ES');

  // User Authentication & Account State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('Miguel Cobos');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isMiLiahSidebarOpen, setIsMiLiahSidebarOpen] = useState<boolean>(false);

  // Selected Property & Fraction State
  const [selectedProperty, setSelectedProperty] = useState<Property>(MOCK_PROPERTIES[0]);
  const [selectedFraction, setSelectedFraction] = useState<FractionalOption>(MOCK_PROPERTIES[0].fractions![0]);
  const [propertyInitialTab, setPropertyInitialTab] = useState<'hospedaje' | 'patrimonial'>('hospedaje');

  // Active User Booking & Acquisition
  const [userBooking, setUserBooking] = useState<TripBooking>(DEFAULT_BOOKING);
  const [userAcquisition, setUserAcquisition] = useState<AcquisitionProgress>(DEFAULT_ACQUISITION);

  // AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Smooth scroll to top when screen changes to avoid abrupt page jumps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeScreen]);

  const handleSelectProperty = (property: Property, initialTab: 'hospedaje' | 'patrimonial' = 'hospedaje') => {
    setSelectedProperty(property);
    setPropertyInitialTab(initialTab);
    if (property.fractions && property.fractions.length > 0) {
      setSelectedFraction(property.fractions[0]);
    }
  };

  const handleSelectFraction = (fraction: FractionalOption) => {
    setSelectedFraction(fraction);
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case '01_EXPLORAR':
        return (
          <ExploreView
            properties={MOCK_PROPERTIES}
            onSelectProperty={handleSelectProperty}
            setActiveScreen={setActiveScreen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenAiConcierge={() => setIsAiModalOpen(true)}
            currency={currency}
          />
        );

      case '02_RESULTADOS':
        return (
          <SearchResultsView
            onSelectProperty={handleSelectProperty}
            setActiveScreen={setActiveScreen}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );

      case '03_FICHA_HOSPEDAJE':
        return (
          <PropertyDetailView
            property={selectedProperty}
            initialContext="hospedaje"
            setActiveScreen={setActiveScreen}
            onSelectFraction={handleSelectFraction}
          />
        );

      case '04_CHECKOUT':
        return (
          <CheckoutView
            setActiveScreen={setActiveScreen}
            onConfirmBooking={(booking) => {
              setUserBooking(booking);
              setHasActiveTrip(true);
            }}
          />
        );

      case '05_HOSPEDAJE_CONFIRMADO':
        return (
          <TripConfirmedView
            booking={userBooking}
            setActiveScreen={setActiveScreen}
            onActivateTripMode={() => setHasActiveTrip(true)}
          />
        );

      case '06_FICHA_PATRIMONIAL':
        return (
          <PropertyDetailView
            property={selectedProperty}
            initialContext="patrimonial"
            setActiveScreen={setActiveScreen}
            onSelectFraction={handleSelectFraction}
          />
        );

      case '07_FRACCIONES_DISPONIBLES':
        return (
          <FractionsListView
            property={selectedProperty}
            setActiveScreen={setActiveScreen}
            onSelectFraction={handleSelectFraction}
          />
        );

      case '08_FRACCION_SIMULACION':
        return (
          <FractionDetailView
            property={selectedProperty}
            fraction={selectedFraction}
            setActiveScreen={setActiveScreen}
            onInitiateAcquisition={(fraction) => {
              setSelectedFraction(fraction);
            }}
          />
        );

      case '09_MI_ADQUISICION':
        return (
          <AcquisitionProgressView
            acquisition={userAcquisition}
            setActiveScreen={setActiveScreen}
          />
        );

      case '10_VIAJE_ACTIVO':
        return (
          <ActiveTripView
            setActiveScreen={setActiveScreen}
            onOpenAiConcierge={() => setIsAiModalOpen(true)}
          />
        );

      case 'DESTINOS':
        return (
          <DestinationsView
            setActiveScreen={setActiveScreen}
            onSelectDestination={(dest) => {
              setSearchQuery(dest);
            }}
          />
        );

      case 'EXPERIENCIAS':
        return (
          <ExperiencesView
            setActiveScreen={setActiveScreen}
          />
        );

      case 'VIAJES':
        return (
          <MyTripsView
            booking={userBooking}
            setActiveScreen={setActiveScreen}
            onActivateTripMode={() => setHasActiveTrip(true)}
          />
        );

      case 'MI_LIAH':
        return (
          <MiLiahView
            setActiveScreen={setActiveScreen}
          />
        );

      default:
        return (
          <ExploreView
            properties={MOCK_PROPERTIES}
            onSelectProperty={handleSelectProperty}
            setActiveScreen={setActiveScreen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenAiConcierge={() => setIsAiModalOpen(true)}
            currency={currency}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FDFF] text-[#252425] flex flex-col font-sans selection:bg-[#66C2F1] selection:text-[#252425]">
      {/* Header with Search, Brand logo, Currency/Language & Controls */}
      <Header
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        viewMode={viewMode}
        setViewMode={setViewMode}
        hasActiveTrip={hasActiveTrip}
        setHasActiveTrip={setHasActiveTrip}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAiConcierge={() => setIsAiModalOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenMiLiahSidebar={() => setIsMiLiahSidebarOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Global Reassuring Breadcrumb Trail */}
      <BreadcrumbNav
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        selectedPropertyTitle={selectedProperty?.title}
        selectedDestinationName={
          typeof selectedProperty?.location === 'object'
            ? selectedProperty?.location?.destination
            : typeof selectedProperty?.location === 'string'
            ? selectedProperty?.location
            : undefined
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* If Mobile View mode is explicitly selected by reviewer, frame it in a mobile bezel */}
        {viewMode === 'MOBILE' ? (
          <div className="flex justify-center py-4">
            <div className="w-[390px] min-h-[780px] max-h-[85vh] overflow-y-auto bg-white rounded-[40px] border-[10px] border-[#252425] shadow-2xl p-4 relative no-scrollbar">
              {/* Top Mobile Camera Notch */}
              <div className="w-32 h-4 bg-[#252425] rounded-b-xl mx-auto mb-4 sticky top-0 z-50"></div>
              {renderActiveScreen()}
            </div>
          </div>
        ) : (
          /* Desktop Fluid Responsive View */
          renderActiveScreen()
        )}
      </main>

      {/* Mi Liah Sidebar Drawer */}
      <MiLiahSidebar
        isOpen={isMiLiahSidebarOpen}
        onClose={() => setIsMiLiahSidebarOpen(false)}
        setActiveScreen={setActiveScreen}
        userName={userName}
        isLoggedIn={isLoggedIn}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenAiConcierge={() => setIsAiModalOpen(true)}
      />

      {/* Liah AI Assistant Modal */}
      <LiahAiConciergeModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentContext={{
          activeScreen,
          selectedPropertyTitle: selectedProperty.title,
          hasActiveTrip
        }}
        onApplySearch={(query) => {
          setSearchQuery(query);
          setActiveScreen('02_RESULTADOS');
        }}
      />

      {/* User Login & Profile Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userName={userName}
        setUserName={setUserName}
      />
    </div>
  );
}
