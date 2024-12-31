"use client";

import { Suspense } from "react";
import ProgramsPageContent from "./programspageContent";

export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-48">Loading programs....</div>}>
      <ProgramsPageContent />
    </Suspense>
  );
}
