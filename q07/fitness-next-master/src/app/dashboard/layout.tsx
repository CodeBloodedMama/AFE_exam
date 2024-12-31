'use client';

import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="bg-black font-bold ">Fitness App </span>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Manager Links */}
                {user?.accountType === 'Manager' && (
                  <Link 
                    href="/dashboard/manager"
                    className={`${
                      pathname === '/dashboard/manager'
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Manage Trainers
                  </Link>
                )}

                {/* Trainer Links */}
                {user?.accountType === 'PersonalTrainer' && (
                  <>
                    <Link 
                      href="/dashboard/trainer/clients"
                      className={`${
                        pathname.includes('/dashboard/trainer/clients')
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      My Clients
                    </Link>
                    <Link 
                      href="/dashboard/trainer/programs"
                      className={`${
                        pathname.includes('/dashboard/trainer/programs')
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Programs
                    </Link>
                  </>
                )}

                {/* Client Links */}
                {user?.accountType === 'Client' && (
                  <Link 
                    href="/dashboard/client"
                    className={`${
                      pathname === '/dashboard/client'
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    My Programs
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-gray-500 mr-4">
                {user?.accountType}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}