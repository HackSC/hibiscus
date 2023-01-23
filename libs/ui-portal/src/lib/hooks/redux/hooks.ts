import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, MenuDispatch } from '../../store/menu-store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useMenuDispatch: () => MenuDispatch = useDispatch;
export const useMenuSelector: TypedUseSelectorHook<RootState> = useSelector;
