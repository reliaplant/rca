import React from 'react';

interface NodeInfoProps {
  // Add props as needed
}

const NodeInfo = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-red-600 text-white px-4 py-2 text-sm text-center font-medium">
        Descartada
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-6">
        {/* Node name input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Nombre del nodo</label>
          <input
            type="text"
            className="border rounded px-2 py-1 text-sm"
            placeholder="Ingrese el nombre"
          />
        </div>

        {/* Validation section */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Validación</h3>
          <button className="bg-black text-white px-4 py-2 text-sm rounded">
            Agregar tarea de verificación
          </button>
        </div>

        {/* Conclusions section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Conclusiones</h3>
          
          {/* Status slider */}
          <div className="flex w-full bg-gray-100 rounded-lg p-1">
            <button className="flex-1 text-xs py-1 px-2 rounded bg-white shadow">Descartada</button>
            <button className="flex-1 text-xs py-1 px-2 text-gray-500">Por validar</button>
            <button className="flex-1 text-xs py-1 px-2 text-gray-500">Validada</button>
          </div>

          {/* Conclusion textarea */}
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={4}
            placeholder="Escriba la conclusión..."
          />
        </div>
      </div>
    </div>
  );
};

export default NodeInfo;