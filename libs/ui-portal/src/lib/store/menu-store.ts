import {
  Action,
  configureStore,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

interface TabRoute {
  displayName: string;
  url: string;
}

const tabRoutes: TabRoute[] = [
  { displayName: 'Home', url: '/' },
  { displayName: 'Apply as a hacker', url: '/apply-2023' },
  // { displayName: 'Team', url: '/team' },
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
    removeTabRoute: (state, action: PayloadAction<string>) => {
      const url = action.payload;
      state.tabRoutes = state.tabRoutes.filter((item) => item.url !== url);
    },
  },
});

const makeStore = () =>
  configureStore({
    reducer: {
      menu: menuReducer,
    },
  });

export type MenuStore = ReturnType<typeof makeStore>;
export type MenuDispatch = MenuStore['dispatch'];
export type RootState = ReturnType<MenuStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const menuWrapper = createWrapper<MenuStore>(makeStore);

// Action creators are generated for each case reducer function
export const { changeTab, toggleMenuOpen, removeTabRoute } = menuSlice.actions;

export const menuReducer = menuSlice.reducer;

// selectors
export const selectCurrentTab = (state: MenuState) =>
  state.currentTabIndex < state.tabRoutes.length
    ? state.tabRoutes[state.currentTabIndex]
    : null;
export const selectTabRoutes = (state: MenuState) => state.tabRoutes;
export const selectCurrentTabIndex = (state: MenuState) =>
  state.currentTabIndex;
export const selectMenuOpen = (state: MenuState) => state.isOpen;
