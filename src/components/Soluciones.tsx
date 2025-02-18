import React from 'react';


interface CustomNodeData {
  tipo: string;
  label: string;
}

interface Node {
  id: string;
  data: CustomNodeData;
}

interface SolucionesProps {
  nodes: Array<Node>;
}

const Soluciones: React.FC<SolucionesProps> = ({ nodes }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Nodos del Análisis</h2>
      <div className="space-y-4">
        {nodes.map((node) => (
          <div 
            key={node.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <div className="text-sm text-gray-500">{node.data.tipo}</div>
            <div className="font-medium">{node.data.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Soluciones;