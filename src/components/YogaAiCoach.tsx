import { FormEvent, useMemo, useState } from 'react';
import { Activity, Brain, CalendarRange, Heart, Sparkles, Timer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import type { YogaPose } from '../types';

const difficultyScore: Record<YogaPose['difficulty_level'], number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3
};

interface FocusOption {
  value: 'balance' | 'flexibility' | 'strength' | 'calm' | 'energy';
  label: { en: string; hi: string };
  categories: string[];
}

const focusOptions: FocusOption[] = [
  {
    value: 'balance',
    label: { en: 'Balance & Stability', hi: 'संतुलन और स्थिरता' },
    categories: ['balancing', 'standing']
  },
  {
    value: 'flexibility',
    label: { en: 'Flexibility & Mobility', hi: 'लचीलापन और गतिशीलता' },
    categories: ['seated', 'backbend']
  },
  {
    value: 'strength',
    label: { en: 'Strength & Endurance', hi: 'शक्ति और सहनशक्ति' },
    categories: ['standing', 'backbend']
  },
  {
    value: 'calm',
    label: { en: 'Calm & Recovery', hi: 'शांति और रिकवरी' },
    categories: ['seated']
  },
  {
    value: 'energy',
    label: { en: 'Energy Boost', hi: 'ऊर्जा वृद्धि' },
    categories: ['standing', 'balancing', 'backbend']
  }
];

const moodOptions = [
  { value: 'stressed', label: { en: 'Stressed', hi: 'तनावग्रस्त' } },
  { value: 'tired', label: { en: 'Physically Tired', hi: 'शारीरिक रूप से थके' } },
  { value: 'low', label: { en: 'Low Mood', hi: 'मन उदास' } },
  { value: 'energized', label: { en: 'Energized', hi: 'ऊर्जावान' } }
] as const;

const experienceLabels: Record<YogaPose['difficulty_level'], { en: string; hi: string }> = {
  beginner: { en: 'Beginner', hi: 'शुरुआती' },
  intermediate: { en: 'Intermediate', hi: 'मध्यवर्ती' },
  advanced: { en: 'Advanced', hi: 'उन्नत' }
};

const stageLabels: Record<'warmup' | 'main' | 'cooldown', { en: string; hi: string }> = {
  warmup: { en: 'Warm-up', hi: 'वार्म-अप' },
  main: { en: 'Main Flow', hi: 'मुख्य प्रवाह' },
  cooldown: { en: 'Cool Down', hi: 'शांत चरण' }
};

const moodBreathGuidance: Record<(typeof moodOptions)[number]['value'], { en: string; hi: string }> = {
  stressed: {
    en: 'Practice 4-6 breathing. Inhale for four counts, exhale for six to calm the nervous system.',
    hi: '4-6 श्वास का अभ्यास करें। चार गिनत�� में सांस लें, छह गिनती में छोड़ें ताकि तंत्रिका तंत्र शांत हो।'
  },
  tired: {
    en: 'Use three rounds of Kapalabhati to awaken energy before beginning the flow.',
    hi: 'प्रवाह शुरू करने से पहले ऊर्जा जगाने के लिए तीन दौर कपालभाति करें।'
  },
  low: {
    en: 'Take five slow belly breaths with a gentle smile to lift the mood naturally.',
    hi: 'मूड को स्वाभाविक रूप से उठाने के लिए पांच धीमी पेट श्वास लें और हल्की मुस्कान रखें।'
  },
  energized: {
    en: 'Alternate nostril breathing for two minutes will focus your energy without overstimulation.',
    hi: 'दो मिनट के लिए अनुलोम-विलोम करें ताकि ऊर्जा केंद्रित रहे और अति उत्तेजना न हो।'
  }
};

const focusAffirmations: Record<(typeof focusOptions)[number]['value'], { en: string; hi: string }> = {
  balance: {
    en: '“I am steady, rooted, and calm.”',
    hi: '"मैं स्थ��र, जुड़ा और शांत हूं।"'
  },
  flexibility: {
    en: '“Each breath softens my body and mind.”',
    hi: '"हर सांस मेरे शरीर और मन को कोमल बनाती है।"'
  },
  strength: {
    en: '“Every pose builds my inner and outer strength.”',
    hi: '"हर आसन मेरी आंतरिक और बाहरी शक्ति को बढ़ाता है।"'
  },
  calm: {
    en: '“I give myself permission to rest deeply.”',
    hi: '"मैं स्वयं को गहराई से विश्राम की अनुमति देता/देती हूं।"'
  },
  energy: {
    en: '“My breath fuels joyful movement.”',
    hi: '"मेरी सांस आनंददायक आंदोलन को ऊर्जा देती है।"'
  }
};

interface CoachPlanStage {
  stage: keyof typeof stageLabels;
  pose: YogaPose;
  minutes: number;
  intention: { en: string; hi: string };
}

