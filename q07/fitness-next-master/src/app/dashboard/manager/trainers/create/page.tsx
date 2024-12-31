'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FitnessAPI } from '@/lib/api/fitness-api';

export default function ManagerTrainersCreatePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = Math.floor(Math.random() * 1000000); // Generate a random user ID
    const personalTrainerId = Math.floor(Math.random() * 1000000); // Generate a random personal trainer ID

    try {
      await FitnessAPI.createTrainer({ userId, firstName, lastName, email, password, personalTrainerId, accountType: 'personalTrainer' });
      alert('Trainer added successfully!');
      router.push('/dashboard/manager/trainers');
    } catch (error) {
      console.error('Error adding trainer:', error);
      alert('Failed to add trainer');
    } finally {
      setLoading(false);
    }
  };*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await FitnessAPI.createTrainer({
        firstName,
        lastName,
        email,
        password,
      });
      alert('Trainer added successfully!');
      router.push('/dashboard/manager');
    } catch (error) {
      console.error('Error adding trainer:', error);
      alert('Failed to add trainer');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Create New Trainer</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Trainer'}
        </button>
      </form>
    </div>
  );
}