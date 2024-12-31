'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FitnessAPI } from '@/lib/api/fitness-api';
import { Trainer } from '@/lib/types';

export default function ManagerDashboard() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const data = await FitnessAPI.getTrainers();
        console.log('fetched trainers:', data);
        // Filter trainers with email prefix "mel"
        const filteredTrainers = data.filter(trainer => trainer.email.startsWith('mel'));
        setTrainers(filteredTrainers);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading trainers...</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Manager Dashboard</h1>
      <p className="text-gray-700 mb-4">You are logged in as a manager.</p>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Personal Trainers</h2>
          {trainers.length === 0 ? (
            <p className="text-gray-500">No trainers found.</p>
          ) : (
            <ul className="space-y-4">
              {trainers.map(trainer => (
                <li key={trainer.userId} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg font-medium text-gray-900">{trainer.firstName} {trainer.lastName}</p>
                  <p className="text-sm text-gray-600">ID: {trainer.userId}</p>
                  <p className="text-sm text-gray-600">{trainer.email}</p>
                </li>
              ))}
            </ul>
          )}
          <Link href="/dashboard/manager/trainers/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 mt-4">
              Add New Trainer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}