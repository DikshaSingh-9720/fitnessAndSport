import React, { useState } from 'react';
import { Trophy, Calendar, Zap, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { SportsChallenge } from '../types';

export const SportsChallenges: React.FC = () => {
  const { language, t } = useLanguage();
  const { sportsChallenges } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<SportsChallenge | null>(null);
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSportIcon = (sportType: string) => {
    const icons = {
      kabaddi: '🤼',
      'kho-kho': '🏃',
      mallakhamb: '🤸',
      'gilli-danda': '🏏'
    };
    return icons[sportType as keyof typeof icons] || '⚡';
  };

  const handleJoinChallenge = (challengeId: string) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges([...joinedChallenges, challengeId]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('sports.title')}</h2>
        <p className="text-xl text-gray-600">{t('sports.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {sportsChallenges.map(challenge => (
          <div
            key={challenge.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all hover:shadow-2xl"
          >
            <div className="relative h-56 bg-gradient-to-br from-orange-500 via-yellow-400 to-red-500 overflow-hidden">
              <img
                src={challenge.image_url}
                alt={language === 'en' ? challenge.name_en : challenge.name_hi}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 text-6xl">
                {getSportIcon(challenge.sport_type)}
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getDifficultyColor(
                    challenge.difficulty_level
                  )}`}
                >
                  {t(`yoga.${challenge.difficulty_level}`)}
                </span>
                <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold flex items-center">
                  <Trophy size={12} className="mr-1" />
                  {challenge.points} {t('sports.points')}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {language === 'en' ? challenge.name_en : challenge.name_hi}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {language === 'en' ? challenge.description_en : challenge.description_hi}
              </p>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-orange-500" />
                  <span>
                    {challenge.duration_days} {t('sports.days')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Target size={16} className="mr-2 text-green-500" />
                  <span>
                    {(language === 'en' ? challenge.requirements_en : challenge.requirements_hi).length}{' '}
                    tasks
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className="flex-1 px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                >
                  View Details
                </button>
                {joinedChallenges.includes(challenge.id) ? (
                  <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold flex items-center justify-center">
                    <Zap size={18} className="mr-2" />
                    Joined
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                  >
                    {t('sports.join')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedChallenge(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-72 bg-gradient-to-br from-orange-500 via-yellow-400 to-red-500 overflow-hidden">
              <img
                src={selectedChallenge.image_url}
                alt={language === 'en' ? selectedChallenge.name_en : selectedChallenge.name_hi}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={() => setSelectedChallenge(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-6xl mb-4">{getSportIcon(selectedChallenge.sport_type)}</div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {language === 'en' ? selectedChallenge.name_en : selectedChallenge.name_hi}
                </h3>
                <p className="text-white/90 text-lg">
                  {language === 'en' ? selectedChallenge.description_en : selectedChallenge.description_hi}
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-orange-50 p-4 rounded-xl text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold text-gray-800">{selectedChallenge.duration_days}</div>
                  <div className="text-sm text-gray-600">{t('sports.days')}</div>
                </div>
                <div className="flex-1 bg-yellow-50 p-4 rounded-xl text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold text-gray-800">{selectedChallenge.points}</div>
                  <div className="text-sm text-gray-600">{t('sports.points')}</div>
                </div>
                <div className="flex-1 bg-green-50 p-4 rounded-xl text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold text-gray-800">
                    {
                      (language === 'en'
                        ? selectedChallenge.requirements_en
                        : selectedChallenge.requirements_hi
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Tasks</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Target className="mr-2 text-orange-500" />
                  Challenge Requirements
                </h4>
                <div className="space-y-3">
                  {(language === 'en'
                    ? selectedChallenge.requirements_en
                    : selectedChallenge.requirements_hi
                  ).map((req, idx) => (
                    <div key={idx} className="flex items-start bg-white p-3 rounded-lg">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {joinedChallenges.includes(selectedChallenge.id) ? (
                  <button className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-bold text-lg flex items-center justify-center">
                    <Zap size={20} className="mr-2" />
                    Challenge Joined!
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleJoinChallenge(selectedChallenge.id);
                      setSelectedChallenge(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                  >
                    {t('sports.join')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
