'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function RCAArbolFlow() {
  // Definir nodos y edges iniciales
  const initialNodes: Node[] = [
    {
      id: '1',
      position: { x: 250, y: 5 },
      data: { label: 'Hipótesis Principal' },
    },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Función para manejar conexiones nuevas
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Ejemplo de crear un nuevo nodo al hacer doble clic en el canvas
  const onPaneDoubleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    // Ajuste de posición (transformación actual del viewport)
    // Este es un ejemplo simplificado
    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      position: { x: clientX - 200, y: clientY - 100 },
      data: { label: `Nuevo Nodo` },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  return (
    <div className="w-full h-[600px] border border-gray-300">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDoubleClick={onPaneDoubleClick}
      />
    </div>
  );
}
