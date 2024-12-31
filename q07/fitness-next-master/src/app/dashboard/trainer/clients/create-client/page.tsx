'use client';

import { useRouter } from 'next/navigation';
import CreateClientForm from '@/components/create-clientform';

export default function CreateClientPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert('Client added successfully!');
    router.push('/dashboard/trainer/clients');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Create New Client</h1>
      <CreateClientForm onSuccessAction={handleSuccess} />
    </div>
  );
}
