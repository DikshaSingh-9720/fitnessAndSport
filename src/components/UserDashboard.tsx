import React, { useMemo } from 'react';
import { Award, CheckCircle, Flame, User as UserIcon, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AyurvedaDietChart } from './AyurvedaDietChart';

export const UserDashboard: React.FC = () => {
  const { userProfile, leaderboard, sportsChallenges } = useApp();
  const { language, t } = useLanguage();

  if (!userProfile) return null;

  const myLeaderboardEntry = useMemo(
    () => leaderboard.find(entry => entry.user_name === userProfile.full_name),
    [leaderboard, userProfile.full_name]
  );

  const completedChallenges = useMemo(() => {
    const completedSet = new Set(userProfile.completed_challenge_ids);
    return sportsChallenges.filter(ch => completedSet.has(ch.id));
  }, [sportsChallenges, userProfile.completed_challenge_ids]);

  const completionPercentage =
    sportsChallenges.length > 0
      ? Math.round((completedChallenges.length / sportsChallenges.length) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* User Info Card */}
      <section className="bg-white/80 backdrop-blur rounded-3xl border border-orange-100 shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-white">
          <UserIcon className="w-10 h-10" />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{userProfile.full_name}</h2>
          <p className="text-gray-600 text-sm">
            {language === 'en' ? 'Goals' : 'लक्ष्य'}: {userProfile.fitness_goals.map(g => t(`goals.${g}`)).join(', ')}
          </p>
          <div className="flex gap-3 mt-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
              {language === 'en' ? 'Yoga' : 'योग'}: {t(`yoga.${userProfile.yoga_experience}`)}
            </span>
            {userProfile.dosha_type && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold">
                {t(`nutrition.${userProfile.dosha_type}`)}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-orange-600 font-bold">
              <Flame size={18} />
              <span>{userProfile.total_points}</span>
            </div>
            <div className="text-xs text-gray-500">{t('leaderboard.points')}</div>
          </div>
          <div>
            <div className="font-bold text-green-600">{completedChallenges.length}</div>
            <div className="text-xs text-gray-500">{t('leaderboard.challenges')}</div>
          </div>
          <div>
            <div className="font-bold text-blue-600">{userProfile.yoga_sessions}</div>
            <div className="text-xs text-gray-500">{t('leaderboard.sessions')}</div>
          </div>
        </div>
      </section>

      {/* Leaderboard & Completed Challenges */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Ranking Card */}
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

          {/* Completion Progress */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Challenge Completion' : 'पूर्ण चुनौतियाँ'}</p>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-3 bg-green-500" style={{ width: `${completionPercentage}%` }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">{completionPercentage}%</p>
          </div>
        </div>

        {/* Completed Challenges */}
        <div className="bg-white rounded-2xl shadow p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              {language === 'en' ? 'Completed Challenges' : 'पूर्ण चुनौतियाँ'}
            </h3>
            <span className="text-sm text-gray-500">{completedChallenges.length}</span>
          </div>
          {completedChallenges.length > 0 ? (
            <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {completedChallenges.map(ch => (
                <li key={ch.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800 flex items-center gap-1">
                      {language === 'en' ? ch.name_en : ch.name_hi}
                      <Star size={14} className="text-yellow-500" />
                    </div>
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

      {/* Ayurveda Diet Chart */}
      <AyurvedaDietChart />
    </div>
  );
};
