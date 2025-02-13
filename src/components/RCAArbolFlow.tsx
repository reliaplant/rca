import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    addEdge,
    Connection,
    Edge,
    Node,
    useEdgesState,
    useNodesState,
    useReactFlow,
    ReactFlowProvider,
    OnMove,
    Viewport,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = {
    custom: CustomNode,
};

interface HandleCreateChildNodeParams {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    parentId: string;
    parentX: number;
    parentY: number;
}

const handleCreateChildNode = ({ nodes, setNodes, setEdges, parentId, parentX, parentY }: HandleCreateChildNodeParams) => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode: Node = {
        id: newNodeId,
        position: {
            x: parentX - 100,
            y: parentY + 200
        },
        data: {
            label: `Nuevo Nodo`,
        },
        type: 'custom',
    };

    const newEdge: Edge = {
        id: `e${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
    };

    setNodes(prevNodes => prevNodes.concat(newNode));
    setEdges(prevEdges => prevEdges.concat(newEdge));
};

function RCAArbolFlowComponent() {
    const [initialNodes, setInitialNodes] = useState<Node[]>([]);
    const initialEdges: Edge[] = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { setViewport } = useReactFlow();

    const MIN_Y = 0; // Minimum Y position allowed

    const handleCreateChildNode = useCallback((parentId: string, parentX: number, parentY: number) => {
        const newNodeId = (nodes.length + 1).toString();
        const newNode: Node = {
            id: newNodeId,
            position: {
                x: parentX - 100,
                y: parentY + 200
            },
            data: {
                label: `Nuevo Nodo`,
                onCreateChild: handleCreateChildNode  // <<-- Se pasa la función aquí
            },
            type: 'custom',
        };

        const newEdge: Edge = {
            id: `e${parentId}-${newNodeId}`,
            source: parentId,
            target: newNodeId,
        };

        setNodes(prevNodes => prevNodes.concat(newNode));
        setEdges(prevEdges => prevEdges.concat(newEdge));
    }, [nodes, setNodes, setEdges]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 4;

            const initialNode: Node = {
                id: '1',
                position: { x: centerX - 100, y: centerY },
                data: {
                    label: 'Paros recurrentes en bombas',
                },
                type: 'custom',
            };

            setNodes([initialNode]);
        }
    }, [setNodes]);


    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    const onMove: OnMove = useCallback(
        (_, viewport: Viewport) => {
            if (viewport.y > MIN_Y) {
                setViewport({ ...viewport, y: MIN_Y });
            }
        },
        [setViewport]
    );

    const onDoubleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        // const { clientX, clientY } = event;

        // const newNode: Node = {
        //     id: (nodes.length + 1).toString(),
        //     position: { x: clientX - 200, y: clientY - 100 },
        //     data: { label: `Nuevo Nodo` },
        //     type: 'custom', // Usa el tipo de nodo personalizado
        // };

        // setNodes((nds) => nds.concat(newNode));
    }, [nodes, setNodes]);

    return (
        <div className="w-full h-screen bg-gray-300">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDoubleClick={onDoubleClick}
                nodeTypes={nodeTypes}
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                minZoom={0.5}
                maxZoom={2}
                fitView={false}
                onMove={onMove}
                nodesDraggable
                elementsSelectable
            />
        </div>
    );
}

export default function RCAArbolFlow() {
    return (
        <ReactFlowProvider>
            <RCAArbolFlowComponent />
        </ReactFlowProvider>
    );
}