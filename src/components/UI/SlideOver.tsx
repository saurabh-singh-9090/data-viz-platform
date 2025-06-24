import React, { useState } from 'react';
import { HiX, HiSearch, HiRefresh, HiInformationCircle, HiChevronDown, HiSparkles } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { closeSlideOver } from '../../store/slices/uiSlice';
import { toggleVariable } from '../../store/slices/dashboardSlice';

const SlideOver: React.FC = () => {
  const dispatch = useAppDispatch();
  const { slideOver } = useAppSelector((state) => state.ui);
  const { variables } = useAppSelector((state) => state.dashboard);
  const [primaryExpanded, setPrimaryExpanded] = useState(false);
  const [secondaryExpanded, setSecondaryExpanded] = useState(false);
  const [hoveredVariable, setHoveredVariable] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(closeSlideOver());
  };

  const handleToggleVariable = (variableId: string) => {
    dispatch(toggleVariable(variableId));
  };

  const handleAutofill = () => {
    // Auto-select some variables for demonstration
    const autoSelectIds = ['carbon1', 'co2-distribution', 'parking-rate'];
    autoSelectIds.forEach(id => {
      const variable = variables.find(v => v.id === id);
      if (variable && !variable.active) {
        dispatch(toggleVariable(id));
      }
    });
  };

  const handleRerun = () => {
    // Simulate rerunning analysis
    console.log('Rerunning analysis with selected variables');
    handleClose();
  };

  const handleVariableMouseEnter = (variableId: string) => {
    // Set the hovered variable to show context section
    setHoveredVariable(variableId);
  };

  const handleVariableMouseLeave = () => {
    // Clear the hovered variable
    setHoveredVariable(null);
  };

  // Group variables by category
  const groupedVariables = variables.reduce((acc, variable) => {
    if (!acc[variable.category]) {
      acc[variable.category] = [];
    }
    acc[variable.category].push(variable);
    return acc;
  }, {} as Record<string, typeof variables>);

  // Don't render if not the right type, but allow rendering when closed for animation
  if (slideOver.type !== 'variables' && slideOver.type !== null) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          slideOver.isOpen && slideOver.type === 'variables' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      
      {/* Slide Over Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 w-[600px] bg-[#0E0D0D] border-l border-gray-600 shadow-xl transform transition-transform duration-300 ease-in-out ${
        slideOver.isOpen && slideOver.type === 'variables' ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-3">
            <h2 className="text-xl font-semibold text-white">Edit Variables</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Search and Controls */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Carbol"
                  className="w-full pl-10 pr-4 py-2 bg-[#2C2E334D] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9FF3B]"
                  defaultValue="Carbol"
                />
              </div>
              <button
                onClick={handleAutofill}
                className="px-4 py-2 bg-[#242424] border border-gray-600 rounded-md text-white hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <HiSparkles className="w-4 h-4" />
                <span>Autofill</span>
              </button>
              <button
                onClick={handleRerun}
                className="px-4 py-2 bg-[#5959594D] text-[#D5D5D5] hover:text-[#C8E972FD] border-[#EEEEEE] hover:border-[#C9FF3B] hover:bg-[#282E16] rounded-md transition-colors flex items-center space-x-2 font-medium border cursor-pointer"
              >
                <HiRefresh className="w-4 h-4" />
                <span>Rerun</span>
              </button>
            </div>
          </div>

          {/* Variable Categories and Context Section Container */}
          <div className="flex-1 overflow-hidden mx-6">
            {/* Variable Categories */}
            <div className={`overflow-y-auto p-6 border border-[#525252] rounded-md h-[320px] ${hoveredVariable ? 'rounded-b-none' : ''}`} >
              {Object.entries(groupedVariables).map(([category, categoryVariables]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categoryVariables.map((variable) => (
                      <div
                        key={variable.id}
                        onClick={() => handleToggleVariable(variable.id)}
                        onMouseEnter={() => handleVariableMouseEnter(variable.id)}
                        onMouseLeave={handleVariableMouseLeave}
                        className={`py-[5px] pl-[10px] pr-[5px] rounded-full text-sm font-medium transition-colors flex items-center space-x-4 border cursor-pointer ${
                          variable.active
                            ? 'bg-[#CCFF001A] text-[#C8E972FD] border-[#C9FF3B]'
                            : 'bg-[#5959594D] text-[#D5D5D5] hover:text-[#C8E972FD] border-[#EEEEEE] hover:border-[#C9FF3B] hover:bg-[#282E16]'
                        }`}
                      >
                        <span>{variable.name}</span>
                        <div className="flex items-center space-x-1">
                          <button 
                            className="text-xs hover:opacity-80"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle individual actions
                            }}
                          >
                            ✨
                          </button>
                          {variable.active ? (
                            <span className="text-xs">✓</span>
                          ) : (
                            <span className="text-xs">+</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Variable Context Section */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              hoveredVariable ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {hoveredVariable && (
                <div className="p-4 border-l border-r border-b border-[#525252] rounded-b-md animate-fade-in bg-[#222324]">
                  {(() => {
                    const variable = variables.find(v => v.id === hoveredVariable);
                    if (!variable) return null;
                    
                    return (
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-white mr-2">{variable.name}</h3>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center">
                            <HiInformationCircle className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {variable.description}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

            {/* Accordion Sections */}
            <div className="p-6 space-y-2">
              {/* Primary Variables */}
              <div className="bg-[#3A3D3F] rounded-lg">
                <div
                  onClick={() => setPrimaryExpanded(!primaryExpanded)}
                  className="w-full flex items-center justify-between py-3 px-6 pr-[10px] text-left bg-[#222324] border border-[#5A5A5A] transition-colors rounded-lg cursor-pointer"
                >
                  <span className="text-[#C8E972] font-medium">Primary Variables</span>
                  <HiChevronDown className={`w-4 h-4 text-[#C9FF3B] transition-transform border border-[#C9FF3B] rounded-full ${primaryExpanded ? 'rotate-180' : ''}`} />
                </div>
                {primaryExpanded && (
                  <div className="px-4 pb-2 mt-2">
                    <p className="text-xs text-gray-400">Primary variables content would go here...</p>
                  </div>
                )}
              </div>

              {/* Secondary Variables */}
              <div className="bg-[#3A3D3F] rounded-lg">
                <div
                  onClick={() => setSecondaryExpanded(!secondaryExpanded)}
                  className="w-full flex items-center justify-between  py-3 px-6 pr-[10px] text-left bg-[#222324] border border-[#5A5A5A] transition-colors rounded-lg cursor-pointer"
                >
                  <span className="text-[#C8E972] font-medium">Secondary Variables</span>
                  <HiChevronDown className={`w-4 h-4 text-[#C9FF3B] transition-transform border border-[#C9FF3B] rounded-full ${secondaryExpanded ? 'rotate-180' : ''}`} />
                </div>
                {secondaryExpanded && (
                  <div className="px-4 pb-2 mt-2">
                    <p className="text-xs text-gray-400">Secondary variables content would go here...</p>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>

      
    </>
  );
};

export default SlideOver; 