interface CoachPlan {
  stages: CoachPlanStage[];
  breathwork: { en: string; hi: string };
  affirmation: { en: string; hi: string };
}

const stageIntentions: Record<CoachPlanStage['stage'], { en: string; hi: string }> = {
  warmup: {
    en: 'Activate joints and connect with breath before deep work.',
    hi: 'गहरे अभ्यास से पहले जोड़ों को सक्रिय करें और सांस से जुड़ें।'
  },
  main: {
    en: 'Build mindful strength, balance, and focus.',
    hi: 'सचेत शक्ति, संतुलन और एकाग्रता विकसित करें।'
  },
  cooldown: {
    en: 'Integrate benefits and invite a calm mind.',
    hi: 'लाभों को आत्मसात करें और मन को शांत करें।'
  }
};

const getLocalized = (language: ReturnType<typeof useLanguage>['language'], text: { en: string; hi: string }) => {
  return text[language] ?? text.en;
};

export const YogaAiCoach: React.FC = () => {
  const { language } = useLanguage();
  const { yogaPoses, userProfile } = useApp();

  const [experience, setExperience] = useState<YogaPose['difficulty_level']>(
    userProfile?.yoga_experience ?? 'beginner'
  );
  const [sessionLength, setSessionLength] = useState(30);
  const [focus, setFocus] = useState<(typeof focusOptions)[number]['value']>('balance');
  const [mood, setMood] = useState<(typeof moodOptions)[number]['value']>('stressed');
  const [plan, setPlan] = useState<CoachPlan | null>(null);

  const maxDifficultyScore = useMemo(() => difficultyScore[experience], [experience]);

  const filteredByExperience = useMemo(() => {
    return yogaPoses.filter(pose => difficultyScore[pose.difficulty_level] <= maxDifficultyScore);
  }, [yogaPoses, maxDifficultyScore]);

  const focusCategories = useMemo(() => {
    const selected = focusOptions.find(option => option.value === focus);
    return selected?.categories ?? [];
  }, [focus]);

  const curatedSequence = useMemo(() => {
    const primaryMatches = filteredByExperience.filter(pose => focusCategories.includes(pose.category));

    if (primaryMatches.length >= 3) {
      return primaryMatches.slice(0, 3);
    }

    const supplemental = filteredByExperience.filter(pose => !primaryMatches.includes(pose));

    return [...primaryMatches, ...supplemental].slice(0, 3);
  }, [filteredByExperience, focusCategories]);

  const handleGeneratePlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (curatedSequence.length === 0) {
      setPlan(null);
      return;
    }

    const warmupMinutes = Math.max(5, Math.round(sessionLength * 0.25));
    const cooldownMinutes = Math.max(5, Math.round(sessionLength * 0.2));
    const mainMinutes = Math.max(5, sessionLength - warmupMinutes - cooldownMinutes);

    const stagesOrder: CoachPlanStage['stage'][] = ['warmup', 'main', 'cooldown'];
    const minutesDistribution = [warmupMinutes, mainMinutes, cooldownMinutes];

    const stages: CoachPlanStage[] = curatedSequence.map((pose, index) => {
      const stage = stagesOrder[index] ?? 'main';
      const minutes = minutesDistribution[index] ?? Math.max(5, Math.round(sessionLength / 3));

      return {
        stage,
        pose,
        minutes,
        intention: stageIntentions[stage]
      };
    });

    setPlan({
      stages,
      breathwork: moodBreathGuidance[mood],
      affirmation: focusAffirmations[focus]
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-orange-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Brain className="text-orange-500" size={28} />
                <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                  {language === 'en' ? 'Personalized Yoga Guidance' : 'व्यक्तिगत योग मार्गदर्शन'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Yoga AI Coach' : 'योग एआई कोच'}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                {language === 'en'
                  ? 'Craft a mindful session aligned to your intention, energy, and experience level. The coach selects asanas and breathwork to bring balance to your day.'
                  : 'अपने इरादे, ऊर्जा और अनुभव स्तर के अनुरूप एक सजग सत्र तैयार करें। कोच आपके दिन में संतुलन लाने के लिए आसन और प्राणायाम चुनता है।'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-lg">
              <p className="text-sm uppercase tracking-wide opacity-80 mb-2">
                {language === 'en' ? 'Coach tip' : 'कोच सुझाव'}
              </p>
              <p className="text-lg font-semibold">
                {language === 'en'
                  ? 'Revisit the coach weekly to keep your practice evolving with your lifestyle.'
                  : 'अपने अभ्यास को जीवन शैली के अनुसार विकसित रखने के लिए कोच को साप्ताहिक दोहराएं।'}
              </p>
            </div>
          </div>

          <form onSubmit={handleGeneratePlan} className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <label className="block">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  <Activity size={18} className="text-orange-500" />
                  {language === 'en' ? 'Experience level' : 'अनुभव स्तर'}
                </span>
                <select
                  value={experience}
                  onChange={event => setExperience(event.target.value as YogaPose['difficulty_level'])}
                  className="mt-2 w-full rounded-xl border border-orange-200 px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                >
                  {(Object.keys(experienceLabels) as YogaPose['difficulty_level'][]).map(level => (
                    <option key={level} value={level}>
                      {experienceLabels[level][language]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  <Timer size={18} className="text-orange-500" />
                  {language === 'en' ? 'Session length (minutes)' : 'सत्र समय (मिनट)'}
                </span>
                <input
                  type="number"
                  min={15}
                  max={90}
                  value={sessionLength}
                  onChange={event => setSessionLength(Number(event.target.value) || 30)}
                  className="mt-2 w-full rounded-xl border border-orange-200 px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                />
              </label>

              <label className="block">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  <Heart size={18} className="text-orange-500" />
                  {language === 'en' ? 'How do you feel today?' : 'आज आप कैसा महसूस कर रहे हैं?'}
                </span>
                <select
                  value={mood}
                  onChange={event => setMood(event.target.value as (typeof moodOptions)[number]['value'])}
                  className="mt-2 w-full rounded-xl border border-orange-200 px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
                >
                  {moodOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {getLocalized(language, option.label)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  <Sparkles size={18} className="text-orange-500" />
                  {language === 'en' ? 'Primary focus' : 'मुख्य फोकस'}
                </span>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {focusOptions.map(option => {
                    const isSelected = option.value === focus;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFocus(option.value)}
                        className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                          isSelected
                            ? 'border-transparent bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                            : 'border-orange-200 bg-orange-50 text-gray-800 hover:border-orange-300'
                        }`}
                      >
                        <span className="font-semibold block">
                          {getLocalized(language, option.label)}
                        </span>
                        <span className="text-xs opacity-80">
                          {language === 'en'
                            ? 'Tap to select this intention'
                            : 'इस इरादे को चुनने के लिए टैप करें'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </label>

              <div className="bg-gradient-to-br from-green-50 to-orange-50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
                <CalendarRange className="text-orange-500 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === 'en'
                      ? 'Consistency cue'
                      : 'नियमितता का संकेत'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {language === 'en'
                      ? 'Aim for three sessions a week. Vary focus to balance strength, flexibility, and recovery.'
                      : 'सप्ताह में तीन सत्र लक्ष्य रखें। शक्ति, लचीलापन और रिकवरी में संतुलन लाने के लिए फोकस बदलते रहें।'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white font-semibold shadow-lg transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <Sparkles size={18} />
                  {language === 'en' ? 'Generate practice plan' : 'अभ्यास योजना बनाएं'}
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mt-12">
          {plan ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {plan.stages.map(stage => (
                <article
                  key={`${stage.stage}-${stage.pose.id}`}
                  className="bg-white border border-green-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-600">
                      <Timer size={16} />
                      {getLocalized(language, stageLabels[stage.stage])}
                    </span>
                    <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
                      {stage.minutes} {language === 'en' ? 'min' : 'मिनट'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'en' ? stage.pose.name_en : stage.pose.name_hi}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === 'en' ? stage.pose.description_en : stage.pose.description_hi}
                  </p>
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
                    <h4 className="text-sm font-semibold text-orange-600 mb-2">
                      {language === 'en' ? 'Coach intention' : 'कोच का उद्देश्य'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getLocalized(language, stage.intention)}
                    </p>
                  </div>
                </article>
              ))}

              <aside className="lg:col-span-3 grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Heart className="text-red-500" size={20} />
                    {language === 'en' ? 'Breathwork focus' : 'श्वास अभ्यास'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getLocalized(language, plan.breathwork)}
                  </p>
                </div>
                <div className="bg-white border border-green-100 rounded-3xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" size={20} />
                    {language === 'en' ? 'Mindful affirmation' : 'सचेत अभिपुष्टि'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getLocalized(language, plan.affirmation)}
                  </p>
                </div>
              </aside>
            </div>
          ) : (
            <div className="bg-white border border-green-100 rounded-3xl p-8 text-center shadow-inner">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {language === 'en'
                  ? 'Set your intention to unlock a guided flow'
                  : 'मार्गदर्शित अभ्यास पाने के ल���ए अपना इरादा निर्धारित करें'}
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {language === 'en'
                  ? 'Choose how you feel and what you need today. The Yoga AI Coach will craft a balanced warm-up, focused sequence, and mindful cooldown tailored just for you.'
                  : 'आज आप कैसा महसूस कर रहे हैं और आपको क्या चाहिए, यह चुनें। योग एआई कोच आपके लिए संतुलित वार्म-अप, केंद्रित अनुक्रम और सजग शांत चरण तैयार करेगा।'}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
