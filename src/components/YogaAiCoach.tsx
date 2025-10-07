import { FormEvent, useMemo, useState, useRef, useEffect } from "react";
import {
  Activity,
  Brain,
  CalendarRange,
  Heart,
  Sparkles,
  Timer,
  Upload,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useApp } from "../contexts/AppContext";

import type { YogaPose } from "../types";
import axios from "axios";

// ---------- Types ----------
interface Prediction {
  class_name: string;
  confidence: number;
  feedback?: string;
}

interface CoachPlanStage {
  stage: "warmup" | "main" | "cooldown";
  pose: YogaPose;
  minutes: number;
  intention: { en: string; hi: string };
}

interface CoachPlan {
  stages: CoachPlanStage[];
  breathwork: { en: string; hi: string };
  affirmation: { en: string; hi: string };
}

// ---------- Constants ----------
const difficultyScore: Record<YogaPose["difficulty_level"], number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

interface FocusOption {
  value: "balance" | "flexibility" | "strength" | "calm" | "energy";
  label: { en: string; hi: string };
  categories: string[];
}

const focusOptions: FocusOption[] = [
  {
    value: "balance",
    label: { en: "Balance & Stability", hi: "संतुलन और स्थिरता" },
    categories: ["balancing", "standing"],
  },
  {
    value: "flexibility",
    label: { en: "Flexibility & Mobility", hi: "लचीलापन और गतिशीलता" },
    categories: ["seated", "backbend"],
  },
  {
    value: "strength",
    label: { en: "Strength & Endurance", hi: "शक्ति और सहनशक्ति" },
    categories: ["standing", "backbend"],
  },
  {
    value: "calm",
    label: { en: "Calm & Recovery", hi: "शांति और रिकवरी" },
    categories: ["seated"],
  },
  {
    value: "energy",
    label: { en: "Energy Boost", hi: "ऊर्जा वृद्धि" },
    categories: ["standing", "balancing", "backbend"],
  },
];

const moodOptions = [
  { value: "stressed", label: { en: "Stressed", hi: "तनावग्रस्त" } },
  {
    value: "tired",
    label: { en: "Physically Tired", hi: "शारीरिक रूप से थके" },
  },
  { value: "low", label: { en: "Low Mood", hi: "मन उदास" } },
  { value: "energized", label: { en: "Energized", hi: "ऊर्जावान" } },
] as const;

const experienceLabels: Record<
  YogaPose["difficulty_level"],
  { en: string; hi: string }
> = {
  beginner: { en: "Beginner", hi: "शुरुआती" },
  intermediate: { en: "Intermediate", hi: "मध्यवर्ती" },
  advanced: { en: "Advanced", hi: "उन्नत" },
};

const stageLabels: Record<
  "warmup" | "main" | "cooldown",
  { en: string; hi: string }
> = {
  warmup: { en: "Warm-up", hi: "वार्म-अप" },
  main: { en: "Main Flow", hi: "मुख्य प्रवाह" },
  cooldown: { en: "Cool Down", hi: "शांत चरण" },
};

const stageIntentions: Record<
  CoachPlanStage["stage"],
  { en: string; hi: string }
> = {
  warmup: {
    en: "Activate joints and connect with breath before deep work.",
    hi: "गहरे अभ्यास से पहले जोड़ों को सक्रिय करें और सांस से जुड़ें।",
  },
  main: {
    en: "Build mindful strength, balance, and focus.",
    hi: "सचेत शक्ति, संतुलन और एकाग्रता विकसित करें।",
  },
  cooldown: {
    en: "Integrate benefits and invite a calm mind.",
    hi: "लाभों को आत्मसात करें और मन को शांत करें।",
  },
};

const moodBreathGuidance: Record<
  (typeof moodOptions)[number]["value"],
  { en: string; hi: string }
> = {
  stressed: {
    en: "Practice 4-6 breathing. Inhale for four counts, exhale for six to calm the nervous system.",
    hi: "4-6 श्वास का अभ्यास करें। चार गिनती में सांस लें, छह गिनती में छोड़ें ताकि तंत्रिका तंत्र शांत हो।",
  },
  tired: {
    en: "Use three rounds of Kapalabhati to awaken energy before beginning the flow.",
    hi: "प्रवाह शुरू करने से पहले ऊर्जा जगाने के लिए तीन दौर कपालभाति करें।",
  },
  low: {
    en: "Take five slow belly breaths with a gentle smile to lift the mood naturally.",
    hi: "मूड को स्वाभाविक रूप से उठाने के लिए पांच धीमी पेट श्वास लें और हल्की मुस्कान रखें।",
  },
  energized: {
    en: "Alternate nostril breathing for two minutes will focus your energy without overstimulation.",
    hi: "दो मिनट के लिए अनुलोम-विलोम करें ताकि ऊर्जा केंद्रित रहे और अति उत्तेजना न हो।",
  },
};

