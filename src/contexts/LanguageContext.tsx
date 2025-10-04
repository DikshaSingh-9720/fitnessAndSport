import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  'app.title': {
    en: 'FitBharat',
    hi: 'फिट भारत'
  },
  'app.tagline': {
    en: 'Your Journey to Health & Wellness',
    hi: 'स्वास्थ्य और कल्याण की आपकी यात्रा'
  },
  'hero.title': {
    en: 'Embrace Indian Fitness Culture',
    hi: 'भारतीय फिटनेस संस्कृति को अपनाएं'
  },
  'hero.subtitle': {
    en: 'Join the Fit India Movement with personalized Yoga, Ayurveda, and Traditional Sports',
    hi: 'व्यक्तिगत योग, आयुर्वेद और पारंपरिक खेलों के साथ फिट इंडिया मूवमेंट से जुड़ें'
  },
  'hero.cta': {
    en: 'Start Your Journey',
    hi: 'अपनी यात्रा शुरू करें'
  },
  'nav.home': {
    en: 'Home',
    hi: 'होम'
  },
  'nav.yoga': {
    en: 'Yoga',
    hi: 'योग'
  },
  'nav.nutrition': {
    en: 'Nutrition',
    hi: 'पोषण'
  },
  'nav.sports': {
    en: 'Sports',
    hi: 'खेल'
  },
  'nav.leaderboard': {
    en: 'Leaderboard',
    hi: 'लीडरबोर्ड'
  },
  'onboarding.title': {
    en: 'Welcome to FitBharat',
    hi: 'फिट भारत में आपका स्वागत है'
  },
  'onboarding.step1.title': {
    en: 'Tell us about yourself',
    hi: 'हमें अपने बारे में बताएं'
  },
  'onboarding.step1.name': {
    en: 'Full Name',
    hi: 'पूरा नाम'
  },
  'onboarding.step2.title': {
    en: 'Your Fitness Goals',
    hi: 'आपके फिटनेस लक्ष्य'
  },
  'onboarding.step3.title': {
    en: 'Yoga Experience',
    hi: 'योग अनुभव'
  },
  'onboarding.step4.title': {
    en: 'Dietary Preferences',
    hi: 'आहार प्राथमिकताएं'
  },
  'onboarding.step5.title': {
    en: 'Sports Interests',
    hi: 'खेल रुचियां'
  },
  'onboarding.next': {
    en: 'Next',
    hi: 'आगे'
  },
  'onboarding.back': {
    en: 'Back',
    hi: 'वापस'
  },
  'onboarding.finish': {
    en: 'Get Started',
    hi: 'शुरू करें'
  },
  'yoga.title': {
    en: 'Yoga Library',
    hi: 'योग पुस्तकालय'
  },
  'yoga.subtitle': {
    en: 'Discover traditional asanas for mind and body wellness',
    hi: 'मन और शरीर की तंदुरुस्ती के लिए पारंपरिक आसन खोजें'
  },
  'yoga.beginner': {
    en: 'Beginner',
    hi: 'शुरुआती'
  },
  'yoga.intermediate': {
    en: 'Intermediate',
    hi: 'मध्यवर्ती'
  },
  'yoga.advanced': {
    en: 'Advanced',
    hi: 'उन्नत'
  },
  'yoga.benefits': {
    en: 'Benefits',
    hi: 'लाभ'
  },
  'yoga.instructions': {
    en: 'Instructions',
    hi: 'निर्देश'
  },
  'yoga.duration': {
    en: 'Duration',
    hi: 'अवधि'
  },
  'yoga.minutes': {
    en: 'minutes',
    hi: 'मिनट'
  },
  'nutrition.title': {
    en: 'Ayurveda Nutrition',
    hi: 'आयुर्वेद पोषण'
  },
  'nutrition.subtitle': {
    en: 'Personalized meal plans based on your dosha',
    hi: 'आपके दोष के आधार पर व्यक्तिगत भोजन योजना'
  },
  'nutrition.vata': {
    en: 'Vata',
    hi: 'वात'
  },
  'nutrition.pitta': {
    en: 'Pitta',
    hi: 'पित्त'
  },
  'nutrition.kapha': {
    en: 'Kapha',
    hi: 'कफ'
  },
  'nutrition.calories': {
    en: 'Calories',
    hi: 'कैलोरी'
  },
  'nutrition.ingredients': {
    en: 'Ingredients',
    hi: 'सामग्री'
  },
  'nutrition.preparation': {
    en: 'Preparation',
    hi: 'तैयारी'
  },
  'sports.title': {
    en: 'Indian Sports Challenges',
    hi: 'भारतीय खेल चुनौतियां'
  },
  'sports.subtitle': {
    en: 'Join traditional sports challenges and earn points',
    hi: 'पारंपरिक खेल चुनौतियों में शामिल हों और अंक अर्जित करें'
  },
  'sports.kabaddi': {
    en: 'Kabaddi',
    hi: 'कबड्डी'
  },
  'sports.khokho': {
    en: 'Kho-Kho',
    hi: 'खो-खो'
  },
  'sports.points': {
    en: 'Points',
    hi: 'अंक'
  },
  'sports.days': {
    en: 'days',
    hi: 'दिन'
  },
  'sports.join': {
    en: 'Join Challenge',
    hi: 'चुनौती में शामिल हों'
  },
  'leaderboard.title': {
    en: 'Community Leaderboard',
    hi: 'समुदाय लीडरबोर्ड'
  },
  'leaderboard.subtitle': {
    en: 'Top performers in the FitBharat community',
    hi: 'फिट भारत समुदाय में शीर्ष प्रदर्शनकर्ता'
  },
  'leaderboard.rank': {
    en: 'Rank',
    hi: 'रैंक'
  },
  'leaderboard.name': {
    en: 'Name',
    hi: 'नाम'
  },
  'leaderboard.points': {
    en: 'Points',
    hi: 'अंक'
  },
  'leaderboard.challenges': {
    en: 'Challenges',
    hi: 'चुनौतियां'
  },
  'leaderboard.sessions': {
    en: 'Yoga Sessions',
    hi: 'योग सत्र'
  },
  'fitindia.message': {
    en: 'Part of Fit India Movement',
    hi: 'फिट इंडिया मूवमेंट का हिस्सा'
  },
  'atmanirbhar.message': {
    en: 'Supporting Atmanirbhar Bharat',
    hi: 'आत्मनिर्भर भारत का समर्थन'
  },
  'goals.weightLoss': {
    en: 'Weight Loss',
    hi: 'वजन घटाना'
  },
  'goals.muscleGain': {
    en: 'Muscle Gain',
    hi: 'मांसपेशियों में वृद्धि'
  },
  'goals.flexibility': {
    en: 'Flexibility',
    hi: 'लचीलापन'
  },
  'goals.stress': {
    en: 'Stress Relief',
    hi: 'तनाव मुक्ति'
  },
  'goals.endurance': {
    en: 'Endurance',
    hi: 'सहनशक्ति'
  },
  'goals.overall': {
    en: 'Overall Wellness',
    hi: 'समग्र कल्याण'
  },
  'diet.vegetarian': {
    en: 'Vegetarian',
    hi: 'शाकाहारी'
  },
  'diet.vegan': {
    en: 'Vegan',
    hi: 'शुद्ध शाकाहारी'
  },
  'diet.nonveg': {
    en: 'Non-Vegetarian',
    hi: 'मांसाहारी'
  },
  'diet.jain': {
    en: 'Jain',
    hi: 'जैन'
  },
  'recommendations.title': {
    en: 'Your Personalized Recommendations',
    hi: 'आपकी व्यक्तिगत सिफारिशें'
  },
  'recommendations.yoga': {
    en: 'Recommended Yoga Poses',
    hi: 'अनुशंसित योग आसन'
  },
  'recommendations.nutrition': {
    en: 'Recommended Meals',
    hi: 'अनुशंसित भोजन'
  },
  'recommendations.sports': {
    en: 'Recommended Challenges',
    hi: 'अनुशंसित चुनौतियां'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
