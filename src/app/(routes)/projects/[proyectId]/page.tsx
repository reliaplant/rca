'use client';

import RCAArbolFlow from '@/components/RCAArbolFlow';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { HomeIcon, DocumentIcon, CheckCircleIcon, ClipboardDocumentListIcon, ShareIcon, ChevronDownIcon, PrinterIcon } from '@heroicons/react/24/outline';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId;

  const [activeTab, setActiveTab] = useState<'info' | 'analisis' | 'soluciones' | 'tareas'>('analisis');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className='bg-white text-black px-4 h-14 flex items-center border-b justify-between border-gray-200  sm:px-6 lg:px-4 w-full'>
        <div className='flex items-center py-4 w-full'>
          <div className="flex items-center">
            <h1>RCA-P</h1>
            <ChevronDownIcon className="w-3 h-3 ml-2" />
          </div>
          <div className="flex items-center ml-4 space-x-2 bg-gray-100 p-1 rounded">
            {['info', 'analisis', 'soluciones', 'tareas'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-2 py-1 rounded ${activeTab === tab
                    ? 'bg-white border shadow-none border-gray-200 text-xs'
                    : 'text-gray-400 text-xs'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className='w-full flex flex-row space-x-2 items-center justify-center'>
          <div className="flex items-center h-6 w-6 bg-gray-100 p-1 border border-gray-200  text-xs justify-center">
            R
          </div>
          <div className='text-xs'>
            Reliaplant
          </div>
          <div className='text-gray-400'>
            /
          </div>
          <div className='text-xs'>
            Paros repetitivos en Bomba BPV-340
          </div>
        </div>
        <div className='flex w-full justify-end items-center space-x-4 py-4'>
          <div className="flex items-center justify-center bg-green-800 text-white rounded-full h-8 w-8">
            G
          </div>
          <button className="flex items-center bg-gray-100 p-2  text-xs">
            <PrinterIcon className="w-4 h-4 mr-1" />
            Reporte
          </button>

          <button className="bg-black text-white text-xs px-4 py-2 ">
            Guardar
          </button>
        </div>
      </header >
      < main className="flex-grow h-full" >
        {activeTab === 'analisis' && (
          <div className="w-full h-full min-h-[500px]">
            <RCAArbolFlow />
          </div>
        )
        }
         {activeTab === 'info' && (
          <div className="w-full h-full min-h-[500px]">
      Info
          </div>
        )
        }
         {activeTab === 'tareas' && (
          <div className="w-full h-full min-h-[500px]">
           tareas
          </div>
        )
        }
         {activeTab === 'soluciones' && (
          <div className="w-full h-full min-h-[500px]">
            soluciones
          </div>
        )
        }
        {/* Aquí puedes agregar el contenido de las otras pestañas */}
      </main >
    </div >
  );
}