import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SlideOverState, TooltipData } from '../../types';

interface UIState {
  slideOver: SlideOverState;
  tooltip: TooltipData | null;
  isTooltipVisible: boolean;
  contextWindow: {
    isVisible: boolean;
    variableId: string | null;
    position: { x: number; y: number };
  };
}

const initialState: UIState = {
  slideOver: {
    isOpen: false,
    type: null,
    data: null,
  },
  tooltip: null,
  isTooltipVisible: false,
  contextWindow: {
    isVisible: false,
    variableId: null,
    position: { x: 0, y: 0 },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSlideOver: (state, action: PayloadAction<{ type: 'variables' | 'details'; data?: any }>) => {
      state.slideOver.isOpen = true;
      state.slideOver.type = action.payload.type;
      state.slideOver.data = action.payload.data;
    },
    closeSlideOver: (state) => {
      state.slideOver.isOpen = false;
      state.slideOver.type = null;
      state.slideOver.data = null;
    },
    showTooltip: (state, action: PayloadAction<TooltipData>) => {
      state.tooltip = action.payload;
      state.isTooltipVisible = true;
    },
    hideTooltip: (state) => {
      state.tooltip = null;
      state.isTooltipVisible = false;
    },
    showContextWindow: (state, action: PayloadAction<{ variableId: string; position: { x: number; y: number } }>) => {
      state.contextWindow.isVisible = true;
      state.contextWindow.variableId = action.payload.variableId;
      state.contextWindow.position = action.payload.position;
    },
    hideContextWindow: (state) => {
      state.contextWindow.isVisible = false;
      state.contextWindow.variableId = null;
    },
  },
});

export const {
  openSlideOver,
  closeSlideOver,
  showTooltip,
  hideTooltip,
  showContextWindow,
  hideContextWindow,
} = uiSlice.actions;

export default uiSlice.reducer; 