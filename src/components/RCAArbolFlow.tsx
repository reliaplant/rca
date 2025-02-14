import React, { useCallback, useEffect, useRef } from 'react';
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
import { hierarchy, tree } from 'd3-hierarchy';
import NodeInfo from './NodeInfo';
import ZoomControl from './ZoomControl';

const nodeTypes = {
    custom: CustomNode,
};

interface CustomNodeData {
    label: string;
    childrenIds: string[];
    tipo: 'Evento Tope' | 'Modo de falla' | 'Hipótesis' | 'Falla fisica' | 'Error humano' | 'Causa latente' | 'Accion Correctiva';
    onCreateChild: (parentId: string, parentX: number, parentY: number) => void;
}

function RCAArbolFlowComponent() {
    const nodeIdCounterRef = useRef(2);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const organizingRef = useRef(false);

    const organizeNodesWithD3 = useCallback(() => {
        if (organizingRef.current) return;
        organizingRef.current = true;

        setNodes(prevNodes => {
            const rootNode = prevNodes.find(node => node.id === '1');
            if (!rootNode) return prevNodes;

            const makeHierarchy = (node: Node<CustomNodeData>): { id: string; children: any[] } => {
                return {
                    id: node.id,
                    children: node.data.childrenIds
                        .map(id => prevNodes.find(n => n.id === id))
                        .filter(Boolean)
                        .map(node => makeHierarchy(node as Node<CustomNodeData>))
                };
            };

            const hierarchyData = hierarchy(makeHierarchy(rootNode));

            // Reduce horizontal spacing (first parameter) while keeping vertical spacing (second parameter)
            const treeLayout = tree<any>()
                .nodeSize([120, 150]) // Increased from [100, 150] to [120, 150] for slightly more horizontal spacing
                .separation((a, b) => {
                    // If nodes have the same parent (are siblings), use slightly increased spacing
                    // If they're cousins (different parents), use moderately increased spacing
                    return a.parent === b.parent ? 1.2 : 1.2;
                });

            const treeData = treeLayout(hierarchyData);

            const newNodes = prevNodes.map(node => {
                const treeNode = treeData.descendants().find(n => n.data.id === node.id);
                if (treeNode) {
                    return {
                        ...node,
                        position: {
                            x: node.id === '1'
                                ? window.innerWidth / 2 - 100
                                : treeNode.x + (window.innerWidth / 2 - 100),
                            y: node.id === '1'
                                ? 32
                                : treeNode.y + 32
                        }
                    };
                }
                return node;
            });

            organizingRef.current = false;
            return newNodes;
        });
    }, []);

    const handleCreateChildNode = useCallback((parentId: string, parentX: number, parentY: number) => {
        const newNodeId = nodeIdCounterRef.current.toString();
        nodeIdCounterRef.current += 1;

        setNodes(prevNodes => {
            const parentNode = prevNodes.find(node => node.id === parentId);
            if (!parentNode) return prevNodes;

            const newNode: Node<CustomNodeData> = {
                id: newNodeId,
                position: { x: parentX - 100, y: parentY + 200 },
                data: {
                    label: `Nuevo Nodo`,
                    childrenIds: [],
                    tipo: parentNode.data.tipo === 'Evento Tope' ? 'Modo de falla' : 'Hipótesis',
                    onCreateChild: handleCreateChildNode
                },
                type: 'custom',
            };

            return [...prevNodes.map(node =>
                node.id === parentId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            childrenIds: [...node.data.childrenIds, newNodeId]
                        }
                    }
                    : node
            ), newNode];
        });

        setEdges(prevEdges => [...prevEdges, {
            id: `e${parentId}-${newNodeId}`,
            source: parentId,
            target: newNodeId,
        }]);

        // Delay organization to next frame
        setTimeout(organizeNodesWithD3, 0);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 4;

            const initialNode: Node<CustomNodeData> = {
                id: '1',
                position: {
                    x: window.innerWidth / 2 - 100,
                    y: 32  // 2rem to match organized position
                },
                data: {
                    label: 'Paros recurrentes en bombas',
                    childrenIds: [],
                    onCreateChild: handleCreateChildNode,
                    tipo: 'Evento Tope'
                },
                type: 'custom',
            };

            setNodes([initialNode]);
        }
    }, [handleCreateChildNode]);

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds) => addEdge(connection, eds));
        },
        [setEdges]
    );

    const { setViewport } = useReactFlow();
    const MIN_Y = 0; // Define the minimum Y value

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
        <div className="w-full h-screen bg-gray-100">
            <div className="fixed left-0 top-14 h-full w-80 bg-white shadow-lg z-10 border-r border-gray-200">
                <NodeInfo />
            </div>
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
            <ZoomControl />
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