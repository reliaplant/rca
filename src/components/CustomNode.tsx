import React, { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
    label: string;
    childrenIds: string[];
    tipo: 'Evento Tope' | 'Modo de falla' | 'Hipótesis' | 'Falla física' | 'Error humano' | 'Causa latente' | 'Acción Correctiva';
    onCreateChild: (parentId: string, parentX: number, parentY: number) => void;
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
        case 'Acción Correctiva':
            return 'bg-teal-600';
        default:
            return 'bg-gray-900';
    }
};

interface CustomNodeProps extends NodeProps<CustomNodeData> {
    id: string;
    xPos: number;
    yPos: number;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, id, xPos, yPos }) => {
    const handleAddChild = useCallback(() => {
        data.onCreateChild(id, xPos, yPos);
    }, [data, id, xPos, yPos]);

    return (
        <div id={id} className="border  relative group">
            <div className={`${getHeaderColorClass(data.tipo)} text-white text-center text-xs py-1 pl-6 pr-6`}>
                {data.tipo}
            </div>
            <div className="p-4 font-semibold bg-white min-h-[50px] flex flex-col justify-center items-center">
                <div className='text-sm text-center'>{data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" style={{ background: '#555' }} />
            <Handle type="target" position={Position.Top} id="b" style={{ background: '#555' }} />

            <button
                onClick={handleAddChild}
                className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 bottom-0 w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center text-gray-900 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
                +
            </button>
        </div>
    );
};

export default React.memo(CustomNode);