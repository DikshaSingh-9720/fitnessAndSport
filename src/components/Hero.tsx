import React from 'react';
import { Heart, Award, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setCurrentView } = useApp();

  return (
    <section className="relative">
      {/* Hero Background */}
      <div
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 103, 0, 0.7), rgba(19, 136, 8, 0.7)), url(https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            
            {/* Badge */}
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {t('fitindia.message')} 🇮🇳
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('hero.subtitle')}
            </p>

            {/* Call-to-Action Button */}
            <button
              onClick={() => setCurrentView('recommendations')}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition-transform shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              {t('hero.cta')}
            </button>

            {/* Features */}
            <div className="mt-12 flex flex-wrap gap-6 md:gap-8">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-white" />
                <span className="text-sm font-medium text-white/90">Holistic Wellness</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-white" />
                <span className="text-sm font-medium text-white/90">Traditional Sports</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-white" />
                <span className="text-sm font-medium text-white/90">Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-600 via-white to-green-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-4 text-center">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
              <span className="font-semibold text-gray-800">{t('atmanirbhar.message')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
