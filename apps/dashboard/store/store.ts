import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import menuReducer from './menu-slice';
import { createWrapper } from 'next-redux-wrapper';
import hackformReducer from './hackform-slice';

const makeStore = () =>
  configureStore({
    reducer: {
      menu: menuReducer,
      hackform: hackformReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
