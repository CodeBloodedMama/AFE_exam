import Link from 'next/link';

export default function TrainerDashboard() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Trainer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/dashboard/trainer/clients" 
          className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <h2 className="text-xl font-medium text-gray-900 mb-2">My Clients</h2>
          <p className="text-gray-600">View and manage your clients</p>
        </Link>

        <Link href="/dashboard/trainer/programs" 
          className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Workout Programs</h2>
          <p className="text-gray-600">Create and manage workout programs</p>
        </Link>
      </div>
    </div>
  );
}