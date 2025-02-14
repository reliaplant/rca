import { ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useState } from 'react';
import { useReactFlow, useStore } from 'reactflow';

const ZoomControl = () => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();
    const zoom = useStore((state) => state.transform[2]);
    const [zoomLevel, setZoomLevel] = useState(100);

    useEffect(() => {
        setZoomLevel(Math.round(zoom * 100));
    }, [zoom]);

    const handleZoomIn = useCallback(() => {
        zoomIn();
    }, [zoomIn]);

    const handleZoomOut = useCallback(() => {
        zoomOut();
    }, [zoomOut]);

    const handleFitView = useCallback(() => {
        fitView({ padding: 0.5, includeHiddenNodes: false });
    }, [fitView]);

    return (
        <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg flex items-center p-2 space-x-2">
               <div className="w-10 h-8 flex items-center justify-center text-xs text-gray-600 bg-gray-50 rounded hover:bg-gray-100">
                {zoomLevel}%
            </div>
            <button 
                onClick={handleFitView}
                className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-50 rounded hover:bg-gray-100"
                title="Ajustar vista"
            >
                         <ArrowsPointingInIcon className="h-4 w-4" />

            </button>
         
            <button 
                onClick={handleZoomIn}
                className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-50 rounded hover:bg-gray-100"
            >
                +
            </button>
            <button 
                onClick={handleZoomOut}
                className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-50 rounded hover:bg-gray-100"
            >
                -
            </button>
        </div>
    );
};

export default ZoomControl;