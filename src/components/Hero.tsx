import React from 'react';
import {
  Heart,
  Award,
  Users,
  Dumbbell,
  Activity,
  Leaf,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setCurrentView } = useApp();

  const features = [
    { icon: Heart, label: t('hero.wellness'), color: 'text-red-400' },
    { icon: Award, label: t('hero.traditionalSports'), color: 'text-yellow-400' },
    { icon: Users, label: t('hero.communityDriven'), color: 'text-blue-400' },
    { icon: Dumbbell, label: t('hero.strengthTraining'), color: 'text-pink-400' },
    { icon: Activity, label: t('hero.cardioEndurance'), color: 'text-green-400' },
    { icon: Leaf, label: t('hero.yogaMindfulness'), color: 'text-emerald-400' },
    { icon: ShieldCheck, label: t('hero.preventiveHealth'), color: 'text-indigo-400' },
    { icon: Globe, label: t('hero.inclusiveAccess'), color: 'text-purple-400' }
  ];

  const programs = [
    { title: t('sports.mallakhamb'), desc: t('sports.mallakhambDesc') },
    { title: t('sports.khokho'), desc: t('sports.khokhoDesc') },
    { title: t('sports.yoga'), desc: t('sports.yogaDesc') },
    { title: t('sports.cycling'), desc: t('sports.cyclingDesc') },
    { title: t('sports.kabaddi'), desc: t('sports.kabaddiDesc') },
    { title: t('sports.walkingClubs'), desc: t('sports.walkingClubsDesc') },
    { title: t('sports.meditationCircles'), desc: t('sports.meditationCirclesDesc') },
    { title: t('sports.nutritionWorkshops'), desc: t('sports.nutritionWorkshopsDesc') },
    { title: t('sports.villageMarathons'), desc: t('sports.villageMarathonsDesc') }
  ];

  return (
    <section className="relative">
      {/* Hero Section */}
      <div
        className="relative h-[750px] md:h-[800px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 103, 0, 0.55), rgba(19, 136, 8, 0.55)), url(https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg)'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <motion.div
          className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.span
            className="inline-block mb-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-sm"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('fitindia.message')} 🇮🇳
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => setCurrentView('recommendations')}
            className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-xl hover:bg-orange-100 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.cta')}
          </motion.button>

          {/* Features */}
          <motion.ul
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {features.map(({ icon: Icon, label, color }) => (
              <motion.li
                key={label}
                className="flex items-center space-x-3 bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors duration-300 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${color}`} />
                <span className="text-sm sm:text-base font-medium text-white/90">{label}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Wellness Quote */}
          <motion.div
            className="mt-10 bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-3xl text-white max-w-xl shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <blockquote className="text-lg sm:text-xl italic mb-3">{t('hero.quote')}</blockquote>
            <p className="text-sm sm:text-base text-white/80">{t('hero.ruralMessage')}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-600 via-white to-green-600 py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-center">
          <div className="flex items-center space-x-3 text-center">
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
            <span className="font-semibold text-gray-800">{t('atmanirbhar.message')}</span>
          </div>
        </div>
      </div>

      {/* Sports Showcase */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            {t('hero.sportsTitle') || 'Explore Our Sports & Wellness Programs'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programs.map(({ title, desc }, idx) => (
              <motion.div
                key={title}
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-orange-700 mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-gray-700">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
