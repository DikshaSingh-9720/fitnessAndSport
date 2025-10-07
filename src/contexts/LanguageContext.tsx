import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  /* App & Hero */
  'app.title': { en: 'FitBharat', hi: 'फिट भारत' },
  'app.tagline': { en: 'Your Journey to Health & Wellness', hi: 'स्वास्थ्य और कल्याण की आपकी यात्रा' },
  'hero.title': { en: 'Embrace Indian Fitness Culture', hi: 'भारतीय फिटनेस संस्कृति को अपनाएं' },
  'hero.subtitle': { en: 'Join the Fit India Movement with personalized Yoga, Ayurveda, and Traditional Sports', hi: 'व्यक्तिगत योग, आयुर्वेद और पारंपरिक खेलों के साथ फिट इंडिया मूवमेंट से जुड़ें' },
  'hero.cta': { en: 'Start Your Journey', hi: 'अपनी यात्रा शुरू करें' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },

  /* Navigation */
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.yoga': { en: 'Yoga', hi: 'योग' },
  'nav.nutrition': { en: 'Nutrition', hi: 'पोषण' },
  'nav.sports': { en: 'Sports', hi: 'खेल' },
  'nav.leaderboard': { en: 'Leaderboard', hi: 'लीडरबोर्ड' },
  'nav.coach': { en: 'AI Coach', hi: 'एआई कोच' },

  /* Onboarding */
  'onboarding.title': { en: 'Welcome to FitBharat', hi: 'फिट भारत में आपका स्वागत है' },
  'onboarding.step1.title': { en: 'Tell us about yourself', hi: 'हमें अपने बारे में बताएं' },
  'onboarding.step1.name': { en: 'Full Name', hi: 'पूरा नाम' },
  'onboarding.step2.title': { en: 'Your Fitness Goals', hi: 'आपके फिटनेस लक्ष्य' },
  'onboarding.step3.title': { en: 'Yoga Experience', hi: 'योग अनुभव' },
  'onboarding.step4.title': { en: 'Dietary Preferences', hi: 'आहार प्राथमिकताएं' },
  'onboarding.step5.title': { en: 'Sports Interests', hi: 'खेल रुचियां' },
  'onboarding.next': { en: 'Next', hi: 'आगे' },
  'onboarding.back': { en: 'Back', hi: 'वापस' },
  'onboarding.finish': { en: 'Get Started', hi: 'शुरू करें' },

  /* Yoga */
  'yoga.title': { en: 'Yoga Library', hi: 'योग पुस्तकालय' },
  'yoga.subtitle': { en: 'Discover traditional asanas for mind and body wellness', hi: 'मन और शरीर की तंदुरुस्ती के लिए पारंपरिक आसन खोजें' },
  'yoga.beginner': { en: 'Beginner', hi: 'शुरुआती' },
  'yoga.intermediate': { en: 'Intermediate', hi: 'मध्यवर्ती' },
  'yoga.advanced': { en: 'Advanced', hi: 'उन्नत' },
  'yoga.benefits': { en: 'Benefits', hi: 'लाभ' },
  'yoga.instructions': { en: 'Instructions', hi: 'निर्देश' },
  'yoga.duration': { en: 'Duration', hi: 'अवधि' },
  'yoga.minutes': { en: 'minutes', hi: 'मिनट' },

  /* Nutrition */
  'nutrition.title': { en: 'Ayurveda Nutrition', hi: 'आयुर्वेद पोषण' },
  'nutrition.subtitle': { en: 'Personalized meal plans based on your dosha', hi: 'आपके दोष के आधार पर व्यक्तिगत भोजन योजना' },

  /* Diet Chart */
  'dietChart.title': { en: 'Ayurvedic Diet Chart', hi: 'आयुर्वेदिक आहार चार्ट' },
  'dietChart.subtitle': { en: 'Daily nourishment aligned to your chosen fitness goals', hi: 'आपके चुने हुए फिटनेस लक्ष्यों के अनुरूप दैनिक पोषण' },
  'dietChart.empty': { en: 'Select at least one fitness goal to unlock your Ayurvedic diet guidance.', hi: 'अपना आयुर्वेदिक आहार मार्गदर्शन देखने के लिए कम से कम एक फिटनेस लक्ष्य चुनें।' },
  'dietChart.focus': { en: 'Focus Area', hi: 'मुख्य ध्यान' },
  'dietChart.hydration': { en: 'Hydration Ritual', hi: 'हाइड्रेशन रिवाज़' },
  'dietChart.meals': { en: 'Meals', hi: 'भोजन' },
  'dietChart.noMeals': { en: 'No specific meals assigned for this slot. Follow the guidance above.', hi: 'इस समय के लिए कोई विशिष्ट भोजन निर्धारित नहीं है। ऊपर दिए गए मार्गदर्शन का पालन करें।' },
  'dietChart.lifestyleTips': { en: 'Lifestyle Recommendations', hi: 'जीवनशैली सिफारिशें' },

  /* Sports */
  'sports.title': { en: 'Indian Sports Challenges', hi: 'भारतीय खेल चुनौतियां' },
  'sports.subtitle': { en: 'Join traditional sports challenges and earn points', hi: 'पारंपरिक खेल चुनौतियों में शामिल हों और अंक अर्जित करें' },
  'sports.points': { en: 'Points', hi: 'अंक' },
  'sports.days': { en: 'days', hi: 'दिन' },
  'sports.join': { en: 'Join Challenge', hi: 'चुनौती में शामिल हों' },
  'sports.viewDetails': { en: 'View Details', hi: 'विवरण देखें' },
  'sports.start': { en: 'Start', hi: 'शुरू करें' },
  'sports.timerStart': { en: 'Start Timer', hi: 'टाइमर शुरू करें' },
  'sports.timerPause': { en: 'Pause Timer', hi: 'टाइमर रोकें' },
  'sports.tasks': { en: 'Tasks', hi: 'कार्य' },
  'sports.videoTutorial': { en: 'Video Tutorial', hi: 'वीडियो ट्यूटोरियल' },

  /* Leaderboard */
  'leaderboard.title': { en: 'Community Leaderboard', hi: 'समुदाय लीडरबोर्ड' },
  'leaderboard.subtitle': { en: 'Top performers in the FitBharat community', hi: 'फिट भारत समुदाय में शीर्ष प्रदर्शनकर्ता' },
  'leaderboard.rank': { en: 'Rank', hi: 'रैंक' },
  'leaderboard.name': { en: 'Name', hi: 'नाम' },
  'leaderboard.points': { en: 'Points', hi: 'अंक' },
  'leaderboard.challenges': { en: 'Challenges', hi: 'चुनौतियां' },
  'leaderboard.sessions': { en: 'Yoga Sessions', hi: 'योग सत्र' },

  /* Sports Descriptions */
  'sports.mallakhamb': { en: 'Mallakhamb', hi: 'मल्लखंब' },
  'sports.mallakhambDesc': { en: 'Ancient pole sport promoting strength and agility.', hi: 'प्राचीन खंभा खेल जो शक्ति और चुस्ती को बढ़ावा देता है।' },
  'sports.khokhoDesc': { en: 'Fast-paced team sport rooted in Indian tradition.', hi: 'तेज़-तर्रार टीम खेल जो भारतीय परंपरा में निहित है।' },
  'sports.kabaddiDesc': { en: 'High-intensity sport with deep cultural roots.', hi: 'गहन सांस्कृतिक जड़ों वाला उच्च-तीव्रता खेल।' },

  /* Footer */
  'footer.appName': { en: 'FitBharat', hi: 'फिट भारत' },
  'footer.tagline': { en: 'Empowering India through Yoga, Ayurveda, and Traditional Sports', hi: 'योग, आयुर्वेद और पारंपरिक खेलों के माध्यम से भारत को सशक्त बनाना' }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => translations[key]?.[language] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
