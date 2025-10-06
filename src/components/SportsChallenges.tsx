import React, { useState } from 'react';
import { Info, X, Play, Pause } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { SportsChallenge } from '../types';

interface EnhancedChallenge extends SportsChallenge {
  requirements_en: string[];
  requirements_hi: string[];
  video_url: string;
  image_url: string;
}

export const SportsChallenges: React.FC = () => {
  const { language, t } = useLanguage() ?? { language: 'en', t: (key: string) => key };
  const { sportsChallenges } = useApp() ?? { sportsChallenges: [] };

  // Sidebar Sports Info
  const sportsSidebar = [
    {
      name_en: 'Cricket 🏏',
      name_hi: 'क्रिकेट 🏏',
      rules_en: [
        'Two teams of 11 players each.',
        'Each team bats and bowls once.',
        'Runs scored by hitting the ball and running.',
        'Team with more runs wins.',
      ],
      rules_hi: [
        'दो टीमों में 11 खिलाड़ी।',
        'हर टीम एक बार बल्लेबाजी और गेंदबाजी करेगी।',
        'बॉल मारकर और दौड़कर रन बनाएं।',
        'ज्यादा रन वाली टीम जीतती है।',
      ],
    },
    {
      name_en: 'Badminton 🏸',
      name_hi: 'बैडमिंटन 🏸',
      rules_en: [
        'Singles or doubles play.',
        'First to 21 points wins a set.',
        'Shuttle must land inside boundary lines.',
        'Best of 3 sets decides winner.',
      ],
      rules_hi: [
        'सिंगल्स या डबल्स खेल।',
        '21 अंक पहले पाने वाला सेट जीतता है।',
        'शटल सीमा के अंदर आना चाहिए।',
        '3 सेट में सबसे अच्छा विजेता तय करता है।',
      ],
    },
    {
      name_en: 'Football ⚽',
      name_hi: 'फुटबॉल ⚽',
      rules_en: [
        '11 players per team.',
        'Match lasts 90 minutes.',
        'Only goalkeeper can use hands.',
        'Goal = 1 point.',
      ],
      rules_hi: [
        'हर टीम में 11 खिलाड़ी।',
        'मैच 90 मिनट का।',
        'केवल गोलकीपर हाथ का उपयोग कर सकता है।',
        'गोल = 1 अंक।',
      ],
    },
    {
      name_en: 'Kabaddi 🤼',
      name_hi: 'कबड्डी 🤼',
      rules_en: [
        'Two teams take turns raiding.',
        'Raider must chant "kabaddi" continuously.',
        'Tag opponents and return safely.',
        'Points for successful raids and tackles.',
      ],
      rules_hi: [
        'दो टीमों को रेड लेने का क्रम।',
        'रेडर लगातार "कबड्डी" बोले।',
        'विपक्षी को टैग करें और सुरक्षित लौटें।',
        'सफल रेड और टैकल पर अंक।',
      ],
    },
    {
      name_en: 'Kho-Kho 🏃',
      name_hi: 'खो-खो 🏃',
      rules_en: [
        'Chasers sit alternately in a line.',
        'Runner tries to avoid being touched.',
        'Chasers tag by touching teammates.',
        'Team with more outs wins.',
      ],
      rules_hi: [
        'चेज़र्स पंक्ति में बारी-बारी से बैठें।',
        'रनर छूने से बचने की कोशिश करें।',
        'चेज़र्स अपने टीममेट को टैग करके टैग करें।',
        'ज्यादा आउट वाली टीम जीतती है।',
      ],
    },
  ];

  // Challenges with tasks + video + image
  const enhancedChallenges: EnhancedChallenge[] = sportsChallenges.map((challenge) => {
    let requirements_en: string[] = [];
    let requirements_hi: string[] = [];
    let video_url = '';
    let image_url = challenge.image_url || '';

    switch (challenge.sport_type) {
      case 'kabaddi':
        requirements_en = ['Warm-up 10 min', 'Practice raids 15 min', 'Defend for 5 min', 'Ankle touches'];
        requirements_hi = ['10 मिनट वार्म-अप', '15 मिनट रेड्स का अभ्यास', '5 मिनट डिफेंस', 'एंकल टच'];
        video_url = 'https://www.youtube.com/embed/xG9fd-DRumQ';
        image_url = 'https://wallpapers.com/images/hd/intense-kabaddi-game-71do0nby8ox8ie4x.jpg'; // Kabaddi image
        break;
      case 'kho-kho':
        requirements_en = ['Sprint 50m 5x', 'Chasing practice', 'Tag 3 teammates'];
        requirements_hi = ['50 मीटर स्प्रिंट 5 बार', 'चेज़िंग का अभ्यास', '3 टीममेट टैग करें'];
        video_url = 'https://www.youtube.com/embed/TaltAedkATg';
        break;
      case 'mallakhamb':
        requirements_en = ['Stretch 10 min', 'Climb pole 3x', 'Balance 30 sec'];
        requirements_hi = ['10 मिनट स्ट्रेचिंग', 'खंभे पर 3 बार चढ़ना', '30 सेकंड बैलेंस'];
        video_url = 'https://www.youtube.com/embed/eA99C3-xfgI';
        break;
      case 'gilli-danda':
        requirements_en = ['Hit gilli 10x', 'Run wickets 5x', 'Improve accuracy'];
        requirements_hi = ['गिल्ली 10 बार मारें', 'विकेट्स के बीच 5 बार दौड़ें', 'सटीकता सुधारें'];
        video_url = 'https://www.youtube.com/embed/d7nDzgs1UXg';
        break;
      case 'surya-namaskar':
        requirements_en = ['Do 12 poses', 'Focus on breathing', 'Complete 5 rounds'];
        requirements_hi = ['12 आसन करें', 'सांस पर ध्यान दें', '5 राउंड पूरे करें'];
        video_url = 'https://www.youtube.com/embed/73sjDkQK0C8';
        break;
      default:
        requirements_en = ['Warm-up', 'Finish practice'];
        requirements_hi = ['वार्म-अप', 'प्रैक्टिस पूरी करें'];
        video_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        break;
    }

    return { ...challenge, requirements_en, requirements_hi, video_url, image_url };
  });

  const [selectedChallenge, setSelectedChallenge] = useState<EnhancedChallenge | null>(null);
  const [challengeTimers, setChallengeTimers] = useState<Record<string | number, number>>({});
  const [timerIntervals, setTimerIntervals] = useState<Record<string | number, number>>({});
  const [isRunning, setIsRunning] = useState<Record<string | number, boolean>>({});

  // Timer
  const startTimer = (id: string | number) => {
    if (!isRunning[id]) {
      const interval = window.setInterval(() => {
        setChallengeTimers((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      }, 1000);
      setTimerIntervals((prev) => ({ ...prev, [id]: interval }));
      setIsRunning((prev) => ({ ...prev, [id]: true }));
    }
  };

  const stopTimer = (id: string | number) => {
    if (timerIntervals[id]) {
      clearInterval(timerIntervals[id]);
      setIsRunning((prev) => ({ ...prev, [id]: false }));
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const getName = (c: EnhancedChallenge) => (language === 'en' ? c.name_en : c.name_hi);
  const getRequirements = (c: EnhancedChallenge) => (language === 'en' ? c.requirements_en : c.requirements_hi);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-orange-500 to-red-600 text-white h-screen p-6 sticky top-0 rounded-r-2xl shadow-xl overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Info /> {language === 'en' ? 'Sports & Rules' : 'खेल और नियम'}
        </h2>
        {sportsSidebar.map((sport, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{language === 'en' ? sport.name_en : sport.name_hi}</h3>
            <ul className="list-disc list-inside text-sm text-orange-100 space-y-1">
              {(language === 'en' ? sport.rules_en : sport.rules_hi).map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {language === 'en' ? 'Sports Challenges' : 'खेल चुनौतियाँ'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'en' ? 'Complete challenges to earn points' : 'अंक प्राप्त करने के लिए चुनौतियाँ पूरी करें'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {enhancedChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all hover:shadow-2xl">
              <div className="relative h-56">
                <img src={challenge.image_url} alt={getName(challenge)} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{getName(challenge)}</h3>

                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setSelectedChallenge(challenge)}
                    className="flex-1 px-4 py-2 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50"
                  >
                    {language === 'en' ? 'View Details' : 'विवरण देखें'}
                  </button>
                  <button
                    onClick={() => startTimer(challenge.id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold"
                  >
                    {language === 'en' ? 'Start' : 'शुरू करें'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setSelectedChallenge(null)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500">
              <X size={24} />
            </button>

            <img src={selectedChallenge.image_url} alt={getName(selectedChallenge)} className="w-full h-60 object-cover rounded-t-2xl" />

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{getName(selectedChallenge)}</h3>

              <h4 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Tasks' : 'कार्य'}</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                {getRequirements(selectedChallenge).map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>

              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => isRunning[selectedChallenge.id] ? stopTimer(selectedChallenge.id) : startTimer(selectedChallenge.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  {isRunning[selectedChallenge.id] ? <Pause size={16} /> : <Play size={16} />}
                  {isRunning[selectedChallenge.id]
                    ? language === 'en' ? 'Pause Timer' : 'टाइमर रोकें'
                    : language === 'en' ? 'Start Timer' : 'टाइमर शुरू करें'}
                </button>
                <span className="font-semibold text-gray-800">
                  {language === 'en' ? 'Time' : 'समय'}: {formatTime(challengeTimers[selectedChallenge.id] || 0)}
                </span>
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">{language === 'en' ? 'Video Tutorial' : 'वीडियो ट्यूटोरियल'}</h4>
              <iframe
                width="100%"
                height="250"
                src={selectedChallenge.video_url}
                title="Tutorial"
                className="rounded-lg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
