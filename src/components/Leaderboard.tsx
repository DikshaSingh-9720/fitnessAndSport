import React from 'react';
import { Crown, Medal, Award, Flame } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export const Leaderboard: React.FC = () => {
  const { t } = useLanguage();
  const { leaderboard } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-400" />;
      case 3:
        return <Medal className="w-7 h-7 text-orange-400" />;
      default:
        return <Award className="w-6 h-6 text-gray-400" />;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-200 border-orange-400';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('leaderboard.title')}</h2>
        <p className="text-xl text-gray-600">{t('leaderboard.subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {leaderboard.slice(0, 3).map((entry, idx) => {
          const positions = [1, 0, 2];
          const actualEntry = leaderboard[positions[idx]];
          return (
            <div
              key={actualEntry.id}
              className={`${
                idx === 1 ? 'md:order-first' : ''
              } relative transform hover:scale-105 transition-all`}
            >
              <div
                className={`${getRankBackground(
                  actualEntry.rank
                )} border-4 rounded-2xl p-6 text-center shadow-xl`}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-3 shadow-lg">{getRankIcon(actualEntry.rank)}</div>
                </div>
                <div className="mt-4">
                  <div
                    className={`text-4xl font-bold mb-2 ${
                      actualEntry.rank === 1
                        ? 'text-yellow-600'
                        : actualEntry.rank === 2
                        ? 'text-gray-600'
                        : 'text-orange-600'
                    }`}
                  >
                    #{actualEntry.rank}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{actualEntry.user_name}</h3>
                  <div className="space-y-2">
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">{actualEntry.total_points}</div>
                      <div className="text-sm text-gray-600">{t('leaderboard.points')}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="text-lg font-bold text-green-600">
                          {actualEntry.challenges_completed}
                        </div>
                        <div className="text-xs text-gray-600">{t('leaderboard.challenges')}</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="text-lg font-bold text-blue-600">{actualEntry.yoga_sessions}</div>
                        <div className="text-xs text-gray-600">{t('leaderboard.sessions')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-green-500 p-6">
          <h3 className="text-2xl font-bold text-white">Complete Rankings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {leaderboard.map(entry => (
            <div
              key={entry.id}
              className="p-4 hover:bg-orange-50 transition-colors flex items-center gap-4"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full flex-shrink-0">
                <span className="text-lg font-bold text-orange-600">#{entry.rank}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-lg">{entry.user_name}</h4>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-orange-600 font-bold">
                    <Flame size={16} />
                    <span>{entry.total_points}</span>
                  </div>
                  <div className="text-gray-500 text-xs">{t('leaderboard.points')}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">{entry.challenges_completed}</div>
                  <div className="text-gray-500 text-xs">{t('leaderboard.challenges')}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{entry.yoga_sessions}</div>
                  <div className="text-gray-500 text-xs">{t('leaderboard.sessions')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-orange-100 via-white to-green-100 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Join the Movement!</h3>
        <p className="text-gray-600 mb-4">
          Complete challenges, practice yoga, and climb the leaderboard to become a FitBharat champion
        </p>
        <div className="flex justify-center gap-4">
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-orange-600">10,000+</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-green-600">50,000+</div>
            <div className="text-sm text-gray-600">Challenges Completed</div>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-blue-600">1M+</div>
            <div className="text-sm text-gray-600">Yoga Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
};
