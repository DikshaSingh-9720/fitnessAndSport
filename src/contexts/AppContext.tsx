import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, YogaPose, AyurvedaMeal, SportsChallenge, LeaderboardEntry } from '../types';

interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  currentView: 'home' | 'yoga' | 'nutrition' | 'sports' | 'leaderboard' | 'recommendations';
  setCurrentView: (view: 'home' | 'yoga' | 'nutrition' | 'sports' | 'leaderboard' | 'recommendations') => void;
  yogaPoses: YogaPose[];
  ayurvedaMeals: AyurvedaMeal[];
  sportsChallenges: SportsChallenge[];
  leaderboard: LeaderboardEntry[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'yoga' | 'nutrition' | 'sports' | 'leaderboard' | 'recommendations'>('home');

  const yogaPoses: YogaPose[] = [
    {
      id: '1',
      name_en: 'Mountain Pose',
      name_hi: 'ताड़ासन',
      sanskrit_name: 'Tadasana',
      difficulty_level: 'beginner',
      category: 'standing',
      description_en: 'Foundation for all standing poses, promotes balance and grounding',
      description_hi: 'सभी खड़े होने वाले आसनों की नींव, संतुलन और स्थिरता को बढ़ावा देता है',
      benefits_en: ['Improves posture', 'Strengthens thighs and ankles', 'Increases awareness'],
      benefits_hi: ['मुद्रा में सुधार करता है', 'जांघों और टखनों को मजबूत करता है', 'जागरूकता बढ़ाता है'],
      instructions_en: ['Stand with feet together', 'Distribute weight evenly', 'Engage thighs', 'Lift chest', 'Relax shoulders'],
      instructions_hi: ['पैरों को एक ��ाथ रखकर खड़े हों', 'वजन को समान रूप से वितरित करें', 'जांघों को संलग्न करें', 'छाती उठाएं', 'कंधों को आराम दें'],
      duration_minutes: 3,
      image_url: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg'
    },
    {
      id: '2',
      name_en: 'Warrior Pose',
      name_hi: 'वीरभद्रासन',
      sanskrit_name: 'Virabhadrasana',
      difficulty_level: 'intermediate',
      category: 'standing',
      description_en: 'Powerful standing pose that builds strength and stamina',
      description_hi: 'शक्तिशाली खड़े आसन जो शक्ति और सहनशक्ति बनाता है',
      benefits_en: ['Strengthens legs and arms', 'Opens hips and chest', 'Improves focus and balance'],
      benefits_hi: ['पैरों और बाहों को मजबूत करता है', 'कूल्हों और छाती को खोलता है', 'ध्यान और संतुलन में सुधार करता है'],
      instructions_en: ['Step feet wide apart', 'Turn right foot out', 'Bend right knee', 'Extend arms parallel', 'Gaze forward'],
      instructions_hi: ['पैरों को चौड़ा करें', 'दाहिना पैर बाहर मोड़ें', 'दाहिना घुटना मोड़ें', 'भुजाओं को समानांतर फैलाएं', 'आगे देखें'],
      duration_minutes: 5,
      image_url: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg'
    },
    {
      id: '3',
      name_en: 'Tree Pose',
      name_hi: 'वृक्षासन',
      sanskrit_name: 'Vrikshasana',
      difficulty_level: 'beginner',
      category: 'balancing',
      description_en: 'Balance pose that improves focus and stability',
      description_hi: 'संतुलन आसन जो ध्यान और स्थिरता में सुधार करता है',
      benefits_en: ['Improves balance', 'Strengthens legs', 'Enhances concentration'],
      benefits_hi: ['संतुलन में सुधार करता है', 'पैरों को मजबूत करता है', 'एकाग्रता बढ़ाता है'],
      instructions_en: ['Stand on left leg', 'Place right foot on inner thigh', 'Bring palms together', 'Fix gaze on point', 'Hold steady'],
      instructions_hi: ['बाएं पै�� पर खड़े हों', 'दाहिना पैर भीतरी जांघ पर रखें', 'हथेलियों को एक साथ लाएं', 'एक बिंदु पर नजर रखें', 'स्थिर रहें'],
      duration_minutes: 4,
      image_url: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg'
    },
    {
      id: '4',
      name_en: 'Cobra Pose',
      name_hi: 'भुजंगासन',
      sanskrit_name: 'Bhujangasana',
      difficulty_level: 'beginner',
      category: 'backbend',
      description_en: 'Gentle backbend that opens the chest and strengthens the spine',
      description_hi: 'कोमल पीछे की ओर झुकाव जो छाती खोलता है और रीढ़ को मजबूत करता है',
      benefits_en: ['Opens chest and lungs', 'Strengthens spine', 'Reduces stress'],
      benefits_hi: ['छाती और फेफड़े खोलता है', 'रीढ़ को मजबूत करता है', 'तनाव कम करता है'],
      instructions_en: ['Lie on stomach', 'Place palms under shoulders', 'Press into hands', 'Lift chest up', 'Keep shoulders relaxed'],
      instructions_hi: ['पेट के बल लेटे���', 'हथेलियां कंधों के नीचे रखें', 'हाथों में दबाएं', 'छाती को ऊपर उठाएं', 'कंधों को आराम से रखें'],
      duration_minutes: 3,
      image_url: 'https://images.pexels.com/photos/3822167/pexels-photo-3822167.jpeg'
    },
    {
      id: '5',
      name_en: 'Seated Forward Bend',
      name_hi: 'पश्चिमोत्तानासन',
      sanskrit_name: 'Paschimottanasana',
      difficulty_level: 'intermediate',
      category: 'seated',
      description_en: 'Calming forward fold that stretches the entire back body',
      description_hi: 'शांत आगे की ओर झुकाव जो पूरे पीछे के शरीर को खींचता है',
      benefits_en: ['Stretches spine and hamstrings', 'Calms the mind', 'Improves digestion'],
      benefits_hi: ['रीढ़ और हैमस्ट्रिंग को खींचता है', 'मन को शांत करता है', 'पाचन में सुधार करता है'],
      instructions_en: ['Sit with legs extended', 'Inhale and lengthen spine', 'Exhale and fold forward', 'Hold feet or shins', 'Breathe deeply'],
      instructions_hi: ['पैर फैलाकर बैठें', 'सांस लें और रीढ़ को लंबा करें', 'सांस छोड़ें और आगे झुकें', 'पैर य�� पिंडलियां पकड़ें', 'गहरी सांस लें'],
      duration_minutes: 5,
      image_url: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg'
    },
    {
      id: '6',
      name_en: 'Lotus Pose',
      name_hi: 'पद्मासन',
      sanskrit_name: 'Padmasana',
      difficulty_level: 'advanced',
      category: 'seated',
      description_en: 'Classic meditation pose that calms the mind',
      description_hi: 'क्लासिक ध्यान आसन जो मन को शांत करता है',
      benefits_en: ['Opens hips', 'Improves posture', 'Promotes meditation'],
      benefits_hi: ['कूल्हे खोलता है', 'मुद्रा में सुधार करता है', 'ध्यान को बढ़ावा देता है'],
      instructions_en: ['Sit on floor', 'Cross legs deeply', 'Place feet on thighs', 'Rest hands on knees', 'Keep spine straight'],
      instructions_hi: ['फर्श पर बैठें', 'पैरों को गहराई से क्रॉस करें', 'पैरों को जांघों पर रखें', 'हाथों को घुटनों पर रखें', 'रीढ़ सीधी रखें'],
      duration_minutes: 10,
      image_url: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg'
    }
  ];

  const ayurvedaMeals: AyurvedaMeal[] = [
    {
      id: '1',
      name_en: 'Golden Turmeric Rice',
      name_hi: 'गोल्डन हल्दी चावल',
      dosha_type: ['vata', 'kapha'],
      meal_type: 'lunch',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Warming and nourishing rice dish with anti-inflammatory properties',
      description_hi: 'सूजन-रोधी गुणों के साथ गर्म और पोषक चावल की डिश',
      ingredients_en: ['Basmati rice', 'Turmeric powder', 'Ghee', 'Cumin seeds', 'Salt'],
      ingredients_hi: ['बासमती चावल', 'हल्दी पाउडर', 'घी', 'जीरा', 'नमक'],
      preparation_en: 'Cook rice with turmeric, temper with cumin and ghee',
      preparation_hi: 'चावल को हल्दी के साथ पकाएं, जीरा और घी से तड़का लगाएं',
      calories: 350,
      image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    },
    {
      id: '2',
      name_en: 'Cooling Cucumber Raita',
      name_hi: 'ठंडा खीरा राय���ा',
      dosha_type: ['pitta'],
      meal_type: 'lunch',
      dietary_category: ['vegetarian'],
      description_en: 'Refreshing yogurt-based side dish perfect for pitta balance',
      description_hi: 'पित्त संतुलन के लिए उत्तम ताज़ा दही आधारित साइड डिश',
      ingredients_en: ['Yogurt', 'Cucumber', 'Mint leaves', 'Cumin powder', 'Salt'],
      ingredients_hi: ['दही', 'खीरा', 'पुदीने के पत्ते', 'जीरा पाउडर', 'नमक'],
      preparation_en: 'Mix grated cucumber with yogurt, add spices and mint',
      preparation_hi: 'कद्दूकस किया हुआ खीरा दही के साथ मिलाएं, मसाले और पुदीना डालें',
      calories: 120,
      image_url: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg'
    },
    {
      id: '3',
      name_en: 'Spiced Mung Dal',
      name_hi: 'मसालेदार मूंग दाल',
      dosha_type: ['vata', 'pitta', 'kapha'],
      meal_type: 'dinner',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Easy-to-digest protein-rich lentil soup for all doshas',
      description_hi: 'सभी दोषों के लिए पचाने में आसान प्रोटीन युक्त दाल सूप',
      ingredients_en: ['Mung dal', 'Turmeric', 'Ginger', 'Cumin', 'Coriander'],
      ingredients_hi: ['मूंग दाल', 'हल्दी', 'अदरक', 'जीरा', 'धनिया'],
      preparation_en: 'Cook dal with spices until soft, temper with ghee',
      preparation_hi: 'दाल को मसालों के साथ नरम होने तक पकाएं, घी से तड़का लगाएं',
      calories: 280,
      image_url: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg'
    },
    {
      id: '4',
      name_en: 'Oats Porridge with Dates',
      name_hi: 'खजूर के साथ ओट्स पॉरिज',
      dosha_type: ['vata', 'pitta'],
      meal_type: 'breakfast',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Nourishing breakfast that provides sustained energy',
      description_hi: 'पौष्टिक नाश्ता जो निरंतर ऊर्जा प्रदान करता है',
      ingredients_en: ['Oats', 'Dates', 'Milk', 'Cardamom', 'Almonds'],
      ingredients_hi: ['ओट्स', 'खजूर', 'दूध', 'इलायची', 'ब���दाम'],
      preparation_en: 'Cook oats with milk, add chopped dates and cardamom',
      preparation_hi: 'ओट्स को दूध में पकाएं, कटे हुए खजूर और इलायची डालें',
      calories: 320,
      image_url: 'https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg'
    },
    {
      id: '5',
      name_en: 'Vegetable Khichdi',
      name_hi: 'सब्जी खिचड़ी',
      dosha_type: ['vata', 'pitta', 'kapha'],
      meal_type: 'dinner',
      dietary_category: ['vegetarian'],
      description_en: 'Complete one-pot meal, easy to digest and balancing',
      description_hi: 'संपूर्ण एक-बर्तन भोजन, पचाने में आसान और संतुलित',
      ingredients_en: ['Rice', 'Moong dal', 'Mixed vegetables', 'Ghee', 'Ginger'],
      ingredients_hi: ['चावल', 'मूंग दाल', 'मिश्रित सब्जियां', 'घी', 'अदरक'],
      preparation_en: 'Cook rice and dal with vegetables, season with ghee',
      preparation_hi: 'चावल और दाल को सब्जियों के साथ पकाएं, घी से सीजन करें',
      calories: 380,
      image_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    },
    {
      id: '6',
      name_en: 'Fresh Fruit Chaat',
      name_hi: 'ताज़ा फल चाट',
      dosha_type: ['pitta', 'kapha'],
      meal_type: 'snack',
      dietary_category: ['vegetarian', 'vegan', 'jain'],
      description_en: 'Light and refreshing fruit salad with spices',
      description_hi: 'मसालों के साथ हल्का और ताज़ा फल सलाद',
      ingredients_en: ['Seasonal fruits', 'Lemon juice', 'Chaat masala', 'Mint', 'Black salt'],
      ingredients_hi: ['मौसमी फल', 'नींबू का रस', 'चाट मसाला', 'पुदीना', 'काला नमक'],
      preparation_en: 'Mix chopped fruits, sprinkle spices and lemon',
      preparation_hi: 'कटे हुए फलों को मिलाएं, मसाले और नींबू छिड़कें',
      calories: 150,
      image_url: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg'
    },
    {
      id: '7',
      name_en: 'Sprouted Moong Salad',
      name_hi: 'अंकुरित मूंग सलाद',
      dosha_type: ['pitta', 'kapha'],
      meal_type: 'snack',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Crunchy sprouts with herbs to keep metabolism active',
      description_hi: 'मेटाबॉलिज़्म सक्रिय रखने के लिए जड़ी-बूटियों के साथ कुरकुरे अंकुरित',
      ingredients_en: ['Sprouted moong', 'Tomato', 'Cucumber', 'Coriander', 'Lemon juice'],
      ingredients_hi: ['अंकुरित मूंग', 'टमाटर', 'खीरा', 'धनिया', 'नींबू रस'],
      preparation_en: 'Toss sprouts with chopped vegetables and lemon dressing',
      preparation_hi: 'अंकुरित मूंग को कटी सब्जियों और नींबू ड्रेसिंग के साथ मिलाएं',
      calories: 190,
      image_url: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg'
    },
    {
      id: '8',
      name_en: 'Paneer Millet Power Bowl',
      name_hi: 'पनीर मिलेट पावर बाउल',
      dosha_type: ['vata', 'pitta'],
      meal_type: 'lunch',
      dietary_category: ['vegetarian'],
      description_en: 'Protein-rich millet bowl to sustain muscle recovery',
      description_hi: 'मांसपेशियों की रिकवरी के लिए प्रोटीन से भरपूर मिलेट बाउल',
      ingredients_en: ['Foxtail millet', 'Paneer cubes', 'Spinach', 'Pepper', 'Ghee'],
      ingredients_hi: ['कांगनी मिलेट', 'पनीर क्यूब्स', 'पालक', 'काली मिर्च', 'घी'],
      preparation_en: 'Sauté paneer and greens, toss with cooked millet and spices',
      preparation_hi: 'पनीर और हरी सब्जियों को भूनें, पके हुए मिलेट और मसालों के साथ मिलाएं',
      calories: 420,
      image_url: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg'
    },
    {
      id: '9',
      name_en: 'Herbal Detox Kadha',
      name_hi: 'हर्बल डिटॉक्स काढ़ा',
      dosha_type: ['kapha', 'vata'],
      meal_type: 'snack',
      dietary_category: ['vegetarian', 'vegan', 'jain'],
      description_en: 'Warming Ayurvedic brew to clear toxins and support immunity',
      description_hi: 'विषाक्त पदार्थों को दूर करने और प्रतिरक्षा को समर्थन देने वाला गर्म आयुर्वेदिक पेय',
      ingredients_en: ['Tulsi', 'Ginger', 'Black pepper', 'Cinnamon', 'Jaggery'],
      ingredients_hi: ['तुलसी', 'अदरक', 'काली मिर्च', 'दालचीनी', 'गुड़'],
      preparation_en: 'Simmer herbs and spices in water for 10 minutes and strain',
      preparation_hi: 'जड़ी-बूटियों और मसालों को 10 मिनट तक पानी में उबालें और छान लें',
      calories: 60,
      image_url: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg'
    },
    {
      id: '10',
      name_en: 'Sattu Protein Shake',
      name_hi: 'सत्तू प्रोटीन शेक',
      dosha_type: ['pitta', 'kapha'],
      meal_type: 'breakfast',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Cooling and protein-dense drink ideal after training',
      description_hi: 'कसरत के बाद के लिए उपयुक्त ठंडा और प्रोटीन से भरपूर पेय',
      ingredients_en: ['Roasted gram flour', 'Water', 'Jaggery', 'Cardamom', 'Chia seeds'],
      ingredients_hi: ['भुना चना आटा', 'पानी', 'गुड़', 'इलायची', 'चिया सीड्स'],
      preparation_en: 'Blend sattu with water, jaggery, and cardamom until smooth',
      preparation_hi: 'सत्तू को पानी, गुड़ और इलायची के साथ ब्लेंड करें जब तक स्मूथ न हो जाए',
      calories: 280,
      image_url: 'https://images.pexels.com/photos/5938366/pexels-photo-5938366.jpeg'
    },
    {
      id: '11',
      name_en: 'Moringa Vegetable Stew',
      name_hi: 'मोरिंगा वेजिटेबल स्ट्यू',
      dosha_type: ['vata', 'kapha'],
      meal_type: 'dinner',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Mineral-rich stew that soothes joints and supports recovery',
      description_hi: 'खनिजों से भरपूर स्ट्यू जो जोड़ों को आराम देता है और रिकवरी में मदद करता है',
      ingredients_en: ['Drumstick leaves', 'Carrot', 'Pumpkin', 'Coconut milk', 'Mustard seeds'],
      ingredients_hi: ['सहजन पत्ते', 'गाजर', 'कद्दू', 'नारियल दूध', 'सरसों के दाने'],
      preparation_en: 'Cook vegetables in coconut milk and temper with mustard seeds',
      preparation_hi: 'सब्जियों को नारियल दूध में पकाएं और सरसों के तड़के से पूरा करें',
      calories: 310,
      image_url: 'https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg'
    },
    {
      id: '12',
      name_en: 'Sesame Jaggery Bites',
      name_hi: 'तिल गुड़ बाइट्स',
      dosha_type: ['vata'],
      meal_type: 'snack',
      dietary_category: ['vegetarian', 'vegan'],
      description_en: 'Mineral-rich energy bites to nourish bones and nerves',
      description_hi: 'हड्डियों और तंत्रिकाओं को पोषण देने वाले खनिजों से भरपूर एनर्जी बाइट्स',
      ingredients_en: ['Sesame seeds', 'Jaggery', 'Ghee', 'Cardamom', 'Almond slivers'],
      ingredients_hi: ['तिल', 'गुड़', 'घी', 'इलायची', 'बादाम कतरन'],
      preparation_en: 'Roast sesame, combine with melted jaggery, shape into bites',
      preparation_hi: 'तिल को भूनें, पिघले गुड़ के साथ मिलाएं और बाइट्स का आकार दें',
      calories: 140,
      image_url: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg'
    }
  ];

  const sportsChallenges: SportsChallenge[] = [
    {
      id: '1',
      sport_type: 'kabaddi',
      name_en: '7-Day Kabaddi Stamina Challenge',
      name_hi: '7-दिन कबड्डी सहनशक्ति चुनौती',
      description_en: 'Build your stamina with daily Kabaddi-inspired exercises',
      description_hi: 'दैनिक कबड्डी-प्रेरित व्यायाम के साथ अपनी सहनशक्ति बनाएं',
      difficulty_level: 'intermediate',
      points: 500,
      duration_days: 7,
      requirements_en: ['20 minutes daily practice', 'Breathing exercises', 'Agility drills', 'Team coordination practice'],
      requirements_hi: ['20 मिनट दैनिक अभ्यास', 'श्वास व्यायाम', 'चपलता अभ्यास', 'टीम समन्वय अभ्यास'],
      image_url: 'https://images.pexels.com/photos/159587/football-the-pitch-game-football-field-159587.jpeg',
      active: true
    },
    {
      id: '2',
      sport_type: 'khokho',
      name_en: 'Kho-Kho Speed Sprint Challenge',
      name_hi: 'खो-खो स्पीड स्प्रिंट चुनौती',
      description_en: 'Improve your speed and reflexes with Kho-Kho training',
      description_hi: 'खो-खो प्रशिक्षण के साथ अपनी गति और प्रतिक्रिया में सुधार करें',
      difficulty_level: 'beginner',
      points: 300,
      duration_days: 5,
      requirements_en: ['15 minutes sprint training', 'Direction change drills', 'Quick reflexes practice'],
      requirements_hi: ['15 मिनट स्प्रिंट प्रशिक्षण', 'दिशा परिवर्तन अभ्यास', 'त्वरित प्रतिक्रिया अभ्यास'],
      image_url: 'https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg',
      active: true
    },
    {
      id: '3',
      sport_type: 'mallakhamb',
      name_en: 'Mallakhamb Strength Builder',
      name_hi: 'मल्लखंभ शक्ति निर्माता',
      description_en: 'Develop strength and flexibility with traditional Mallakhamb',
      description_hi: 'पारंपरिक मल्लखंभ के साथ शक्ति और लचीलापन विकसित करें',
      difficulty_level: 'advanced',
      points: 800,
      duration_days: 14,
      requirements_en: ['30 minutes pole exercises', 'Core strengthening', 'Balance training', 'Flexibility work'],
      requirements_hi: ['30 मिनट पोल व्यायाम', 'कोर मजबूती', 'संतुलन प्रशिक्षण', 'लचीलापन कार्य'],
      image_url: 'https://images.pexels.com/photos/4058218/pexels-photo-4058218.jpeg',
      active: true
    },
    {
      id: '4',
      sport_type: 'gilli-danda',
      name_en: 'Gilli-Danda Coordination Challenge',
      name_hi: 'गिल्ली-डंडा समन्वय चुनौती',
      description_en: 'Master hand-eye coordination with this traditional game',
      description_hi: 'इस पारंपरिक खेल के साथ हाथ-आंख समन्वय में महारत हासिल करें',
      difficulty_level: 'beginner',
      points: 250,
      duration_days: 5,
      requirements_en: ['10 minutes daily practice', 'Accuracy drills', 'Distance throwing'],
      requirements_hi: ['10 मिनट दैनिक अभ्यास', 'सटीकता अभ्यास', 'दूरी फेंकना'],
      image_url: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg',
      active: true
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { id: '1', user_name: 'Rajesh Kumar', total_points: 2500, challenges_completed: 8, yoga_sessions: 45, rank: 1 },
    { id: '2', user_name: 'Priya Sharma', total_points: 2350, challenges_completed: 7, yoga_sessions: 52, rank: 2 },
    { id: '3', user_name: 'Amit Patel', total_points: 2100, challenges_completed: 6, yoga_sessions: 38, rank: 3 },
    { id: '4', user_name: 'Sneha Reddy', total_points: 1950, challenges_completed: 6, yoga_sessions: 41, rank: 4 },
    { id: '5', user_name: 'Vikram Singh', total_points: 1800, challenges_completed: 5, yoga_sessions: 35, rank: 5 },
    { id: '6', user_name: 'Anjali Gupta', total_points: 1650, challenges_completed: 5, yoga_sessions: 30, rank: 6 },
    { id: '7', user_name: 'Rahul Verma', total_points: 1500, challenges_completed: 4, yoga_sessions: 28, rank: 7 },
    { id: '8', user_name: 'Kavita Iyer', total_points: 1350, challenges_completed: 4, yoga_sessions: 25, rank: 8 },
    { id: '9', user_name: 'Suresh Nair', total_points: 1200, challenges_completed: 3, yoga_sessions: 22, rank: 9 },
    { id: '10', user_name: 'Meera Desai', total_points: 1050, challenges_completed: 3, yoga_sessions: 20, rank: 10 }
  ];

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        showOnboarding,
        setShowOnboarding,
        currentView,
        setCurrentView,
        yogaPoses,
        ayurvedaMeals,
        sportsChallenges,
        leaderboard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
