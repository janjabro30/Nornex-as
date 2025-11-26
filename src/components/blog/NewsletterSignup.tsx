'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  variant?: 'sidebar' | 'inline' | 'footer';
}

export default function NewsletterSignup({ variant = 'sidebar' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !gdprAccepted) {
      setStatus('error');
      setMessage('Vennligst fyll ut e-post og godta personvernvilkår.');
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Takk for at du abonnerer! Du vil motta en bekreftelse på e-post.');
      setEmail('');
      setGdprAccepted(false);
    } catch {
      setStatus('error');
      setMessage('Noe gikk galt. Vennligst prøv igjen.');
    }
  };
  
  if (variant === 'inline') {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
        <h3 className="text-xl font-bold">Hold deg oppdatert</h3>
        <p className="mt-2 text-blue-100">
          Få de nyeste artiklene og IT-tips rett i innboksen.
        </p>
        
        {status === 'success' ? (
          <div className="mt-4 rounded-lg bg-green-500/20 p-4 text-green-100">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-postadresse"
                className="flex-1 rounded-lg border-0 bg-white/10 px-4 py-2.5 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-lg bg-white px-6 py-2.5 font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Sender...' : 'Abonner'}
              </button>
            </div>
            <label className="mt-3 flex items-start gap-2 text-sm text-blue-100">
              <input
                type="checkbox"
                checked={gdprAccepted}
                onChange={(e) => setGdprAccepted(e.target.checked)}
                className="mt-0.5 rounded border-white/30 bg-white/10 text-white focus:ring-white/50"
              />
              <span>
                Jeg godtar at Nornex lagrer min e-post i henhold til{' '}
                <a href="/personvern" className="underline hover:text-white">personvernpolicyen</a>.
              </span>
            </label>
            {status === 'error' && (
              <p className="mt-2 text-sm text-red-300">{message}</p>
            )}
          </form>
        )}
      </div>
    );
  }
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
        <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
        Abonner på nyhetsbrev
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Få de nyeste IT-nyhetene og tipsene rett i innboksen.
      </p>
      
      {status === 'success' ? (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-postadresse"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            required
          />
          
          <label className="mt-3 flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              checked={gdprAccepted}
              onChange={(e) => setGdprAccepted(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <span>
              Jeg godtar at Nornex lagrer min e-post i henhold til personvernpolicyen.
            </span>
          </label>
          
          {status === 'error' && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">{message}</p>
          )}
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? 'Sender...' : 'Abonner gratis'}
          </button>
        </form>
      )}
    </div>
  );
}
