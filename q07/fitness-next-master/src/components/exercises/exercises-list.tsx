import React from 'react';
import { Exercise } from '@/lib/types';

interface ExerciseListProps {
  exercises: Exercise[];
  selectedExercises?: Exercise[]; // Make this optional
  onExerciseSelect: (exercise: Exercise) => void;
  loading?: boolean;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  selectedExercises = [], // Provide default empty array
  onExerciseSelect,
  loading = false
}) => {
  if (loading) {
    return <div>Loading exercises...</div>;
  }

  const isSelected = (exercise: Exercise) => 
    selectedExercises.some(selected => selected.exerciseId === exercise.exerciseId);

  return (
    <ul className="space-y-2">
      {exercises.map((exercise) => (
        <li 
          key={exercise.exerciseId}
          className={`p-4 border rounded-lg cursor-pointer
            ${isSelected(exercise) ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}`}
          onClick={() => onExerciseSelect(exercise)}
        >
          <div className="font-medium">{exercise.name}</div>
          {exercise.description && (
            <div className="text-sm text-gray-600">{exercise.description}</div>
          )}
          <div className="text-sm text-gray-500 mt-1">
            {exercise.sets} sets × {exercise.repetitions} reps
            {exercise.time && ` (${exercise.time})`}
          </div>
        </li>
      ))}
      {exercises.length === 0 && (
        <li className="text-gray-500 text-center py-4">No exercises available</li>
      )}
    </ul>
  );
};