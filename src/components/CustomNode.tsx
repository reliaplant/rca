import React, { useCallback } from 'react';
import { Handle, Position, NodeProps, NodeToolbar } from 'reactflow';

interface CustomNodeData {
    nodeId: string;
    label: string;
    childrenIds: string[];
    forceToolbarVisible: boolean;
    tipo: 'Evento Tope' | 'Modo de falla' | 'Hipótesis' | 'Falla física' | 'Error humano' | 'Causa latente' | 'Solucion';
    onCreateChild: (parentId: string, parentX: number, parentY: number) => void;
    onUpdateLabel?: (nodeId: string, newLabel: string) => void;
}

const getHeaderColorClass = (tipo: CustomNodeData['tipo']) => {
    switch (tipo) {
        case 'Evento Tope':
            return 'bg-red-800';
        case 'Modo de falla':
            return 'bg-orange-700';
        case 'Hipótesis':
            return 'bg-blue-700';
        case 'Falla física':
            return 'bg-purple-700';
        case 'Error humano':
            return 'bg-yellow-600';
        case 'Causa latente':
            return 'bg-green-700';
        case 'Solucion':
            return 'bg-yellow-300';
        default:
            return 'bg-gray-900';
    }
};

interface CustomNodeProps extends NodeProps<CustomNodeData> {
    id: string;
    xPos: number;
    yPos: number;
    selected: boolean;  // Ensure selected is always a boolean
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, id, xPos, yPos, selected }) => {


    const handleAddChild = useCallback(() => {
        data.onCreateChild(id, xPos, yPos);
      }, [data, id, xPos, yPos]);
    
      const handleAsignarTarea = useCallback(() => {
        // Lógica para asignar tarea aquí
        alert('Asignar tarea');
      }, []);
    
      const handleValidarDescartar = useCallback(() => {
        // Lógica para validar o descartar aquí
        alert('Validar o descartar');
      }, []);
    
      // Función modular para renderizar el menú del toolbar
      const renderToolbar = useCallback(() => {
        return (
          <div className="bg-white rounded shadow-lg border border-gray-100 overflow-hidden  w-[140px]">
            <button
              onClick={handleAsignarTarea}
              className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 text-left border-b border-gray-100"
            >
              Asignar tarea
            </button>
            <button
              onClick={handleValidarDescartar}
              className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 text-left border-b border-gray-100"
            >
              Validar o descartar
            </button>
            <button
              onClick={handleAddChild}
              className="w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 text-left"
            >
              Agregar hijo
            </button>
          </div>
        );
      }, [handleAsignarTarea, handleValidarDescartar, handleAddChild]);

    return (
        <div id={id} className="border  relative group">
            <div className={`${getHeaderColorClass(data.tipo)} text-white text-center text-xs py-1 pl-6 pr-6`}>
                {data.tipo}
            </div>
            <NodeToolbar
                isVisible={selected}  // Use ReactFlow's selected prop directly
                position={Position.Right}
                offset={12}
                className="z-50"
            >
                {renderToolbar()}
            </NodeToolbar>
            <div className="p-4 bg-white min-h-[50px] flex flex-col justify-center items-center">
                <div className='text-sm text-center'>{data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" style={{ background: '#555' }} />
            <Handle type="target" position={Position.Top} id="b" style={{ background: '#555' }} />

            {/* <button
                onClick={handleAddChild}
                className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                +
            </button> */}
        </div>
    );
};

export default React.memo(CustomNode);