'use client';

import { useState, useEffect } from 'react'; // Add useEffect
import { useRouter } from 'next/navigation';
import { FitnessAPI } from '@/lib/api/fitness-api';
import { ExerciseManager } from '@/components/exercises/exercise-management';
import { Exercise, Client } from '@/lib/types'; // Add Client type

export default function CreateProgramPage() {
  const [step, setStep] = useState(1);
  const [programId, setProgramId] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]); // Add clients state
  const [loading, setLoading] = useState(true); // Add loading state
  const [programExercises, setProgramExercises] = useState<Exercise[]>([]);
  const router = useRouter();

  // Add useEffect to fetch clients
  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await FitnessAPI.getClients();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  const handleProgramSubmit = async (formData: FormData) => {
    try {
      const program = await FitnessAPI.createProgram({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        clientId: parseInt(formData.get('clientId') as string),
      });
      
      setProgramId(program.workoutProgramId.toString());
      setStep(2);
    } catch (error) {
      console.error('Error creating program:', error);
    }
  };

  const handleExerciseAdded = (exercise: Exercise) => {
    setProgramExercises(prev => [...prev, exercise]);
    alert('Exercise added successfully!');
  };

  const handleComplete = () => {
    router.push('/dashboard/trainer/programs');
  };

  if (loading && step === 1) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading clients...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Workout Program</h1>
        <div className="flex gap-2">
          <div className={`h-3 w-3 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`} />
          <div className={`h-3 w-3 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
        </div>
      </div>

      {step === 1 ? (
        <form action={handleProgramSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Program Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Client</label>
            <select
              id="clientId"
              name="clientId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.userId} value={client.userId}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Next: Add Exercises
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {programId && (
            <>
              <ExerciseManager
                programId={programId}
                onExerciseAdded={handleExerciseAdded}
              />
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Added Exercises</h2>
                {programExercises.length === 0 ? (
                  <p className="text-gray-500">No exercises added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {programExercises.map((exercise) => (
                      <div
                        key={exercise.exerciseId}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="font-medium">{exercise.name}</div>
                        <p className="text-sm text-gray-600 mt-1">
                          {exercise.description}
                        </p>
                        <div className="text-sm text-gray-500 mt-2">
                          {exercise.sets} sets × {exercise.repetitions} reps
                          {exercise.time && ` (${exercise.time})`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={handleComplete}
              className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600
                ${programExercises.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={programExercises.length === 0}
            >
              Complete Program
            </button>
          </div>
        </div>
      )}
    </div>
  );
}