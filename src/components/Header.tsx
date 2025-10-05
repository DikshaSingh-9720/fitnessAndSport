import React from 'react';
import { Globe, LogOut, Menu } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currentView, setCurrentView, userProfile } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-orange-600 via-white to-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              फ
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-600">{t('app.tagline')}</p>
            </div>
          </div>

          {userProfile && (
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => setCurrentView('yoga')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'yoga'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                {t('nav.yoga')}
              </button>
              <button
                onClick={() => setCurrentView('nutrition')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'nutrition'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                {t('nav.nutrition')}
              </button>
              <button
                onClick={() => setCurrentView('sports')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'sports'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                {t('nav.sports')}
              </button>
              <button
                onClick={() => setCurrentView('leaderboard')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentView === 'leaderboard'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-orange-100'
                }`}
              >
                {t('nav.leaderboard')}
              </button>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              title={language === 'en' ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
            >
              <Globe size={18} />
              <span className="font-semibold">{language === 'en' ? 'हिं' : 'EN'}</span>
            </button>
            {userProfile && (
              <>
                <button className="md:hidden p-2 text-gray-700 hover:bg-orange-100 rounded-lg" aria-label="Open navigation">
                  <Menu size={24} />
                </button>
                <button
                  onClick={handleSignOut}
                  className="md:hidden p-2 text-gray-700 hover:bg-orange-100 rounded-lg"
                  aria-label="Sign out"
                >
                  <LogOut size={24} />
                </button>
                <button
                  onClick={handleSignOut}
                  className="hidden md:inline-flex items-center px-3 py-2 rounded-lg border border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