const focusAffirmations: Record<
  (typeof focusOptions)[number]["value"],
  { en: string; hi: string }
> = {
  balance: {
    en: "“I am steady, rooted, and calm.”",
    hi: '"मैं स्थिर, जुड़ा और शांत हूं।"',
  },
  flexibility: {
    en: "“Each breath softens my body and mind.”",
    hi: '"हर सांस मेरे शरीर और मन को कोमल बनाती है।"',
  },
  strength: {
    en: "“Every pose builds my inner and outer strength.”",
    hi: '"हर आसन मेरी आंतरिक और बाहरी शक्ति को बढ़ाता है।"',
  },
  calm: {
    en: "“I give myself permission to rest deeply.”",
    hi: '"मैं स्वयं को गहराई से विश्राम की अनुमति देता/देती हूं।"',
  },
  energy: {
    en: "“My breath fuels joyful movement.”",
    hi: '"मेरी सांस आनंददायक आंदोलन को ऊर्जा देती है।"',
  },
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

// ---------- Helper Functions ----------
const getLocalized = (language: ReturnType<typeof useLanguage>['language'], text: { en: string; hi: string }) => {
  return text[language] ?? text.en;
};

const handlePredict = async (file: File): Promise<Prediction | null> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Prediction failed:", err);
    return null;
  }
};

