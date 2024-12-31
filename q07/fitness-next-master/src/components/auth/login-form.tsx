'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { loginAction } from '@/app/actions/auth';
import { decodeJWT } from '@/lib/utils/jwt';

export function LoginForm() {
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDefaultLogin = (role: 'manager' | 'client' | 'trainer') => {
    if (role === 'manager') {
      setEmail('mel_boss@fitness.dk');
      setPassword('asdfQWER');
    } else if (role === 'client') {
      setEmail('mel_c1@fit.dk');
      setPassword('aA');
    } else if (role === 'trainer') {
      setEmail('mel_m@fit.dk');
      setPassword('aQ');
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const result = await loginAction(formData);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.success) {
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      login(result.data.jwt);

      // Decode the token and log it for debugging
      const decodedToken = decodeJWT(result.data.jwt);
      console.log('Decoded Token:', decodedToken);

      // Redirect based on user role
      if (decodedToken.Role === 'PersonalTrainer') {
        router.push('/dashboard/trainer');
      } else if (decodedToken.Role === 'Manager') {
        router.push('/dashboard/manager');
      } else if (decodedToken.Role === 'Client') {
        router.push('/dashboard/client');
      } else {
        router.push('/login');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {message && (
        <div className={`text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => handleDefaultLogin('manager')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Default Manager
        </button>
        <button
          type="button"
          onClick={() => handleDefaultLogin('client')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Default Client
        </button>
        <button
          type="button"
          onClick={() => handleDefaultLogin('trainer')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Default Trainer
        </button>
      </div>
    </form>
  );
}