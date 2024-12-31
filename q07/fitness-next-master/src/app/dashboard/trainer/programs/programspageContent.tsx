"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FitnessAPI } from "@/lib/api/fitness-api";
import { Program } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function ProgramsPageContent() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = await FitnessAPI.getTrainerPrograms();
        const filteredPrograms = clientId
          ? data.filter((program) => program.clientId.toString() === clientId)
          : data;
        setPrograms(filteredPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading programs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Workout Programs</h1>
        <Link
          href="/dashboard/trainer/programs/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
        >
          Create New Program
        </Link>
      </div>

      {programs.length === 0 ? (
        <div className="bg-white rounded-lg p-6 text-center text-gray-500">
          No workout programs found. Create your first program!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Link
              key={program.workoutProgramId}
              href={`/dashboard/trainer/programs/${program.workoutProgramId}`}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{program.name}</h3>
                {program.description && (
                  <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                )}
                <p className="text-sm text-gray-500">Client ID: {program.clientId}</p>
                <p className="text-sm text-gray-500">
                  Number of exercises: {program.exercises.length}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