// ---------- Component ----------
export const YogaAiCoach: React.FC = () => {
  const { language } = useLanguage();
  const { yogaPoses, userProfile } = useApp();

  const [experience, setExperience] = useState<YogaPose["difficulty_level"]>(
    userProfile?.yoga_experience ?? "beginner"
  );
  const [sessionLength, setSessionLength] = useState(30);
  const [focus, setFocus] =
    useState<(typeof focusOptions)[number]["value"]>("balance");
  const [mood, setMood] =
    useState<(typeof moodOptions)[number]["value"]>("stressed");
  const [plan, setPlan] = useState<CoachPlan | null>(null);
  const [predictedPose, setPredictedPose] = useState<YogaPose | null>(null);

  const [livePrediction, setLivePrediction] = useState<Prediction | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poseData, setPoseData] = useState<{
    pose: string;
    confidence: number;
    feedback: string[];
  }>({
    pose: "",
    confidence: 0,
    feedback: [],
  });

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const captureFrame = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPoseData(data);
    }, "image/jpeg");
  };

  useEffect(() => {
    const interval = setInterval(captureFrame, 3000);
    return () => clearInterval(interval);
  }, []);

  // ---------- Derived Data ----------
  const maxDifficultyScore = useMemo(
    () => difficultyScore[experience],
    [experience]
  );

  const filteredByExperience = useMemo(
    () =>
      yogaPoses.filter(
        (pose) => difficultyScore[pose.difficulty_level] <= maxDifficultyScore
      ),
    [yogaPoses, maxDifficultyScore]
  );

  const focusCategories = useMemo(
    () => focusOptions.find((opt) => opt.value === focus)?.categories ?? [],
    [focus]
  );

  const curatedSequence = useMemo(() => {
    let primaryMatches = filteredByExperience.filter((pose) =>
      focusCategories.includes(pose.category)
    );
    if (
      predictedPose &&
      !primaryMatches.includes(predictedPose) &&
      filteredByExperience.includes(predictedPose)
    ) {
      primaryMatches.unshift(predictedPose);
    }
    if (primaryMatches.length >= 3) return primaryMatches.slice(0, 3);
    const supplemental = filteredByExperience.filter(
      (pose) => !primaryMatches.includes(pose)
    );
    return [...primaryMatches, ...supplemental].slice(0, 3);
  }, [filteredByExperience, focusCategories, predictedPose]);

  // ---------- Handlers ----------
  const handleGeneratePlan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (curatedSequence.length === 0) {
      setPlan(null);
      return;
    }

    const warmupMinutes = Math.max(5, Math.round(sessionLength * 0.25));
    const cooldownMinutes = Math.max(5, Math.round(sessionLength * 0.2));
    const mainMinutes = Math.max(
      5,
      sessionLength - warmupMinutes - cooldownMinutes
    );

    const stagesOrder: CoachPlanStage["stage"][] = [
      "warmup",
      "main",
      "cooldown",
    ];
    const minutesDistribution = [warmupMinutes, mainMinutes, cooldownMinutes];

    const stages: CoachPlanStage[] = curatedSequence.map((pose, idx) => ({
      stage: stagesOrder[idx] ?? "main",
      pose,
      minutes:
        minutesDistribution[idx] ??
        Math.max(5, Math.round(sessionLength / curatedSequence.length)),
      intention: stageIntentions[stagesOrder[idx] ?? "main"],
    }));

    setPlan({
      stages,
      breathwork: moodBreathGuidance[mood],
      affirmation: focusAffirmations[focus],
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const prediction = await handlePredict(file);
    if (prediction) {
      const matchedPose = yogaPoses.find(
        (p) =>
          p.name_en.toLowerCase().trim() ===
          prediction.class_name.toLowerCase().trim()
      );
      if (matchedPose) setPredictedPose(matchedPose);
    }
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50 py-12 px-4">
  <div className="max-w-5xl mx-auto space-y-12">
    {/* --- Video / Pose Detection --- */}
    <div className="relative bg-white/80 backdrop-blur-md border border-orange-200 rounded-3xl p-6 shadow-lg flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-orange-600">🧘 Yoga AI Coach</h2>
      <video
        ref={videoRef}
        autoPlay
        className="rounded-xl border-2 border-orange-300 w-full max-w-lg shadow-md"
      />
      <div className="w-full mt-4 p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
        <p className="font-semibold text-gray-700">Detected Pose: <span className="text-orange-600">{poseData.pose}</span></p>
        <p className="text-sm text-gray-500">Confidence: {poseData.confidence.toFixed(2)}%</p>
        <ul className="mt-2 text-green-700 space-y-1">
          {poseData.feedback.map((f, i) => (
            <li key={i} className="flex items-center gap-1">✅ {f}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* --- Form Section --- */}
    <div className="bg-white/80 backdrop-blur-md border border-orange-200 rounded-3xl p-8 shadow-lg grid gap-8 md:grid-cols-2">
      <form onSubmit={handleGeneratePlan} className="space-y-6 md:col-span-2">
        {/* Experience, Mood, Session */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value as YogaPose["difficulty_level"])}
              className="w-full rounded-xl border border-orange-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            >
              {Object.keys(experienceLabels).map((level) => (
                <option key={level} value={level}>
                  {getLocalized(language, experienceLabels[level as YogaPose["difficulty_level"]])}
                </option>
              ))}
            </select>
          </div>

          {/* Session Length */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Session (min)</label>
            <input
              type="number"
              min={15}
              max={90}
              value={sessionLength}
              onChange={(e) => setSessionLength(Number(e.target.value))}
              className="w-full rounded-xl border border-orange-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>

          {/* Mood */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value as typeof mood)}
              className="w-full rounded-xl border border-orange-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            >
              {moodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {getLocalized(language, option.label)}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Upload Pose (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full rounded-xl border border-orange-200 px-4 py-2 text-gray-700"
            />
          </div>
        </div>

        {/* Focus Options */}
        <div>
          <p className="text-gray-700 font-semibold mb-2">Primary Focus</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {focusOptions.map((option) => {
              const isSelected = option.value === focus;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFocus(option.value)}
                  className={`rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg scale-105"
                      : "border border-orange-200 bg-orange-50 text-gray-800 hover:border-orange-300 hover:shadow-sm"
                  }`}
                >
                  <span className="font-semibold">{getLocalized(language, option.label)}</span>
                  <span className="block text-xs opacity-70">Tap to select</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles size={18} />
            Generate Plan
          </button>
        </div>
      </form>
    </div>

    {/* --- Generated Plan --- */}
    {plan && (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Yoga Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plan.stages.map((stage, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-r from-orange-50 to-white border border-orange-200 rounded-3xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold mb-1">
                {getLocalized(language, stageLabels[stage.stage])} - {stage.minutes} min
              </h3>
              <p className="font-semibold">{getLocalized(language, { en: "Pose:", hi: "आसन:" })} {getLocalized(language, { en: stage.pose.name_en, hi: stage.pose.name_hi })}</p>
              <p className="text-sm text-gray-600">{getLocalized(language, { en: stage.pose.description_en, hi: stage.pose.description_hi })}</p>
              <p className="italic mt-2">{getLocalized(language, stage.intention)}</p>
            </div>
          ))}
        </div>

        {/* Breathwork & Affirmation */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
            <h4 className="font-semibold mb-2">Breathwork Guidance</h4>
            <p>{getLocalized(language, plan.breathwork)}</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
            <h4 className="font-semibold mb-2">Affirmation</h4>
            <p>{getLocalized(language, plan.affirmation)}</p>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
};
