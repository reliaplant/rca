import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    addEdge,
    Connection,
    Edge,
    Node,
    useReactFlow,
    ReactFlowProvider,
    OnMove,
    Viewport,
    applyNodeChanges,
    applyEdgeChanges,
    NodeChange,
    EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import { hierarchy, tree } from 'd3-hierarchy';
import NodeInfo from './NodeInfo';
import ZoomControl from './ZoomControl';
import { Edge as ReactFlowEdge } from 'reactflow';

const nodeTypes = {
    custom: CustomNode,
};

interface CustomNodeData {
    id: string;
    label: string;
    childrenIds: string[];
    forceToolbarVisible: boolean
    tipo: 'Evento Tope' | 'Modo de falla' | 'Hipótesis' | 'Falla fisica' | 'Error humano' | 'Causa latente' | 'Solucion';
    onCreateChild: (parentId: string, parentX: number, parentY: number) => void;
}

interface RCAArbolFlowProps {
    nodes: Node<CustomNodeData>[];
    setNodes: (nodes: Node<CustomNodeData>[] | ((nodes: Node<CustomNodeData>[]) => Node<CustomNodeData>[])) => void;
    edges: ReactFlowEdge[];
    setEdges: (edges: ReactFlowEdge[] | ((edges: ReactFlowEdge[]) => ReactFlowEdge[])) => void;
}

function RCAArbolFlowComponent({ nodes, setNodes, edges, setEdges }: RCAArbolFlowProps) {
    const nodeIdCounterRef = useRef(2);
    const organizingRef = useRef(false);
    const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(null);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
    }, [setNodes]);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds: ReactFlowEdge[]) => applyEdgeChanges(changes, eds));
    }, [setEdges]);

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
            const parentNode = prevNodes.find((node: Node<CustomNodeData>) => node.id === parentId);
            if (!parentNode) return prevNodes;

            const newNode: Node<CustomNodeData> = {
                id: newNodeId,
                position: { x: parentX - 100, y: parentY + 200 },
                data: {
                    id: newNodeId,
                    label: `Nuevo Nodo`,
                    childrenIds: [],
                    forceToolbarVisible: true,
                    tipo: parentNode.data.tipo === 'Evento Tope' ? 'Modo de falla' : 'Hipótesis',
                    onCreateChild: handleCreateChildNode,
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

        setEdges((prevEdges: ReactFlowEdge[]) => [...prevEdges, {
            id: `e${parentId}-${newNodeId}`,
            source: parentId,
            target: newNodeId,
        }]);

        // Delay organization to next frame
        setTimeout(organizeNodesWithD3, 0);
    }, []);

    const handleNodeClick = useCallback((event: React.MouseEvent, node: Node<CustomNodeData>) => {
        setSelectedNode(node);
    }, []);

    const handleUpdateLabel = useCallback((nodeId: string, newLabel: string) => {
        setNodes((nds) => {
            const updatedNodes = nds.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, label: newLabel } }
                    : node
            );
            // Si el nodo actualizado es el seleccionado, se actualiza selectedNode también
            if (selectedNode && selectedNode.id === nodeId) {
                const updatedSelected = updatedNodes.find((node) => node.id === nodeId);
                if (updatedSelected) {
                    setSelectedNode(updatedSelected);
                }
            }
            return updatedNodes;
        });
    }, [selectedNode, setNodes]);

    useEffect(() => {
        if (nodes.length === 0 && typeof window !== 'undefined') {
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
                    forceToolbarVisible: false,
                    onCreateChild: handleCreateChildNode,
                    tipo: 'Evento Tope',
                    id: '1',
                },
                type: 'custom',
            };

            setNodes([initialNode]);
        }
    }, [handleCreateChildNode, setNodes, nodes]);

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds: ReactFlowEdge[]) => addEdge(connection, eds));
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
                <NodeInfo 
                    selectedNode={selectedNode?.data} 
                    onUpdateLabel={handleUpdateLabel}
                />
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDoubleClick={onDoubleClick}
                onNodeClick={handleNodeClick}
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

export default function RCAArbolFlow(props: RCAArbolFlowProps) {
    return (
        <ReactFlowProvider>
            <RCAArbolFlowComponent {...props} />
        </ReactFlowProvider>
    );
}