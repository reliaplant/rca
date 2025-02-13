'use client';

import RCAArbolFlow from '@/components/RCAArbolFlow';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { HomeIcon, DocumentIcon, CheckCircleIcon, ClipboardDocumentListIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId;

  const [activeTab, setActiveTab] = useState<'info' | 'analisis' | 'evidencia' | 'soluciones' | 'tareas'>('analisis');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-black shadow h-16">
        <div className="flex items-center justify-between h-full">
          <Link href="/proyectos" className="font-light hover:text-gray-400 p-4">
            <button className="flex items-center text-white">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Volver al Dashboard
            </button>
          </Link>

          <div className="flex-grow flex justify-center space-x-4 h-full">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 ${
                activeTab === 'info' ? 'border-b-4 border-green-600 text-white' : 'text-gray-400'
              } h-full flex flex-col items-center justify-center`}
            >
              <HomeIcon className="w-5 h-5 mb-1" />
              <span className="text-xs">Info</span>
            </button>
            <button
              onClick={() => setActiveTab('analisis')}
              className={`px-4 py-2 ${
                activeTab === 'analisis' ? 'border-b-4 border-green-600 text-white' : 'text-gray-400'
              } h-full flex flex-col items-center justify-center`}
            >
              <ShareIcon className="w-5 h-5 mb-1" />
              <span className="text-xs">Análisis</span>
            </button>
            <button
              onClick={() => setActiveTab('evidencia')}
              className={`px-4 py-2 ${
                activeTab === 'evidencia' ? 'border-b-4 border-green-600 text-white' : 'text-gray-400'
              } h-full flex flex-col items-center justify-center`}
            >
              <DocumentIcon className="w-5 h-5 mb-1" />
              <span className="text-xs">Evidencia</span>
            </button>
            <button
              onClick={() => setActiveTab('soluciones')}
              className={`px-4 py-2 ${
                activeTab === 'soluciones' ? 'border-b-4 border-green-600 text-white' : 'text-gray-400'
              } h-full flex flex-col items-center justify-center`}
            >
              <CheckCircleIcon className="w-5 h-5 mb-1" />
              <span className="text-xs">Soluciones</span>
            </button>
            <button
              onClick={() => setActiveTab('tareas')}
              className={`px-4 py-2 ${
                activeTab === 'tareas' ? 'border-b-4 border-green-600 text-white' : 'text-gray-400'
              } h-full flex flex-col items-center justify-center`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5 mb-1" />
              <span className="text-xs">Tareas</span>
            </button>
          </div>
          <div className="text-white p-4">
            foto de perfil
          </div>
        </div>
      </header>
      <main className="flex-grow h-full">
        {activeTab === 'analisis' && (
          <div className="w-full h-full min-h-[500px]">
            <RCAArbolFlow />
          </div>
        )}
        {/* Aquí puedes agregar el contenido de las otras pestañas */}
      </main>
    </div>
  );
}