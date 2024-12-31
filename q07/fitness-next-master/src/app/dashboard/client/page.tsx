'use client';

import { useEffect, useState } from 'react';
import { FitnessAPI } from '@/lib/api/fitness-api';
import { Program } from '@/lib/types';
import Link from 'next/link';

export default function ClientDashboard() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = await FitnessAPI.getClientPrograms();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading programs...</div>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Workout Programs</h1>
        <p className="text-gray-500">No workout programs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Workout Programs</h1>
      <div className="space-y-6">
        {programs.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link
                key={program.workoutProgramId}
                href={`/dashboard/client/programs/${program.workoutProgramId}`}
                className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">{program.name}</h3>
                {program.description && (
                  <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                )}
                <p className="text-sm text-gray-500">Number of exercises: {program.exercises.length}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">{programs[0].name}</h2>
            {programs[0].description && (
              <p className="text-sm text-gray-600 mb-4">{programs[0].description}</p>
            )}
            <div className="space-y-4">
              {programs[0].exercises.map((exercise) => (
                <div key={exercise.exerciseId} className="bg-gray-50 p-4 rounded-lg shadow">
                  <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                  <p className="text-sm text-gray-600">{exercise.description}</p>
                  <div className="text-sm text-gray-500">
                    <span>{exercise.sets} sets</span>
                    {exercise.repetitions && <span> × {exercise.repetitions} reps</span>}
                    {exercise.time && <span> ({exercise.time})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}