import { useMemo } from 'react';
import { Droplet, Utensils, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { goalDietPlans } from '../data/ayurvedaDietPlans';
import { AyurvedaMeal } from '../types';

export const AyurvedaDietChart: React.FC = () => {
  const { language, t } = useLanguage();
  const { userProfile, ayurvedaMeals } = useApp();

  const mealMap = useMemo(() => {
    return new Map<string, AyurvedaMeal>(ayurvedaMeals.map(meal => [meal.id, meal]));
  }, [ayurvedaMeals]);

  if (!userProfile) {
    return null;
  }

  const activePlans = goalDietPlans.filter(plan => userProfile.fitness_goals.includes(plan.goal));

  if (activePlans.length === 0) {
    return (
      <section className="mb-12 bg-white/70 backdrop-blur rounded-2xl p-8 border border-green-100 shadow-sm">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">{t('dietChart.title')}</h3>
        <p className="text-gray-600 mb-4">{t('dietChart.subtitle')}</p>
        <p className="text-gray-500">{t('dietChart.empty')}</p>
      </section>
    );
  }

  return (
    <section className="mb-16 bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-lg">
      <div className="px-8 pt-8 pb-4 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">{t('dietChart.title')}</h3>
        <p className="text-lg text-gray-600">{t('dietChart.subtitle')}</p>
      </div>
      <div className="px-8 pb-10 space-y-10">
        {activePlans.map(plan => (
          <div
            key={plan.goal}
            className="bg-gradient-to-br from-green-50 via-white to-orange-50 border border-green-100 rounded-2xl p-6 shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-3">
                  {t(`goals.${plan.goal}`)}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  {t('dietChart.focus')}
                </h4>
                <p className="text-gray-700 leading-relaxed">{plan.focus[language]}</p>
              </div>
              <div className="md:w-1/3 bg-white/70 border border-green-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <Droplet className="w-5 h-5" />
                  {t('dietChart.hydration')}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{plan.hydration[language]}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {plan.slots.map(slot => {
                const meals = slot.mealIds?.map(id => mealMap.get(id)).filter(Boolean) as AyurvedaMeal[];
                return (
                  <div
                    key={`${plan.goal}-${slot.period.en}`}
                    className="bg-white/80 border border-orange-100 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm uppercase tracking-wide text-orange-500 font-semibold">
                          {slot.period[language]}
                        </p>
                        <p className="text-gray-700 mt-1 leading-relaxed">{slot.suggestion[language]}</p>
                      </div>
                      {meals.length > 0 && (
                        <span className="text-xs font-semibold text-white bg-orange-500 px-2 py-1 rounded-full">
                          {t('dietChart.meals')} {meals.length}
                        </span>
                      )}
                    </div>
                    {meals.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {meals.map(meal => (
                          <div
                            key={meal.id}
                            className="bg-gradient-to-br from-green-100 via-white to-green-50 rounded-xl overflow-hidden border border-green-200"
                          >
                            <div className="h-24 w-full overflow-hidden">
                              <img
                                src={meal.image_url}
                                alt={language === 'en' ? meal.name_en : meal.name_hi}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <p className="font-semibold text-gray-800">
                                {language === 'en' ? meal.name_en : meal.name_hi}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                                <span className="capitalize">{meal.meal_type}</span>
                                <span>{meal.calories} kcal</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {meal.dosha_type.map(dosha => (
                                  <span
                                    key={dosha}
                                    className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-200 text-green-700"
                                  >
                                    {t(`nutrition.${dosha}`)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white/70 border border-green-100 rounded-xl p-5">
              <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                {t('dietChart.lifestyleTips')}
              </h5>
              <ul className="space-y-2">
                {plan.lifestyleTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                    <span>{tip[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
