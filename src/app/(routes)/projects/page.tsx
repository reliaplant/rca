'use client'; 
// "use client" es necesario cuando usamos estados, efectos o componentes interactivos en app router

import { useState } from 'react';

interface Project {
  id: number;
  titulo: string;
  creador: string;
  metodologia: string;
  comienzo: string;
  final: string;
  costoTareas: number;
  estatus: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      titulo: 'Proyecto A',
      creador: 'Juan Pérez',
      metodologia: 'Scrum',
      comienzo: '2025-01-01',
      final: '2025-03-30',
      costoTareas: 5000,
      estatus: 'En curso',
    },
    {
      id: 2,
      titulo: 'Proyecto B',
      creador: 'María López',
      metodologia: 'Kanban',
      comienzo: '2025-02-15',
      final: '2025-06-01',
      costoTareas: 12000,
      estatus: 'Iniciado',
    },
  ]);

  const handleDelete = (id: number) => {
    const updated = projects.filter((proj) => proj.id !== id);
    setProjects(updated);
  };

  const handleArchive = (id: number) => {
    // Ejemplo: cambiar estado a "Archivado"
    const updated = projects.map((proj) =>
      proj.id === id ? { ...proj, estatus: 'Archivado' } : proj
    );
    setProjects(updated);
  };

  // Podrías tener un formulario para crear proyectos
  const handleCreate = () => {
    // Lógica para crear nuevos proyectos
    alert('Crear nuevo proyecto');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Proyectos</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Crear Proyecto
        </button>
      </div>
      
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Título</th>
            <th className="p-2">Creador</th>
            <th className="p-2">Metodología</th>
            <th className="p-2">Comienzo</th>
            <th className="p-2">Final</th>
            <th className="p-2">Costo</th>
            <th className="p-2">Estatus</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id} className="border-b">
              <td className="p-2">{proj.id}</td>
              <td className="p-2">
                {/* Link dinámico al detalle del proyecto */}
                <a
                  href={`/projects/${proj.id}`}
                  className="text-blue-600 underline"
                >
                  {proj.titulo}
                </a>
              </td>
              <td className="p-2">{proj.creador}</td>
              <td className="p-2">{proj.metodologia}</td>
              <td className="p-2">{proj.comienzo}</td>
              <td className="p-2">{proj.final}</td>
              <td className="p-2">{proj.costoTareas}</td>
              <td className="p-2">{proj.estatus}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                >
                  Borrar
                </button>
                <button
                  onClick={() => handleArchive(proj.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400"
                >
                  Archivar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
