'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { FitnessAPI } from '@/lib/api/fitness-api';
import { Program, Exercise } from '@/lib/types';
import { ExerciseList } from '@/components/exercises/exercises-list';
import { ExerciseForm } from '@/components/exercises/exercise-form';
import { Trash2 } from 'lucide-react'; 

type ViewMode = 'program' | 'exercises';

export default function ProgramPage({ 
  params 
}: { 
  params: Promise<{ programId: string }>
}) {
  const resolvedParams = React.use(params);
  const programId = resolvedParams.programId;
  
  const [program, setProgram] = useState<Program | null>(null);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('program');
  const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      const [programData, exercisesData] = await Promise.all([
        FitnessAPI.getProgramById(programId),
        FitnessAPI.getAllExercises()
      ]);
      setProgram(programData);
      
      // Filter out exercises that are already in the program
      const programExerciseIds = new Set(programData.exercises.map(e => e.exerciseId));
      const availableExercises = exercisesData.filter(e => !programExerciseIds.has(e.exerciseId));
      
      setAllExercises(availableExercises);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [programId]);

  useEffect(() => {
    fetchData();
  }, [programId, fetchData]);

  const handleExerciseSelect = async (exercise: Exercise) => {
    try {
      await FitnessAPI.addExerciseToProgram(programId, {
      name: exercise.name,
      description: exercise.description,
      sets: exercise.sets,
      repetitions: exercise.repetitions,
      time: exercise.time
      });

      setSelectedExercises(prevSelected => [...prevSelected, exercise]);
      fetchData();
      alert('Exercise added successfully!');
    } catch (error) {
      console.error('Error adding exercise:', error);
      alert('Failed to add exercise');
    }
  };

  const handleRemoveExercise = async (exerciseId: number) => {
    if (!confirm('Are you sure you want to remove this exercise from the program?')) {
        return;
    }

    try {
        console.log('Removing exercise with ID:', exerciseId); // Debug log
        await FitnessAPI.removeExercise(exerciseId);
        
        setProgram(prevProgram => {
            if (!prevProgram) return null;
            return {
                ...prevProgram,
                exercises: prevProgram.exercises.filter(e => e.exerciseId !== exerciseId)
            };
        });
        
        alert('Exercise removed successfully!');
    } catch (error) {
        console.error('Error removing exercise:', error);
        alert(`Failed to remove exercise: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

  const handleNewExercise = async (formData: FormData) => {
    try {
      const exerciseData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        sets: parseInt(formData.get('sets') as string),
        repetitions: parseInt(formData.get('repetitions') as string),
        time: formData.get('time') as string || undefined,
      };

      await FitnessAPI.addExerciseToProgram(programId, exerciseData);
      
      setShowNewExerciseForm(false);
      fetchData();
      alert('New exercise created and added successfully!');
    } catch (error) {
      console.error('Error creating exercise:', error);
      alert('Failed to create exercise');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading...</div>
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

  const ProgramExerciseList = () => (
    <div className="space-y-4">
        {program?.exercises.map((exercise) => {
            // Ensure exerciseId is a number
            const exerciseId = parseInt(exercise.exerciseId.toString(), 10);
            
            return (
                <div
                    key={exerciseId}
                    className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:border-gray-300 transition-colors"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span>{exercise.sets} sets</span>
                                {exercise.repetitions && <span> × {exercise.repetitions} reps</span>}
                                {exercise.time && <span> ({exercise.time})</span>}
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleRemoveExercise(exerciseId);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                            title="Remove exercise"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            );
        })}
    </div>
);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{program?.name}</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('program')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === 'program'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            View Program
          </button>
          <button
            onClick={() => setViewMode('exercises')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === 'exercises'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Add Exercises
          </button>
        </div>
      </div>

      {program?.description && (
        <p className="text-gray-600">{program.description}</p>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          {viewMode === 'program' ? (
            <>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Current Exercises</h2>
              {!program?.exercises.length ? (
                <p className="text-gray-500">No exercises added yet.</p>
              ) : (
                <ProgramExerciseList />
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Available Exercises</h2>
                <button
                  onClick={() => setShowNewExerciseForm(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                >
                  Create New Exercise
                </button>
              </div>
              
              {allExercises.length === 0 ? (
                <p className="text-gray-500">No available exercises to add.</p>
              ) : (
                <ExerciseList 
                  exercises={allExercises}
                  selectedExercises={selectedExercises}
                  onExerciseSelect={handleExerciseSelect}
                />
              )}
            </>
          )}
        </div>
      </div>

      {showNewExerciseForm && (
        <ExerciseForm
          onClose={() => setShowNewExerciseForm(false)}
          onSubmit={handleNewExercise}
        />
      )}
    </div>
  );
}