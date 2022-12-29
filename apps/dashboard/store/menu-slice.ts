import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface TabRoute {
  displayName: string;
  url: string;
}

const tabRoutes: TabRoute[] = [
  { displayName: 'Home', url: '/' },
  { displayName: 'Apply as a hacker', url: '/apply-2023' },
  { displayName: 'Team', url: '/team' },
];

export interface MenuState {
  currentTabIndex: number;
  isOpen: boolean;
  tabRoutes: TabRoute[];
}

const initialState: MenuState = {
  currentTabIndex: -1,
  isOpen: false,
  tabRoutes,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<number>) => {
      state.currentTabIndex = action.payload;
    },
    toggleMenuOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTab, toggleMenuOpen } = menuSlice.actions;

const menuReducer = menuSlice.reducer;
export default menuReducer;

// selectors
export const selectCurrentTab = (state: RootState) =>
  state.menu.currentTabIndex < state.menu.tabRoutes.length
    ? state.menu.tabRoutes[state.menu.currentTabIndex]
    : null;
export const selectTabRoutes = (state: RootState) => state.menu.tabRoutes;
export const selectCurrentTabIndex = (state: RootState) =>
  state.menu.currentTabIndex;
export const selectMenuOpen = (state: RootState) => state.menu.isOpen;
