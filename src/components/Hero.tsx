import React from 'react';
import { Heart, Award, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setCurrentView } = useApp();

  return (
    <div className="relative">
      <div
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 103, 0, 0.7), rgba(19, 136, 8, 0.7)), url(https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {t('fitindia.message')} 🇮🇳
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('hero.subtitle')}
            </p>
            <button
              onClick={() => setCurrentView('recommendations')}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all shadow-2xl"
            >
              {t('hero.cta')}
            </button>
            <div className="mt-12 flex space-x-8">
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6" />
                <span className="text-sm font-medium">Holistic Wellness</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6" />
                <span className="text-sm font-medium">Traditional Sports</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span className="text-sm font-medium">Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-600 via-white to-green-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
              <span className="font-semibold text-gray-800">{t('atmanirbhar.message')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
