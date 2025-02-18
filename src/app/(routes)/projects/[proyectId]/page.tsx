'use client';

import RCAArbolFlow from '@/components/RCAArbolFlow';
import Soluciones from '@/components/Soluciones';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { HomeIcon, DocumentIcon, CheckCircleIcon, ClipboardDocumentListIcon, ShareIcon, ChevronDownIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { Edge, Node } from 'reactflow';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId;

  const [activeTab, setActiveTab] = useState<'info' | 'analisis' | 'soluciones' | 'tareas'>('analisis');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className='bg-white text-black px-4 h-14 flex items-center border-b justify-between border-gray-200  sm:px-6 lg:px-4 w-full'>
        <div className='flex items-center py-4 w-full'>
          <div className="flex items-center relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
            >
              <h1>RCA-P</h1>
              <ChevronDownIcon className={`w-3 h-3 ml-2 transition-transform ${isMenuOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <a href="/projects" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Ver proyectos
                </a>
                <a href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </a>
                <a href="/empresa" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi empresa
                </a>
                <a href="/plantillas" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Plantillas
                </a>
              </div>
            )}
          </div>
          <div className="ml-4 flex bg-gray-100 rounded-lg p-1">
            {['info', 'analisis', 'soluciones', 'tareas'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`flex-1 text-xs py-1 px-2 ${activeTab === tab
                  ? 'rounded bg-white shadow'
                  : 'text-gray-500'
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
          <button className="flex rounded items-center bg-gray-100 p-2  text-xs">
            <PrinterIcon className="w-4 h-4 mr-1" />
            Reporte
          </button>

          <button className="bg-black rounded text-white text-xs px-4 py-2 ">
            Guardar
          </button>
        </div>
      </header >
      < main className="flex-grow h-full" >
        {activeTab === 'analisis' && (
          <div className="w-full h-full min-h-[500px]">
            <RCAArbolFlow 
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
            />
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
            <Soluciones nodes={nodes} />
          </div>
        )
        }
        {/* Aquí puedes agregar el contenido de las otras pestañas */}
      </main >
    </div >
  );
}