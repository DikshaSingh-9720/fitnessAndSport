import React, { useState } from 'react';
import { Clock, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { YogaPose } from '../types';

export const YogaLibrary: React.FC = () => {
  const { language, t } = useLanguage();
  const { yogaPoses } = useApp();
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredPoses = filter === 'all'
    ? yogaPoses
    : yogaPoses.filter(pose => pose.difficulty_level === filter);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-orange-100 text-orange-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('yoga.title')}</h2>
        <p className="text-xl text-gray-600">{t('yoga.subtitle')}</p>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level as any)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === level
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-300'
            }`}
          >
            {level === 'all' ? 'All' : t(`yoga.${level}`)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPoses.map(pose => (
          <div
            key={pose.id}
            onClick={() => setSelectedPose(pose)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:shadow-2xl"
          >
            <div className="h-48 bg-gradient-to-br from-orange-400 to-green-400 relative overflow-hidden">
              <img
                src={pose.image_url}
                alt={language === 'en' ? pose.name_en : pose.name_hi}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(pose.difficulty_level)}`}>
                  {t(`yoga.${pose.difficulty_level}`)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {language === 'en' ? pose.name_en : pose.name_hi}
              </h3>
              <p className="text-sm text-gray-500 italic mb-3">{pose.sanskrit_name}</p>
              <p className="text-gray-600 mb-4">
                {language === 'en' ? pose.description_en : pose.description_hi}
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={16} className="mr-2" />
                <span>{pose.duration_minutes} {t('yoga.minutes')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPose && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPose(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64 bg-gradient-to-br from-orange-400 to-green-400">
              <img
                src={selectedPose.image_url}
                alt={language === 'en' ? selectedPose.name_en : selectedPose.name_hi}
                className="w-full h-full object-cover opacity-80"
              />
              <button
                onClick={() => setSelectedPose(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {language === 'en' ? selectedPose.name_en : selectedPose.name_hi}
                  </h3>
                  <p className="text-gray-500 italic text-lg">{selectedPose.sanskrit_name}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor(selectedPose.difficulty_level)}`}>
                  {t(`yoga.${selectedPose.difficulty_level}`)}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Star className="mr-2 text-orange-500" size={20} />
                    {t('yoga.benefits')}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'en' ? selectedPose.benefits_en : selectedPose.benefits_hi).map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('yoga.instructions')}</h4>
                  <ol className="space-y-2">
                    {(language === 'en' ? selectedPose.instructions_en : selectedPose.instructions_hi).map((instruction, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-semibold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center text-gray-600 bg-orange-50 p-4 rounded-lg">
                  <Clock size={20} className="mr-2 text-orange-500" />
                  <span className="font-medium">
                    {t('yoga.duration')}: {selectedPose.duration_minutes} {t('yoga.minutes')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
