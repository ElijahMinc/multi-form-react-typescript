import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authSlice from './AuthSlice'
import toastSlice from './ToastSlice'
import { usersAPI } from './usersAPI'

export const store = configureStore({
  reducer: {
    AuthReducer: authSlice,
    ToastReducer: toastSlice,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
