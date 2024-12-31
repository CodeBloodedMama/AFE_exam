'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FitnessAPI } from '@/lib/api/fitness-api';
import { Program } from '@/lib/types';

export default function ProgramPage({ 
  params 
}: { 
  params: Promise<{ programId: string }>
}) {
  const resolvedParams = React.use(params);
  const programId = resolvedParams.programId;
  
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProgram() {
      try {
        const programIdStr = await Promise.resolve(programId);
        const programData = await FitnessAPI.getProgramById(programIdStr);
        setProgram(programData);
      } catch (error) {
        console.error('Error fetching program:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgram();
  }, [programId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading program...</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center">
        <p className="text-red-500">Program not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Back to Programs
        </button>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{program.name}</h1>
      {program.description && (
        <p className="text-lg text-gray-600 mb-6 font-bold">{program.description}</p>
      )}
      <div className="space-y-6">
        {program.exercises.map((exercise) => (
          <div key={exercise.exerciseId} className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900">{exercise.name}</h3>
            <p className="text-sm text-gray-600 mt-2 font-bold">{exercise.description}</p>
            <div className="text-sm text-gray-500 mt-2 font-bold">
              <span>{exercise.sets} sets</span>
              {exercise.repetitions && <span> × {exercise.repetitions} reps</span>}
              {exercise.time && <span> ({exercise.time})</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}