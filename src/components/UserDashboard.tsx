import React, { useMemo } from 'react';
import { Award, CheckCircle, Flame, User as UserIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AyurvedaDietChart } from './AyurvedaDietChart';

export const UserDashboard: React.FC = () => {
  const { userProfile, leaderboard, sportsChallenges } = useApp();
  const { language, t } = useLanguage();

  if (!userProfile) {
    return null;
  }

  const myLeaderboardEntry = useMemo(() => {
    return leaderboard.find(entry => entry.user_name === userProfile.full_name);
  }, [leaderboard, userProfile.full_name]);

  const completedChallenges = useMemo(() => {
    const completedSet = new Set(userProfile.completed_challenge_ids);
    return sportsChallenges.filter(ch => completedSet.has(ch.id));
  }, [sportsChallenges, userProfile.completed_challenge_ids]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <section className="bg-white/80 backdrop-blur rounded-3xl border border-orange-100 shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-white">
            <UserIcon className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{userProfile.full_name}</h2>
            <p className="text-gray-600 text-sm">
              {language === 'en' ? 'Goals' : 'लक्ष्य'}: {userProfile.fitness_goals.map(g => t(`goals.${g}`)).join(', ')}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-orange-600 font-bold">
                <Flame size={18} />
                <span>{userProfile.total_points}</span>
              </div>
              <div className="text-xs text-gray-500">{t('leaderboard.points')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">{userProfile.completed_challenge_ids.length}</div>
              <div className="text-xs text-gray-500">{t('leaderboard.challenges')}</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">{userProfile.yoga_sessions}</div>
              <div className="text-xs text-gray-500">{t('leaderboard.sessions')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              {language === 'en' ? 'Your Ranking' : 'आपकी रैंकिंग'}
            </h3>
            {myLeaderboardEntry && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                #{myLeaderboardEntry.rank}
              </span>
            )}
          </div>
          {myLeaderboardEntry ? (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">#{myLeaderboardEntry.rank}</div>
                <div className="text-xs text-gray-600">{t('leaderboard.rank')}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{myLeaderboardEntry.challenges_completed}</div>
                <div className="text-xs text-gray-600">{t('leaderboard.challenges')}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">{myLeaderboardEntry.yoga_sessions}</div>
                <div className="text-xs text-gray-600">{t('leaderboard.sessions')}</div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">{language === 'en' ? 'You are not ranked yet.' : 'आपकी रैंकिंग अभी नहीं है।'}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {language === 'en' ? 'Completed Challenges' : 'पूर्ण चुनौतियाँ'}
            </h3>
            <span className="text-sm text-gray-500">{completedChallenges.length}</span>
          </div>
          {completedChallenges.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {completedChallenges.map(ch => (
                <li key={ch.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">{language === 'en' ? ch.name_en : ch.name_hi}</div>
                    <div className="text-xs text-gray-500">{language === 'en' ? ch.description_en : ch.description_hi}</div>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">+{ch.points}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">{language === 'en' ? 'No challenges completed yet.' : 'अभी तक कोई चुनौती पूरी नहीं हुई।'}</p>
          )}
        </div>
      </section>

      <AyurvedaDietChart />
    </div>
  );
}
