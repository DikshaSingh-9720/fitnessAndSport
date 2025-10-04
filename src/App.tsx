import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider, useApp } from './contexts/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Onboarding } from './components/Onboarding';
import { YogaLibrary } from './components/YogaLibrary';
import { NutritionGuide } from './components/NutritionGuide';
import { SportsChallenges } from './components/SportsChallenges';
import { Leaderboard } from './components/Leaderboard';
import { Recommendations } from './components/Recommendations';

const AppContent: React.FC = () => {
  const { showOnboarding, currentView } = useApp();

  if (showOnboarding) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <Header />
      {currentView === 'home' && <Hero />}
      {currentView === 'yoga' && <YogaLibrary />}
      {currentView === 'nutrition' && <NutritionGuide />}
      {currentView === 'sports' && <SportsChallenges />}
      {currentView === 'leaderboard' && <Leaderboard />}
      {currentView === 'recommendations' && <Recommendations />}

      <footer className="bg-gradient-to-r from-orange-600 via-white to-green-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                फ
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                FitBharat
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              Empowering India through Yoga, Ayurveda, and Traditional Sports
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-orange-600 font-bold">🇮🇳</span>
                <span>Fit India Movement</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">💪</span>
                <span>Atmanirbhar Bharat</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              © 2024 FitBharat. Supporting India's wellness revolution.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
