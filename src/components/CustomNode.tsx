import React, { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
    label: string;
    onCreateChild: (parentId: string, parentX: number, parentY: number) => void;
}

interface CustomNodeProps extends NodeProps<CustomNodeData> {
    id: string;
    xPos: number;
    yPos: number;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, id }) => {
    const handleAddChild = useCallback(() => {
        const nodeElement = document.getElementById(id);
        if (nodeElement) {
            const rect = nodeElement.getBoundingClientRect();
            data.onCreateChild(id, rect.left, rect.bottom);
        }
    }, [data, id]);

    return (
        <div id={id} className="border shadow relative group">
            <div className="bg-gray-900 text-white text-center text-xs py-1 pl-6 pr-6">
                Evento Tope
            </div>
            <div className="p-4 font-semibold bg-white min-h-[50px] flex flex-col justify-center items-center">
                <div className='text-sm text-center'>{data.label}</div>
            </div>
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