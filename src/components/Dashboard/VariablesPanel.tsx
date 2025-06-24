import React, { useState, useRef } from 'react';
import { HiPlus, HiInformationCircle } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { openSlideOver } from '../../store/slices/uiSlice';
import { showContextWindow, hideContextWindow } from '../../store/slices/uiSlice';

const VariablesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.dashboard);
  const { contextWindow } = useAppSelector((state) => state.ui);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleEditVariables = () => {
    dispatch(openSlideOver({ type: 'variables' }));
  };

  const handleVariableMouseEnter = (variableId: string, event: React.MouseEvent) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Set a new timeout for 1.5 seconds
    const timeout = setTimeout(() => {
      const rect = event.currentTarget.getBoundingClientRect();
      dispatch(showContextWindow({
        variableId,
        position: {
          x: rect.right + 10,
          y: rect.top,
        },
      }));
    }, 1500);

    setHoverTimeout(timeout);
  };

  const handleVariableMouseLeave = () => {
    // Clear the timeout if mouse leaves before 1.5 seconds
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    dispatch(hideContextWindow());
  };

  // Get the variable data for context window
  const contextVariable = variables.find(v => v.id === contextWindow.variableId);

  return (
    <div ref={panelRef} className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Variables</h2>
        <button
          onClick={handleEditVariables}
          className="btn-primary flex items-center space-x-2"
        >
          <HiPlus className="w-4 h-4" />
          <span>Edit Variables</span>
        </button>
      </div>

      <div className="space-y-2">
        {variables.filter(v => v.active).map((variable) => (
          <div
            key={variable.id}
            className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
            onMouseEnter={(e) => handleVariableMouseEnter(variable.id, e)}
            onMouseLeave={handleVariableMouseLeave}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">{variable.name}</h3>
                <p className="text-xs text-gray-400">{variable.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {variable.unit && (
                  <span className="text-xs text-gray-500">{variable.unit}</span>
                )}
                <HiInformationCircle className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Context Window */}
      {contextWindow.isVisible && contextVariable && (
        <div
          className="fixed z-50 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-4 animate-fade-in"
          style={{
            left: contextWindow.position.x,
            top: contextWindow.position.y,
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">{contextVariable.name}</h3>
            <HiInformationCircle className="w-5 h-5 text-blue-400 mt-0.5" />
          </div>
          
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            {contextVariable.description}
          </p>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Category: {contextVariable.category}</span>
            {contextVariable.unit && (
              <span className="text-gray-400">Unit: {contextVariable.unit}</span>
            )}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition-colors">
                Add to Selection
              </button>
              <button className="px-3 py-2 bg-gray-700 text-white text-xs rounded hover:bg-gray-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariablesPanel; 