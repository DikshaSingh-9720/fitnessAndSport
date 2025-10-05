import { FormEvent, useState } from 'react';
import { supabase } from '../supabaseClient';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setStatusMessage('Check your email for the login link.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-sm border border-orange-100 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back to FitBharat</h1>
          <p className="text-sm text-gray-600 mt-2">
            Sign in with your email address to continue your wellness journey.
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-orange-200 px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}
          {statusMessage && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {statusMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-green-500 px-4 py-3 text-white font-semibold shadow-md transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Sending magic link…' : 'Send magic link'}
          </button>
        </form>
      </div>
    </div>
  );
};
