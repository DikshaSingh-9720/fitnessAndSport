import React, { useState } from 'react';
import { Flame, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { AyurvedaMeal } from '../types';
import { AyurvedaDietChart } from './AyurvedaDietChart';

export const NutritionGuide: React.FC = () => {
  const { language, t } = useLanguage();
  const { ayurvedaMeals, userProfile } = useApp();
  const [selectedMeal, setSelectedMeal] = useState<AyurvedaMeal | null>(null);
  const [filter, setFilter] = useState<'all' | 'vata' | 'pitta' | 'kapha'>(
    userProfile?.dosha_type || 'all'
  );

  const filteredMeals =
    filter === 'all'
      ? ayurvedaMeals
      : ayurvedaMeals.filter(meal => meal.dosha_type.includes(filter));

  const getDoshaColors = (doshas: string[]) => {
    const colors = {
      vata: 'bg-purple-100 text-purple-700',
      pitta: 'bg-red-100 text-red-700',
      kapha: 'bg-blue-100 text-blue-700'
    };
    return doshas.map(d => colors[d as keyof typeof colors] || 'bg-gray-100 text-gray-700');
  };

  const getMealTypeIcon = (type: string) => {
    const icons = {
      breakfast: '🌅',
      lunch: '☀️',
      dinner: '🌙',
      snack: '🍎'
    };
    return icons[type as keyof typeof icons] || '🍽️';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('nutrition.title')}</h2>
        <p className="text-xl text-gray-600">{t('nutrition.subtitle')}</p>
      </div>

      <AyurvedaDietChart />

      <div className="flex justify-center space-x-4 mb-8">
        {['all', 'vata', 'pitta', 'kapha'].map(dosha => (
          <button
            key={dosha}
            onClick={() => setFilter(dosha as any)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === dosha
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-300'
            }`}
          >
            {dosha === 'all' ? 'All Doshas' : t(`nutrition.${dosha}`)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMeals.map(meal => (
          <div
            key={meal.id}
            onClick={() => setSelectedMeal(meal)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:shadow-2xl"
          >
            <div className="h-48 bg-gradient-to-br from-green-400 to-blue-400 relative overflow-hidden">
              <img
                src={meal.image_url}
                alt={language === 'en' ? meal.name_en : meal.name_hi}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 text-3xl">
                {getMealTypeIcon(meal.meal_type)}
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {meal.dosha_type.map((dosha, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getDoshaColors(meal.dosha_type)[idx]}`}
                  >
                    {t(`nutrition.${dosha}`)}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {language === 'en' ? meal.name_en : meal.name_hi}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {language === 'en' ? meal.description_en : meal.description_hi}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-orange-600">
                  <Flame size={16} className="mr-1" />
                  <span className="font-semibold">{meal.calories} {t('nutrition.calories')}</span>
                </div>
                <div className="flex gap-1">
                  {meal.dietary_category.map(cat => (
                    <Leaf key={cat} size={16} className="text-green-600" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64 bg-gradient-to-br from-green-400 to-blue-400">
              <img
                src={selectedMeal.image_url}
                alt={language === 'en' ? selectedMeal.name_en : selectedMeal.name_hi}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedMeal(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-5xl">
                {getMealTypeIcon(selectedMeal.meal_type)}
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {language === 'en' ? selectedMeal.name_en : selectedMeal.name_hi}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' ? selectedMeal.description_en : selectedMeal.description_hi}
                  </p>
                </div>
                <div className="flex items-center bg-orange-100 px-4 py-2 rounded-lg">
                  <Flame size={20} className="mr-2 text-orange-600" />
                  <span className="font-bold text-orange-600">{selectedMeal.calories}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                {selectedMeal.dosha_type.map((dosha, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getDoshaColors(selectedMeal.dosha_type)[idx]}`}
                  >
                    {t(`nutrition.${dosha}`)}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {t('nutrition.ingredients')}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {(language === 'en' ? selectedMeal.ingredients_en : selectedMeal.ingredients_hi).map(
                      (ingredient, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700">{ingredient}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {t('nutrition.preparation')}
                  </h4>
                  <p className="text-gray-700 leading-relaxed bg-blue-50 p-6 rounded-xl">
                    {language === 'en' ? selectedMeal.preparation_en : selectedMeal.preparation_hi}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedMeal.dietary_category.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center"
                    >
                      <Leaf size={14} className="mr-1" />
                      {t(`diet.${cat}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
