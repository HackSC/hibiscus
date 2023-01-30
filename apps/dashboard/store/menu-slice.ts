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
  { displayName: 'Battlepass', url: '/battlepass' },
  // { displayName: 'Team', url: '/team' },
];

const sponsorRoutes: TabRoute[] = [
  { displayName: 'Home', url: '/' },
  { displayName: 'My Booth', url: '/sponsor-booth' },
  { displayName: 'Configure', url: '/' }, // Have to change later
];

export interface MenuState {
  currentTabIndex: number;
  isOpen: boolean;
  tabRoutes: TabRoute[];
  sponsorRoutes?: TabRoute[];
}

const initialState: MenuState = {
  currentTabIndex: -1,
  isOpen: false,
  tabRoutes,
  sponsorRoutes,
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
    removeTabRoute: (state, action: PayloadAction<string>) => {
      const url = action.payload;
      state.tabRoutes = state.tabRoutes.filter((item) => item.url !== url);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTab, toggleMenuOpen, removeTabRoute } = menuSlice.actions;

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
