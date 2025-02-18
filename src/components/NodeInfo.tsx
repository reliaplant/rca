import React from 'react';

interface CustomNodeData {
    id: string;
    label: string;
    tipo: string;
}

interface NodeInfoProps {
    selectedNode?: CustomNodeData | null;
    onUpdateLabel?: (nodeId: string, newLabel: string) => void;
    onUpdateTipo?: (nodeId: string, newTipo: string) => void;
}

const NodeInfo: React.FC<NodeInfoProps> = ({ selectedNode, onUpdateLabel }) => {
  return (
    <div className="flex flex-col h-full">
      {selectedNode ? (
        <>
          <div className="bg-red-600 text-white px-4 py-2 text-sm text-center font-medium">
            {selectedNode.tipo}
          </div>

          <div className="p-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Nombre del nodo</label>
              <input
                type="text"
                value={selectedNode?.label || ''}
                onChange={(e) => onUpdateLabel?.(selectedNode!.id, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                placeholder="Ingrese el nombre"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Validación</h3>
              <button className="bg-black text-white px-4 py-2 text-sm rounded">
                Agregar tarea de verificación
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">Conclusiones</h3>
              
              <div className="flex w-full bg-gray-100 rounded-lg p-1">
                <button className="flex-1 text-xs py-1 px-2 rounded bg-white shadow">Descartada</button>
                <button className="flex-1 text-xs py-1 px-2 text-gray-500">Por validar</button>
                <button className="flex-1 text-xs py-1 px-2 text-gray-500">Validada</button>
              </div>

              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={4}
                placeholder="Escriba la conclusión..."
              />
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 text-sm text-gray-500">
          Seleccione un nodo para ver sus detalles
        </div>
      )}
    </div>
  );
};

export default NodeInfo;