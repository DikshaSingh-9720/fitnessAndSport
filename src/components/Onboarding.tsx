import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { UserProfile } from '../types';

export const Onboarding: React.FC = () => {
  const { t } = useLanguage();
  const { setUserProfile, setShowOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    fitness_goals: [] as string[],
    yoga_experience: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    dietary_preferences: [] as string[],
    dosha_type: undefined as 'vata' | 'pitta' | 'kapha' | undefined,
    sports_interests: [] as string[]
  });

  const fitnessGoals = ['weightLoss', 'muscleGain', 'flexibility', 'stress', 'endurance', 'overall'];
  const dietaryPrefs = ['vegetarian', 'vegan', 'nonveg', 'jain'];
  const sportsOptions = ['kabaddi', 'khokho', 'mallakhamb', 'gilli-danda'];

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    const profile: UserProfile = {
      id: '1',
      ...formData,
      language_preference: 'en',
      completed_challenge_ids: [],
      total_points: 0,
      yoga_sessions: 0
    };
    setUserProfile(profile);
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-green-500 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{t('onboarding.title')}</h2>
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all ${
                  i <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{t('onboarding.step1.title')}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('onboarding.step1.name')}
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{t('onboarding.step2.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {fitnessGoals.map(goal => (
                  <button
                    key={goal}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        fitness_goals: toggleArrayItem(formData.fitness_goals, goal)
                      })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.fitness_goals.includes(goal)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    {formData.fitness_goals.includes(goal) && (
                      <CheckCircle className="w-5 h-5 mb-2 text-orange-500" />
                    )}
                    <div className="font-medium">{t(`goals.${goal}`)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{t('onboarding.step3.title')}</h3>
              <div className="space-y-3">
                {['beginner', 'intermediate', 'advanced'].map(level => (
                  <button
                    key={level}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        yoga_experience: level as 'beginner' | 'intermediate' | 'advanced'
                      })
                    }
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      formData.yoga_experience === level
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-lg">{t(`yoga.${level}`)}</div>
                      {formData.yoga_experience === level && (
                        <CheckCircle className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{t('onboarding.step4.title')}</h3>
              <div className="space-y-3">
                {dietaryPrefs.map(pref => (
                  <button
                    key={pref}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        dietary_preferences: toggleArrayItem(formData.dietary_preferences, pref)
                      })
                    }
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      formData.dietary_preferences.includes(pref)
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-lg">{t(`diet.${pref}`)}</div>
                      {formData.dietary_preferences.includes(pref) && (
                        <CheckCircle className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your Dosha Type (Optional)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['vata', 'pitta', 'kapha'] as const).map(dosha => (
                    <button
                      key={dosha}
                      onClick={() => setFormData({ ...formData, dosha_type: dosha })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.dosha_type === dosha
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <div className="font-medium">{t(`nutrition.${dosha}`)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{t('onboarding.step5.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {sportsOptions.map(sport => (
                  <button
                    key={sport}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        sports_interests: toggleArrayItem(formData.sports_interests, sport)
                      })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.sports_interests.includes(sport)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    {formData.sports_interests.includes(sport) && (
                      <CheckCircle className="w-5 h-5 mb-2 text-orange-500" />
                    )}
                    <div className="font-medium">{t(`sports.${sport}`)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-8 pb-8 flex justify-between">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>{t('onboarding.back')}</span>
            </button>
          ) : (
            <div />
          )}
          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.full_name}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{t('onboarding.next')}</span>
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:from-orange-600 hover:to-green-600 transition-all"
            >
              <span>{t('onboarding.finish')}</span>
              <CheckCircle size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
