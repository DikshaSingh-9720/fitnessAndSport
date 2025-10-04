import React from 'react';
import { Sparkles, Heart, Leaf, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export const Recommendations: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, yogaPoses, ayurvedaMeals, sportsChallenges, setCurrentView } = useApp();

  const getRecommendedYoga = () => {
    if (!userProfile) return [];
    const level = userProfile.yoga_experience;
    return yogaPoses.filter(pose => pose.difficulty_level === level).slice(0, 3);
  };

  const getRecommendedMeals = () => {
    if (!userProfile) return [];
    const dosha = userProfile.dosha_type;
    if (dosha) {
      return ayurvedaMeals.filter(meal => meal.dosha_type.includes(dosha)).slice(0, 3);
    }
    return ayurvedaMeals
      .filter(meal =>
        meal.dietary_category.some(cat => userProfile.dietary_preferences.includes(cat))
      )
      .slice(0, 3);
  };

  const getRecommendedChallenges = () => {
    if (!userProfile) return [];
    const level = userProfile.yoga_experience;
    return sportsChallenges
      .filter(
        challenge =>
          challenge.difficulty_level === level ||
          userProfile.sports_interests.includes(challenge.sport_type)
      )
      .slice(0, 3);
  };

  const recommendedYoga = getRecommendedYoga();
  const recommendedMeals = getRecommendedMeals();
  const recommendedChallenges = getRecommendedChallenges();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-8 h-8 text-orange-500" />
          <h2 className="text-4xl font-bold text-gray-800">{t('recommendations.title')}</h2>
          <Sparkles className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-xl text-gray-600">
          Based on your profile: {userProfile?.yoga_experience} level,{' '}
          {userProfile?.dosha_type && `${userProfile.dosha_type} dosha, `}
          {userProfile?.fitness_goals.length} fitness goals
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Heart className="mr-3 text-orange-500" />
            {t('recommendations.yoga')}
          </h3>
          <button
            onClick={() => setCurrentView('yoga')}
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendedYoga.map(pose => (
            <div
              key={pose.id}
              className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg"
            >
              <div className="w-full h-40 bg-gradient-to-br from-orange-300 to-pink-300 rounded-lg mb-4 overflow-hidden">
                <img
                  src={pose.image_url}
                  alt={language === 'en' ? pose.name_en : pose.name_hi}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'en' ? pose.name_en : pose.name_hi}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{pose.sanskrit_name}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-600 font-semibold">
                  {t(`yoga.${pose.difficulty_level}`)}
                </span>
                <span className="text-gray-600">{pose.duration_minutes} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Leaf className="mr-3 text-green-500" />
            {t('recommendations.nutrition')}
          </h3>
          <button
            onClick={() => setCurrentView('nutrition')}
            className="text-green-500 hover:text-green-600 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendedMeals.map(meal => (
            <div
              key={meal.id}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg"
            >
              <div className="w-full h-40 bg-gradient-to-br from-green-300 to-blue-300 rounded-lg mb-4 overflow-hidden">
                <img
                  src={meal.image_url}
                  alt={language === 'en' ? meal.name_en : meal.name_hi}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'en' ? meal.name_en : meal.name_hi}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                {meal.dosha_type.map((dosha, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-200 text-green-700 rounded-full text-xs font-semibold"
                  >
                    {t(`nutrition.${dosha}`)}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600 font-semibold">{meal.meal_type}</span>
                <span className="text-gray-600">{meal.calories} cal</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Zap className="mr-3 text-yellow-500" />
            {t('recommendations.sports')}
          </h3>
          <button
            onClick={() => setCurrentView('sports')}
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recommendedChallenges.map(challenge => (
            <div
              key={challenge.id}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-all hover:shadow-lg"
            >
              <div className="w-full h-40 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-lg mb-4 overflow-hidden">
                <img
                  src={challenge.image_url}
                  alt={language === 'en' ? challenge.name_en : challenge.name_hi}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'en' ? challenge.name_en : challenge.name_hi}
              </h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {language === 'en' ? challenge.description_en : challenge.description_hi}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-600 font-semibold">{challenge.duration_days} days</span>
                <span className="text-orange-600 font-bold">{challenge.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-3xl font-bold mb-4">Your Personalized FitBharat Journey Awaits!</h3>
        <p className="text-lg mb-6 text-white/90">
          These recommendations are tailored specifically for you based on your fitness goals, experience
          level, and preferences. Start your journey today and become part of the Fit India Movement!
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentView('yoga')}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-orange-50 transition-colors"
          >
            Start Yoga Practice
          </button>
          <button
            onClick={() => setCurrentView('sports')}
            className="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors"
          >
            Join a Challenge
          </button>
        </div>
      </div>
    </div>
  );
};
