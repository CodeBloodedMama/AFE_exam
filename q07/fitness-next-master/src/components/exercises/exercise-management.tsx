//type CreateExerciseData = Omit<Exercise, 'exerciseId' | 'groupId' | 'workoutProgramId' | 'personalTrainerId'>;

import React, { useState, useEffect } from 'react';
import { Exercise } from '@/lib/types';
import { FitnessAPI } from '@/lib/api/fitness-api';

export function ExerciseManager({ 
  programId,
  onExerciseAdded 
}: { 
  programId: string;
  onExerciseAdded?: (exercise: Exercise) => void;
}) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {

      const exerciseData = await FitnessAPI.getUnassignedExercises();
      setExercises(exerciseData);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadExercises();
  },[]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const exerciseData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        sets: parseInt(formData.get('sets') as string),
        repetitions: parseInt(formData.get('repetitions') as string),
        time: formData.get('time') as string
      };

      const newExercise = await FitnessAPI.addExerciseToProgram(programId, exerciseData);
      
      if (onExerciseAdded) {
        onExerciseAdded(newExercise);
      }
      
      setShowForm(false);
      loadExercises(); // Refresh the exercise list
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading exercises...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Exercises</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Exercise
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-md shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sets" className="block text-sm font-medium text-gray-700">
                Sets
              </label>
              <input
                type="number"
                name="sets"
                id="sets"
                required
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="repetitions" className="block text-sm font-medium text-gray-700">
                Repetitions
              </label>
              <input
                type="number"
                name="repetitions"
                id="repetitions"
                required
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time (optional)
            </label>
            <input
              type="text"
              name="time"
              id="time"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="e.g., 30 seconds"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Exercise
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.exerciseId}
            className="bg-white p-4 rounded-md shadow"
          >
            <h4 className="font-medium">{exercise.name}</h4>
            <p className="text-gray-600 text-sm mt-1">{exercise.description}</p>
            <div className="mt-2 text-sm text-gray-500">
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