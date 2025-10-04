import { AyurvedaDietPlan } from '../types';

export const goalDietPlans: AyurvedaDietPlan[] = [
  {
    goal: 'weightLoss',
    focus: {
      en: 'Stimulate metabolism with warm, light meals and detoxifying spices.',
      hi: 'गर्म, हल्के भोजन और डिटॉक्सिफाइंग मसालों से चयापचय को सक्रिय करें।'
    },
    hydration: {
      en: 'Sip cumin-fennel infused water every two hours to flush toxins gently.',
      hi: 'हर दो घंटे में जीरा-सौंफ मिले पानी की चुस्की लेते रहें ताकि विषाक्त तत्व धीरे-धीरे निकलें।'
    },
    lifestyleTips: [
      {
        en: 'Include 30 minutes of brisk walking or dynamic yoga flows before breakfast.',
        hi: 'नाश्ते से पहले 30 मिनट तेज चाल या डायनेमिक योग अभ्यास शामिल करें।'
      },
      {
        en: 'Finish dinner at least two hours before sleep for better digestion.',
        hi: 'पाचन को बेहतर बनाने के लिए रात का भोजन नींद से कम से कम दो घंटे पहले करें।'
      },
      {
        en: 'Practice deep nasal breathing whenever cravings surface.',
        hi: 'जब भी लालसा महसूस हो, गहरी नासिका श्वास का अभ्यास करें।'
      }
    ],
    slots: [
      {
        period: {
          en: 'Morning Ritual',
          hi: 'सुबह की शुरुआत'
        },
        suggestion: {
          en: 'Start the day with warm water, lemon, and a pinch of turmeric to awaken digestion.',
          hi: 'दिन की शुरुआत गुनगुने पानी, नींबू और एक चुटकी हल्दी से करें ताकि पाचन सक्रिय हो।'
        }
      },
      {
        period: {
          en: 'Breakfast',
          hi: 'नाश्ता'
        },
        suggestion: {
          en: 'Choose a fibre-rich bowl to keep you full without heaviness.',
          hi: 'फाइबर से भरपूर कटोरा चुनें जो बिना भारीपन के आपको तृप्त रखे।'
        },
        mealIds: ['4']
      },
      {
        period: {
          en: 'Midday Refresher',
          hi: 'दोपहर का ताज़ा नाश्ता'
        },
        suggestion: {
          en: 'Add crunchy sprouts with citrus for sustained energy.',
          hi: 'स्थायी ऊर्जा के लिए खट्टे स्वाद के साथ कुरकुरे अंकुरित शामिल करें।'
        },
        mealIds: ['7']
      },
      {
        period: {
          en: 'Lunch',
          hi: 'दोपहर ���ा भोजन'
        },
        suggestion: {
          en: 'Prioritise warm khichdi-style meals that are easy to digest.',
          hi: 'आसान पचने वाली गरम खिचड़ी जैसी थालियों को प्राथमिकता दें।'
        },
        mealIds: ['1', '5']
      },
      {
        period: {
          en: 'Evening Brew',
          hi: 'शाम का पेय'
        },
        suggestion: {
          en: 'Calm the system with a detox kadha to prevent late-night snacking.',
          hi: 'लेट-नाइट स्नैकिंग से बचाव के लिए डिटॉक्स काढ़े से शरीर को शांत करें।'
        },
        mealIds: ['9']
      },
      {
        period: {
          en: 'Dinner',
          hi: 'रात का भोजन'
        },
        suggestion: {
          en: 'Keep dinner light with protein-rich dal to repair tissues while you sleep.',
          hi: 'नींद के दौरान ऊत्तकों की मरम्मत के लिए डिनर को प्रोटीन युक्त दाल के साथ हल्का रखें।'
        },
        mealIds: ['3']
      }
    ]
  },
  {
    goal: 'muscleGain',
    focus: {
      en: 'Build strength with protein-dense meals and warming herbs.',
      hi: 'प्रोटीन से भरपूर भोजन और गर्माहट देने वाली जड़ी-बूटियों से शक्ति विकसित करें।'
    },
    hydration: {
      en: 'Alternate between plain water and electrolyte-rich coconut water.',
      hi: 'सादा पानी और इलेक्ट्रोलाइट समृद्ध नारियल पानी के बीच बारी-बारी से पीएं।'
    },
    lifestyleTips: [
      {
        en: 'Schedule strength training in the morning sun for optimal hormone balance.',
        hi: 'हार्मोन संतुलन के लिए सुबह की धूप में शक्ति प्रशिक्षण निर्धारित करें।'
      },
      {
        en: 'Add restorative stretching or foam rolling before bed.',
        hi: 'सोने से पहले रिस्टोरेटिव स्ट्रेचिंग या फोम रोलिंग जोड़ें।'
      },
      {
        en: 'Prioritise eight hours of deep sleep to rebuild muscle fibres.',
        hi: '���ांसपेशी तंतुओं की मरम्मत के लिए आठ घंटे की गहरी नींद को प्राथमिकता दें।'
      }
    ],
    slots: [
      {
        period: {
          en: 'Morning Activation',
          hi: 'सुबह की सक्रियता'
        },
        suggestion: {
          en: 'Warm up joints with sun salutations followed by a glass of warm water and ginger.',
          hi: 'सूर्य नमस्कार और गुनगुने पानी-अदरक के साथ जोड़ों को गर्म करें।'
        }
      },
      {
        period: {
          en: 'Breakfast',
          hi: 'नाश्ता'
        },
        suggestion: {
          en: 'Fuel muscles with sattu blended with jaggery and seeds.',
          hi: 'गुड़ और बीजों के साथ सत्तू ब्लेंड कर मांसपेशियों को ऊर्जा दें।'
        },
        mealIds: ['10']
      },
      {
        period: {
          en: 'Post-Workout Snack',
          hi: 'व्यायाम के बाद का स्नैक'
        },
        suggestion: {
          en: 'Balance amino acids with sprouted salad or sesame bites.',
          hi: 'अमीनो एसिड संतुलित रखने के लिए अंकुरित सलाद या तिल बाइट्स लें।'
        },
        mealIds: ['7', '12']
      },
      {
        period: {
          en: 'Lunch',
          hi: 'दोपहर का भोजन'
        },
        suggestion: {
          en: 'Anchor the day with a hearty paneer and millet bowl.',
          hi: 'दिन को पौष्टिक बनाने के लिए पनीर और मिलेट का भरपूर बाउल लें।'
        },
        mealIds: ['8']
      },
      {
        period: {
          en: 'Evening Nourishment',
          hi: 'शाम का पोषण'
        },
        suggestion: {
          en: 'Soothe nerves with mineral-rich herbal kadha.',
          hi: 'खनिजों से भरपूर हर्बल काढ़े से नसों को शांति दें।'
        },
        mealIds: ['9']
      },
      {
        period: {
          en: 'Dinner',
          hi: 'रात का भोजन'
        },
        suggestion: {
          en: 'Pair dal with moringa stew to aid overnight recovery.',
          hi: 'रात में रि��वरी के लिए दाल और मोरिंगा स्ट्यू का संयोजन करें।'
        },
        mealIds: ['3', '11']
      }
    ]
  },
  {
    goal: 'flexibility',
    focus: {
      en: 'Reduce inflammation and keep joints supple with anti-inflammatory foods.',
      hi: 'सूजन कम करने और जोड़ों को लचीला रखने के लिए एंटी-इन्फ्लेमेटरी भोजन अपनाएं।'
    },
    hydration: {
      en: 'Infuse water with turmeric, tulsi, and black pepper through the day.',
      hi: 'दिनभर पानी में हल्दी, तुलसी और काली मिर्च मिलाकर पीएं।'
    },
    lifestyleTips: [
      {
        en: 'Add gentle yin yoga or long-held stretches in the evening.',
        hi: 'शाम के समय सौम्य यिन योग या लंबे स्ट्रेच शामिल करें।'
      },
      {
        en: 'Oil massage (abhyanga) twice a week supports joint lubrication.',
        hi: 'सप्ताह में दो बार तेल मालिश (अभ्यंग) से जोड़ों को चिकनाई मिलती है।'
      },
      {
        en: 'Avoid sitting for longer than 45 minutes at a stretch.',
        hi: '45 मिनट से अधिक लगातार बैठने से बचें।'
      }
    ],
    slots: [
      {
        period: {
          en: 'Morning Ritual',
          hi: 'सुबह की शुरुआत'
        },
        suggestion: {
          en: 'Sip ginger-lime infusion before practice to warm tissues.',
          hi: 'अभ्यास से पहले ऊतकों को गर्म करने के लिए अदरक-नींबू का काढ़ा पिएं।'
        }
      },
      {
        period: {
          en: 'Breakfast',
          hi: 'नाश्ता'
        },
        suggestion: {
          en: 'Include nourishing oats with dates to lubricate joints.',
          hi: 'जोड़ों को चिकनाई देने के लिए खजूर के साथ पौष्टिक ओट्स शामिल करें।'
        },
        mealIds: ['4']
      },
      {
        period: {
          en: 'Cooling Break',
          hi: 'ठंडक भरा ब्रेक'
        },
        suggestion: {
          en: 'Refresh the system with cucumber raita for pitta balance.',
          hi: 'पित्त संतुलन के लिए खीरा रायता से शरीर को तरोताजा करें।'
        },
        mealIds: ['2']
      },
      {
        period: {
          en: 'Lunch',
          hi: 'दोपहर का भोजन'
        },
        suggestion: {
          en: 'Opt for vegetable khichdi rich in ghee for joint support.',
          hi: 'जोड़ों को सहारा देने के लिए घी से भरपूर सब्जी खिचड़ी चुनें।'
        },
        mealIds: ['5']
      },
      {
        period: {
          en: 'Evening Support',
          hi: 'शाम का समर्थन'
        },
        suggestion: {
          en: 'Use detox kadha to clear stiffness-causing ama.',
          hi: 'जकड़न पैदा करने वाले आम को दूर करने के लिए डिटॉक्स काढ़ा लें।'
        },
        mealIds: ['9']
      },
      {
        period: {
          en: 'Dinner',
          hi: 'रात का भोजन'
        },
        suggestion: {
          en: 'Finish with moringa stew to supply minerals for tissues.',
          hi: 'ऊतकों को खनिज देने के लिए भोजन का समापन मोरिंगा स्ट्यू से करें।'
        },
        mealIds: ['11']
      }
    ]
  },
  {
    goal: 'stress',
    focus: {
      en: 'Ground the nervous system with warm, sweet, and oily foods in moderation.',
      hi: 'गर्म, मधुर और उचित मात्रा में तैलीय भोजन से तंत्रिका तंत्र को स्थिर करें।'
    },
    hydration: {
      en: 'Sip warm milk with nutmeg at night and tulsi during the day.',
      hi: 'रात में जायफल के साथ गर्म दूध और दिन में तुलसी वाला पेय पिएं।'
    },
    lifestyleTips: [
      {
        en: 'End the day with guided yoga nidra or mindful chanting.',
        hi: 'दिन का समापन योग निद्रा या सजग जप के साथ करें।'
      },
      {
        en: 'Keep a fixed sleep-wake schedule to calm cortisol.',
        hi: 'कॉर्टिसोल को शांत रखने के लिए नियमित नींद-जागने का समय बनाए रखें।'
      },
      {
        en: 'Spend mindful time outdoors to absorb natural prana.',
        hi: 'प्राकृतिक प्राण लेने के लिए रोज थोड़ी देर बाहर शांत समय बिताएं।'
      }
    ],
    slots: [
      {
        period: {
          en: 'Morning Ritual',
          hi: 'सुबह की शुरुआत'
        },
        suggestion: {
          en: 'Drink warm milk infused with cardamom after alternate nostril breathing.',
          hi: 'अनुलोम-विलोम के बाद इलायची मिला गर्म दूध पिएं।'
        }
      },
      {
        period: {
          en: 'Breakfast',
          hi: 'नाश्ता'
        },
        suggestion: {
          en: 'Enjoy oats with dates and ghee for grounded energy.',
          hi: 'स्थिर ऊर्जा के लिए खजूर और घी के साथ ओट्स का आनंद लें।'
        },
        mealIds: ['4']
      },
      {
        period: {
          en: 'Midday Snack',
          hi: 'दोपहर का स्नैक'
        },
        suggestion: {
          en: 'Have fruit chaat to uplift mood without overstimulating.',
          hi: 'बिना अतिउत्तेजना के मनोभाव को बेहतर करने के लिए फल चाट लें।'
        },
        mealIds: ['6']
      },
      {
        period: {
          en: 'Lunch',
          hi: 'दोपहर का भोजन'
        },
        suggestion: {
          en: 'Khichdi with ghee keeps nerves nourished and calm.',
          hi: 'घी वाली खिचड़ी नसों को पोषण और शांति प्रदान करती है।'
        },
        mealIds: ['5']
      },
      {
        period: {
          en: 'Evening Calm',
          hi: 'शाम की शांति'
        },
        suggestion: {
          en: 'Wind down with herbal kadha and gentle breathing.',
          hi: 'हर्बल काढ़ा और सौम्य श्वास अभ्यास से मन को शांत करें।'
        },
        mealIds: ['9']
      },
      {
        period: {
          en: 'Dinner',
          hi: 'रात का भोजन'
        },
        suggestion: {
          en: 'Pair mung dal with sesame bites for grounding sweetness.',
          hi: 'मूंग दाल को तिल गुड़ बाइट्स के साथ लेकर स्थिरता और मिठास पाएं।'
        },
        mealIds: ['3', '12']
      }
    ]
  },
  {
    goal: 'endurance',
    focus: {
      en: 'Sustain stamina with complex carbs, electrolytes, and steady protein.',
      hi: 'जटिल कार्ब, इलेक्ट्रोलाइट और स्थायी प्रोटीन से सहनशक्ति बनाए रखें।'
    },
    hydration: {
      en: 'Keep a copper bottle with jeera water handy during training.',
      hi: 'प्रशिक्षण के दौरान जेरे का पानी भरी तांबे की बोतल साथ रखें।'
    },
    lifestyleTips: [
      {
        en: 'Layer interval training twice a week with active recovery days.',
        hi: 'सप्ताह में दो बार इंटरवल ट्रेनिंग करें और सक्रिय रिकवरी दिन रखें।'
      },
      {
        en: 'Add pranayama like bhastrika to expand lung capacity.',
        hi: 'फेफड़ों की क्षमता बढ़ाने के लिए भस्त्रिका जैसे प्राणायाम जोड़ें।'
      },
      {
        en: 'Track sleep and heart-rate variability to avoid overtraining.',
        hi: 'ओवरट्रेनिंग से बचने के लिए नींद और हृदय दर परिवर्तनशीलता को ट्रैक करें।'
      }
    ],
    slots: [
      {
        period: {
          en: 'Pre-Training Fuel',
          hi: 'प्रशिक्षण से पहले'
        },
        suggestion: {
          en: 'Hydrate with sattu or coconut water 30 minutes before sessions.',
          hi: 'सत्र से 30 मिनट पहले सत्तू या नारियल पानी से हाइड्रेट हों।'
        },
        mealIds: ['10']
      },
      {
        period: {
          en: 'Breakfast',
          hi: 'नाश्ता'
        },
        suggestion: {
          en: 'Add dates or bananas on oats for glycogen stores.',
          hi: 'ग्लाइकोजन भंडार के लिए ओट्स पर खजूर या केला जोड़ें।'
        },
        mealIds: ['4']
      },
      {
        period: {
          en: 'Midday Snack',
          hi: 'दोपहर का स्नैक'
        },
        suggestion: {
          en: 'Use sprouted salad to keep enzymes active.',
          hi: 'एंज़ाइम सक्रिय रखने के लिए अंकुरित सलाद लें।'
        },
        mealIds: ['7']
      },
      {
        period: {
          en: 'Lunch',
          hi: 'दोपहर का भोजन'
        },
        suggestion: {
          en: 'Combo of paneer and millet delivers steady energy release.',
          hi: 'पनीर और मिलेट का संयोजन स्थिर ऊर्जा प्रदान करता है।'
        },
        mealIds: ['8']
      },
      {
        period: {
          en: 'Evening Snack',
          hi: 'शाम का स्नैक'
        },
        suggestion: {
          en: 'Refuel electrolytes with fruit chaat or herbal kadha.',
          hi: 'फल चाट या हर्बल काढ़े से इलेक्ट्रोलाइट पुनः प्राप्त करें।'
        },
        mealIds: ['6', '9']
      },
      {
        period: {
          en: 'Dinner',
          hi: 'रात का भोजन'
        },
        suggestion: {
          en: 'Wind down with mung dal and moringa stew to rebuild overnight.',
          hi: 'रातभर रिकवरी के लिए मूंग दाल और मोरिंगा स्ट्यू से दिन का समापन करें।'
        },
        mealIds: ['3', '11']
      }
    ]
  },
  {
    goal: 'overall',
    focus: {
      en: 'Maintain harmony across doshas with balanced flavours and colours.',
      hi: 'संतुलित स्वाद और रंगों के साथ दोषों में समरसता बनाए रखें।'
    },
    hydration: {
      en: 'Begin and end the day with warm water and seasonal herbs.',
      hi: 'दिन की शुरुआत और अंत मौसमी जड़ी-बूटियों वाले गुनगुने पानी से करें।'
    },
    lifestyleTips: [
      {
        en: 'Rotate yoga styles through the week—strength, mobility, and meditation.',
        hi: 'सप्ताह में योग की शैली बदलें—शक्ति, गतिशीलता और ध्यान।'
      },
      {
        en: 'Eat the rainbow: include at least five natural colours daily.',
        hi: 'रोज़ाना कम से कम पांच प्राकृतिक रंगों वाले खाद्य पदार्थ लें।'
      },
      {
        en: 'Keep mealtimes consistent to stabilise agni (digestive fire).',
        hi: 'अग्नि (पाचन शक्ति) स्थिर रखने के लिए भोजन का समय नियमित रखें।'
      }
    ],
    slots: [
      {
        period: {
          en: 'Morning Ritual',
          hi: 'सुबह की शुरुआत'
        },
        suggestion: {
          en: 'Practice five minutes of gratitude journaling with herbal tea.',
          hi: 'हर्बल चाय के साथ पाँच मिनट कृतज्ञता लेखन करें।'
        }
      },
      {
        period: {
          en: 'Breakfast',
          hi: 'नाश्ता'
        },
        suggestion: {
          en: 'Alternate oats, sattu, and fresh fruits across the week.',
          hi: 'सप्ताह भर ओट्स, सत्तू और ताज़ा फलों का क्रम से उपयोग करें।'
        },
        mealIds: ['4', '10', '6']
      },
      {
        period: {
          en: 'Midday Snack',
          hi: 'दोपहर का स्नैक'
        },
        suggestion: {
          en: 'Combine sprouts and cucumber for balanced hydration and protein.',
          hi: 'संतुलित पानी और प्रोटीन के लिए अंकुरित और खीरा मिलाएं।'
        },
        mealIds: ['2', '7']
      },
      {
        period: {
          en: 'Lunch',
          hi: 'दोपहर का भोजन'
        },
        suggestion: {
          en: 'Build a colourful thali with turmeric rice and vegetable khichdi.',
          hi: 'हल्दी चावल और सब्जी खिचड़ी के साथ रंगीन थाली बनाएं।'
        },
        mealIds: ['1', '5']
      },
      {
        period: {
          en: 'Evening Ritual',
          hi: 'शाम की रस्म'
        },
        suggestion: {
          en: 'Share herbal kadha with family to unwind together.',
          hi: 'परिवार के साथ हर्बल काढ़ा साझा कर तनाव मुक्त हों।'
        },
        mealIds: ['9']
      },
      {
        period: {
          en: 'Dinner',
          hi: 'रात का भोजन'
        },
        suggestion: {
          en: 'End with mung dal and moringa stew, followed by sesame bites if needed.',
          hi: 'भोजन का समापन मूंग दाल और मोरिंगा स्ट्यू से करें, आवश्यकता हो तो तिल बाइट्स लें।'
        },
        mealIds: ['3', '11', '12']
      }
    ]
  }
];
