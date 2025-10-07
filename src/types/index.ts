export interface UserProfile {
  id: string;
  full_name: string;
  language_preference: 'en' | 'hi';
  fitness_goals: string[];
  yoga_experience: 'beginner' | 'intermediate' | 'advanced';
  dietary_preferences: string[];
  dosha_type?: 'vata' | 'pitta' | 'kapha';
  sports_interests: string[];
  completed_challenge_ids: string[];
  total_points: number;
  yoga_sessions: number;

}

export interface YogaPose {
  id: string;
  name_en: string;
  name_hi: string;
  sanskrit_name: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  description_en: string;
  description_hi: string;
  benefits_en: string[];
  benefits_hi: string[];
  instructions_en: string[];
  instructions_hi: string[];
  duration_minutes: number;
  image_url: string;
}

export interface AyurvedaMeal {
  id: string;
  name_en: string;
  name_hi: string;
  dosha_type: string[];
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dietary_category: string[];
  description_en: string;
  description_hi: string;
  ingredients_en: string[];
  ingredients_hi: string[];
  preparation_en: string;
  preparation_hi: string;
  calories: number;
  image_url: string;
}

export interface LocalizedText {
  en: string;
  hi: string;
}

export interface AyurvedaDietPlanSlot {
  period: LocalizedText;
  suggestion: LocalizedText;
  mealIds?: string[];
}

export interface AyurvedaDietPlan {
  goal: string;
  focus: LocalizedText;
  hydration: LocalizedText;
  lifestyleTips: LocalizedText[];
  slots: AyurvedaDietPlanSlot[];
}

export interface SportsChallenge {
  id: string;
  sport_type: string;
  name_en: string;
  name_hi: string;
  description_en: string;
  description_hi: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  duration_days: number;
  requirements_en: string[];
  requirements_hi: string[];
  image_url: string;
  active: boolean;
}

export interface LeaderboardEntry {
  id: string;
  user_name: string;
  total_points: number;
  challenges_completed: number;
  yoga_sessions: number;
  rank: number;
}

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}
