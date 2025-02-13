'use client';

import RCAArbolFlow from '@/components/RCAArbolFlow';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId;

  const [activeTab, setActiveTab] = useState<'arbol' | 'tareas' | 'seguimiento'>('arbol');

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">
        Detalles del Proyecto {projectId}
      </h2>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('arbol')}
          className={`px-4 py-2 rounded ${
            activeTab === 'arbol' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Árbol RCA
        </button>
        <button
          onClick={() => setActiveTab('tareas')}
          className={`px-4 py-2 rounded ${
            activeTab === 'tareas' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Tareas
        </button>
        <button
          onClick={() => setActiveTab('seguimiento')}
          className={`px-4 py-2 rounded ${
            activeTab === 'seguimiento' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Seguimiento
        </button>
      </div>

      {activeTab === 'arbol' && <RCAArbol />}
      {activeTab === 'tareas' && <RCATareas />}
      {activeTab === 'seguimiento' && <RCASeguimiento />}
    </div>
  );
}

// Componentes simples de demostración
function RCAArbol() {
  return (<RCAArbolFlow/>);
}

function RCATareas() {
  return <div>Lista de tareas relacionadas al proyecto.</div>;
}

function RCASeguimiento() {
  return <div>Indicadores de seguimiento de las soluciones implementadas.</div>;
}