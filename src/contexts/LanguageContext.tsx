import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations: Record<string, Record<Language, string>> = {
  /* App & Hero */
  "app.title": { en: "FitBharat", hi: "फिट भारत" },
  "app.tagline": {
    en: "Your Journey to Health & Wellness",
    hi: "स्वास्थ्य और कल्याण की आपकी यात्रा",
  },
  "hero.title": {
    en: "Embrace Indian Fitness Culture",
    hi: "भारतीय फिटनेस संस्कृति को अपनाएं",
  },
  "hero.subtitle": {
    en: "Join the Fit India Movement with personalized Yoga, Ayurveda, and Traditional Sports",
    hi: "व्यक्तिगत योग, आयुर्वेद और पारंपरिक खेलों के साथ फिट इंडिया मूवमेंट से जुड़ें",
  },
  "hero.cta": { en: "Start Your Journey", hi: "अपनी यात्रा शुरू करें" },
  "nav.dashboard": {
    en: "Dashboard",
    hi: "डैशबोर्ड",
  },

  /* Navigation */
  "nav.home": { en: "Home", hi: "होम" },
  "nav.yoga": { en: "Yoga", hi: "योग" },
  "nav.nutrition": { en: "Nutrition", hi: "पोषण" },
  "nav.sports": { en: "Sports", hi: "खेल" },
  "nav.leaderboard": { en: "Leaderboard", hi: "लीडरबोर्ड" },
  "nav.coach": { en: "AI Coach", hi: "एआई कोच" },

  /* Onboarding */
  "onboarding.title": {
    en: "Welcome to FitBharat",
    hi: "फिट भारत में आपका स्वागत है",
  },
  "onboarding.step1.title": {
    en: "Tell us about yourself",
    hi: "हमें अपने बारे में बताएं",
  },
  "onboarding.step1.name": { en: "Full Name", hi: "पूरा नाम" },
  "onboarding.step2.title": {
    en: "Your Fitness Goals",
    hi: "आपके फिटनेस लक्ष्य",
  },
  "onboarding.step3.title": { en: "Yoga Experience", hi: "योग अनुभव" },
  "onboarding.step4.title": {
    en: "Dietary Preferences",
    hi: "आहार प्राथमिकताएं",
  },
  "onboarding.step5.title": { en: "Sports Interests", hi: "खेल रुचियां" },
  "onboarding.next": { en: "Next", hi: "आगे" },
  "onboarding.back": { en: "Back", hi: "वापस" },
  "onboarding.finish": { en: "Get Started", hi: "शुरू करें" },

  /* Yoga */
  "yoga.title": { en: "Yoga Library", hi: "योग पुस्तकालय" },
  "yoga.subtitle": {
    en: "Discover traditional asanas for mind and body wellness",
    hi: "मन और शरीर की तंदुरुस्ती के लिए पारंपरिक आसन खोजें",
  },
  "yoga.beginner": { en: "Beginner", hi: "शुरुआती" },
  "yoga.intermediate": { en: "Intermediate", hi: "मध्यवर्ती" },
  "yoga.advanced": { en: "Advanced", hi: "उन्नत" },
  "yoga.benefits": { en: "Benefits", hi: "लाभ" },
  "yoga.instructions": { en: "Instructions", hi: "निर्देश" },
  "yoga.duration": { en: "Duration", hi: "अवधि" },
  "yoga.minutes": { en: "minutes", hi: "मिनट" },

  /* Nutrition */
  "nutrition.title": { en: "Ayurveda Nutrition", hi: "आयुर्वेद पोषण" },
  "nutrition.subtitle": {
    en: "Personalized meal plans based on your dosha",
    hi: "आपके दोष के आधार पर व्यक्तिगत भोजन योजना",
  },

  "nutrition.vata": { en: "Vata", hi: "वात" },
  "nutrition.pitta": { en: "Pitta", hi: "पित्त" },
  "nutrition.kapha": { en: "Kapha", hi: "कफ" },
  "nutrition.mealType": { en: "Meal Type", hi: "भोजन प्रकार" },
  "nutrition.calories": { en: "Calories", hi: "कैलोरी" },
  "nutrition.ingredients": { en: "Ingredients", hi: "सामग्री" },
  "nutrition.preparation": { en: "Preparation", hi: "तैयारी" },

  /* Diet Chart */
  "dietChart.title": {
    en: "Ayurvedic Diet Chart",
    hi: "आयुर्वेदिक आहार चार्ट",
  },
  "dietChart.subtitle": {
    en: "Daily nourishment aligned to your chosen fitness goals",
    hi: "आपके चुने हुए फिटनेस लक्ष्यों के अनुरूप दैनिक पोषण",
  },
  "dietChart.empty": {
    en: "Select at least one fitness goal to unlock your Ayurvedic diet guidance.",
    hi: "अपना आयुर्वेदिक आहार मार्गदर्शन देखने के लिए कम से कम एक फिटनेस लक्ष्य चुनें।",
  },
  "dietChart.focus": { en: "Focus Area", hi: "मुख्य ध्यान" },
  "dietChart.hydration": { en: "Hydration Ritual", hi: "हाइड्रेशन रिवाज़" },
  "dietChart.meals": { en: "Meals", hi: "भोजन" },
  "dietChart.noMeals": {
    en: "No specific meals assigned for this slot. Follow the guidance above.",
    hi: "इस समय के लिए कोई विशिष्ट भोजन निर्धारित नहीं है। ऊपर दिए गए मार्गदर्शन का पालन करें।",
  },
  "dietChart.lifestyleTips": {
    en: "Lifestyle Recommendations",
    hi: "जीवनशैली सिफारिशें",
  },

  /* Sports */
  "sports.title": {
    en: "Indian Sports Challenges",
    hi: "भारतीय खेल चुनौतियां",
  },
  "sports.subtitle": {
    en: "Join traditional sports challenges and earn points",
    hi: "पारंपरिक खेल चुनौतियों में शामिल हों और अंक अर्जित करें",
  },
  "sports.gilli-danda":{ en: "Gilli Danda", hi: "गिल्ली डंडा" },
  "sports.kabaddi": { en: "Kabaddi", hi: "कबड्डी" },
  "sports.khokho": { en: "Kho-Kho", hi: "खो-खो" },
  "sports.points": { en: "Points", hi: "अंक" },
  "sports.days": { en: "days", hi: "दिन" },
  "sports.join": { en: "Join Challenge", hi: "चुनौती में शामिल हों" },
  "sports.viewDetails": { en: "View Details", hi: "विवरण देखें" },
  "sports.start": { en: "Start", hi: "शुरू करें" },
  "sports.timerStart": { en: "Start Timer", hi: "टाइमर शुरू करें" },
  "sports.timerPause": { en: "Pause Timer", hi: "टाइमर रोकें" },
  "sports.tasks": { en: "Tasks", hi: "कार्य" },
  "sports.videoTutorial": { en: "Video Tutorial", hi: "वीडियो ट्यूटोरियल" },

  /* Leaderboard */
  "leaderboard.title": { en: "Community Leaderboard", hi: "समुदाय लीडरबोर्ड" },
  "leaderboard.subtitle": {
    en: "Top performers in the FitBharat community",
    hi: "फिट भारत समुदाय में शीर्ष प्रदर्शनकर्ता",
  },
  "leaderboard.rank": { en: "Rank", hi: "रैंक" },
  "leaderboard.name": { en: "Name", hi: "नाम" },
  "leaderboard.points": { en: "Points", hi: "अंक" },
  "leaderboard.challenges": { en: "Challenges", hi: "चुनौतियां" },
  "leaderboard.sessions": { en: "Yoga Sessions", hi: "योग सत्र" },

  /* Messages */
  "fitindia.message": {
    en: "Part of Fit India Movement",
    hi: "फिट इंडिया मूवमेंट का हिस्सा",
  },
  "atmanirbhar.message": {
    en: "Supporting Atmanirbhar Bharat",
    hi: "आत्मनिर्भर भारत का समर्थन",
  } /* Hero Section */,
  "hero.wellness": { en: "Holistic Wellness", hi: "संपूर्ण तंदुरुस्ती" },
  "hero.traditionalSports": { en: "Traditional Sports", hi: "पारंपरिक खेल" },
  "hero.communityDriven": { en: "Community Driven", hi: "समुदाय संचालित" },
  "hero.strengthTraining": { en: "Strength Training", hi: "शक्ति प्रशिक्षण" },
  "hero.cardioEndurance": {
    en: "Cardio & Endurance",
    hi: "कार्डियो और सहनशक्ति",
  },
  "hero.yogaMindfulness": { en: "Yoga & Mindfulness", hi: "योग और ध्यान" },
  "hero.preventiveHealth": { en: "Preventive Health", hi: "निवारक स्वास्थ्य" },
  "hero.inclusiveAccess": { en: "Inclusive Access", hi: "समावेशी पहुँच" },
  "hero.quote": {
    en: "Fitness is not about being better than someone else. It’s about being better than you used to be.",
    hi: "फिटनेस किसी और से बेहतर होने के बारे में नहीं है। यह अपने पुराने आप से बेहतर होने के बारे में है।",
  },
  "hero.ruralMessage": {
    en: "Rural communities deserve access to modern wellness tools. We're building bridges through technology, tradition, and trust.",
    hi: "ग्रामीण समुदायों को आधुनिक तंदुरुस्ती उपकरणों तक पहुँच का हक है। हम तकनीक, परंपरा और विश्वास के माध्यम से पुल बना रहे हैं।",
  },

  /* Supporting India */
  "support.atmanirbhar": {
    en: "Supporting Atmanirbhar Bharat",
    hi: "आत्मनिर्भर भारत का समर्थन",
  },

  /* Sports Titles */
  "hero.sportsTitle": { en: "Sports & Activities", hi: "खेल और गतिविधियाँ" },
  "sports.mallakhamb": { en: "Mallakhamb", hi: "मल्लखंब" },
  "sports.mallakhambDesc": {
    en: "Ancient pole sport promoting strength and agility.",
    hi: "प्राचीन खंभा खेल जो शक्ति और चुस्ती को बढ़ावा देता है।",
  },

  "sports.khokhoDesc": {
    en: "Fast-paced team sport rooted in Indian tradition.",
    hi: "तेज़-तर्रार टीम खेल जो भारतीय परंपरा में निहित है।",
  },

  "sports.yoga": { en: "Yoga", hi: "योग" },
  "sports.yogaDesc": {
    en: "Mind-body practice for holistic health and mental clarity.",
    hi: "समग्र स्वास्थ्य और मानसिक स्पष्टता के लिए मन-शरीर अभ्यास।",
  },

  "sports.cycling": { en: "Cycling", hi: "साइक्लिंग" },
  "sports.cyclingDesc": {
    en: "Low-impact cardio accessible to all age groups.",
    hi: "सभी आयु समूहों के लिए कम प्रभाव वाला कार्डियो।",
  },

  "sports.kabaddiDesc": {
    en: "High-intensity sport with deep cultural roots.",
    hi: "गहन सांस्कृतिक जड़ों वाला उच्च-तीव्रता खेल।",
  },

  "sports.walkingClubs": { en: "Walking Clubs", hi: "वॉकिंग क्लब" },
  "sports.walkingClubsDesc": {
    en: "Community-led fitness for elders and youth.",
    hi: "बुजुर्गों और युवाओं के लिए समुदाय संचालित फिटनेस।",
  },

  "sports.meditationCircles": { en: "Meditation Circles", hi: "ध्यान मंडल" },
  "sports.meditationCirclesDesc": {
    en: "Group mindfulness sessions for emotional well-being.",
    hi: "भावनात्मक तंदुरुस्ती के लिए समूह ध्यान सत्र।",
  },

  "sports.nutritionWorkshops": {
    en: "Nutrition Workshops",
    hi: "पोषण कार्यशालाएं",
  },
  "sports.nutritionWorkshopsDesc": {
    en: "Local diet education for long-term health.",
    hi: "दीर्घकालिक स्वास्थ्य के लिए स्थानीय आहार शिक्षा।",
  },

  "sports.villageMarathons": { en: "Village Marathons", hi: "गांव मैराथन" },
  "sports.villageMarathonsDesc": {
    en: "Inclusive events promoting endurance and unity.",
    hi: "सहनशक्ति और एकता को बढ़ावा देने वाले समावेशी आयोजन।",
  },

  /* Footer */
  "footer.logoSymbol": { en: "फ", hi: "फ" },
  "footer.appName": { en: "FitBharat", hi: "फिट भारत" },
  "footer.tagline": {
    en: "Empowering India through Yoga, Ayurveda, and Traditional Sports",
    hi: "योग, आयुर्वेद और पारंपरिक खेलों के माध्यम से भारत को सशक्त बनाना",
  },
  "footer.fitindiaFlag": { en: "🇮🇳", hi: "🇮🇳" },
  "footer.fitindiaText": { en: "Fit India Movement", hi: "फिट इंडिया मूवमेंट" },
  "footer.atmanirbharIcon": { en: "💪", hi: "💪" },
  "footer.atmanirbharText": { en: "Atmanirbhar Bharat", hi: "आत्मनिर्भर भारत" },

  /* Goals & Diet */

  "goals.weightLoss": {
    en: "Weight Loss",
    hi: "वजन घटाना",
  },
  "goals.muscleGain": {
    en: "Muscle Gain",
    hi: "मांसपेशियों में वृद्धि",
  },
  "goals.flexibility": {
    en: "Flexibility",
    hi: "लचीलापन",
  },
  "goals.stress": {
    en: "Stress Relief",
    hi: "तनाव मुक्ति",
  },
  "goals.endurance": {
    en: "Endurance",
    hi: "सहनशक्ति",
  },
  "goals.overall": {
    en: "Overall Wellness",
    hi: "समग्र कल्याण",
  },
  "diet.vegetarian": {
    en: "Vegetarian",
    hi: "शाकाहारी",
  },
  "diet.vegan": {
    en: "Vegan",
    hi: "शुद्ध शाकाहारी",
  },
  "diet.nonveg": {
    en: "Non-Vegetarian",
    hi: "मांसाहारी",
  },
  "diet.jain": {
    en: "Jain",
    hi: "जैन",
  },
  "recommendations.title": {
    en: "Your Personalized Recommendations",
    hi: "आपकी व्यक्तिगत सिफारिशें",
  },
  "recommendations.yoga": {
    en: "Recommended Yoga Poses",
    hi: "अनुशंसित योग आसन",
  },
  "recommendations.nutrition": {
    en: "Recommended Meals",
    hi: "अनुशंसित भोजन",
  },
  "recommendations.sports": {
    en: "Recommended Challenges",
    hi: "अनुशंसित चुनौतियां",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
