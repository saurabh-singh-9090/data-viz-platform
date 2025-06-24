import React, { useState, useRef, useMemo, useCallback } from 'react';
import { HiPlus, HiInformationCircle } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectActiveVariables } from '../../store/slices/dashboardSlice';
import { openSlideOver } from '../../store/slices/uiSlice';
import { showContextWindow, hideContextWindow } from '../../store/slices/uiSlice';
import type { Variable } from '../../types';

// Memoized variable item component
const VariableItem = React.memo<{
  variable: Variable;
  onMouseEnter: (variableId: string, event: React.MouseEvent) => void;
  onMouseLeave: () => void;
}>(({ variable, onMouseEnter, onMouseLeave }) => (
  <div
    className="p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
    onMouseEnter={(e) => onMouseEnter(variable.id, e)}
    onMouseLeave={onMouseLeave}
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
));

VariableItem.displayName = 'VariableItem';

// Memoized context window component
const ContextWindow = React.memo<{
  variable: Variable;
  position: { x: number; y: number };
}>(({ variable, position }) => (
  <div
    className="fixed z-50 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-xl p-4 animate-fade-in"
    style={{
      left: position.x,
      top: position.y,
    }}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-lg font-semibold text-white">{variable.name}</h3>
      <HiInformationCircle className="w-5 h-5 text-blue-400 mt-0.5" />
    </div>
    
    <p className="text-sm text-gray-300 leading-relaxed mb-4">
      {variable.description}
    </p>
    
    <div className="flex items-center justify-between text-xs">
      <span className="text-gray-400">Category: {variable.category}</span>
      {variable.unit && (
        <span className="text-gray-400">Unit: {variable.unit}</span>
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
));

ContextWindow.displayName = 'ContextWindow';

const VariablesPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeVariables = useAppSelector(selectActiveVariables);
  const { contextWindow } = useAppSelector((state) => state.ui);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Memoized context variable
  const contextVariable = useMemo(() => 
    activeVariables.find(v => v.id === contextWindow.variableId),
    [activeVariables, contextWindow.variableId]
  );

  // Memoized callbacks
  const handleEditVariables = useCallback(() => {
    dispatch(openSlideOver({ type: 'variables' }));
  }, [dispatch]);

  const handleVariableMouseEnter = useCallback((variableId: string, event: React.MouseEvent) => {
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
  }, [dispatch, hoverTimeout]);

  const handleVariableMouseLeave = useCallback(() => {
    // Clear the timeout if mouse leaves before 1.5 seconds
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    dispatch(hideContextWindow());
  }, [dispatch, hoverTimeout]);

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
        {activeVariables.map((variable) => (
          <VariableItem
            key={variable.id}
            variable={variable}
            onMouseEnter={handleVariableMouseEnter}
            onMouseLeave={handleVariableMouseLeave}
          />
        ))}
      </div>

      {/* Context Window */}
      {contextWindow.isVisible && contextVariable && (
        <ContextWindow 
          variable={contextVariable}
          position={contextWindow.position}
        />
      )}
    </div>
  );
};

export default React.memo(VariablesPanel); 